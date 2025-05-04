import axios, { AxiosInstance } from "axios";
import { IUser, ILoginFields } from "../interfaces/user";
import { handleError } from "../utils/handleError";

export default class AuthService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL}/api/v1/auth`,
      withCredentials: true, // Ensures cookies are sent for CORS
    });
  }

  // Login method
  async login(data: ILoginFields): Promise<{ user: IUser; accessToken: string }> {
    try {
      const response = await this.instance.post<{ user: IUser; accessToken: string }>("/", data);

      const { accessToken, user } = response.data;

      if (accessToken) {
        localStorage.setItem("jwt", accessToken); // Save the token in localStorage
      }

      return { user, accessToken };
    } catch (error) {
      throw handleError(error); // Handle and rethrow the error
    }
  }

  // Logout method
  async logout(): Promise<void> {
    try {
      await this.instance.post<void>("/logout");
      localStorage.removeItem("jwt"); // Remove the token from localStorage
    } catch (error) {
      throw handleError(error); // Handle and throw the error
    }
  }

  // Refresh token and get user info
  async refresh(): Promise<{ user: IUser; accessToken: string }> {
    try {
      const response = await this.instance.get<{ user: IUser; accessToken: string }>("/refresh");
      const { accessToken, user } = response.data;

      if (accessToken) {
        localStorage.setItem("jwt", accessToken); // Save the refreshed token in localStorage
      }

      return { user, accessToken };
    } catch (error) {
      throw handleError(error); // Handle and throw the error
    }
  }
}