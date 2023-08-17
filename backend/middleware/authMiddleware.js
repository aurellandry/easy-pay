import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import UserRetriever from '../retrievers/userRetriever.js';
import constants from '../utils/constants.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await UserRetriever.retrieveById(decoded.userId);

      next();
    } catch (error) {
      console.log(error);
      res.status(constants.HTTP_UNAUTHORIZED);
      throw new Error('Not authorized. Invalid token.');
    }
  } else {
    res.status(constants.HTTP_UNAUTHORIZED);
    throw new Error('Not authorized. No token.');
  }
});

export { protect };
