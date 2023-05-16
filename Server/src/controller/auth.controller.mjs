import * as authServices from "../service/auth.service.mjs";

export const SignUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  if (!email || !password || !confirmPassword || !firstName || !lastName) return res.status(400).json({ message: "Please fill in all fields" });

  if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" });

  try {
    const user = await authServices.Signup(email, password, firstName, lastName);
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const SignIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Please fill in all fields" });
  try {
    const data = await authServices.Signin(email, password);
    res.status(200).json(data);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {};
