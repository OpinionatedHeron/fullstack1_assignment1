import Joi from "joi";

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Riz").required(),
    lastName: Joi.string().example("Gukgak").required(),
    email: Joi.string().email().example("riz@email.com").required(),
    username: Joi.string().example("Shadow").required(),
    password: Joi.string().example("theball").required(),
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const LocationSpec = {
  title: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().allow("").optional(),
};

export const FolderSpec = {
  title: Joi.string().required(),
};