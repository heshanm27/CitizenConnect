import CustomError from "./customError.mjs";
import status from "http-status-codes";

class Unauthorized extends CustomError {
  constructor(message) {
    super(message, status.UNAUTHORIZED);
  }
}

export default Unauthorized;
