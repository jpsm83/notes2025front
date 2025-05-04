import axios, { AxiosInstance } from "axios";
import { handleError } from "../utils/handleError";

// interfaces
import { INote } from "../interfaces/note";

export default class NoteService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL}/api/v1/notes`,
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
  async createNote(data: INote): Promise<INote> {
    return this.handleRequest(() => this.instance.post<INote>("/", data));
  }

  // Get all notes
  async getNotes(): Promise<INote[]> {
    return this.handleRequest(() => this.instance.get<INote[]>("/"));
  }

  // Get a single note by ID
  async getNote(id: string): Promise<INote> {
    return this.handleRequest(() => this.instance.get<INote>(`/${id}`));
  }

  // Delete a note by ID
  async deleteNote(id: string): Promise<void> {
    await this.handleRequest(() => this.instance.delete<void>(`/${id}`));
  }

  // Update a note by ID
  async updateNote(id: string, data: INote): Promise<INote> {
    return this.handleRequest(() => this.instance.patch<INote>(`/${id}`, data));
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
