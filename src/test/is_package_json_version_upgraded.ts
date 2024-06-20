

import { action } from "../is_package_json_version_upgraded";
import { assert } from "tsafe/assert";

(async () => {

    const repo = "tss-react";

    const github_token = process.env.GITHUB_TOKEN

    assert(github_token !== undefined);

    const result = await action("is_package_json_version_upgraded", {
        "owner": "garronej",
        repo,
        "branch": "main",
        github_token
    }, { "debug": console.log });

    console.log(result);

})();


