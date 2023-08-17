import constants from "../utils/constants.js";

const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(constants.HTTP_NOT_FOUND);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === constants.HTTP_OK ? 
      constants.HTTP_INTERNAL_SERVER_ERROR : res.statusCode;
  let { message } = err;

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = constants.HTTP_NOT_FOUND;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'prod' ? null : err.stack,
  });

  next();
};

export { notFound, errorHandler };
