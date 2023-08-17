import mongoose from 'mongoose';

const sequenceSchema = new mongoose.Schema({
  _id: String,
  sequenceValue: Number,
});

const Sequence = mongoose.model('Sequence', sequenceSchema);

const getNextModelID = async (idName) => {
  try {
    const sequenceDoc = await Sequence.findByIdAndUpdate(
      idName, // identifiant de la séquence
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
    );

    return sequenceDoc.sequenceValue;
  } catch (error) {
    throw new Error(error);
  }
};

export { getNextModelID };
