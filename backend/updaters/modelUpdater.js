const GenericModelUpdater = {
  create: async (Model, fields) => {
    const createdModel = await Model.create(fields);
  
    return createdModel;
  },
  save: async (model) => {
    const updatedModel = await model.save();
  
    return updatedModel;
  },
};

export default GenericModelUpdater;
