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