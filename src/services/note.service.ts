import axios, { AxiosInstance } from "axios";
import { handleError } from "../utils/handleError";

// interfaces
interface INote {
  _id?: string;
  dueDate: string;
  title: string;
  description: string;
  priority?: boolean;
  completed?: boolean;
  userId?: string;
}

// check if the environment is development or production
// development is 0 and production is 1
const devOrProd = import.meta.env.NODE_ENV === "development" ? 0 : 1;
// VITE_API_URL is a string with two URLs separated by "|", first one is dev and second one is prod
const apiUrl = (import.meta.env.VITE_API_URL).split("|")[devOrProd];

export default class NoteService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: `${apiUrl}/api/v1/notes`,
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

  // Create a new note
  async createNote(data: INote): Promise<{ success: boolean; error?: string }> {
    try {
      await this.instance.post<INote>("/", data);
      return { success: true }; // Return the created note with its ID
    } catch (error) {
      const message = (error as Error).message || "Create note failed!";
      console.error("Create note error:", message);
      return { success: false, error: message };
    }
  }

  // Get all notes
  async getNotes(): Promise<INote[]> {
    return this.handleRequest(() => this.instance.get<INote[]>("/"));
  }

  // Get a single note by ID
  async getNote(id: string): Promise<INote> {
    return this.handleRequest(() => this.instance.get<INote>(`/${id}`));
  }

  // Get a single note by ID
  async getNoteByUserId(id: string): Promise<INote> {
    return this.handleRequest(() => this.instance.get<INote>(`/user/${id}`));
  }

  // Delete a note by ID
  async deleteNote(id: string): Promise<void> {
    await this.handleRequest(() => this.instance.delete<void>(`/${id}`));
  }

  // Update a note by ID
  async updateNote(
    id: string,
    data: INote
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await this.instance.patch<INote>(`/${id}`, data);
      return { success: true };
    } catch (error) {
      const message = (error as Error).message || "Update note failed!";
      console.error("Update note error:", message);
      return { success: false, error: message };
    }
  }

  //Helper method to handle API requests
  private async handleRequest<T>(
    requestFn: () => Promise<{ data: T }>
  ): Promise<T> {
    try {
      const response = await requestFn();
      return response.data;
    } catch (error) {
      throw handleError(error); // Handle and throw the error
    }
  }
}
