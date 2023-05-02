import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { UnAuthorized, BadRequestError } from "../errors";

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    avatar: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "admin" },
  },
  {
    timestamps: true,
  }
);
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.generateJWTToken = function () {
  return JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

UserSchema.methods.resetPassword = async function (password) {
  const salt = await bcrypt.genSalt();
  console.log("salt", password);
  return await bcrypt.hash(password, salt);
};

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    console.log("userpassword", user.password);
    console.log("password", password);
    const IsPasswordMatched = await bcrypt.compare(password, user.password);
    console.log(IsPasswordMatched);
    if (IsPasswordMatched) {
      return {
        accessToken: user.generateJWTToken(),
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        isVerified: user.isVerified,
      };
    }
    throw new UnAuthorized("Incorrect Credentials");
  }
  throw new BadRequestError("User does not exist with this email");
};

export default mongoose.model("User", UserSchema);
