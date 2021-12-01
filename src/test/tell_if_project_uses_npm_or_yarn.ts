

import { action } from "../tell_if_project_uses_npm_or_yarn";

(async () => {

    const repo = "powerhooks";

    await action("tell_if_project_uses_npm_or_yarn", {
        "owner": "garronej",
        repo,
        "branch": "refs/heads/master"
    },
        { "debug": console.log }
    );

})();