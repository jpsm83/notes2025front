import axios, { AxiosInstance, AxiosResponse } from "axios";

// Define types for the data and responses
export interface ISignupData {
  username: string;
  email: string;
  password: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  password?: string;
}

export default class AuthService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/auth`,
      withCredentials: true, // Ensures cookies are sent for CORS
    });
  }

  // Signup method
  signup = (data: ISignupData): Promise<AxiosResponse<IUser>> => {
    return this.instance.post<IUser>("/signup", data);
  };

  // Login method
  login = (data: ILoginData): Promise<AxiosResponse<IUser>> => {
    return this.instance.post<IUser>("/login", data);
  };

  // Logout method
  logout = (): Promise<AxiosResponse<void>> => {
    return this.instance.post<void>("/logout");
  };

  // Check if user is logged in
  isLoggedin = (): Promise<AxiosResponse<IUser>> => {
    return this.instance.get<IUser>("/isLoggedin");
  };

  // Edit user details
  edit = (data: Partial<IUser>): Promise<AxiosResponse<IUser>> => {
    return this.instance.put<IUser>("/edit-user", data);
  };
}