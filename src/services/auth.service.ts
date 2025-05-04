import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IUser } from "../interfaces/user";

import { ILoginFields } from "../interfaces/user";

export default class AuthService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL}/api/v1/auth`,
      withCredentials: true, // Ensures cookies are sent for CORS
    });
  }

  // Login method
  login = async (data: ILoginFields): Promise<AxiosResponse<IUser>> => {
    const response = await this.instance.post<IUser>("/", data);
    const token = response.data.accessToken; // Extract the accessToken
    if (token) {
      localStorage.setItem("jwt", token); // Save the token in localStorage
    }
    return response;
  };

  // Logout method
  logout = (): Promise<AxiosResponse<void>> => {
    localStorage.removeItem("jwt"); // Remove the token from localStorage on logout
    return this.instance.post<void>("/logout");
  };

  // Check if the user is logged in
  isLoggedIn = async (): Promise<IUser | null> => {
    try {
      const response = await this.instance.get<{
        accessToken: string;
        user: IUser;
      }>("/refresh");

      const { accessToken, user } = response.data;

      if (accessToken) {
        localStorage.setItem("jwt", accessToken); // Save the refreshed token in localStorage
      }

      return user; // Return the user object directly from the response
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null; // Return null if the token is invalid or expired
    }
  };

  // Optional helper
  decodeUser(token: string): IUser | null {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return {
        _id: payload.UserInfo._id,
        username: payload.UserInfo.username,
        email: payload.UserInfo.email,
        roles: payload.UserInfo.roles,
        image: payload.UserInfo.image,
        accessToken: token,
      };
    } catch (e) {
      console.error("Failed to decode JWT", e);
      return null;
    }
  }
}
