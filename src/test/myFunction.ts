
import { myFunction } from "..";

import { getPromiseAssertionApi } from "evt/dist/tools/testing/getPromiseAssertionApi";

const { mustResolve } = getPromiseAssertionApi({ "takeIntoAccountArraysOrdering": true});

(async () => {

    await mustResolve({
        "promise": myFunction(),
        "expectedData": ["a", "b", "c"],
        "delay": 0
    });

    console.log("PASS");

})();


