import { BadRequestError } from "../error/index.mjs";
import User from "../models/user.model.mjs";

export const Signup = async (email, password, firstName, lastName) => {
  try {
    return await User.create({
      email,
      password,
      firstName,
      lastName,
    });
  } catch (error) {
    throw new BadRequestError("Sign up failed");
  }
};
export const Signin = async (email, password) => {
  try {
    return await User.login(email, password);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};
