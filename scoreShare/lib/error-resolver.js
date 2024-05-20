export const resolveError = (error) => {
  let message, status;
  if (error.code === "P2002") {
    if (error.meta?.modelName === "File") {
      message = "You've already uploaded a file with that name!";
      status = 400;
    }
    if (error.meta?.modelName === "Track") {
      message = "This track has been uploaded already!";
      status = 400;
    }
  } else if (error.code === "P2000") {
    message = error.message;
    status = 400;
  } else if (error.code === '403') {
    message = `The provided resource is duplicated! (403)`;
    status = 403;
  } else if (error.code === '400') {
    message = `Invalid character in the filename!`;
    status = 403;
    } else if (error.code === '409') {
    message = `The file already exists!`;
    status = 403;
  
  } else {
    message = "Something went wrong...";
    status = 500;
  }
  return [status, message];
};
