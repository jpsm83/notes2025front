import React from "react";
import { useNavigate } from "react-router-dom";

// imported services
import NoteService from "../services/note.service";

// imported components
import NoteForm from "../components/NoteForm";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth.context";

// interfaces
interface ICreateNoteFields {
  _id: string;
  title: string;
  dueDate: string;
  description: string;
  priority: boolean;
}

const CreateNote: React.FC = () => {
  const noteService = new NoteService();
  const navigate = useNavigate();
  const { user } = useAuth();

  if(!user) {
    navigate("/login");
    return null; // Prevent rendering if user is not authenticated
  }

  // Handle form submission
  const handleCreateNote: SubmitHandler<ICreateNoteFields> = async (data) => {
    try {
      const { success, error } = await noteService.createNote({ ...data, userId: user?._id });

      if (!success && error) {
        toast.warn(error);
        return;
      }

      toast.success("Note created successfully");
      navigate("/"); // Redirect to the home page after successful creation
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Error creating note");
    }
  };

  return <NoteForm onSubmit={handleCreateNote} buttonType="Create" />;
};

export default CreateNote;
