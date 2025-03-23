import Joi from "joi";

export const IdSpec = Joi.alternatives()
  .try(Joi.string(), Joi.object())
  .description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("riz@email.com").required(),
    password: Joi.string().example("theball").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Riz").required(),
  lastName: Joi.string().example("Gukgak").required(),
  username: Joi.string().example("Shadow").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const LocationSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Croke Park"),
    category: Joi.string().required().example("Venue"),
    description: Joi.string().allow("").optional().example("A Gaelic games stadium."),
    folderid: IdSpec,
  })
  .label("Location");

export const LocationSpecPlus = LocationSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("LocationPlus");

export const LocationArraySpec = Joi.array().items(LocationSpecPlus).label("LocationArray");

export const FolderSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Kilkenny Faves"),
    userid: IdSpec,
    locations: LocationArraySpec,
  })
  .label("Folder");

export const FolderSpecPlus = FolderSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("FolderPlus");

export const FolderArraySpec = Joi.array().items(FolderSpecPlus).label("FolderArray");
