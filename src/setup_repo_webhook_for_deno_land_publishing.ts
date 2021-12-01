
import { setOutputFactory } from "./outputHelper";
import { getActionParamsFactory } from "./inputHelper";
import { createOctokit } from "./tools/createOctokit";

export const { getActionParams } = getActionParamsFactory({
    "inputNameSubset": [
        "owner",
        "repo",
        "should_webhook_be_enabled",
        "github_token"
    ] as const
});

export type Params = ReturnType<typeof getActionParams>;

type CoreLike = {
    debug: (message: string) => void;
    warning: (message: string) => void;
};


export const { setOutput } = setOutputFactory<"was_hook_created">();

export async function action(
    _actionName: "setup_repo_webhook_for_deno_land_publishing",
    params: Params,
    core: CoreLike
): Promise<Parameters<typeof setOutput>[0]> {

    const { owner, repo, should_webhook_be_enabled, github_token } = params;

    const octokit = createOctokit({ github_token });

    try {

        await octokit.repos.createWebhook({
            owner,
            repo,
            "active": should_webhook_be_enabled === "true",
            "events": ["create"],
            "config": {
                "url": `https://api.deno.land/webhook/gh/${repo}?subdir=deno_dist%252F`,
                "content_type": "json"
            }
        });

    } catch  {

        return { "was_hook_created": "false" };

    }

    return { "was_hook_created": "true" };

}