
import * as core from '@actions/core';

export const inputNames = [
    "action_name",
    "owner",
    "repo",
    "event_type",
    "client_payload_json",
    "branch",
    "exclude_commit_from_author_names_json",
    "module_name",
    "compare_to_version",
    "input_string",
    "search_value",
    "replace_value",
    "should_webhook_be_enabled",
    "github_token"
] as const;

export const availableActions = [
    "get_package_json_version",
    "dispatch_event",
    "update_changelog",
    "sync_package_and_package_lock_version",
    "setup_repo_webhook_for_deno_land_publishing",
    "is_well_formed_and_available_module_name",
    "string_replace",
    "tell_if_project_uses_npm_or_yarn",
    "is_package_json_version_upgraded"
] as const;


export function getInputDescription(inputName: typeof inputNames[number]): string {
    switch(inputName){
        case "action_name": return [
            `Action to run, one of: `,
            availableActions.map(s=>`"${s}"`).join(", ")
        ].join("");
        case "owner": return [ 
            "Repository owner, example: 'garronej',",
            "github.repository_owner" 
        ].join("");
        case "repo": return [
            "Repository name, example: ",
            "'evt', github.event.repository.name" 
        ].join("");
        case "event_type": return [ 
            "see: https://developer.github.com/v3/",
            "repos/#create-a-repository-dispatch-event"
        ].join("");
        case "client_payload_json": return [ 
            "Example '{\"p\":\"foo\"}' see: https://developer.github.com/v3/",
            "repos/#create-a-repository-dispatch-event" 
        ].join("");
        case "branch": return "Example: default ( can also be a sha )";
        case "exclude_commit_from_author_names_json": return [
            "For update_changelog, do not includes commit from user ", 
            `certain committer in the CHANGELOG.md, ex: '["denoify_ci"]'`
        ].join("");
        case "module_name": return [
            `A candidate module name, Example: lodash`
        ].join("");
        case "compare_to_version": return [
            `For get_package_json_version, a version against which comparing the result`,
            `if found version more recent than compare_to_version compare_result is 1`,
            `if found version is equal to compare_to_version compare_result is 0`,
            `if found version is older to compare_to_version compare_result -1`,
            `Example: 0.1.3`
        ].join(" ");
        case "input_string": return `For string_replace, the string to replace`;
        case "search_value": return `For string_replace, Example '-' ( Will be used as arg for RegExp constructor )`;
        case "replace_value": return `For string_replace, Example '_'`;
        case "should_webhook_be_enabled": return `true|false, Should the create webhook be enabled, with setup_repo_webhook_for_deno_land_publishing`;
        case "github_token": return "GitHub Personal access token";
    }
}


export function getInputDefault(inputName: typeof inputNames[number]): string | undefined {

    switch(inputName){
        case "owner": return "${{github.repository_owner}}";
        case "repo": return "${{github.event.repository.name}}";
        case "branch": return "${{ github.sha }}";
        case "github_token": return "${{ github.token }}";
        case "exclude_commit_from_author_names_json": return '["actions"]';
        case "should_webhook_be_enabled": return "true";
    }

}


const getInput = (inputName: typeof inputNames[number]) => {

    if (inputNames.indexOf(inputName) < 0) {
        throw new Error(`${inputName} expected`);
    }

    return core.getInput(inputName);

}


export function getActionParamsFactory<U extends typeof inputNames[number]>(
    params: {
        inputNameSubset: readonly U[]
    }
) {

    const { inputNameSubset } = params;

    function getActionParams() {

        const params: Record<U, string> = {} as any;

        inputNameSubset.forEach(inputName => params[inputName] = getInput(inputName));

        return params;

    };

    return { getActionParams };

}

export function getActionName(): typeof availableActions[number] {
    return getInput("action_name") as any;
}
