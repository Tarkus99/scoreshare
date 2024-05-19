"use server";

import { auth } from "@/auth";
import {
  deleteComment,
  getCommentsByFileId,
  insertComment,
  updateComment,
} from "@/data/commentData";
import { CREATED, FAILED, OK, hasForbiddenContent } from "@/lib/utils";

export const getComments = async (fileId) => {
  const data = await getCommentsByFileId(fileId);
  return data;
};

export const addComment = async (formData) => {
  const { user } = await auth();
  const id = parseInt(formData.get("id")) || null;
  const content = formData.get("content");
  const fileId = formData.get("fileId");
  const parent = parseInt(formData.get("parent")) || null;
  const comment = {
    content: content,
    parentId: parent,
    userId: user.id,
    fileId: fileId,
  };

  let result;
  let status;

  
  try {
    if (hasForbiddenContent(content))
      throw new Error("It is not allowed to insert inapropiate content!");
    if (id) {
      //update
      result = await updateComment(id, content);
      status = OK;
    } else {
      //create
      result = await insertComment(comment);
      status = CREATED;
    }

    return {
      status: status,
      data: result,
    };
  } catch (error) {
    return {
      status: FAILED,
      message: error.message,
    };
  }
};

export const removeComment = async (id) => {
  try {
    const result = await deleteComment(id);
    return {
      status: OK,
      id: result.id,
    };
  } catch (error) {
    return {
      status: FAILED,
      message: error.message,
    };
  }
};
