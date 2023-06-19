import { Unit } from "./index.js";

export const LANGUAGES: Languages = {
  af: {
    y: "jaar",
    mo: (c) => "maand" + (c === 1 ? "" : "e"),
    w: (c) => (c === 1 ? "week" : "weke"),
    d: (c) => (c === 1 ? "dag" : "dae"),
    h: (c) => (c === 1 ? "uur" : "ure"),
    m: (c) => (c === 1 ? "minuut" : "minute"),
    s: (c) => `sekonde${c === 1 ? "" : "s"}`,
    ms: (c) => `millisekonde${c === 1 ? "" : "s"}`,
    decimal: ","
  },
  ar: {
    y: (c) => ["سنة", "سنتان", "سنوات"][getArabicForm(c)],
    mo: (c) => ["شهر", "شهران", "أشهر"][getArabicForm(c)],
    w: (c) => ["أسبوع", "أسبوعين", "أسابيع"][getArabicForm(c)],
    d: (c) => ["يوم", "يومين", "أيام"][getArabicForm(c)],
    h: (c) => ["ساعة", "ساعتين", "ساعات"][getArabicForm(c)],
    m: (c) => ["دقيقة", "دقيقتان", "دقائق"][getArabicForm(c)],
    s: (c) => ["ثانية", "ثانيتان", "ثواني"][getArabicForm(c)],
    ms: (c) =>
      ["جزء من الثانية", "جزآن من الثانية", "أجزاء من الثانية"][
        getArabicForm(c)
      ],
    decimal: ",",
    delimiter: " و ",
    _formatCount: (count, decimal) => {
      const ARABIC_DIGITS = ["۰", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

      const replacements = Object.assign(ARABIC_DIGITS, { ".": decimal });
      const characters = count.toString().split("");
      for (let i = 0; i < characters.length; i++) {
        const character = characters[i];
        if (character in replacements) {
          characters[i] = replacements[<any>character];
        }
      }
      return characters.join("");
    }
  },
  bg: {
    y: (c) => ["години", "година", "години"][getSlavicForm(c)],
    mo: (c) => ["месеца", "месец", "месеца"][getSlavicForm(c)],
    w: (c) => ["седмици", "седмица", "седмици"][getSlavicForm(c)],
    d: (c) => ["дни", "ден", "дни"][getSlavicForm(c)],
    h: (c) => ["часа", "час", "часа"][getSlavicForm(c)],
    m: (c) => ["минути", "минута", "минути"][getSlavicForm(c)],
    s: (c) => ["секунди", "секунда", "секунди"][getSlavicForm(c)],
    ms: (c) => ["милисекунди", "милисекунда", "милисекунди"][getSlavicForm(c)],
    decimal: ","
  },
  bn: {
    y: "বছর",
    mo: "মাস",
    w: "সপ্তাহ",
    d: "দিন",
    h: "ঘন্টা",
    m: "মিনিট",
    s: "সেকেন্ড",
    ms: "মিলিসেকেন্ড"
  },
  ca: {
    y: (c) => `any${c === 1 ? "" : "s"}`,
    mo: (c) => `mes${c === 1 ? "" : "os"}`,
    w: (c) => `setman${c === 1 ? "a" : "es"}`,
    d: (c) => `di${c === 1 ? "a" : "es"}`,
    h: (c) => `hor${c === 1 ? "a" : "es"}`,
    m: (c) => `minut${c === 1 ? "" : "s"}`,
    s: (c) => `segon${c === 1 ? "" : "s"}`,
    ms: (c) => `milisegon${c === 1 ? "" : "s"}`,
    decimal: ","
  },
  cs: {
    y: (c) => ["rok", "roku", "roky", "let"][getCzechOrSlovakForm(c)],
    mo: (c) => ["měsíc", "měsíce", "měsíce", "měsíců"][getCzechOrSlovakForm(c)],
    w: (c) => ["týden", "týdne", "týdny", "týdnů"][getCzechOrSlovakForm(c)],
    d: (c) => ["den", "dne", "dny", "dní"][getCzechOrSlovakForm(c)],
    h: (c) => ["hodina", "hodiny", "hodiny", "hodin"][getCzechOrSlovakForm(c)],
    m: (c) => ["minuta", "minuty", "minuty", "minut"][getCzechOrSlovakForm(c)],
    s: (c) =>
      ["sekunda", "sekundy", "sekundy", "sekund"][getCzechOrSlovakForm(c)],
    ms: (c) =>
      ["milisekunda", "milisekundy", "milisekundy", "milisekund"][
        getCzechOrSlovakForm(c)
      ],
    decimal: ","
  },
  cy: {
    y: "flwyddyn",
    mo: "mis",
    w: "wythnos",
    d: "diwrnod",
    h: "awr",
    m: "munud",
    s: "eiliad",
    ms: "milieiliad"
  },
  da: {
    y: "år",
    mo: (c) => `måned${c === 1 ? "" : "er"}`,
    w: (c) => `uge${c === 1 ? "" : "r"}`,
    d: (c) => `dag${c === 1 ? "" : "e"}`,
    h: (c) => `time${c === 1 ? "" : "r"}`,
    m: (c) => `minut${c === 1 ? "" : "ter"}`,
    s: (c) => `sekund${c === 1 ? "" : "er"}`,
    ms: (c) => `millisekund${c === 1 ? "" : "er"}`,
    decimal: ","
  },
  de: {
    y: (c) => `Jahr${c === 1 ? "" : "e"}`,
    mo: (c) => `Monat${c === 1 ? "" : "e"}`,
    w: (c) => `Woche${c === 1 ? "" : "n"}`,
    d: (c) => `Tag${c === 1 ? "" : "e"}`,
    h: (c) => `Stunde${c === 1 ? "" : "n"}`,
    m: (c) => `Minute${c === 1 ? "" : "n"}`,
    s: (c) => `Sekunde${c === 1 ? "" : "n"}`,
    ms: (c) => `Millisekunde${c === 1 ? "" : "n"}`,
    decimal: ","
  },
  el: {
    y: (c) => (c === 1 ? "χρόνος" : "χρόνια"),
    mo: (c) => (c === 1 ? "μήνας" : "μήνες"),
    w: (c) => (c === 1 ? "εβδομάδα" : "εβδομάδες"),
    d: (c) => (c === 1 ? "μέρα" : "μέρες"),
    h: (c) => (c === 1 ? "ώρα" : "ώρες"),
    m: (c) => (c === 1 ? "λεπτό" : "λεπτά"),
    s: (c) => (c === 1 ? "δευτερόλεπτο" : "δευτερόλεπτα"),
    ms: (c) => (c === 1 ? "χιλιοστό" : "χιλιοστά") + " του δευτερολέπτου",
    decimal: ","
  },
  en: {
    y: (c) => `year${c === 1 ? "" : "s"}`,
    mo: (c) => `month${c === 1 ? "" : "s"}`,
    w: (c) => `week${c === 1 ? "" : "s"}`,
    d: (c) => `day${c === 1 ? "" : "s"}`,
    h: (c) => `hour${c === 1 ? "" : "s"}`,
    m: (c) => `minute${c === 1 ? "" : "s"}`,
    s: (c) => `second${c === 1 ? "" : "s"}`,
    ms: (c) => `millisecond${c === 1 ? "" : "s"}`,
    decimal: "."
  },
  eo: {
    y: (c) => `jaro${c === 1 ? "" : "j"}`,
    mo: (c) => `monato${c === 1 ? "" : "j"}`,
    w: (c) => `semajno${c === 1 ? "" : "j"}`,
    d: (c) => `tago${c === 1 ? "" : "j"}`,
    h: (c) => `horo${c === 1 ? "" : "j"}`,
    m: (c) => `minuto${c === 1 ? "" : "j"}`,
    s: (c) => `sekundo${c === 1 ? "" : "j"}`,
    ms: (c) => `milisekundo${c === 1 ? "" : "j"}`,
    decimal: ","
  },
  es: {
    y: (c) => "año" + (c === 1 ? "" : "s"),
    mo: (c) => "mes" + (c === 1 ? "" : "es"),
    w: (c) => "semana" + (c === 1 ? "" : "s"),
    d: (c) => "día" + (c === 1 ? "" : "s"),
    h: (c) => "hora" + (c === 1 ? "" : "s"),
    m: (c) => "minuto" + (c === 1 ? "" : "s"),
    s: (c) => "segundo" + (c === 1 ? "" : "s"),
    ms: (c) => "milisegundo" + (c === 1 ? "" : "s"),
    decimal: ","
  },
  et: {
    y: (c) => "aasta" + (c === 1 ? "" : "t"),
    mo: (c) => "kuu" + (c === 1 ? "" : "d"),
    w: (c) => "nädal" + (c === 1 ? "" : "at"),
    d: (c) => "päev" + (c === 1 ? "" : "a"),
    h: (c) => "tund" + (c === 1 ? "" : "i"),
    m: (c) => "minut" + (c === 1 ? "" : "it"),
    s: (c) => "sekund" + (c === 1 ? "" : "it"),
    ms: (c) => "millisekund" + (c === 1 ? "" : "it"),
    decimal: ","
  },
  eu: {
    y: "urte",
    mo: "hilabete",
    w: "aste",
    d: "egun",
    h: "ordu",
    m: "minutu",
    s: "segundo",
    ms: "milisegundo",
    decimal: ","
  },
  fa: {
    y: "سال",
    mo: "ماه",
    w: "هفته",
    d: "روز",
    h: "ساعت",
    m: "دقیقه",
    s: "ثانیه",
    ms: "میلی ثانیه",
    decimal: "."
  },
  fi: {
    y: (c) => (c === 1 ? "vuosi" : "vuotta"),
    mo: (c) => (c === 1 ? "kuukausi" : "kuukautta"),
    w: (c) => `viikko${c === 1 ? "" : "a"}`,
    d: (c) => `päivä${c === 1 ? "" : "ä"}`,
    h: (c) => `tunti${c === 1 ? "" : "a"}`,
    m: (c) => `minuutti${c === 1 ? "" : "a"}`,
    s: (c) => `sekunti${c === 1 ? "" : "a"}`,
    ms: (c) => `millisekunti${c === 1 ? "" : "a"}`,
    decimal: ","
  },
  fo: {
    y: "ár",
    mo: (c) => (c === 1 ? "mánaður" : "mánaðir"),
    w: (c) => (c === 1 ? "vika" : "vikur"),
    d: (c) => (c === 1 ? "dagur" : "dagar"),
    h: (c) => (c === 1 ? "tími" : "tímar"),
    m: (c) => (c === 1 ? "minuttur" : "minuttir"),
    s: "sekund",
    ms: "millisekund",
    decimal: ","
  },
  fr: {
    y: (c) => `an${c >= 2 ? "s" : ""}`,
    mo: "mois",
    w: (c) => `semaine${c >= 2 ? "s" : ""}`,
    d: (c) => `jour${c >= 2 ? "s" : ""}`,
    h: (c) => `heure${c >= 2 ? "s" : ""}`,
    m: (c) => `minute${c >= 2 ? "s" : ""}`,
    s: (c) => `seconde${c >= 2 ? "s" : ""}`,
    ms: (c) => `milliseconde${c >= 2 ? "s" : ""}`,
    decimal: ","
  },
  he: {
    y: (c) => (c === 1 ? "שנה" : "שנים"),
    mo: (c) => (c === 1 ? "חודש" : "חודשים"),
    w: (c) => (c === 1 ? "שבוע" : "שבועות"),
    d: (c) => (c === 1 ? "יום" : "ימים"),
    h: (c) => (c === 1 ? "שעה" : "שעות"),
    m: (c) => (c === 1 ? "דקה" : "דקות"),
    s: (c) => (c === 1 ? "שניה" : "שניות"),
    ms: (c) => (c === 1 ? "מילישנייה" : "מילישניות"),
    decimal: "."
  },
  hr: {
    y: (c) => {
      if (c % 10 === 2 || c % 10 === 3 || c % 10 === 4) {
        return "godine";
      }
      return "godina";
    },
    mo: (c) => {
      if (c === 1) {
        return "mjesec";
      } else if (c === 2 || c === 3 || c === 4) {
        return "mjeseca";
      }
      return "mjeseci";
    },
    w: (c) => {
      if (c % 10 === 1 && c !== 11) {
        return "tjedan";
      }
      return "tjedna";
    },
    d: (c) => (c === 1 ? "dan" : "dana"),
    h: (c) => {
      if (c === 1) {
        return "sat";
      } else if (c === 2 || c === 3 || c === 4) {
        return "sata";
      }
      return "sati";
    },
    m: (c) => {
      const mod10 = c % 10;
      if ((mod10 === 2 || mod10 === 3 || mod10 === 4) && (c < 10 || c > 14)) {
        return "minute";
      }
      return "minuta";
    },
    s: (c) => {
      const mod10 = c % 10;
      if (mod10 === 5 || (Math.floor(c) === c && c >= 10 && c <= 19)) {
        return "sekundi";
      } else if (mod10 === 1) {
        return "sekunda";
      } else if (mod10 === 2 || mod10 === 3 || mod10 === 4) {
        return "sekunde";
      }
      return "sekundi";
    },
    ms: (c) => {
      if (c === 1) {
        return "milisekunda";
      } else if (c % 10 === 2 || c % 10 === 3 || c % 10 === 4) {
        return "milisekunde";
      }
      return "milisekundi";
    },
    decimal: ","
  },
  hi: {
    y: "साल",
    mo: (c) => (c === 1 ? "महीना" : "महीने"),
    w: (c) => (c === 1 ? "हफ़्ता" : "हफ्ते"),
    d: "दिन",
    h: (c) => (c === 1 ? "घंटा" : "घंटे"),
    m: "मिनट",
    s: "सेकंड",
    ms: "मिलीसेकंड",
    decimal: "."
  },
  hu: {
    y: "év",
    mo: "hónap",
    w: "hét",
    d: "nap",
    h: "óra",
    m: "perc",
    s: "másodperc",
    ms: "ezredmásodperc",
    decimal: ","
  },
  id: {
    y: "tahun",
    mo: "bulan",
    w: "minggu",
    d: "hari",
    h: "jam",
    m: "menit",
    s: "detik",
    ms: "milidetik",
    decimal: "."
  },
  is: {
    y: "ár",
    mo: (c) => `mánuð${c === 1 ? "ur" : "ir"}`,
    w: (c) => `vik${c === 1 ? "a" : "ur"}`,
    d: (c) => `dag${c === 1 ? "ur" : "ar"}`,
    h: (c) => `klukkutím${c === 1 ? "i" : "ar"}`,
    m: (c) => `mínút${c === 1 ? "a" : "ur"}`,
    s: (c) => `sekúnd${c === 1 ? "a" : "ur"}`,
    ms: (c) => `millisekúnd${c === 1 ? "a" : "ur"}`,
    decimal: "."
  },
  it: {
    y: (c) => `ann${c === 1 ? "o" : "i"}`,
    mo: (c) => `mes${c === 1 ? "e" : "i"}`,
    w: (c) => `settiman${c === 1 ? "a" : "e"}`,
    d: (c) => `giorn${c === 1 ? "o" : "i"}`,
    h: (c) => `or${c === 1 ? "a" : "e"}`,
    m: (c) => `minut${c === 1 ? "o" : "i"}`,
    s: (c) => `second${c === 1 ? "o" : "i"}`,
    ms: (c) => `millisecond${c === 1 ? "o" : "i"}`,
    decimal: ","
  },
  ja: {
    y: "年",
    mo: "ヶ月",
    w: "週",
    d: "日",
    h: "時間",
    m: "分",
    s: "秒",
    ms: "ミリ秒",
    decimal: "."
  },
  km: {
    y: "ឆ្នាំ",
    mo: "ខែ",
    w: "សប្តាហ៍",
    d: "ថ្ងៃ",
    h: "ម៉ោង",
    m: "នាទី",
    s: "វិនាទី",
    ms: "មិល្លីវិនាទី"
  },
  kn: {
    y: (c) => (c === 1 ? "ವರ್ಷ" : "ವರ್ಷಗಳು"),
    mo: (c) => (c === 1 ? "ತಿಂಗಳು" : "ತಿಂಗಳುಗಳು"),
    w: (c) => (c === 1 ? "ವಾರ" : "ವಾರಗಳು"),
    d: (c) => (c === 1 ? "ದಿನ" : "ದಿನಗಳು"),
    h: (c) => (c === 1 ? "ಗಂಟೆ" : "ಗಂಟೆಗಳು"),
    m: (c) => (c === 1 ? "ನಿಮಿಷ" : "ನಿಮಿಷಗಳು"),
    s: (c) => (c === 1 ? "ಸೆಕೆಂಡ್" : "ಸೆಕೆಂಡುಗಳು"),
    ms: (c) => (c === 1 ? "ಮಿಲಿಸೆಕೆಂಡ್" : "ಮಿಲಿಸೆಕೆಂಡುಗಳು")
  },
  ko: {
    y: "년",
    mo: "개월",
    w: "주일",
    d: "일",
    h: "시간",
    m: "분",
    s: "초",
    ms: "밀리 초",
    decimal: "."
  },
  ku: {
    y: "sal",
    mo: "meh",
    w: "hefte",
    d: "roj",
    h: "seet",
    m: "deqe",
    s: "saniye",
    ms: "mîlîçirk",
    decimal: ","
  },
  lo: {
    y: "ປີ",
    mo: "ເດືອນ",
    w: "ອາທິດ",
    d: "ມື້",
    h: "ຊົ່ວໂມງ",
    m: "ນາທີ",
    s: "ວິນາທີ",
    ms: "ມິນລິວິນາທີ",
    decimal: ","
  },
  lt: {
    y: (c) =>
      c % 10 === 0 || (c % 100 >= 10 && c % 100 <= 20) ? "metų" : "metai",
    mo: (c) => ["mėnuo", "mėnesiai", "mėnesių"][getLithuanianForm(c)],
    w: (c) => ["savaitė", "savaitės", "savaičių"][getLithuanianForm(c)],
    d: (c) => ["diena", "dienos", "dienų"][getLithuanianForm(c)],
    h: (c) => ["valanda", "valandos", "valandų"][getLithuanianForm(c)],
    m: (c) => ["minutė", "minutės", "minučių"][getLithuanianForm(c)],
    s: (c) => ["sekundė", "sekundės", "sekundžių"][getLithuanianForm(c)],
    ms: (c) =>
      ["milisekundė", "milisekundės", "milisekundžių"][getLithuanianForm(c)],
    decimal: ","
  },
  lv: {
    y: (c) => (getLatvianForm(c) ? "gads" : "gadi"),
    mo: (c) => (getLatvianForm(c) ? "mēnesis" : "mēneši"),
    w: (c) => (getLatvianForm(c) ? "nedēļa" : "nedēļas"),
    d: (c) => (getLatvianForm(c) ? "diena" : "dienas"),
    h: (c) => (getLatvianForm(c) ? "stunda" : "stundas"),
    m: (c) => (getLatvianForm(c) ? "minūte" : "minūtes"),
    s: (c) => (getLatvianForm(c) ? "sekunde" : "sekundes"),
    ms: (c) => (getLatvianForm(c) ? "milisekunde" : "milisekundes"),
    decimal: ","
  },
  mk: {
    y: (c) => (c === 1 ? "година" : "години"),
    mo: (c) => (c === 1 ? "месец" : "месеци"),
    w: (c) => (c === 1 ? "недела" : "недели"),
    d: (c) => (c === 1 ? "ден" : "дена"),
    h: (c) => (c === 1 ? "час" : "часа"),
    m: (c) => (c === 1 ? "минута" : "минути"),
    s: (c) => (c === 1 ? "секунда" : "секунди"),
    ms: (c) => (c === 1 ? "милисекунда" : "милисекунди"),
    decimal: ","
  },
  mr: {
    y: (c) => (c === 1 ? "वर्ष" : "वर्षे"),
    mo: (c) => (c === 1 ? "महिना" : "महिने"),
    w: (c) => (c === 1 ? "आठवडा" : "आठवडे"),
    d: "दिवस",
    h: "तास",
    m: (c) => (c === 1 ? "मिनिट" : "मिनिटे"),
    s: "सेकंद",
    ms: "मिलिसेकंद"
  },
  ms: {
    y: "tahun",
    mo: "bulan",
    w: "minggu",
    d: "hari",
    h: "jam",
    m: "minit",
    s: "saat",
    ms: "milisaat",
    decimal: "."
  },
  nl: {
    y: "jaar",
    mo: (c) => (c === 1 ? "maand" : "maanden"),
    w: (c) => (c === 1 ? "week" : "weken"),
    d: (c) => (c === 1 ? "dag" : "dagen"),
    h: "uur",
    m: (c) => (c === 1 ? "minuut" : "minuten"),
    s: (c) => (c === 1 ? "seconde" : "seconden"),
    ms: (c) => (c === 1 ? "milliseconde" : "milliseconden"),
    decimal: ","
  },
  no: {
    y: "år",
    mo: (c) => `måned${c === 1 ? "" : "er"}`,
    w: (c) => `uke${c === 1 ? "" : "r"}`,
    d: (c) => `dag${c === 1 ? "" : "er"}`,
    h: (c) => `time${c === 1 ? "" : "r"}`,
    m: (c) => `minutt${c === 1 ? "" : "er"}`,
    s: (c) => `sekund${c === 1 ? "" : "er"}`,
    ms: (c) => `millisekund${c === 1 ? "" : "er"}`,
    decimal: ","
  },
  pl: {
    y: (c) => ["rok", "roku", "lata", "lat"][getPolishForm(c)],
    mo: (c) =>
      ["miesiąc", "miesiąca", "miesiące", "miesięcy"][getPolishForm(c)],
    w: (c) => ["tydzień", "tygodnia", "tygodnie", "tygodni"][getPolishForm(c)],
    d: (c) => ["dzień", "dnia", "dni", "dni"][getPolishForm(c)],
    h: (c) => ["godzina", "godziny", "godziny", "godzin"][getPolishForm(c)],
    m: (c) => ["minuta", "minuty", "minuty", "minut"][getPolishForm(c)],
    s: (c) => ["sekunda", "sekundy", "sekundy", "sekund"][getPolishForm(c)],
    ms: (c) =>
      ["milisekunda", "milisekundy", "milisekundy", "milisekund"][
        getPolishForm(c)
      ],
    decimal: ","
  },
  pt: {
    y: (c) => "ano" + (c === 1 ? "" : "s"),
    mo: (c) => (c === 1 ? "mês" : "meses"),
    w: (c) => "semana" + (c === 1 ? "" : "s"),
    d: (c) => "dia" + (c === 1 ? "" : "s"),
    h: (c) => "hora" + (c === 1 ? "" : "s"),
    m: (c) => "minuto" + (c === 1 ? "" : "s"),
    s: (c) => "segundo" + (c === 1 ? "" : "s"),
    ms: (c) => "milissegundo" + (c === 1 ? "" : "s"),
    decimal: ","
  },
  ro: {
    y: (c) => (c === 1 ? "an" : "ani"),
    mo: (c) => (c === 1 ? "lună" : "luni"),
    w: (c) => (c === 1 ? "săptămână" : "săptămâni"),
    d: (c) => (c === 1 ? "zi" : "zile"),
    h: (c) => (c === 1 ? "oră" : "ore"),
    m: (c) => (c === 1 ? "minut" : "minute"),
    s: (c) => (c === 1 ? "secundă" : "secunde"),
    ms: (c) => (c === 1 ? "milisecundă" : "milisecunde"),
    decimal: ","
  },
  ru: {
    y: (c) => ["лет", "год", "года"][getSlavicForm(c)],
    mo: (c) => ["месяцев", "месяц", "месяца"][getSlavicForm(c)],
    w: (c) => ["недель", "неделя", "недели"][getSlavicForm(c)],
    d: (c) => ["дней", "день", "дня"][getSlavicForm(c)],
    h: (c) => ["часов", "час", "часа"][getSlavicForm(c)],
    m: (c) => ["минут", "минута", "минуты"][getSlavicForm(c)],
    s: (c) => ["секунд", "секунда", "секунды"][getSlavicForm(c)],
    ms: (c) =>
      ["миллисекунд", "миллисекунда", "миллисекунды"][getSlavicForm(c)],
    decimal: ","
  },
  sq: {
    y: (c) => (c === 1 ? "vit" : "vjet"),
    mo: "muaj",
    w: "javë",
    d: "ditë",
    h: "orë",
    m: (c) => `minut${c === 1 ? "ë" : "a"}`,
    s: (c) => `sekond${c === 1 ? "ë" : "a"}`,
    ms: (c) => `milisekond${c === 1 ? "ë" : "a"}`,
    decimal: ","
  },
  sr: {
    y: (c) => ["години", "година", "године"][getSlavicForm(c)],
    mo: (c) => ["месеци", "месец", "месеца"][getSlavicForm(c)],
    w: (c) => ["недељи", "недеља", "недеље"][getSlavicForm(c)],
    d: (c) => ["дани", "дан", "дана"][getSlavicForm(c)],
    h: (c) => ["сати", "сат", "сата"][getSlavicForm(c)],
    m: (c) => ["минута", "минут", "минута"][getSlavicForm(c)],
    s: (c) => ["секунди", "секунда", "секунде"][getSlavicForm(c)],
    ms: (c) => ["милисекунди", "милисекунда", "милисекунде"][getSlavicForm(c)],
    decimal: ","
  },
  ta: {
    y: (c) => (c === 1 ? "வருடம்" : "ஆண்டுகள்"),
    mo: (c) => (c === 1 ? "மாதம்" : "மாதங்கள்"),
    w: (c) => (c === 1 ? "வாரம்" : "வாரங்கள்"),
    d: (c) => (c === 1 ? "நாள்" : "நாட்கள்"),
    h: (c) => (c === 1 ? "மணி" : "மணிநேரம்"),
    m: (c) => "நிமிட" + (c === 1 ? "ம்" : "ங்கள்"),
    s: (c) => "வினாடி" + (c === 1 ? "" : "கள்"),
    ms: (c) => "மில்லி விநாடி" + (c === 1 ? "" : "கள்")
  },
  te: {
    y: (c) => "సంవత్స" + (c === 1 ? "రం" : "రాల"),
    mo: (c) => "నెల" + (c === 1 ? "" : "ల"),
    w: (c) => (c === 1 ? "వారం" : "వారాలు"),
    d: (c) => "రోజు" + (c === 1 ? "" : "లు"),
    h: (c) => "గంట" + (c === 1 ? "" : "లు"),
    m: (c) => (c === 1 ? "నిమిషం" : "నిమిషాలు"),
    s: (c) => (c === 1 ? "సెకను" : "సెకన్లు"),
    ms: (c) => (c === 1 ? "మిల్లీసెకన్" : "మిల్లీసెకన్లు")
  },
  uk: {
    y: (c) => ["років", "рік", "роки"][getSlavicForm(c)],
    mo: (c) => ["місяців", "місяць", "місяці"][getSlavicForm(c)],
    w: (c) => ["тижнів", "тиждень", "тижні"][getSlavicForm(c)],
    d: (c) => ["днів", "день", "дні"][getSlavicForm(c)],
    h: (c) => ["годин", "година", "години"][getSlavicForm(c)],
    m: (c) => ["хвилин", "хвилина", "хвилини"][getSlavicForm(c)],
    s: (c) => ["секунд", "секунда", "секунди"][getSlavicForm(c)],
    ms: (c) => ["мілісекунд", "мілісекунда", "мілісекунди"][getSlavicForm(c)],
    decimal: ","
  },
  ur: {
    y: "سال",
    mo: (c) => (c === 1 ? "مہینہ" : "مہینے"),
    w: (c) => (c === 1 ? "ہفتہ" : "ہفتے"),
    d: "دن",
    h: (c) => (c === 1 ? "گھنٹہ" : "گھنٹے"),
    m: "منٹ",
    s: "سیکنڈ",
    ms: "ملی سیکنڈ",
    decimal: "."
  },
  sk: {
    y: (c) => ["rok", "roky", "roky", "rokov"][getCzechOrSlovakForm(c)],
    mo: (c) =>
      ["mesiac", "mesiace", "mesiace", "mesiacov"][getCzechOrSlovakForm(c)],
    w: (c) =>
      ["týždeň", "týždne", "týždne", "týždňov"][getCzechOrSlovakForm(c)],
    d: (c) => ["deň", "dni", "dni", "dní"][getCzechOrSlovakForm(c)],
    h: (c) => ["hodina", "hodiny", "hodiny", "hodín"][getCzechOrSlovakForm(c)],
    m: (c) => ["minúta", "minúty", "minúty", "minút"][getCzechOrSlovakForm(c)],
    s: (c) =>
      ["sekunda", "sekundy", "sekundy", "sekúnd"][getCzechOrSlovakForm(c)],
    ms: (c) =>
      ["milisekunda", "milisekundy", "milisekundy", "milisekúnd"][
        getCzechOrSlovakForm(c)
      ],
    decimal: ","
  },
  sl: {
    y: (c) => {
      if (c % 10 === 1) {
        return "leto";
      } else if (c % 100 === 2) {
        return "leti";
      } else if (
        c % 100 === 3 ||
        c % 100 === 4 ||
        (Math.floor(c) !== c && c % 100 <= 5)
      ) {
        return "leta";
      } else {
        return "let";
      }
    },
    mo: (c) => {
      if (c % 10 === 1) {
        return "mesec";
      } else if (c % 100 === 2 || (Math.floor(c) !== c && c % 100 <= 5)) {
        return "meseca";
      } else if (c % 10 === 3 || c % 10 === 4) {
        return "mesece";
      } else {
        return "mesecev";
      }
    },
    w: (c) => {
      if (c % 10 === 1) {
        return "teden";
      } else if (c % 10 === 2 || (Math.floor(c) !== c && c % 100 <= 4)) {
        return "tedna";
      } else if (c % 10 === 3 || c % 10 === 4) {
        return "tedne";
      } else {
        return "tednov";
      }
    },
    d: (c) => (c % 100 === 1 ? "dan" : "dni"),
    h: (c) => {
      if (c % 10 === 1) {
        return "ura";
      } else if (c % 100 === 2) {
        return "uri";
      } else if (c % 10 === 3 || c % 10 === 4 || Math.floor(c) !== c) {
        return "ure";
      } else {
        return "ur";
      }
    },
    m: (c) => {
      if (c % 10 === 1) {
        return "minuta";
      } else if (c % 10 === 2) {
        return "minuti";
      } else if (
        c % 10 === 3 ||
        c % 10 === 4 ||
        (Math.floor(c) !== c && c % 100 <= 4)
      ) {
        return "minute";
      } else {
        return "minut";
      }
    },
    s: (c) => {
      if (c % 10 === 1) {
        return "sekunda";
      } else if (c % 100 === 2) {
        return "sekundi";
      } else if (c % 100 === 3 || c % 100 === 4 || Math.floor(c) !== c) {
        return "sekunde";
      } else {
        return "sekund";
      }
    },
    ms: (c) => {
      if (c % 10 === 1) {
        return "milisekunda";
      } else if (c % 100 === 2) {
        return "milisekundi";
      } else if (c % 100 === 3 || c % 100 === 4 || Math.floor(c) !== c) {
        return "milisekunde";
      } else {
        return "milisekund";
      }
    },
    decimal: ","
  },
  sv: {
    y: "år",
    mo: (c) => "månad" + (c === 1 ? "" : "er"),
    w: (c) => "veck" + (c === 1 ? "a" : "or"),
    d: (c) => "dag" + (c === 1 ? "" : "ar"),
    h: (c) => "timm" + (c === 1 ? "e" : "ar"),
    m: (c) => "minut" + (c === 1 ? "" : "er"),
    s: (c) => "sekund" + (c === 1 ? "" : "er"),
    ms: (c) => "millisekund" + (c === 1 ? "" : "er"),
    decimal: ","
  },
  sw: {
    y: (c) => (c === 1 ? "mwaka" : "miaka"),
    mo: (c) => (c === 1 ? "mwezi" : "miezi"),
    w: "wiki",
    d: (c) => (c === 1 ? "siku" : "masiku"),
    h: (c) => (c === 1 ? "saa" : "masaa"),
    m: "dakika",
    s: "sekunde",
    ms: "milisekunde",
    decimal: ".",
    _numberFirst: true
  },
  tr: {
    y: "yıl",
    mo: "ay",
    w: "hafta",
    d: "gün",
    h: "saat",
    m: "dakika",
    s: "saniye",
    ms: "milisaniye",
    decimal: ","
  },
  th: {
    y: "ปี",
    mo: "เดือน",
    w: "สัปดาห์",
    d: "วัน",
    h: "ชั่วโมง",
    m: "นาที",
    s: "วินาที",
    ms: "มิลลิวินาที",
    decimal: "."
  },
  vi: {
    y: "năm",
    mo: "tháng",
    w: "tuần",
    d: "ngày",
    h: "giờ",
    m: "phút",
    s: "giây",
    ms: "mili giây",
    decimal: ","
  },
  zh_CN: {
    y: "年",
    mo: "个月",
    w: "周",
    d: "天",
    h: "小时",
    m: "分钟",
    s: "秒",
    ms: "毫秒",
    decimal: "."
  },
  zh_TW: {
    y: "年",
    mo: "個月",
    w: "周",
    d: "天",
    h: "小時",
    m: "分鐘",
    s: "秒",
    ms: "毫秒",
    decimal: "."
  }
};

/** @internal */
function getArabicForm(c: number) {
  if (c === 1) {
    return 0;
  }
  if (c === 2) {
    return 1;
  }
  if (c > 2 && c < 11) {
    return 2;
  }
  return 0;
}

/** @internal */
function getPolishForm(c: number) {
  if (c === 1) {
    return 0;
  } else if (Math.floor(c) !== c) {
    return 1;
  } else if (c % 10 >= 2 && c % 10 <= 4 && !(c % 100 > 10 && c % 100 < 20)) {
    return 2;
  } else {
    return 3;
  }
}

/** @internal */
function getSlavicForm(c: number) {
  if (Math.floor(c) !== c) {
    return 2;
  } else if (
    (c % 100 >= 5 && c % 100 <= 20) ||
    (c % 10 >= 5 && c % 10 <= 9) ||
    c % 10 === 0
  ) {
    return 0;
  } else if (c % 10 === 1) {
    return 1;
  } else if (c > 1) {
    return 2;
  } else {
    return 0;
  }
}

/** @internal */
function getCzechOrSlovakForm(c: number) {
  if (c === 1) {
    return 0;
  } else if (Math.floor(c) !== c) {
    return 1;
  } else if (c % 10 >= 2 && c % 10 <= 4 && c % 100 < 10) {
    return 2;
  } else {
    return 3;
  }
}

/** @internal */
function getLithuanianForm(c: number) {
  if (c === 1 || (c % 10 === 1 && c % 100 > 20)) {
    return 0;
  } else if (
    Math.floor(c) !== c ||
    (c % 10 >= 2 && c % 100 > 20) ||
    (c % 10 >= 2 && c % 100 < 10)
  ) {
    return 1;
  } else {
    return 2;
  }
}

/** @internal */
function getLatvianForm(c: number) {
  return c % 10 === 1 && c % 100 !== 11;
}

export type LanguageCode =
  | "af"
  | "ar"
  | "bg"
  | "bn"
  | "ca"
  | "cs"
  | "cy"
  | "da"
  | "de"
  | "el"
  | "en"
  | "eo"
  | "es"
  | "et"
  | "eu"
  | "fa"
  | "fi"
  | "fo"
  | "fr"
  | "he"
  | "hi"
  | "hr"
  | "hu"
  | "id"
  | "is"
  | "it"
  | "ja"
  | "km"
  | "kn"
  | "ko"
  | "ku"
  | "lo"
  | "lt"
  | "lv"
  | "mk"
  | "mr"
  | "ms"
  | "nl"
  | "no"
  | "pl"
  | "pt"
  | "ro"
  | "ru"
  | "sk"
  | "sl"
  | "sq"
  | "sr"
  | "sv"
  | "sw"
  | "ta"
  | "te"
  | "th"
  | "tr"
  | "uk"
  | "ur"
  | "vi"
  | "zh_CN"
  | "zh_TW";

type Languages = {
  [language in LanguageCode]: LanguageOptions;
};

type OrReturn<T> = T | ((count: number) => T);

type UnitMap = { [unit in Unit]: OrReturn<string> };

export interface LanguageOptions extends UnitMap {
  decimal?: string;
  delimiter?: string;
  _formatCount?: (count: number, decimal: string) => string;
  _numberFirst?: boolean;
}
