
import { action } from "../update_changelog";
import * as st from "scripting-tools";

(async () => {

    st.enableCmdTrace();

    const repo = "sturdy_umbrella";

    await action("update_changelog", {
        "owner": "garronej",
        repo,
        "branch": "dev",
        "exclude_commit_from_author_names_json": JSON.stringify(["denoify_ci"]),
        "github_token": ""
    },
        {
            "debug": console.log,
            "warning": console.log
        }
    );


})();