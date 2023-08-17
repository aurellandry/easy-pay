import mongoose from 'mongoose';
import { getNextModelID } from './sequenceModel.js';

const establishmentSchema = mongoose.Schema({
  id: {
    type: Number,
    required: false,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  additionalAddress: {
    type: String,
    required: false,
  },
  userIds: {
    type: [String],
    required: true,
  },
}, {
  timestamps: true,
});

establishmentSchema.pre('save', async function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  this.id = await getNextModelID('establishment_id');
});

const Establishment = mongoose.model('Establishment', establishmentSchema);

export default Establishment;
