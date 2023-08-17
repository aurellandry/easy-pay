import User from "../models/userModel.js";

const UserRetriever = {
  retrieveOne: async (filter) => {
    const user = await User.findOne(filter);
  
    return user;
  },
  retrieveAll: async (filter) => {
    const user = await User.find(filter);
  
    return user;
  },
  retrieveById: async (id) => {
    const user = await User.findById(id);
  
    return user;
  },
};

export default UserRetriever;
