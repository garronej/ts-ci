import { getActionParamsFactory } from "./inputHelper";
import { createOctokit } from "./tools/createOctokit";

export const { getActionParams } = getActionParamsFactory({
    "inputNameSubset": [
        "owner", 
        "repo", 
        "event_type",
        "client_payload_json",
        "github_token"
    ] as const
});

export type Params = ReturnType<typeof getActionParams>;


type CoreLike = {
    debug: (message: string) => void;
};

export async function action(
    _actionName: "dispatch_event",
    params: Params,
    core: CoreLike
) {

    const { owner, repo, event_type, client_payload_json, github_token } = params;

    core.debug(JSON.stringify({ _actionName, params }));


    const octokit = createOctokit({ github_token });

    await octokit.repos.createDispatchEvent({
        owner,
        repo,
        event_type,
        
        ...(!!client_payload_json ?
            { "client_payload": JSON.parse(client_payload_json) } :
            {}
        )
    });



}