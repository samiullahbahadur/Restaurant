import User from "../models/user.js";

export const getUsers = (req, res) => {
  const user = User.findAll();
  res.status(200).json(
    {
      success: true,
      message: " Successfull find users",
    },
    user
  );
};
