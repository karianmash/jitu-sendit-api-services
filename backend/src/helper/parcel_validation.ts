import Joi from "joi";

export const ParcelCreateSchema = Joi.object({
  shipper: Joi.string().required(),
  weight: Joi.string().required(),
  status: Joi.string().required(),
  sender: Joi.string().required(),
  receiver: Joi.string().required(),
  item_name: Joi.string().required(),
  price: Joi.string().required(),
  origin_location: Joi.string().required(),
  pick_up_location: Joi.string().required(),
  user_id: Joi.string(),
});

export const ParcelUpdateSchema = Joi.object({
  parcel_id: Joi.string().required(),
  track_id: Joi.string().required(),

  shipper: Joi.string().required(),
  weight: Joi.string().required(),
  status: Joi.string().required(),
  sender: Joi.string().required(),
  receiver: Joi.string().required(),
  item_name: Joi.string().required(),
  price: Joi.string().required(),
  origin_location: Joi.string().required(),
  pick_up_location: Joi.string().required(),
  user_id: Joi.string(),
});
