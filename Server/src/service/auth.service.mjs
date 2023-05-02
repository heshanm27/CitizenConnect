import { BadRequestError } from "../error/index.mjs";
import UserModel from "../models/user.model.mjs";

export const Signup = async (email, password, firstName, lastName) => {
  try {
    return await UserModel.create(email, password, firstName, lastName);
  } catch (error) {
    throw BadRequestError("Sign up failed");
  }
};
export const Signin = async (email, password) => {
  try {
    return await UserModel.signIn(email, password);
  } catch (error) {
    throw BadRequestError(error.message);
  }
};
