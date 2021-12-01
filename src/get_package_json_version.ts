
import fetch from "node-fetch";
const urlJoin: typeof import("path").join = require("url-join");
import { setOutputFactory } from "./outputHelper";
import { NpmModuleVersion } from "./tools/NpmModuleVersion";

import { getActionParamsFactory } from "./inputHelper";

export const { getActionParams } = getActionParamsFactory({
    "inputNameSubset": [
        "owner",
        "repo",
        "branch",
        "compare_to_version"
    ] as const
});

export type Params = ReturnType<typeof getActionParams>;

type CoreLike = {
    debug: (message: string) => void;
};

export const { setOutput } = setOutputFactory<"version" | "compare_result">();

export async function action(
    _actionName: "get_package_json_version",
    params: Params,
    core: CoreLike
): Promise<Parameters<typeof setOutput>[0]> {

    core.debug(JSON.stringify(params));

    const { owner, repo, branch, compare_to_version } = params;

    const version = await fetch(
        urlJoin(
            "https://raw.github.com",
            owner,
            repo,
            branch,
            "package.json"
        )
    )
        .then(res => res.text())
        .then(text => JSON.parse(text))
        .then(({ version }) => version as string)
        .catch(() => "")
        ;

    core.debug(`Version on ${owner}/${repo}#${branch} is ${version}`);

    return { 
        version,
        "compare_result": NpmModuleVersion.compare(
        NpmModuleVersion.parse(version || "0.0.0"), 
        NpmModuleVersion.parse(compare_to_version)
    ).toString()
    };

}