import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IEditUserFields, ISignupFields } from "../interfaces/user";

export default class UserService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL}/api/v1/user`,
      withCredentials: true, // Ensures cookies are sent for CORS
    });
  }

  // Signup method
  signup = (data: ISignupFields): Promise<AxiosResponse<ISignupFields>> => {
    return this.instance.post<ISignupFields>("/", data);
  };

  // Edit user details
  updateUser = (id: string, data: IEditUserFields): Promise<AxiosResponse<IEditUserFields>> => {
    return this.instance.patch<IEditUserFields>(`/${id}`, data);
  };
}
