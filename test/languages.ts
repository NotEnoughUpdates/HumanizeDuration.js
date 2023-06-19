import assert, { strictEqual } from "assert";
import { parse as parseCsv } from "csv-parse";
import { createReadStream, readdir as _readdir } from "fs";
import { basename, extname, join, resolve } from "path";
import { promisify } from "util";
import humanizeDuration, { humanizer } from "../humanize-duration";

const readdir = promisify(_readdir);

function options(language) {
  return {
    language,
    delimiter: "+",
    units: ["y", "mo", "w", "d", "h", "m", "s", "ms"],
  };
}

describe("localized humanization", function () {
  before(async function () {
    const definitionsPath = resolve(__dirname, "definitions");
    const definitionFilePaths = (await readdir(definitionsPath))
      .filter((f) => extname(f) === ".csv")
      .map((f) => join(definitionsPath, f));
    this.languages = new Map(
      await Promise.all(
        definitionFilePaths.map(async (filePath) => {
          const language = basename(filePath, ".csv");

          const parser = createReadStream(filePath)
            .pipe(parseCsv({ delimiter: "$" }));
          const pairs = [];
          for await (const [msString, expectedResult] of parser) {
            pairs.push([parseFloat(msString), expectedResult]);
          }

          return [language, pairs];
        })
      )
    );

    assert(this.languages.has("en"), "Definition smoke test failed");
    assert(this.languages.has("es"), "Definition smoke test failed");
  });

  it("humanizes all languages correctly with the top-level function", function () {
    for (const [language, pairs] of this.languages) {
      for (const [ms, expectedResult] of pairs) {
        strictEqual(
          humanizeDuration(ms, options(language)),
          expectedResult,
          `${language} localization error for ${ms} milliseconds`
        );
      }
    }
  });

  it("humanizes all languages correctly with a humanizer", function () {
    for (const [language, pairs] of this.languages) {
      const h = humanizer(options(language));
      for (const [ms, expectedResult] of pairs) {
        strictEqual(
          h(ms),
          expectedResult,
          `${language} localization error ${ms} milliseconds`
        );
      }
    }
  });
});
