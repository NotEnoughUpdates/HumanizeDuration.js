import { strictEqual } from "assert";
import { parse as parseCsv } from "csv-parse";
import { readFile } from "fs";
import { resolve } from "path";
import humanizeDuration, { getSupportedLanguages } from "../humanize-duration";

describe("legacy Greek support", function () {
  // See https://github.com/EvanHahn/HumanizeDuration.js/issues/143
  // for more here.

  it('aliases "gr" to "el"', function (done) {
    const greekPath = resolve(__dirname, "definitions", "el.csv");

    readFile(greekPath, { encoding: "utf8" }, (err, data) => {
      if (err) {
        return done(err);
      }

      parseCsv(data, { delimiter: "$" }, (err, rows) => {
        if (err) {
          return done(err);
        }

        rows.forEach((row) => {
          const ms = parseFloat(row[0]);

          const humanizedGr = humanizeDuration(ms, { language: "gr" });
          const humanizedEl = humanizeDuration(ms, { language: "el" });
          strictEqual(humanizedGr, humanizedEl);
        });

        done();
      });
    });
  });

  it('does not include "gr" in getSupportedLanguages', function () {
    const supportedLanguages = getSupportedLanguages();
    strictEqual(supportedLanguages.indexOf("gr"), -1);
  });
});
