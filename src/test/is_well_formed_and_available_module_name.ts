



import { action } from "../is_well_formed_and_available_module_name";

(async () => {


    for (const module_name of [
        "congenial_pancake",
        "evt",
        "_okay",
        "mai-oui-c-clair"
    ]) {

        console.log({ module_name });

        const resp = await action(
            "is_well_formed_and_available_module_name",
            { module_name },
            { "debug": console.log }
        );

        console.log(resp);

    }



})();


