// You can create a humanizer, which returns a function with default

import { LanguageCode, LanguageOptions, LANGUAGES } from "./languages.js";

// parameters.
export function humanizer(passedOptions?: HumanizerOptions) {
  const result = (ms: number, humanizerOptions?: HumanizerOptions) => {
    const options = Object.assign({}, result, humanizerOptions || {});
    return doHumanization(ms, options);
  };

  return Object.assign(
    result,
    {
      language: "en",
      spacer: " ",
      conjunction: "",
      serialComma: true,
      units: ["y", "mo", "w", "d", "h", "m", "s"],
      languages: {},
      round: false,
      unitMeasures: {
        y: 31557600000,
        mo: 2629800000,
        w: 604800000,
        d: 86400000,
        h: 3600000,
        m: 60000,
        s: 1000,
        ms: 1
      }
    },
    passedOptions
  );
}

// The main function is just a wrapper around a default humanizer.
export const humanizeDuration = humanizer({});
export default humanizeDuration;

// Build dictionary from options
function getDictionary<L extends LanguageCode>(
  options: HumanizerOptions
): UnitTranslationOptions {
  let languagesFromOptions = [options.language];

  if ("fallbacks" in options) {
    if (Array.isArray(options.fallbacks) && options.fallbacks.length) {
      languagesFromOptions = languagesFromOptions.concat(options.fallbacks);
    } else {
      throw new Error("fallbacks must be an array with at least one element");
    }
  }

  for (let i = 0; i < languagesFromOptions.length; i++) {
    const languageToTry = languagesFromOptions[i];
    if (languageToTry in options.languages) {
      return options.languages[languageToTry];
    } else if (languageToTry in LANGUAGES) {
      return LANGUAGES[languageToTry];
    }
  }

  throw new Error("No language found.");
}

// doHumanization does the bulk of the work.
function doHumanization(ms: number, options: OptionsWithDefaults) {
  let i, len, piece;

  // Make sure we have a positive number.
  // Has the nice sideffect of turning Number objects into primitives.
  ms = Math.abs(ms);

  const dictionary = getDictionary(options);
  const pieces = [];

  // Start at the top and keep removing units, bit by bit.
  let unitName, unitMS, unitCount;
  for (i = 0, len = options.units.length; i < len; i++) {
    unitName = options.units[i];
    unitMS = options.unitMeasures[unitName];

    // What's the number of full units we can fit?
    if (i + 1 === len) {
      if ("maxDecimalPoints" in options) {
        // We need to use this expValue to avoid rounding functionality of toFixed call
        const expValue = Math.pow(10, options.maxDecimalPoints);
        const unitCountFloat = ms / unitMS;
        unitCount = parseFloat(
          (Math.floor(expValue * unitCountFloat) / expValue).toFixed(
            options.maxDecimalPoints
          )
        );
      } else {
        unitCount = ms / unitMS;
      }
    } else {
      unitCount = Math.floor(ms / unitMS);
    }

    // Add the string.
    pieces.push({
      unitCount: unitCount,
      unitName: unitName
    });

    // Remove what we just figured out.
    ms -= unitCount * unitMS;
  }

  let firstOccupiedUnitIndex = 0;
  for (i = 0; i < pieces.length; i++) {
    if (pieces[i].unitCount) {
      firstOccupiedUnitIndex = i;
      break;
    }
  }

  if (options.round) {
    let ratioToLargerUnit, previousPiece;
    for (i = pieces.length - 1; i >= 0; i--) {
      piece = pieces[i];
      piece.unitCount = Math.round(piece.unitCount);

      if (i === 0) {
        break;
      }

      previousPiece = pieces[i - 1];

      ratioToLargerUnit =
        options.unitMeasures[previousPiece.unitName] /
        options.unitMeasures[piece.unitName];
      if (
        piece.unitCount % ratioToLargerUnit === 0 ||
        (options.largest && options.largest - 1 < i - firstOccupiedUnitIndex)
      ) {
        previousPiece.unitCount += piece.unitCount / ratioToLargerUnit;
        piece.unitCount = 0;
      }
    }
  }

  const result = [];
  for (i = 0, pieces.length; i < len; i++) {
    piece = pieces[i];
    if (piece.unitCount) {
      result.push(render(piece.unitCount, piece.unitName, dictionary, options));
    }

    if (result.length === options.largest) {
      break;
    }
  }

  if (result.length) {
    let delimiter;
    if ("delimiter" in options) {
      delimiter = options.delimiter;
    } else if ("delimiter" in dictionary) {
      delimiter = dictionary.delimiter;
    } else {
      delimiter = ", ";
    }

    if (!options.conjunction || result.length === 1) {
      return result.join(delimiter);
    } else if (result.length === 2) {
      return result.join(options.conjunction);
    } else if (result.length > 2) {
      return `${result.slice(0, -1).join(delimiter)}${
        options.serialComma ? "," : ""
      }${options.conjunction}${result.slice(-1)}`;
    }
  } else {
    return render(
      0,
      options.units[options.units.length - 1],
      dictionary,
      options
    );
  }
}

/** @internal */
function render(
  count: number,
  type: keyof LanguageOptions,
  dictionary: UnitTranslationOptions | LanguageOptions,
  options: HumanizerOptions
) {
  let decimal;
  if ("decimal" in options) {
    decimal = options.decimal;
  } else if ("decimal" in dictionary) {
    decimal = dictionary.decimal;
  } else {
    decimal = ".";
  }

  let countStr;
  if (typeof dictionary._formatCount === "function") {
    countStr = dictionary._formatCount(count, decimal);
  } else {
    countStr = count.toString().replace(".", decimal);
  }

  const dictionaryValue = dictionary[type];
  let word;
  if (typeof dictionaryValue === "function") {
    word = dictionaryValue(count);
  } else {
    word = dictionaryValue;
  }

  if (dictionary._numberFirst) {
    return word + options.spacer + countStr;
  }

  return countStr + options.spacer + word;
}

/**
 * This function won't return any new languages you define; it will only return the defaults supported by the library.
 */
export function getSupportedLanguages(): SupportedLanguage[] {
  const result: SupportedLanguage[] = [];
  for (const language in LANGUAGES) {
    if (language in LANGUAGES) {
      result.push(language as SupportedLanguage);
    }
  }
  return result;
}

export type SupportedLanguage = LanguageCode;
export type Unit = "y" | "mo" | "w" | "d" | "h" | "m" | "s" | "ms";
export type UnitMeasuresOptions = {
  [unit in Unit]: number | undefined;
};
export type UnitTranslationOptions = Partial<LanguageOptions>;

export interface Options {
  /**
   * Language for unit display (accepts an ISO 639-1 code from one of the supported languages).
   * @default 'en'
   */
  language?: string | undefined;

  /**
   * Fallback languages if the provided language cannot be found (accepts an ISO 639-1 code from one of the supported languages). It works from left to right.
   */
  fallbacks?: string[] | undefined;

  /**
   * String to display between the previous unit and the next value.
   * @default ','
   */
  delimiter?: string | undefined;

  /**
   * String to display between each value and unit.
   * @default " "
   */
  spacer?: string | undefined;

  /**
   * Number representing the maximum number of units to display for the duration.
   */
  largest?: number | undefined;

  /**
   * Array of strings to define which units are used to display the duration (if needed).
   */
  units?: Unit[] | undefined;

  /**
   * Boolean value. Use true to round the smallest unit displayed (can be combined with largest and units).
   * @default false
   */
  round?: boolean | undefined;

  /**
   * String to substitute for the decimal point in a decimal fraction.
   */
  decimal?: string | undefined;

  /**
   * String to include before the final unit. You can also set serialComma to false to eliminate the final comma.
   * @default ""
   */
  conjunction?: string | undefined;

  /**
   * @default true
   */
  serialComma?: boolean | undefined;

  /**
   * Number that defines a maximal decimal points for float values.
   */
  maxDecimalPoints?: number | undefined;

  /**
   * Customize the value used to calculate each unit of time.
   */
  unitMeasures?: UnitMeasuresOptions | undefined;
}

type OptionsWithDefaults = Options &
  Required<
    Pick<
      Options,
      | "language"
      | "spacer"
      | "conjunction"
      | "serialComma"
      | "units"
      // | "languages"
      | "round"
      | "unitMeasures"
    >
  >;

export interface HumanizerOptions extends Options {
  languages?: Record<string, UnitTranslationOptions> | undefined;
}
