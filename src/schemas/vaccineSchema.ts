import Joi from "joi";

import { validator } from "./../misc/validator";

const vaccineSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.empty": `Name cannot be empty`,
    "any.required": `Name is a required field`,
    "string.base": `Please provide a valid name`,
  }),
  numberOfDoses: Joi.number().required().messages({
    "any.required": `Number of doses is a required field`,
    "number.base": `Please provide a valid number of doses`,
  }),
  isMandatory: Joi.boolean().required().messages({
    "any.required": `Is Mandatory is a required field`,
    "boolean.base": `Please provide a valid is mandatory field`,
  }),
  stage: Joi.string().required().messages({
    "any.required": `Stage is a required field`,
    "string.base": `Please provide a valid stage`,
  }),
  description: Joi.string().messages({
    "any.required": `Description is a required field`,
    "string.base": `Please provide a valid description`,
  }),
  createdBy: Joi.number().required().messages({
    "any.required": `Created By is a required value`,
    "number.base": `Please provide a valid user id`,
  }),
  vaccineImageUrl: Joi.string().allow("").messages({
    "string.base": `Please provide a valid image url`,
  }),
});

export const validateVaccine = validator(vaccineSchema);
