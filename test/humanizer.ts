import ms from "ms";
import { strictEqual, throws } from "node:assert";
import { describe, it } from "node:test";
import { humanizer } from "../src/index.js";

describe("humanizer", () => {
  it("humanizes English when passed no arguments", () => {
    const h = humanizer();

    strictEqual(h(1000), "1 second");
  });

  it("humanizes English when passed an empty object", () => {
    const h = humanizer({});

    strictEqual(h(1000), "1 second");
  });

  it("can change the delimiter", () => {
    const h = humanizer({ delimiter: "+" });

    strictEqual(h(0), "0 seconds");
    strictEqual(h(1000), "1 second");
    strictEqual(h(363000), "6 minutes+3 seconds");
  });

  it("can change the spacer", () => {
    const h = humanizer({ spacer: " whole " });

    strictEqual(h(0), "0 whole seconds");
    strictEqual(h(1000), "1 whole second");
    strictEqual(h(260040000), "3 whole days, 14 whole minutes");
  });

  it("can use a conjunction", () => {
    const h = humanizer({ conjunction: " and " });

    strictEqual(h(0), "0 seconds");
    strictEqual(h(1000), "1 second");
    strictEqual(h(260040000), "3 days and 14 minutes");
    strictEqual(h(10874000), "3 hours, 1 minute, and 14 seconds");
  });

  it("can use a conjunction without a serial comma", () => {
    const h = humanizer({
      conjunction: " & ",
      serialComma: false
    });

    strictEqual(h(1000), "1 second");
    strictEqual(h(260040000), "3 days & 14 minutes");
    strictEqual(h(10874000), "3 hours, 1 minute & 14 seconds");
  });

  it("can change the units", () => {
    const h = humanizer({ units: ["d"] });

    strictEqual(h(0), "0 days");
    strictEqual(h(ms("6h")), "0.25 days");
    strictEqual(h(ms("7d")), "7 days");
  });

  it("can overwrite the unit measures in the initializer", () => {
    const h = humanizer({
      unitMeasures: {
        y: 10512000000,
        mo: 864000000,
        w: 144000000,
        d: 28800000,
        h: 3600000,
        m: 60000,
        s: 1000,
        ms: 1
      }
    });

    strictEqual(h(1000), "1 second");
    strictEqual(h(3600000), "1 hour");
    strictEqual(h(28800000), "1 day");
    strictEqual(h(144000000), "1 week");
  });

  it("can change the decimal", () => {
    const h = humanizer({
      units: ["s"],
      decimal: "what"
    });

    strictEqual(h(1234), "1what234 seconds");
    strictEqual(
      h(1234, {
        decimal: "!!"
      }),
      "1!!234 seconds"
    );
  });

  it("can do simple rounding", () => {
    const h = humanizer({ round: true });

    strictEqual(h(0), "0 seconds");
    strictEqual(h(499), "0 seconds");
    strictEqual(h(500), "1 second");
    strictEqual(h(1000), "1 second");
    strictEqual(h(1499), "1 second");
    strictEqual(h(1500), "2 seconds");
    strictEqual(h(1500), "2 seconds");
    strictEqual(h(121499), "2 minutes, 1 second");
    strictEqual(h(121500), "2 minutes, 2 seconds");
  });

  it('can do rounding with the "units" option', () => {
    const h = humanizer({ round: true });

    strictEqual(h(86364000, { units: ["y", "mo", "w", "d", "h"] }), "1 day");
    strictEqual(
      h(1209564000, { units: ["y", "mo", "w", "d", "h"] }),
      "2 weeks"
    );
    strictEqual(h(3692131200000, { units: ["y", "mo"] }), "117 years");
    strictEqual(
      h(3692131200001, { units: ["y", "mo", "w", "d", "h", "m"] }),
      "116 years, 11 months, 4 weeks, 1 day, 4 hours, 30 minutes"
    );
  });

  it('can do rounding with the "largest" option', () => {
    const h = humanizer({ round: true });

    strictEqual(h(3692131200000, { largest: 1 }), "117 years");
    strictEqual(h(3692131200000, { largest: 2 }), "117 years");
    strictEqual(
      h(3692131200001, { largest: 100 }),
      "116 years, 11 months, 4 weeks, 1 day, 4 hours, 30 minutes"
    );
    strictEqual(h(2838550, { largest: 3 }), "47 minutes, 19 seconds");
  });

  it('can do rounding with the "maxDecimalPoints" option', () => {
    var h = humanizer({ maxDecimalPoints: 2 });

    strictEqual(h(8123.456789), "8.12 seconds");
    h.maxDecimalPoints = 3;
    strictEqual(h(8123.456789), "8.123 seconds");
    strictEqual(h(8000), "8 seconds");

    h.maxDecimalPoints = 6;
    strictEqual(h(8123.45), "8.12345 seconds");

    h.maxDecimalPoints = 6;
    strictEqual(h(8000), "8 seconds");

    h.maxDecimalPoints = 0;
    strictEqual(h(7123.456), "7 seconds");
    h.maxDecimalPoints = 2;
    strictEqual(h(7999), "7.99 seconds");
    h.maxDecimalPoints = 3;
    strictEqual(h(7999), "7.999 seconds");
  });

  it("can ask for the largest units", () => {
    const h = humanizer({ largest: 2 });

    strictEqual(h(0), "0 seconds");
    strictEqual(h(1000), "1 second");
    strictEqual(h(2000), "2 seconds");
    strictEqual(h(540360012), "6 days, 6 hours");
    strictEqual(h(540360012), "6 days, 6 hours");
    strictEqual(h(540360012, { largest: 3 }), "6 days, 6 hours, 6 minutes");
    strictEqual(
      h(540360012, { largest: 100 }),
      "6 days, 6 hours, 6 minutes, 0.012 seconds"
    );
  });

  it("has properties which can be modified", () => {
    const h = humanizer();

    strictEqual(h(363000), "6 minutes, 3 seconds");

    h.delimiter = "+";
    strictEqual(h(363000), "6 minutes+3 seconds");

    h.language = "es";
    strictEqual(h(363000), "6 minutos+3 segundos");

    h.units = ["m"];
    strictEqual(h(363000), "6,05 minutos");
  });

  it("is a named function", () => {
    strictEqual(humanizer().name, "humanizer");
  });

  it("can add a new language", () => {
    const h = humanizer({ language: "cool language" });
    h.languages["cool language"] = {
      y: () => "y",
      mo: () => "mo",
      w: () => "w",
      d: () => "d",
      h: () => "h",
      m: () => "m",
      s: () => "s",
      ms: () => "ms",
      delimiter: "--"
    };

    strictEqual(h(1000), "1 s");
    strictEqual(h(61000), "1 m--1 s");

    strictEqual(h(61000, { delimiter: "&&" }), "1 m&&1 s");

    strictEqual(
      h(1000, {
        language: "es"
      }),
      "1 segundo"
    );

    const anotherH = humanizer({
      language: "cool language"
    });
    throws(() => {
      anotherH(1000);
    }, Error);
  });

  it("can overwrite an existing language", () => {
    const h = humanizer({ language: "en" });

    strictEqual(h(1000), "1 second");

    h.languages.en = {
      y: () => "y",
      mo: () => "mo",
      w: () => "w",
      d: () => "d",
      h: () => "h",
      m: () => "m",
      s: () => "s",
      ms: () => "ms"
    };

    strictEqual(h(1000), "1 s");
    strictEqual(h(15600000), "4 h, 20 m");

    const anotherH = humanizer({ language: "en" });

    strictEqual(anotherH(1000), "1 second");
  });

  it("can overwrite the languages property in the initializer", () => {
    const h = humanizer({
      languages: {
        en: {
          y: () => "y",
          mo: () => "mo",
          w: () => "w",
          d: () => "d",
          h: () => "h",
          m: () => "m",
          s: () => "s",
          ms: () => "ms",
          decimal: "!"
        }
      }
    });

    strictEqual(h(1000), "1 s");
    strictEqual(h(15600000), "4 h, 20 m");
    strictEqual(h(1000, { language: "es" }), "1 segundo");
    strictEqual(h(71750), "1 m, 11!75 s");
  });

  it('uses "." as a fallback for a missing decimal', () => {
    const h = humanizer({
      languages: {
        en: {
          y: () => "y",
          mo: () => "mo",
          w: () => "w",
          d: () => "d",
          h: () => "h",
          m: () => "m",
          s: () => "s",
          ms: () => "ms"
        }
      }
    });

    strictEqual(h(71750), "1 m, 11.75 s");
    strictEqual(h(71750, { decimal: "!" }), "1 m, 11!75 s");
  });

  it("accepts fallback languages", () => {
    const h = humanizer();

    strictEqual(h(10000, { language: "es", fallbacks: ["en"] }), "10 segundos");
    strictEqual(
      h(10000, { language: "BAD", fallbacks: ["BAD", "es"] }),
      "10 segundos"
    );
    strictEqual(
      h(10000, { language: "BAD", fallbacks: ["es", "fr"] }),
      "10 segundos"
    );
  });
});
