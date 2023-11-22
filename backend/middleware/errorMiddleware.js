const errorMiddleware = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  res.json({ msg: err.message, stack: err.stack });
};

module.exports = errorMiddleware;
