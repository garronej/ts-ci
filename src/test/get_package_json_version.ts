


import { action } from "../get_package_json_version";

(async () => {

    const repo = "denoify";

    const result = await action("get_package_json_version", {
        "owner": "garronej",
        repo,
        "branch": "aa5da60301bea4cf0e80e98a4579f7076b544a44",
        "compare_to_version": "0.0.0"
    }, { "debug": console.log });

    console.log(result);


})();


