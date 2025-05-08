export interface INote {
    _id: string;
    dueDate: string;
    title: string;
    description: string;
    priority: boolean;
    completed: boolean;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }

export interface ICreateNoteFields {
    title: string;
    dueDate: string;
    description: string;
  }

export interface IEditNoteFields {
    title: string;
    dueDate: string;
    description: string;
  }