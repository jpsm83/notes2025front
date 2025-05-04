export interface IUser {
  _id: string;
  username: string;
  email: string;
  roles: string[];
  password?: string;
  image: string;
  accessToken: string;
}

export interface ISignupFields {
  username: string;
  email: string;
  password: string;
  roles: string[];
}

export interface ILoginFields {
  email: string;
  password: string;
}

export interface IEditUserFields {
  username: string;
  email: string;
  roles: string[];
  password: string;
}
