import { BadRequestError } from "../error/index.mjs";
import userModel from "../models/user.model";
export const Signup = async (email, password, firstName, lastName) => {
  try {
    return await userModel.create(email, password, firstName, lastName);
  } catch (error) {
    throw BadRequestError("Sign up failed");
  }
};
export const Signin = async (email, password) => {
  try {
    return await authServices.signIn(email, password);
  } catch (error) {
    throw BadRequestError(error.message);
  }
};
