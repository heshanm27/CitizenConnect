import { BadRequestError } from "../error/index.mjs";
import User from "../models/user.model.mjs";

export const Signup = async (email, password, firstName, lastName) => {
  try {
    return await User.create(email, password, firstName, lastName);
  } catch (error) {
    throw BadRequestError("Sign up failed");
  }
};
export const Signin = async (email, password) => {
  try {
    return await User.signIn(email, password);
  } catch (error) {
    throw BadRequestError(error.message);
  }
};
