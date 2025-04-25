import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

// imported services
import NoteService from "../services/note.service";

// imported components
import NoteDetail from "../components/NoteDetail";

interface Note {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: boolean;
  completed: boolean;
}

const Note: React.FC = () => {
  const { noteId } = useParams<{ noteId: string }>(); // Access the note ID from the route params
  const [note, setNote] = useState<Note | null>(null); // Use a nullable type for the note
  const noteService = useMemo(() => new NoteService(), []);

  const refreshState = useCallback(async () => {
    try {
      if (noteId) {
        const response = await noteService.getOne(noteId);
        setNote(response.data); // Set the note data
      }
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  }, [noteId, noteService]);

  // Fetch the note data when the component mounts or when the noteId changes
  useEffect(() => {
    if (noteId) {
      refreshState();
    }
  }, [noteId, refreshState]);

  if (!note) {
    return <p>Loading...</p>; // Show a loading message while the note is being fetched
  }

  return (
    <div>
      <main className="flex max-w-7xl mx-auto mt-3">
        <div className="flex flex-col w-full">
          <NoteDetail {...note} refreshState={refreshState} />
        </div>
      </main>
    </div>
  );
};

export default Note;
