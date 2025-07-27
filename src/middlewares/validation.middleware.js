export const ValidationMiddleware = (schema) => {
  return async (req, res, next) => {
    let validationError = [];

    for (const [key, schemaValidator] of Object.entries(schema)) {
      const { error } = schemaValidator.validate(req[key] || {}, { abortEarly: false });
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