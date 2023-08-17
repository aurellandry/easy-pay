import GenericModelUpdater from "./modelUpdater.js";
import User from "../models/userModel.js";

const UserUpdater = {
  create: async (fields) => {
    const createdUser = await GenericModelUpdater.create(User, fields);
  
    return createdUser;
  },
  save: async (user) => {
    const updatedUser = await GenericModelUpdater.save(user);
  
    return updatedUser;
  }
};

export default UserUpdater;
