import { Request } from "express";

export interface UserRequest extends Request {
  body: {
    fullname?: string;
    email: string;
    username?: string;
    password: string;
  };
}

export interface ParcelRequest extends Request {
  body: {
    item_name: string;
    date: string;
    sender: string;
    receiver: string;
    status: string;
    shipper: string;
    price: string;
    origin_location: string;
    pick_up_location: string;
    user_id?: string;
  };
}
