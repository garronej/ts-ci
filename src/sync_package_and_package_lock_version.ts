import { getActionParamsFactory } from "./inputHelper";
import * as st from "scripting-tools";
import * as fs from "fs";
import { gitCommit } from "./tools/gitCommit";

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

export async function action(
    _actionName: "sync_package_and_package_lock_version",
    params: Params,
    core: CoreLike
) {

    core.debug(JSON.stringify(params));

    const { owner, repo, branch, github_token } = params;

    await gitCommit({
        owner,
        repo,
        github_token,
        "commitAuthorEmail": "actions@github.com",
        "performChanges": async () => {

            await st.exec(`git checkout ${branch}`);

            const { version } = JSON.parse(
                fs.readFileSync("package.json")
                    .toString("utf8")
            );

            if (!fs.existsSync("package-lock.json")) {
                core.debug(`No package-lock.json tracked by ${owner}/${repo}#${branch}`);
                return { "commit": false };
            }

            const packageLockJsonRaw = fs.readFileSync("package-lock.json")
                .toString("utf8")
                ;

            const packageLockJsonParsed = JSON.parse(
                packageLockJsonRaw
            );

            if (packageLockJsonParsed.version === version) {
                core.debug("Nothing to do, version in package.json and package-lock.json are the same");
                return { "commit": false };
            }

            fs.writeFileSync(
                "package-lock.json",
                Buffer.from(
                    JSON.stringify(
                        (() => {
                            packageLockJsonParsed.version = version;
                            packageLockJsonParsed.packages[""].version = version;
                            return packageLockJsonParsed;
                        })(),
                        null,
                        packageLockJsonRaw
                            .replace(/\t/g, "    ")
                            .match(/^(\s*)\"version\"/m)![1].length
                    ) + packageLockJsonRaw.match(/}([\r\n]*)$/)![1],
                    "utf8"
                )
            );

            return {
                "commit": true,
                "addAll": false,
                "message": "Sync package.json and package.lock version"
            };

        }

    });


}
