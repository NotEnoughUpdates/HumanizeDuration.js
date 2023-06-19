import { deepStrictEqual, notStrictEqual } from "assert";
import { readdir } from "fs";
import { basename, extname, resolve } from "path";
import { getSupportedLanguages } from "..";

describe("getSupportedLanguages", function () {
  it("lists all supported languages", function (done) {
    const definitionsPath = resolve(__dirname, "definitions");

    readdir(definitionsPath, (err, files) => {
      if (err) {
        return done(err);
      }

      const languages = files
        .filter((file) => extname(file) === ".csv")
        .map((file) => basename(file, ".csv"));

      deepStrictEqual(languages.sort(), getSupportedLanguages().sort());

      done();
    });
  });

  it("returns a different array each time", function () {
    notStrictEqual(getSupportedLanguages(), getSupportedLanguages());
  });
});
