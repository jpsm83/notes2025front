import axios, { AxiosInstance } from "axios";
import { IEditUserFields, ISignupFields, IUser } from "../interfaces/user";
import { handleError } from "../utils/handleError";

export default class UserService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL}/api/v1/users`,
      withCredentials: true, // Ensures cookies are sent for CORS
    });
  }

  // Signup method
  async signup(
    data: ISignupFields
  ): Promise<{ user: IUser; accessToken: string }> {
    try {
      const response = await this.instance.post<{
        user: IUser;
        accessToken: string;
      }>("/", data);
      const { accessToken, user } = response.data;

      if (accessToken) {
        localStorage.setItem("jwt", accessToken); // Save the token in localStorage
      }

      return { user, accessToken };
    } catch (error) {
      throw handleError(error); // Handle and throw the error
    }
  }

  // Edit user details
  async updateUser(id: string, data: IEditUserFields): Promise<IUser> {
    try {
      const response = await this.instance.patch<{ user: IUser }>(
        `/${id}`,
        data
      );
      return response.data.user;
    } catch (error) {
      throw handleError(error); // Handle and throw the error
    }
  }
}
