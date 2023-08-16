import User from "../models/userModel.js";

export const retrieveUserById = async (id) => {
  const user = await User.findById(id);

  return user;
}

export const retrieveUser = async (filter) => {
  const user = await User.findOne(filter);

  return user;
}

export const retrieveUsers = async (filter) => {
  const user = await User.find(filter);

  return user;
}
