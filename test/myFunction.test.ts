import { describe, it, expect } from "vitest";
import { myFunction } from "../src/myFunction";

describe("Test myFunction", () => {
    it("Should return the correct value", async () => {
        expect(myFunction()).toStrictEqual(["a", "b", "c"]);
    });
    it("should return the correct number of element", async () => {
        expect(myFunction().length).toBe(3);
    });
});
