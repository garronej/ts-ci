
import fetch from "node-fetch";
const urlJoin: typeof import("path").join = require("url-join");
import { setOutputFactory } from "./outputHelper";
import { NpmModuleVersion } from "./tools/NpmModuleVersion";
import { getActionParamsFactory } from "./inputHelper";
import { createOctokit } from "./tools/createOctokit";
import { getLatestSemVersionedTagFactory } from "./tools/octokit-addons/getLatestSemVersionedTag";
import type { Param0 } from "tsafe";


export const { getActionParams } = getActionParamsFactory({
    "inputNameSubset": [
        "owner",
        "repo",
        "branch",
        "github_token"
    ] as const
});

export type Params = ReturnType<typeof getActionParams>;

type CoreLike = {
    debug: (message: string) => void;
};

export const { setOutput } = setOutputFactory<"from_version" | "to_version" | "is_upgraded_version" | "is_pre_release">();

export async function action(
    _actionName: "is_package_json_version_upgraded",
    params: Params,
    core: CoreLike
): Promise<Parameters<typeof setOutput>[0]> {

    core.debug(JSON.stringify(params));

    const { owner, repo, github_token } = params;

    //params.branch <- github.head_ref || github.ref
    //When it's a normal branch: github.head_ref==="" and github.ref==="refs/heads/main"
    //When it's a pr from: github.head_ref==="<name of the branch branch>"
    const branch = params.branch.replace(/^refs\/heads\//, "");

    const to_version = await getPackageJsonVersion({ owner, repo, branch });

    if( to_version === undefined ){
        throw new Error(`No version in package.json on ${owner}/${repo}#${branch} (or repo is private)`);
    }


    core.debug(`Version on ${owner}/${repo}#${branch} is ${NpmModuleVersion.stringify(to_version)}`);

    const octokit = createOctokit({ github_token });

    const { getLatestSemVersionedTag } = getLatestSemVersionedTagFactory({ octokit });

    const from_version= await (async () => {

        const getLatestSemVersionedTagParam: Param0<typeof getLatestSemVersionedTag> = {
            owner,
            repo,
            "rcPolicy": to_version.rc !== undefined ?
                "ONLY LOOK FOR RC" : "IGNORE RC",
            "major": to_version.major
        };

        let wrap = await getLatestSemVersionedTag(getLatestSemVersionedTagParam);

        if( wrap !== undefined ){
            return wrap.version;
        }
        wrap = await getLatestSemVersionedTag({ ...getLatestSemVersionedTagParam, "major": undefined });

        if( wrap !== undefined ){
            return wrap.version;
        }

        return NpmModuleVersion.parse("0.0.0");


    })();

    core.debug(`Last version was ${NpmModuleVersion.stringify(from_version)}`);

    const is_upgraded_version = NpmModuleVersion.compare(
        to_version,
        from_version
    ) === 1 ? "true" : "false";

    core.debug(`Is version upgraded: ${is_upgraded_version}`);

    const is_pre_release = is_upgraded_version === "false" ? "false" : to_version.rc !== undefined ? "true" : "false";

    core.debug(`Is pre release: ${is_pre_release}`);

    return {
        "to_version": NpmModuleVersion.stringify(to_version),
        "from_version": NpmModuleVersion.stringify(from_version),
        is_upgraded_version,
        is_pre_release
    };

}

//TODO: Find a way to make it work with private repo
async function getPackageJsonVersion(params: {
    owner: string;
    repo: string;
    branch: string;
}): Promise<NpmModuleVersion | undefined> {

    const { owner, repo, branch } = params;

    const version = await fetch(
        urlJoin(
            `https://raw.github.com`,
            owner,
            repo,
            branch,
            "package.json"
        )
    )
        .then(res => res.text())
        .then(text => JSON.parse(text))
        .then(({ version }) => version as string)
        .catch(() => undefined)
        ;

    if (version === undefined) {
        return undefined;
    }

    return NpmModuleVersion.parse(version);

}

