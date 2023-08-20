import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { getNextModelID } from './sequenceModel.js';

const userSchema = mongoose.Schema({
  id: {
    type: Number,
    required: false,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  if (this.isNew) {
    this.id = await getNextModelID('user_id');
  }

  // hash password
  const saltLength = 12; // 0 - 20 range.
  const salt = await bcrypt.genSalt(saltLength);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;
