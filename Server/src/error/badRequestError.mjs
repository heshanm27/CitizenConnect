import CustomError from "./customError.mjs";
import status from "http-status-codes";

class BadRequestError extends CustomError {
  constructor(message) {
    super(message, status.BAD_REQUEST);
  }
}

export default BadRequestError;
