export interface IUser {
    _id: string;
    username: string;
    email: string;
    roles?: string[];
    password?: string;
    image?: string;
    accessToken?: string;
  }