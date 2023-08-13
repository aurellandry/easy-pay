import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'dev',
    sameSite: 'strict', // prevent CSRF attack
    maxAge: 60 * 60 * 1000 // 1 hour (in milliseconds)
  });
};

export default generateToken;
