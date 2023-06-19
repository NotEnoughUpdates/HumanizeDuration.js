import { doesNotThrow, throws } from "node:assert";
import { describe, it } from "node:test";
import humanizeDuration, {
  HumanizerOptions,
  humanizer as _humanizer
} from "../src/index.js";

describe("error handling", () => {
  it("throws an error when passed a bad language in the function", () => {
    function humanizingWith(options: HumanizerOptions) {
      return () => {
        humanizeDuration(10000, options);
      };
    }

    throws(humanizingWith({ language: "EN" }), Error);
    throws(humanizingWith({ language: "bad language" }), Error);
    throws(humanizingWith({ language: "" }), Error);
    // @ts-expect-error: Type 'null' is not assignable to type 'string | undefined'
    throws(humanizingWith({ language: null }), Error);
    // @ts-expect-error: Argument of type '{ language: string; fallback: null; }' is not assignable to parameter of type 'HumanizerOptions'.
    // Object literal may only specify known properties, but 'fallback' does not exist in type 'HumanizerOptions'. Did you mean to write 'fallbacks'?
    throws(humanizingWith({ language: "bad language", fallback: null }), Error);
  });

  it("throws an error when passed a bad language in a humanizer", () => {
    const humanizer = _humanizer({
      language: "bad language"
    });

    function humanizing(options: HumanizerOptions) {
      return () => {
        humanizer(10000, options);
      };
    }

    // @ts-expect-error: Expected 1 arguments, but got 0
    throws(humanizing(), Error);
    throws(humanizing({ language: "EN" }), Error);
    throws(humanizing({ language: "bad language" }), Error);
    throws(humanizing({ language: "" }), Error);
    // @ts-expect-error: Type 'null' is not assignable to type 'string | undefined'
    throws(humanizing({ language: null }), Error);
    doesNotThrow(humanizing({ language: "es" }), Error);
    // @ts-expect-error: Type 'string[]' is not assignable to type 'string'.
    throws(humanizing({ language: ["es", "en"] }), Error);
  });

  it("should throw if fallbacks configuration is invalid", () => {
    function humanizingWith(options: HumanizerOptions) {
      return () => {
        humanizeDuration(10000, options);
      };
    }
    throws(humanizingWith({ language: "es", fallbacks: [] }), Error);
    //~ throws(humanizingWith({ language: "es", fallbacks: undefined }), Error);
    // @ts-expect-error: Type 'null' is not assignable to type 'string[] | undefined'
    throws(humanizingWith({ language: "es", fallbacks: null }), Error);
    // @ts-expect-error: Type 'string' is not assignable to type 'string[]'
    throws(humanizingWith({ language: "es", fallbacks: "en" }), Error);
  });
});
