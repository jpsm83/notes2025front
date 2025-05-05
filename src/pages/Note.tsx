import React, { useMemo, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";

// imported services
import NoteService from "../services/note.service";

// imported components
import NoteDetail from "../components/NoteDetail";
import { useFetch } from "../hooks/useFetch";

const Note: React.FC = () => {
  const { noteId } = useParams<{ noteId: string }>(); // Access the note ID from the route params
  const noteService = useMemo(() => new NoteService(), []);

  // Memoize the fetch function to prevent infinite loops
  const fetchNote = useCallback(() => {
    if (!noteId) {
      throw new Error("Note ID is undefined");
    }
    return noteService.getNote(noteId);
  }, [noteId, noteService]);

  // Use the useFetch hook to fetch the note
  const { data: note, loading, error, refetch } = useFetch(fetchNote);

  if (error) {
    return <p>Error: {error}</p>; // Show an error message if fetching fails
  }

  if (!note && !loading) {
    return <p>No note found.</p>; // Handle the case where the note is null
  }

  return (
    <div>
      <main className="flex max-w-7xl mx-auto mt-3">
        <div className="flex flex-col w-full">
          <Suspense fallback={<p>Loading note details...</p>}>
            {note && <NoteDetail {...note} refreshNotes={refetch} />}
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Note;
