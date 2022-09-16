import Joi from "joi";

export const ParcelSchema = Joi.object({
  shipper: Joi.string().required(),
  status: Joi.string().required(),
  sender: Joi.string().required(),
  receiver: Joi.string().required(),
  item_name: Joi.string().required(),
  price: Joi.string().required(),
  origin_location: Joi.string().required(),
  pick_up_location: Joi.string().required(),
  user_id: Joi.string(),
});
