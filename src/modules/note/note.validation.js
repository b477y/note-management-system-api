import Joi from "joi";
import {
  authHeaderValidator,
  objectIdValidator,
} from "../../validators/validators.js";

export const createNote = {
  body: Joi.object({
    title: Joi.string().min(5).max(100).required(),
    content: Joi.string().min(20).max(2000).required(),
  }),
  headers: Joi.object({
    authorization: authHeaderValidator,
  }).unknown(),
};

export const deleteNote = {
  params: Joi.object({
    id: objectIdValidator.required(),
  }),
  headers: Joi.object({
    authorization: authHeaderValidator,
  }).unknown(),
};

export const summarizeNote = {
  params: Joi.object({
    id: objectIdValidator.required(),
  }),
};
