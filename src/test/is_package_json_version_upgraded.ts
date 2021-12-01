

import { action } from "../is_package_json_version_upgraded";

(async () => {

    const repo = "keycloakify-demo-app";

    const result = await action("is_package_json_version_upgraded", {
        "owner": "InseeFrLab",
        repo,
        "branch": "4fc0ccb46bdb3912e0a215ca3ae45aed458ea6a4",
        "github_token": ""
    }, { "debug": console.log });

    console.log(result);

})();


