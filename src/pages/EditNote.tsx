import React, { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

// services
import NoteService from "../services/note.service";

// components
import NoteForm from "../components/NoteForm";
import { useFetch } from "../hooks/useFetch";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

// interfaces
interface IEditNoteFields {
  _id: string;
  title: string;
  dueDate: string;
  description: string;
  priority: boolean;
}

const EditNote: React.FC = () => {
  const { noteId } = useParams<{ noteId: string }>(); // Get noteId from URL params
  const noteService = useMemo(() => new NoteService(), []);
  const navigate = useNavigate();

  // Fetch the note details using useFetch
  const fetchNote = useCallback(async () => {
    if (!noteId) {
      throw new Error("Note ID is undefined");
    }
    return await noteService.getNote(noteId);
  }, [noteId, noteService]);

  const { data: note, loading, error } = useFetch(fetchNote);

  const defaultValues = {
    _id: note?._id || "",
    title: note?.title || "",
    dueDate: note?.dueDate || "",
    description: note?.description || "",
    priority: note?.priority || false,
  };

  const renderMessage = (title: string, message: string, color = "gray") => (
    <div className="flex justify-center items-center m-6">
      <div className="text-center">
        <h2 className={`text-2xl font-bold text-${color}-700`}>{title}</h2>
        <p className="text-lg text-gray-600 mt-2">{message}</p>
      </div>
    </div>
  );

  if (loading) {
    return renderMessage("Loading", "Loading note details...", "blue");
  }

  if (error) {
    return renderMessage("Error", error.toString(), "red");
  }

  if (!note) {
    return renderMessage(
      "No Note Found",
      "The note you are looking for does not exist."
    );
  }

  // handle form submission
  const handleUpdateNote: SubmitHandler<IEditNoteFields> = async (data) => {
console.log("Form data:", data);
    try {
      if (!noteId) {
        console.error("Note ID is missing!");
        toast.error("Note ID is missing");
        return;
      }
console.log("Updating note with ID:", noteId);
      const { success, error } = await noteService.updateNote(noteId, data);
console.log("Updated note with ID:", noteId);

      if (!success && error) {
        toast.warn(error);
        return;
      }

      toast.success("Note updated successfully");
      navigate(`note/${noteId}`); // Redirect to the note detail page after successful update
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Error updating note");
    }
  };

  return (
      <NoteForm
        onSubmit={handleUpdateNote}
        buttonType="Update"
        defaultValues={defaultValues}
      />
  );
};

export default EditNote;
