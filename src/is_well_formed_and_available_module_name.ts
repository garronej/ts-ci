

import { setOutputFactory } from "./outputHelper";
import { getActionParamsFactory } from "./inputHelper";
import { is404 } from "./tools/is404";

import validate_npm_package_name from "validate-npm-package-name";
    

export const { getActionParams } = getActionParamsFactory({
    "inputNameSubset": [
        "module_name"
    ] as const
});

export type Params = ReturnType<typeof getActionParams>;

type CoreLike = {
    debug: (message: string) => void;
};

export const { setOutput } = setOutputFactory<
    "is_valid_node_module_name" |
    "is_valid_deno_module_name" |
    "is_available_on_npm" |
    "is_available_on_deno_land"
>();

export async function action(
    _actionName: "is_well_formed_and_available_module_name",
    params: Params,
    core: CoreLike
): Promise<Parameters<typeof setOutput>[0]> {

    const { module_name } = params;

    const { validForNewPackages } = validate_npm_package_name(module_name);

    const validForDenoPackages = validForNewPackages && module_name.indexOf("-") < 0

    return {
        "is_valid_node_module_name": validForNewPackages ? "true" : "false",
        "is_available_on_npm":
            !validForNewPackages ?
                "false"
                :
                (await is404(`https://www.npmjs.com/package/${module_name}`)) ?
                    "true" : "false",
        "is_valid_deno_module_name": validForDenoPackages ? "true" : "false",
        "is_available_on_deno_land":
            !validForDenoPackages ?
                "false"
                :
                (await is404(`https://deno.land/x/${module_name}/`)) ?
                    "true" : "false"
    };

}