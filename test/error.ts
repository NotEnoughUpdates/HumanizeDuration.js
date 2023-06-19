import { doesNotThrow, throws } from "assert";
import humanizeDuration, { humanizer as _humanizer } from "../humanize-duration";

describe("error handling", function () {
  it("throws an error when passed a bad language in the function", function () {
    function humanizingWith(options) {
      return () => {
        humanizeDuration(10000, options);
      };
    }

    throws(humanizingWith({ language: "EN" }), Error);
    throws(humanizingWith({ language: "bad language" }), Error);
    throws(humanizingWith({ language: "" }), Error);
    throws(humanizingWith({ language: null }), Error);
    throws(
      humanizingWith({ language: "bad language", fallback: null }),
      Error
    );
  });

  it("throws an error when passed a bad language in a humanizer", function () {
    const humanizer = _humanizer({
      language: "bad language",
    });

    function humanizing(options) {
      return () => {
        humanizer(10000, options);
      };
    }

    throws(humanizing(), Error);
    throws(humanizing({ language: "EN" }), Error);
    throws(humanizing({ language: "bad language" }), Error);
    throws(humanizing({ language: "" }), Error);
    throws(humanizing({ language: null }), Error);
    doesNotThrow(humanizing({ language: "es" }), Error);
    throws(humanizing({ language: ["es", "en"] }), Error);
  });

  it("should throw if fallbacks configuration is invalid", function () {
    function humanizingWith(options) {
      return () => {
        humanizeDuration(10000, options);
      };
    }
    throws(humanizingWith({ language: "es", fallbacks: [] }), Error);
    throws(
      humanizingWith({ language: "es", fallbacks: undefined }),
      Error
    );
    throws(humanizingWith({ language: "es", fallbacks: null }), Error);
    throws(humanizingWith({ language: "es", fallbacks: "en" }), Error);
  });
});
