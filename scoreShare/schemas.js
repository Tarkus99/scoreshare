import * as yup from "yup";
import {
  ALLOWED_TYPES,
  INVALID_FILENAME_CHARACTERS,
  MAX_FILE_SIZE,
} from "./lib/utils";

export const LoginSchema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export const RegisterSchema = yup
  .object()
  .shape({
    email: yup.string().email().min(6).required(),
    password: yup
      .string()
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)
      .required(),
    name: yup.string().min(3).required(),
  })
  .required();

export const ProfileSchema = yup
  .object()
  .shape({
    email: yup.string().email().min(6).required(),
    password: yup.string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/),
    name: yup.string().min(3).required(),
  })
  .required();

export const ResetSchema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
  })
  .required();

export const NewPasswordSchema = yup
  .object()
  .shape({
    password: yup
      .string()
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)
      .required(),
  })
  .required();

export const NewTrackSchema = yup
  .object()
  .shape({
    id: yup.string(),
    name: yup.string().required(),
    source: yup.string().required(),
    artist: yup.array().min(1).required(),
    date: yup.date().required(),
    key: yup.string().required(),
    instrument: yup.string().required(),
    tempo: yup.number().min(45).max(400).required(),
    image: yup.lazy((value) => {
      switch (typeof value) {
        case "string":
          return yup.string().required();
        case "object":
          return yup
            .mixed()
            .required("Track image is required")
            .test(
              "is-valid-size",
              "Max allowed size is 4MB",
              (value) => value && value.size <= MAX_FILE_SIZE
            );
        case "undefined":
          return yup.mixed().required();
        default:
          return yup.mixed();
      }
    }),
    fileName: yup
      .string()
      .required()
      .test(
        "contains-invalid-characters",
        "Filename contains inavlid characters!",
        (value) => {
          let exists;
          INVALID_FILENAME_CHARACTERS.forEach((char) => {
            if (value.includes(char)) exists = true;
          });
          return !exists;
        }
      ),
    file: yup
      .mixed()
      .required()
      .test("is-valid-size", "Max allowed size is 4MB", (value) => {
        return value && value.size <= MAX_FILE_SIZE;
      })
      .test(
        "is-valid-extension",
        "Allowed extension are mp3, mp4 and pdf",
        (value) => {
          return value && ALLOWED_TYPES.includes(value.type);
        }
      ),
  })
  .required();

export const UploadFile = yup
  .object()
  .shape({
    instrument: yup.string().required(),
    fileName: yup
      .string()
      .required()
      .test(
        "contains-invalid-characters",
        "Filename contains inavlid characters!",
        (value) => {
          let exists;
          INVALID_FILENAME_CHARACTERS.forEach((char) => {
            if (value.includes(char)) exists = true;
          });
          return !exists;
        }
      ),
    file: yup
      .mixed()
      .required()
      .test("is-valid-size", "Max allowed size is 4MB", (value) => {
        return value && value.size <= MAX_FILE_SIZE;
      })
      .test(
        "is-valid-extension",
        "Allowed extension are mp3, mp4 and pdf",
        (value) => {
          return value && ALLOWED_TYPES.includes(value.type);
        }
      ),
  })
  .required();

export const UpdateFile = yup
  .object()
  .shape({
    instrument: yup.string().required(),
    fileName: yup
      .string()
      .required()
      .test(
        "contains-invalid-characters",
        "Filename contains inavlid characters!",
        (value) => {
          let exists;
          INVALID_FILENAME_CHARACTERS.forEach((char) => {
            if (value.includes(char)) exists = true;
          });
          return !exists;
        }
      ),
    file: yup
      .mixed()
      .test("is-valid-size", "Max allowed size is 4MB", (value) => {
        if (value === undefined) return true;
        return value && value.size <= MAX_FILE_SIZE;
      })
      .test(
        "is-valid-extension",
        "Allowed extension are mp3, mp4 and pdf",
        (value) => {
          if (value === undefined) return true;
          return value && ALLOWED_TYPES.includes(value.type);
        }
      ),
  })
  .required();
