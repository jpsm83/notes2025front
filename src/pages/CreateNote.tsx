import React from "react";
import { useNavigate } from "react-router-dom";

// imported services
import NoteService from "../services/note.service";

// imported components
import NoteForm from "../components/NoteForm";

const CreateNote: React.FC = () => {
  const noteService = new NoteService();
  const navigate = useNavigate();

  // Handle form submission
  const handleCreateNote = async (data: {
    title: string;
    dueDate: string;
    description: string;
  }) => {
    try {
      await noteService.create(data);
      navigate("/"); // Redirect to the home page after successful creation
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <NoteForm onSubmit={handleCreateNote} buttonType="Create" />
    </div>
  );
};

export default CreateNote;
