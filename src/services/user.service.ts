import axios, { AxiosInstance } from "axios";

// interfaces
import { IEditUserFields, ISignupFields, IUser } from "../interfaces/user";

// utils
import { handleError } from "../utils/handleError";

// check if the environment is development or production
// development is 0 and production is 1
const devOrProd = import.meta.env.NODE_ENV === "development" ? 0 : 1;
// VITE_API_URL is a string with two URLs separated by "|", first one is dev and second one is prod
const apiUrl = (import.meta.env.VITE_API_URL).split("|")[devOrProd];

export default class UserService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: `${apiUrl}/api/v1/users`,
      withCredentials: true, // Ensures cookies are sent for CORS
    });

    // Add an interceptor to include the Authorization header
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("jwt"); // Retrieve the JWT from localStorage
        if (token) {
          config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
        }
        return config;
      },
      (error) => Promise.reject(error) // Reject the promise on request error
    );
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
  async updateUser(
    id: string,
    data: IEditUserFields
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await this.instance.patch<{ user: IUser }>(`/${id}`, data);
      return { success: true };
    } catch (error) {
      const message = (error as Error).message || "Update user failed!";
      console.error("Update user error:", message);
      return { success: false, error: message };
    }
  }
}
