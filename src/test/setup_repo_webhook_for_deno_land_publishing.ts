
import { action } from "../setup_repo_webhook_for_deno_land_publishing";
import * as st from "scripting-tools";

(async () => {

    st.enableCmdTrace();

    const repo = "reimagined_octo_winner_kay";

    const resp = await action(
        "setup_repo_webhook_for_deno_land_publishing",
        {
            "owner": "garronej",
            "repo": "reimagined_octo_winner_kay",
            "should_webhook_be_enabled": "false",
            "github_token": ""
        },
        {
            "debug": console.log,
            "warning": console.warn
        }
    );

    console.log(resp);

})();