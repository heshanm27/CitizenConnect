import { CustomError } from "../error/index.mjs";
import status from "http-status-codes";

const ErrorHandlerMiddleware = (err, req, res, next) => {
  // if (err instanceof CustomError) {
  //   return res.status(err.statusCode).json({ error: err.message });
  // }

  return res.status(status.INTERNAL_SERVER_ERROR).json({
    error: err.message,
    msg: "Something went wrong, please try again later",
  });
};

export default ErrorHandlerMiddleware;
