export const getUsers = async (req, res) => {};

export const getUser = async (req, res) => {};

export const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).json({
      newUser,
    });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
