import userModel from "../schema/userSchema.js";

// Create user
export const createUser = (userObject) => {
  return userModel(userObject).save();
};

// find user by email
export const findUserByEmail = (email) => {
  return userModel.findOne({ email });
};

// find user by id
export const findUserById = (userId) => {
  return userModel.findOne({ _id: userId });
};
