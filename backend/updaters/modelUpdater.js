const create = async (Model, fields) => {
  const createdModel = await Model.create(fields);

  return createdModel;
};

const save = async (model) => {
  const updatedModel = await model.save();

  return updatedModel;
};

export { create, save };
