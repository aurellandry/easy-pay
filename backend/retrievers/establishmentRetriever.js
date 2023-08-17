import Establishment from "../models/establishmentModel.js";

const EstablishmentRetriever = {
  retrieveOne: async (filter) => {
    const establishment = await Establishment.findOne(filter);
  
    return establishment;
  },
  retrieveAll: async (filter) => {
    const establishment = await Establishment.find(filter);
  
    return establishment;
  },
  retrieveById: async (id) => {
    const establishment = await Establishment.find({ _id: parseInt(id) });
  
    return establishment;
  },
};

export default EstablishmentRetriever;
