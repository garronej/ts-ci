
import { getActionParamsFactory } from "./inputHelper";
import * as st from "scripting-tools";
import { getCommitAheadFactory } from "./tools/octokit-addons/getCommitAhead";
import * as get_package_json_version from "./get_package_json_version";
import * as fs from "fs";
import { NpmModuleVersion } from "./tools/NpmModuleVersion";
import { gitCommit } from "./tools/gitCommit";
import { getLatestSemVersionedTagFactory } from "./tools/octokit-addons/getLatestSemVersionedTag";
import { createOctokit } from "./tools/createOctokit";

export const { getActionParams } = getActionParamsFactory({
    "inputNameSubset": [
        "owner",
        "repo",
        "branch",
        "exclude_commit_from_author_names_json",
        "github_token"
    ] as const
});

export type Params = ReturnType<typeof getActionParams>;

type CoreLike = {
    debug: (message: string) => void;
    warning: (message: string)=> void;
};

export async function action(
    _actionName: "update_changelog",
    params: Params,
    core: CoreLike
) {

    const {
        owner,
        repo,
        github_token
    } = params;

    const branch = params.branch.split("/").reverse()[0];

    core.debug(`params: ${JSON.stringify(params)}`);

    const exclude_commit_from_author_names: string[] =
        JSON.parse(params.exclude_commit_from_author_names_json)
        ;


    const octokit = createOctokit({ github_token });

    const { getCommitAhead } = getCommitAheadFactory({ octokit });

    const { getLatestSemVersionedTag } = getLatestSemVersionedTagFactory({ octokit });

    const { tag: branchBehind } = (await getLatestSemVersionedTag({ owner, repo })) ?? {};

    if( branchBehind === undefined ){

        core.warning(`It's the first release, not editing the CHANGELOG.md`);

        return;

    }

    const { commits } = await getCommitAhead({
        owner,
        repo,
        branchBehind,
        "branchAhead": branch
    }).catch(() => ({ "commits": undefined }));

    if( commits === undefined ){

        core.warning(`${branchBehind} probably does not exist`);

        return;

    }

    const [
        branchBehindVersion,
        branchAheadVersion
    ] = await Promise.all(
        ([branchBehind, branch] as const)
            .map(branch =>
                get_package_json_version.action(
                    "get_package_json_version",
                    {
                        owner,
                        repo,
                        branch,
                        "compare_to_version": "0.0.0"
                    },
                    core
                ).then(({ version }) => version)
            )
    );


    const bumpType = NpmModuleVersion.bumpType({
        "versionAheadStr": branchAheadVersion,
        "versionBehindStr": branchBehindVersion || "0.0.0"
    });

    if( bumpType === "SAME" ){

        core.warning(`Version on ${branch} and ${branchBehind} are the same, not editing CHANGELOG.md`);

        return;

    }

    await gitCommit({
        owner,
        repo,
        github_token,
        "commitAuthorEmail": "actions@github.com",
        "performChanges": async () => {

            await st.exec(`git checkout ${branch}`);

            const { changelogRaw } = updateChangelog({
                "changelogRaw":
                    fs.existsSync("CHANGELOG.md") ?
                        fs.readFileSync("CHANGELOG.md")
                            .toString("utf8")
                        : "",
                "version": branchAheadVersion,
                bumpType,
                "body": commits
                    .reverse()
                    .filter(({ commit }) => !exclude_commit_from_author_names.includes(commit.author.name))
                    .map(({ commit }) => commit.message)
                    .filter(message => !/changelog/i.test(message))
                    .filter(message => !/^Merge branch /.test(message))
                    .filter(message => !/^GitBook: /.test(message))
                    .map(message => `- ${message}  `)
                    .join("\n")
            });

            core.debug(`CHANGELOG.md: ${changelogRaw}`);

            fs.writeFileSync(
                "CHANGELOG.md",
                Buffer.from(changelogRaw, "utf8")
            );

            return {
                "commit": true,
                "addAll": true,
                "message": `Update changelog v${branchAheadVersion}`
            };

        }

    });

}

function updateChangelog(
    params: {
        changelogRaw: string;
        version: string;
        bumpType: "MAJOR" | "MINOR" | "PATCH";
        body: string;
    }
): { changelogRaw: string; } {

    const { body, version, bumpType } = params;

    const dateString = (() => {

        const now = new Date();

        return new Date(now.getTime() - (now.getTimezoneOffset() * 60000))
            .toISOString()
            .split("T")[0];

    })();

    const changelogRaw = [
        `${bumpType === "MAJOR" ? "#" : (bumpType === "MINOR" ? "##" : "###")}`,
        ` **${version}** (${dateString})  \n  \n`,
        `${body}  \n  \n`,
        params.changelogRaw
    ].join("");


    return { changelogRaw };

}