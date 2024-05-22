import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const OK = 200;
export const CREATED = 201;
export const FAILED = 400;

export const is2xx = (value) => {
  return value < 300 && value >= 200;
};

export const INVALID_FILENAME_CHARACTERS = [
  "`",
  "{",
  "}",
  "#",
  "[",
  "]",
  "~",
  '"',
  "%",
  "^",
];

export const KEY_LIST = ["C", "D", "E", "F", "G", "A", "B"];

export const INSTRUMENTS = [
  "Vocals",
  "Piano",
  "Organ",
  "Synth",
  "Harpsichord",
  "Electric guitar",
  "Acoustic guitar",
  "Classical guitar",
  "Electric Bass",
  "Acoustic bass",
  "Drums",
  "Percussion",
  "Ensemble",
  "Band",
  "Flute",
  "Clarinet",
  "Oboe",
  "Saxo,",
  "Trumpet",
  "Banjo",
  "Mandolin",
  "Violin",
  "Viola",
  "Violoncello",
  "Mallets",
  "Sitar",
  "Other",
];

export const FORBIDDEN_CONTENT = [
  "WANKER",
  "WANK",
  "CRIPPLE",
  "TESTICLES",
  "ASSHOLE",
  "TITS",
  "BOOBS",
  "MIDGET",
  "FAGGOT",
  "CUM",
  "COCKSUCKER",
  "WHORE",
  "SLUT",
  "CUNT",
  "PUTA",
  "ZORRA",
  "RETRASADO",
  "RETARDER",
  "COCK",
  "GILIPOLLAS",
  "HIJO DE PUTA",
  "HIJODEPUTA",
  "HIJOPUTA",
  "PROSTITUTA",
  "HOE",
  "NIGGER",
  "BIG NOSE",
  "SEX",
  "DICK",
  "FUCK",
  "FOLLAR",
  "JERKOFF",
  "MASTURBAR",
  "SEMEN",
  "HITLER",
  "MUSSOLINI",
  "STALIN",
  "BITCH",
  "SON OF A BITCH",
  "SONOFABITCH",
  "BLOWJOB",
  "MAMADA",
  "MARICON",
  "MATAR",
  "KILL",
  "MOTHERFUCKER",
  "MTHRFCKR",
  "BASTARD",
  "QUEER",
  "PUTIN",
  "NAZI",
  "COMMUNIST",
  "COMMIE",
  "PENIS",
  "PENE",
  "VAGINA",
  "PUSSY",
  "PORN",
  "NIGGA",
];

export function removeExtensionFromFileNameInForm(name) {
  return name.split(".").slice(0, -1).join(".");
}
export const MAX_FILE_SIZE = 4194304;
export const ALLOWED_TYPES = ["audio/mpeg", "video/mp4", "application/pdf"];
export const ORDER_BY_RECENT = 1;
export const ORDER_BY_POPULARITY = 2;

export const resolveFileName = (fileInfo, user, oldFile = "") => {
  return `${fileInfo.name.trim().split(" ").join("_")}_${fileInfo.instrument}_${
    user.id
  }.${oldFile?.split(".").pop() || getExtension(fileInfo.file)}`;
};

function getExtension(file) {
  const ext = file.type;
  switch (ext) {
    case "audio/mpeg":
      return "mp3";
    case "video/mp4":
      return "mp4";
    case "application/pdf":
      return "pdf";
    default:
      throw new Error("File format not allowed!");
  }
}

export function hasForbiddenContent(value) {
  let exists;
  const toUpperCase = value.toUpperCase();
  FORBIDDEN_CONTENT.forEach((word) => {
    if (toUpperCase.includes(word)) exists = true;
  });
  return exists;
}
