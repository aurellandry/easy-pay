import { expect } from 'chai';
import User from '../../models/userModel.js';

describe('User Model', () => {
  it('should not save a user without a email', async () => {
    const user = new User();

    try {
      await user.save();
    } catch (error) {
      expect(error.message).to.include('email');
    }
  });
});
