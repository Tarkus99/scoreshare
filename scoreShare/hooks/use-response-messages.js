import { useState } from "react";

export const useResponseMessages = () => {
  const [success, setSuccess] = useState("");
  const [failed, setFailed] = useState("");

  const resetMessages = () => {
    setSuccess("");
    setFailed("");
  };

  return { success, failed, setFailed, setSuccess, resetMessages };
};
