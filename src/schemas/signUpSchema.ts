import Joi from "joi";

import { validator } from "./../misc/validator";

const signUpSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `Name is a required field`,
  }),
  gender: Joi.string().required().messages({
    "any.required": `Gender is a required field`,
  }),
  dateOfBirth: Joi.date().required().messages({
    "any.required": `Date of birth is a required field`,
    "date.base": `The value provided is not a valid date`,
  }),
  email: Joi.string().email().required().messages({
    "any.required": `Email is a required field`,
    "string.email": `The value provided is not a valid email`,
  }),
  password: Joi.string().required().messages({
    "any.required": `Password is a required field`,
  }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.required": `Confirm Password is a required field`,
    "any.only": `Password does not match`,
  }),
  address: Joi.string(),
});

export const validateSignUp = validator(signUpSchema);
