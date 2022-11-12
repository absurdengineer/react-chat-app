export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

export interface Auth {
  user: User;
  token: string;
}

export interface RegisterData {
  name: string;
  email: string;
  username: string;
  password: string;
}
