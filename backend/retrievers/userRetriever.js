import User from "../models/userModel.js";

const UserRetriever = {
  retrieveOne: async (filter, excludePassword = true) => {
    let user;
    if (excludePassword) {
      user = await User.findOne(filter).select('-password');
    } else {
      user = await User.findOne(filter);
    }
  
    return user;
  },
  retrieveAll: async (filter, excludePassword = true) => {
    let user;
    if (excludePassword) {
      user = await User.find(filter).select('-password');
    } else {
      user = await User.find(filter);
    }
  
    return user;
  },
  retrieveById: async (id, excludePassword = true) => {
    let user;
    if (excludePassword) {
      user = await User.findOne({ id }).select('-password');
    } else {
      user = await User.findOne({ id });
    }
  
    return user;
  },
};

export default UserRetriever;
