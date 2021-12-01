
import { setOutputFactory } from "./outputHelper";

import { getActionParamsFactory } from "./inputHelper";

export const { getActionParams } = getActionParamsFactory({
    "inputNameSubset": [
        "input_string",
        "search_value",
        "replace_value"
    ] as const
});

export type Params = ReturnType<typeof getActionParams>;

type CoreLike = {
    debug: (message: string) => void;
};

export const { setOutput } = setOutputFactory<"replace_result">();

export async function action(
    _actionName: "string_replace",
    params: Params,
    core: CoreLike
): Promise<Parameters<typeof setOutput>[0]> {

    core.debug(JSON.stringify(params));

    const { input_string, search_value, replace_value } = params;

    return {
        "replace_result": input_string.replace(
            new RegExp(search_value, "g"), 
            replace_value
        )
    };

}