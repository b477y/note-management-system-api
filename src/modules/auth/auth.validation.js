import Joi from "joi";
import {
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
  otpValidator,
  authHeaderValidator,
} from "../../validators/validators.js";

export const register = {
  body: Joi.object({
    email: emailValidator,
    password: passwordValidator,
    confirmPassword: confirmPasswordValidator,
  }),
};

export const login = {
  body: Joi.object({
    email: emailValidator,
    password: passwordValidator,
  }),
};

export const forgetPassword = {
  body: Joi.object({
    email: emailValidator,
  }),
};

export const resetPassword = {
  body: Joi.object({
    email: emailValidator,
    OTP: otpValidator,
    password: passwordValidator,
    confirmPassword: confirmPasswordValidator,
  }),
};

export const logout = {
  headers: Joi.object({
    authorization: authHeaderValidator,
  }).unknown(),
};
