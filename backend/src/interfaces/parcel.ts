export interface Parcel {
  parcel_id: string;
  track_id: string;
  shipper: string;
  status: string;
  sender: string;
  receiver: string;
  item_name: string;
  price: string;
  origin_location: string;
  pick_up_location: string;
  
  in_progress_email: number;
  completed_email: number;
  canceled_email: number;
  is_deleted?: string;
  user_id?: string;
}
