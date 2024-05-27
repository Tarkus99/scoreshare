"use server"
import { getFilesByUser } from "@/actions/file";
import { currentUser } from "@/actions/server";
import React from "react";
import { FilesAccordion } from "./filed-accordion";

export const ActivityTab = async () => {
  const user = await currentUser();
  const filesByUser = await getFilesByUser(user?.id);
  return <>{filesByUser && <FilesAccordion files={filesByUser} />}</>;
};
