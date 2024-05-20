export const resolveError = (error) => {
  console.log(error);
  let status, message;
  if (isPrismaError(error)) {
    console.log("PRISMA ERROR");
    if (error.code === "P2028") {
      message = "Timeout!";
      status = 500;
    } else if (error.code === "P2000") {
      message = "Invalid fields...";
      status = 400;
    } else if (error.code === "P2002") {
      if (error.meta?.modelName === "File") {
        message = "You've already uploaded a file with that name!";
        status = 400;
      } else if (error.meta?.modelName === "Track") {
        message = "You've already uploaded a file with that name!";
        status = 400;
      }
    }
  } else if (isSupabaseError(error)) {
    console.log("SUPABASE ERROR");
    if (error.code === "403") {
      message = `Unauthorized!`;
      status = 403;
    } else if (error.code === "400") {
      message = `Invalid character in the filename!`;
      status = 403;
    } else if (error.code === "409") {
      message = `The file already exists!`;
      status = 403;
    }
  } else if (isResendError(error)) {
    console.log("RESEND ERROR");
    if (error.statusCode === 403) {
      message = `Unauthorized!`;
      status = 403;
    }
  } else {
    message = "Something went wrong...";
    status = 500;
  }

  return [status, message];
};

function isPrismaError(error) {
  return error.code instanceof String && error.code.startsWith("P");
}

function isSupabaseError(error) {
  return error.code instanceof String;
}

function isResendError(error) {
  return error.code instanceof Number;
}
