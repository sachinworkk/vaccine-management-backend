import Joi from "joi";

import { validator } from "./../misc/validator";

const signUpSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": `Name cannot be empty`,
    "any.required": `Name is a required field`,
    "string.base": `Please provide a valid name`,
  }),
  gender: Joi.string().trim().required().messages({
    "string.empty": `Gender cannot be empty`,
    "any.required": `Gender is a required field`,
    "string.base": `Please provide a valid gender`,
  }),
  dateOfBirth: Joi.date().required().messages({
    "any.required": `Date of birth is a required field`,
    "date.base": `Please provide a valid date`,
  }),
  email: Joi.string().email().required().messages({
    "string.empty": `Email cannot be empty`,
    "any.required": `Email is a required field`,
    "string.email": `Please provide a valid email`,
  }),
  password: Joi.string().trim().required().messages({
    "string.empty": `Password cannot be empty`,
    "any.required": `Password is a required field`,
  }),
  confirmPassword: Joi.string()
    .trim()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "string.empty": `Confirm password cannot be empty`,
      "any.required": `Confirm Password is a required field`,
      "any.only": `Password does not match`,
    }),
  address: Joi.string().trim().messages({
    "string.empty": `Address cannot be empty`,
    "string.base": `Please provide a valid address`,
  }),
});

export const validateSignUp = validator(signUpSchema);
