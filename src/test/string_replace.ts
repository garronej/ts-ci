
import { action } from "../string_replace";
import * as st from "scripting-tools";

(async () => {

    const { replace_result } = await action("string_replace", {
        "input_string": "octo-computing-machine",
        "search_value": "-",
        "replace_value": "_"
    },
        { "debug": console.log }
    );

    console.log({ replace_result });

})();