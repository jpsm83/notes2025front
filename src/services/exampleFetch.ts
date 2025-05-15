import { handleError } from "../utils/handleError";

// Interfaces
interface INote {
  _id?: string;
  dueDate: string;
  title: string;
  description: string;
  priority?: boolean;
  completed?: boolean;
  userId?: string;
}

const devOrProd = import.meta.env.NODE_ENV === "development" ? 0 : 1;
const apiUrl = (import.meta.env.VITE_API_URL).split("|")[devOrProd];
const baseUrl = `${apiUrl}/api/v1/notes`;

export default class NoteService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem("jwt");

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        credentials: "include",
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || response.statusText);
      }

      // No content (204)
      if (response.status === 204) return null as unknown as T;

      const data = await response.json();
      return data;
    } catch (error) {
      throw handleError(error);
    }
  }

  async createNote(data: INote): Promise<{ success: boolean; error?: string }> {
    try {
      await this.request<INote>("/", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return { success: true };
    } catch (error) {
      const message = (error as Error).message || "Create note failed!";
      console.error("Create note error:", message);
      return { success: false, error: message };
    }
  }

  async getNotes(): Promise<INote[]> {
    return this.request<INote[]>("/", {
      method: "GET",
    });
  }

  async getNote(id: string): Promise<INote> {
    return this.request<INote>(`/${id}`, {
      method: "GET",
    });
  }

  async getNoteByUserId(id: string): Promise<INote> {
    return this.request<INote>(`/user/${id}`, {
      method: "GET",
    });
  }

  async deleteNote(id: string): Promise<void> {
    await this.request<void>(`/${id}`, {
      method: "DELETE",
    });
  }

  async updateNote(
    id: string,
    data: INote
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await this.request<INote>(`/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      return { success: true };
    } catch (error) {
      const message = (error as Error).message || "Update note failed!";
      console.error("Update note error:", message);
      return { success: false, error: message };
    }
  }
}
