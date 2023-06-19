import { parse as parseCsv } from "csv-parse";
import assert, { strictEqual } from "node:assert";
import { readdir as _readdir, createReadStream } from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";
import { before, describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import humanizeDuration, { HumanizerOptions, humanizer } from "../src/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const readdir = promisify(_readdir);

function options(language: string) {
  return {
    language,
    delimiter: "+",
    units: ["y", "mo", "w", "d", "h", "m", "s", "ms"]
  } satisfies HumanizerOptions;
}

describe("localized humanization", () => {
  let languages: Map<string, [number, string][]>;

  before(async () => {
    const definitionsPath = resolve(__dirname, "../../test/definitions");
    const definitionFilePaths = (await readdir(definitionsPath))
      .filter((f) => extname(f) === ".csv")
      .map((f) => join(definitionsPath, f));
    languages = new Map(
      await Promise.all(
        definitionFilePaths.map(
          async (filePath): Promise<readonly [string, [number, string][]]> => {
            const language = basename(filePath, ".csv");

            const parser = createReadStream(filePath).pipe(
              parseCsv({ delimiter: "$" })
            );
            const pairs: [number, string][] = [];
            for await (const [msString, expectedResult] of parser) {
              pairs.push([parseFloat(msString), expectedResult]);
            }

            return [language, pairs];
          }
        )
      )
    );

    assert(languages.has("en"), "Definition smoke test failed");
    assert(languages.has("es"), "Definition smoke test failed");
  });

  it("humanizes all languages correctly with the top-level function", () => {
    for (const [language, pairs] of languages) {
      for (const [ms, expectedResult] of pairs) {
        strictEqual(
          humanizeDuration(ms, options(language)),
          expectedResult,
          `${language} localization error for ${ms} milliseconds`
        );
      }
    }
  });

  it("humanizes all languages correctly with a humanizer", () => {
    for (const [language, pairs] of languages) {
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
