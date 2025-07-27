import Joi from "joi";
import mongoose from "mongoose";

export const emailValidator = Joi.string().email().required();

export const passwordValidator = Joi.string()
  .pattern(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/)
  .message(
    "Password must be at least 8 characters long and contain at least one letter and one number"
  )
  .required();

export const confirmPasswordValidator = Joi.string()
  .valid(Joi.ref("password"))
  .required()
  .messages({
    "any.only": "Passwords do not match",
    "any.required": "Confirm password is required",
  });

export const otpValidator = Joi.string().length(4).required().messages({
  "string.length": "OTP must be a 4-digit number",
  "any.required": "OTP is required",
});

export const authHeaderValidator = Joi.string().required();

export const objectIdValidator = Joi.string().custom((value, helpers) => {
  return mongoose.isValidObjectId(value)
    ? value
    : helpers.message("Invalid ObjectId");
});
