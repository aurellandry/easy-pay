import GenericModelUpdater from "./modelUpdater.js";
import Establishment from "../models/establishmentModel.js";

const EstablishmentUpdater = {
  create: async (fields) => {
    const createdEstablishment = await GenericModelUpdater.create(Establishment, fields);
  
    return createdEstablishment;
  },
  save: async (establishment) => {
    const updatedEstablishment = await GenericModelUpdater.save(establishment);
  
    return updatedEstablishment;
  },
  deleteById: async (id) => {
    const establishment = await Establishment.deleteOne({ _id: id });
  
    return establishment;
  },
};

export default EstablishmentUpdater;
