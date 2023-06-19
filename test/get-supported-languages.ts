import { deepStrictEqual, notStrictEqual } from "node:assert";
import { readdir } from "node:fs";
import { basename, dirname, extname, resolve } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { getSupportedLanguages } from "../src/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("getSupportedLanguages", () => {
  it("lists all supported languages", (_, done) => {
    const definitionsPath = resolve(__dirname, "../../test/definitions");

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

  it("returns a different array each time", () => {
    notStrictEqual(getSupportedLanguages(), getSupportedLanguages());
  });
});
