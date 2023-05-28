const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let status = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // check for monggoose bad objectID
  if (err.name === "CastError" && err.kind === "ObjectID") {
    message = "Resource Not Found";
    status = 404;
  }
  res.status(status).json({
    message,
    stack: (process.env.NODE_ENV = "development" ? err.stack : "🍳"),
  });
};

export { notFound, errorHandler };
