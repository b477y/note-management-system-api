export const asyncHandler = (fn) => {
  return (req, res, next) => {
    return fn(req, res, next).catch((error) => {
      error.cause = 500;
      error.success = false;
      return next(error);
    });
  };
};

export const globalErrorHandling = (error, req, res, next) => {
  if (process.env.MODE === "dev") {
    return res.status(error.cause || 400).json({
      success: false,
      message: error.message,
      error,
      stack: error.stack,
    });
  }
  return res
    .status(error.cause || 400)
    .json({ success: false, message: error.message });
};
