import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IUser } from "../interfaces/user";

export default class UserService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL}/api/v1/user`,
      withCredentials: true, // Ensures cookies are sent for CORS
    });
  }

  // Signup method
  signup = (data: IUser): Promise<AxiosResponse<IUser>> => {
    return this.instance.post<IUser>("/", data);
  };

  // Edit user details
  updateUser = (id: string, data: IUser): Promise<AxiosResponse<IUser>> => {
    return this.instance.patch<IUser>(`/${id}`, data);
  };
}