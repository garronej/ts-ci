import * as core from '@actions/core'
import * as get_package_json_version from "./get_package_json_version";
import * as dispatch_event from "./dispatch_event";
import * as sync_package_and_package_lock_version from "./sync_package_and_package_lock_version";
import * as setup_repo_webhook_for_deno_land_publishing from "./setup_repo_webhook_for_deno_land_publishing";
import * as is_well_formed_and_available_module_name from "./is_well_formed_and_available_module_name";
import * as tell_if_project_uses_npm_or_yarn from "./tell_if_project_uses_npm_or_yarn";
import * as string_replace from "./string_replace";
import * as is_package_json_version_upgraded from "./is_package_json_version_upgraded";
import { getActionName } from "./inputHelper";
import * as update_changelog from "./update_changelog";

async function run(): Promise<null> {

    const action_name = getActionName();

    switch (action_name) {
        case "get_package_json_version":
            get_package_json_version.setOutput(
                await get_package_json_version.action(
                    action_name,
                    get_package_json_version.getActionParams(),
                    core
                )
            );
            return null;
        case "dispatch_event":
            await dispatch_event.action(
                action_name,
                dispatch_event.getActionParams(),
                core
            );
            return null;
        case "update_changelog":
            await update_changelog.action(
                action_name,
                update_changelog.getActionParams(),
                core
            );
            return null;
        case "sync_package_and_package_lock_version":
            await sync_package_and_package_lock_version.action(
                action_name,
                sync_package_and_package_lock_version.getActionParams(),
                core
            );
            return null;
        case "setup_repo_webhook_for_deno_land_publishing":
            setup_repo_webhook_for_deno_land_publishing.setOutput(
                await setup_repo_webhook_for_deno_land_publishing.action(
                    action_name,
                    setup_repo_webhook_for_deno_land_publishing.getActionParams(),
                    core
                )
            );
            return null;
        case "is_well_formed_and_available_module_name":
            is_well_formed_and_available_module_name.setOutput(
                await is_well_formed_and_available_module_name.action(
                    action_name,
                    is_well_formed_and_available_module_name.getActionParams(),
                    core
                )
            );
            return null;
        case "string_replace":
            string_replace.setOutput(
                await string_replace.action(
                    action_name,
                    string_replace.getActionParams(),
                    core
                )
            );
            return null;
        case "tell_if_project_uses_npm_or_yarn":
            tell_if_project_uses_npm_or_yarn.setOutput(
                await tell_if_project_uses_npm_or_yarn.action(
                    action_name,
                    tell_if_project_uses_npm_or_yarn.getActionParams(),
                    core
                )
            );
            return null;
        case "is_package_json_version_upgraded":
            is_package_json_version_upgraded.setOutput(
                await is_package_json_version_upgraded.action(
                    action_name,
                    is_package_json_version_upgraded.getActionParams(),
                    core
                )
            );
            return null;

    }

    if (1 === 0 + 1) {
        throw new Error(`${action_name} Not supported by this toolkit`);
    }

}

(async () => {

    try {

        await run()

    } catch (error) {
        core.setFailed(error.message);
    }

})();

