export const getUsers = async ({ search = "", sortBy = "createdAt", order = "-1", limit = "2", page = "1" }) => {};

export const getUser = async (req, res) => {};

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
