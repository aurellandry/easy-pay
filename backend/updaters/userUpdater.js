import { create, save } from "./modelUpdater.js";
import User from "../models/userModel.js";

const createUser = async (fields) => {
  const createdUser = await create(User, fields);

  return createdUser;
};

const saveUser = async (user) => {
  const updatedUser = await save(user);

  return updatedUser;
};

export { createUser, saveUser };
