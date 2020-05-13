

import { assert } from "evt/dist/tools/typeSafety";
import * as inDepth from "evt/dist/tools/inDepth";
import { myObject } from "..";

assert(
    inDepth.same(
        myObject, 
        { "p": "FOO" }
    )
);

console.log("PASS");



