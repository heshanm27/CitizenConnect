const NotFoundMiddleware = (req, res, next) => {
  return res.status(404).json({
    error: "Route does not exist",
  });
};

export default NotFoundMiddleware;
