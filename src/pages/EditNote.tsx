import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// imported services
import NoteService from "../services/note.service";

// imported components
import NoteForm from "../components/NoteForm";

const EditNote: React.FC = () => {
  const [defaultValues, setDefaultValues] = useState({
    title: "",
    dueDate: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { noteId } = useParams<{ noteId: string }>();

  const noteService = useMemo(() => new NoteService(), []);

  useEffect(() => {
    if (noteId) {
      noteService
        .getOne(noteId)
        .then((response) => {
          setDefaultValues(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching note:", error);
          setLoading(false);
        });
    }
  }, [noteId, noteService]);

  const handleUpdateNote = async (data: {
    title: string;
    dueDate: string;
    description: string;
  }) => {
    try {
      if (noteId) {
        await noteService.updateOne(noteId, data);
        navigate("/"); // Redirect to the home page after successful update
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex justify-center">
      <NoteForm
        onSubmit={handleUpdateNote}
        buttonType="Update"
        defaultValues={defaultValues}
      />
    </div>
  );
};

export default EditNote;
