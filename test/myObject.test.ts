import { describe, it, expect } from "vitest";
import { myObject } from "../src/myObject";

describe("Test myObject", () => {
    it("Should have the correct keys", async () => {
        expect(Object.keys(myObject)).toStrictEqual(["p"]);
    });
});
