import Joi from "joi";

export const validator = (schema: Joi.ObjectSchema<any>) => (payload: Object) =>
  schema.validate(payload, { abortEarly: false });
