import userModel from "../models/user.model.mjs";
import { CustomError } from "../error/index.mjs";
export const getUsers = async ({ search = "", sortBy = "createdAt", order = "-1", limit = "2", page = "1" }) => {
  const sort = {};
  sort[sortBy] = order;

  const users = await userModel
    .find({
      $or: [{ firstName: { $regex: search, $options: "i" } }, { lastName: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }],
    })
    .sort(sort)
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit));

  return users;
};

export const getUser = async () => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);

    if (!user) {
      throw new CustomError("User not found");
    }
    return user;
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const deleteUser = async (id) => {
  const { id } = req.params;
  try {
    return await userModel.findByIdAndDelete(id);
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const updateUser = async (id, updatedDetails) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, updatedDetails, { new: true });
    return updatedUser;
  } catch (error) {
    throw new CustomError(error.message);
  }
};
