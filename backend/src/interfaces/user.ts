export interface User {
  user_id: string;
  user_role: string;
  fullname: string;
  email: string;
  username: string;
  hashed_password?: string;
  welcome_email?: string;
}
