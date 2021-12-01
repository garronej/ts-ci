
import fetch from "node-fetch";
const urlJoin: typeof import("path").join = require("url-join");
import { setOutputFactory } from "./outputHelper";

import { getActionParamsFactory } from "./inputHelper";

export const { getActionParams } = getActionParamsFactory({
    "inputNameSubset": [
        "owner",
        "repo",
        "branch"
    ] as const
});

export type Params = ReturnType<typeof getActionParams>;

type CoreLike = {
    debug: (message: string) => void;
};

export const { setOutput } = setOutputFactory<"npm_or_yarn">();

export async function action(
    _actionName: "tell_if_project_uses_npm_or_yarn",
    params: Params,
    core: CoreLike
): Promise<Parameters<typeof setOutput>[0]> {

    core.debug(JSON.stringify(params));

    const { owner, repo } = params;

    const branch = params.branch.split("/").reverse()[0];

    const npm_or_yarn = await fetch(
        urlJoin(
            "https://raw.github.com",
            owner,
            repo,
            branch,
            "yarn.lock"
        )
    ).then(res => res.status === 404 ? "npm" : "yarn")

    core.debug(`Version on ${owner}/${repo}#${branch} is using ${npm_or_yarn}`);

    return { npm_or_yarn };

}