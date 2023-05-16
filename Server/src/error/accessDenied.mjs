import CustomError from "./customError.mjs";
import status from "http-status-codes";

class AccessDenied extends CustomError {
  constructor(message) {
    super(message, status.FORBIDDEN);
  }
}

export default AccessDenied;
