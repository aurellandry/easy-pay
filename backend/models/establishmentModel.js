import mongoose from 'mongoose';

const establishmentSchema = mongoose.Schema({
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
    type: [Number],
    required: true,
  },
}, {
  timestamps: true,
});

const Establishment = mongoose.model('Establishment', establishmentSchema);

export default Establishment;
