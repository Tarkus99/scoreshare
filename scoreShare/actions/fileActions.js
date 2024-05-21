"use server";
import {
  supDeleteFile,
  supGetPublicUrl,
  supMoveFile,
  supUploadFile,
} from "@/lib/supabase";
import {
  createFile,
  deleteFile,
  getFileById,
  getFilesByTrackId,
  getFilesByUserId,
  updateFile,
} from "@/data/fileData";
import { resolveError } from "@/lib/error-resolver";
import { currentUser } from "./server";
import { db } from "@/lib/db";
import { resolveFileName } from "@/lib/utils";
import { getTrackByIdData } from "@/data/track";

export const getFiles = async (id) => {
  try {
    const data = await getFilesByTrackId(id);
    return data;
  } catch (error) {
    resolveError(error);
    return [];
  }
};

export const getFilesByUser = async (id) => {
  try {
    const data = await getFilesByUserId(id);
    return data;
  } catch (error) {
    resolveError(error);
    return [];
  }
};

export const uploadFileAlongWithTrack = async (formData, trackId, conn) => {
  const user = await currentUser();
  const fileToInsert = Object.fromEntries(formData.entries());
  const name = resolveFileName(fileToInsert, user);
  const file = fileToInsert.file;
  delete fileToInsert.file;
  fileToInsert.trackId = trackId;
  fileToInsert.url = name;
  fileToInsert.userId = user.id;

  const result = await createFile(conn, fileToInsert);
  const uploadInfo = await supUploadFile(file, name);

  if (uploadInfo.error) {
    let err = new Error(uploadInfo.error.message);
    err.code = uploadInfo.error.statusCode;
    err.supabaseError = true;
    throw err;
  }

  return {
    success: true,
    message: "File has been added to the track",
    payload: result,
  };
};

export const uploadFileWithTransaction = async (trackId, formData) => {
  try {
    const existsTrack = await getTrackByIdData(trackId);
    const user = await currentUser();
    const fileToInsert = Object.fromEntries(formData.entries());
    const name = resolveFileName(fileToInsert, user);
    const file = fileToInsert.file;
    delete fileToInsert.file;
    fileToInsert.trackId = existsTrack.id;
    fileToInsert.url = name;
    fileToInsert.userId = user.id;
    let result;

    await db.$transaction(async (tx) => {
      result = await createFile(tx, fileToInsert);
      const uploadInfo = await supUploadFile(file, name);
      if (uploadInfo.error) {
        let err = new Error(uploadInfo.error.message);
        err.code = uploadInfo.error.statusCode;
        throw err;
      }
    });

    return {
      success: true,
      message: "File has been added to the track",
      payload: result,
    };
  } catch (error) {
    const [status, message] = resolveError(error);
    return {
      success: false,
      status: status,
      message: message,
    };
  }
};

export const putFile = async (id, formData, oldFile) => {
  const user = await currentUser();
  const fileToInsert = Object.fromEntries(formData.entries());
  const file = fileToInsert.file;
  const name = resolveFileName(fileToInsert, user, oldFile);
  fileToInsert.url = name;
  delete fileToInsert.file;
  let result;

  try {
    await db.$transaction(async (tx) => {
      result = await updateFile(id, fileToInsert, tx);

      if (file) {
        //upload
        const uploadInfo = await supUploadFile(file, name);

        if (uploadInfo.error) {
          let error = new Error(uploadInfo.error.message);
          error.code = uploadInfo.error.statusCode;
          err.supabaseError = true;
          throw error;
        }
        //delete current file
        const deleteInfo = await supDeleteFile(oldFile);

        if (deleteInfo.error) {
          let error = new Error(deleteInfo.error.message);
          error.code = deleteInfo.error.statusCode;
          throw error;
        }
      } else {
        const moveFileInfo = await supMoveFile(oldFile, name);
        if (moveFileInfo.error) {
          let error = new Error(moveFileInfo.error.message);
          error.code = moveFileInfo.error.statusCode;
          throw error;
        }
      }
    });
    return {
      success: true,
      message: "File has been updated successfully!",
      payload: result,
    };
  } catch (error) {
    const [status, message] = resolveError(error);
    return {
      success: false,
      status: status,
      message: message,
    };
  }
};

export const deleteFileById = async (id) => {
  let result;
  try {
    await db.$transaction(async (tx) => {
      result = await deleteFile(id, tx);
      const deleteInfo = await supDeleteFile(result.url);

      if (deleteInfo.error) {
        let err = new Error(deleteInfo.error.message);
        throw err;
      }
    });
    return {
      success: true,
      message: "File has been deleted successfully!",
      payload: result,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
