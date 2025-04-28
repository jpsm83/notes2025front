import axios, { AxiosInstance, AxiosResponse } from "axios";
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
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // Create a new note
  createNote = (data: INote): Promise<AxiosResponse<INote>> => {
    return this.instance.post<INote>("/", data);
  };

  // Get all notes
  getNotes = (): Promise<AxiosResponse<INote[]>> => {
    return this.instance.get<INote[]>("/");
  };

  // Get a single note by ID
  getNote = (id: string): Promise<AxiosResponse<INote>> => {
    return this.instance.get<INote>(`/${id}`);
  };

  // Delete a note by ID
  deleteNote = (id: string): Promise<AxiosResponse<void>> => {
    return this.instance.delete<void>(`/${id}`);
  };

  // Update a note by ID
  updateNote = (id: string, data: INote): Promise<AxiosResponse<INote>> => {
    return this.instance.patch<INote>(`/${id}`, data);
  };
}