import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  // Handle Mongoose invalid ObjectId errors gracefully
  if (err && err.name === 'CastError') {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'invalid MongoDB id' });
  }

  let msg = err?.message || 'something went wrong, try again later';
  if (Array.isArray(msg)) {
    msg = msg.join(', ');
  }

  const statusCode = err?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  return res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
