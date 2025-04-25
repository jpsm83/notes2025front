import axios, { AxiosInstance, AxiosResponse } from "axios";

// Define types for the data and responses
interface INote {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface ICreateNoteData {
  title: string;
  content: string;
}

interface IUpdateNoteData {
  title?: string;
  content?: string;
}

export default class NoteService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/notes`,
      withCredentials: true, // Ensures cookies are sent for CORS
    });
  }

  // Create a new note
  create = (data: ICreateNoteData): Promise<AxiosResponse<INote>> => {
    return this.instance.post<INote>("/", data);
  };

  // Get all notes
  get = (): Promise<AxiosResponse<INote[]>> => {
    return this.instance.get<INote[]>("/");
  };

  // Get a single note by ID
  getOne = (id: string): Promise<AxiosResponse<INote>> => {
    return this.instance.get<INote>(`/${id}`);
  };

  // Delete a note by ID
  deleteOne = (id: string): Promise<AxiosResponse<void>> => {
    return this.instance.delete<void>(`/${id}`);
  };

  // Update a note by ID
  updateOne = (id: string, data: IUpdateNoteData): Promise<AxiosResponse<INote>> => {
    return this.instance.put<INote>(`/${id}`, data);
  };
}