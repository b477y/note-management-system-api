export const ValidationMiddleware = (schema) => {
  return async (req, res, next) => {
    const schemaKeys = Object.keys(schema);

    let validationError = [];

    for (const key of schemaKeys) {
      const { error } = schema[key].validate(req[key], { abortEarly: false });
      if (error) {
        validationError.push(...error.details);
      }
    }

    if (validationError.length) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: validationError,
      });
    }

    next();
  };
};
