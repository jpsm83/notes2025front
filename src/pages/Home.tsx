import { useEffect, useState, useCallback, useMemo } from "react";
import { useAuth } from "../context/auth.context";

// interfaces
import { INote } from "../services/note.service";

// components
import NoteCard from "../components/NoteCard";
import NoteService from "../services/note.service";

const Home: React.FC = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const { user } = useAuth();
  const noteService = useMemo(() => new NoteService(), []);

  // Fetch notes from the backend
  const refreshState = useCallback(async () => {
    try {
      const response = await noteService.get();
      setNotes(response.data); // Set the fetched notes
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }, [noteService]);

  // Fetch notes when the component mounts
  useEffect(() => {
    refreshState();
  }, [refreshState]);

  // Display note cards for the logged-in user
  const displayNoteCards = () => {
    if (!user) return null;

    const userId = user._id;
    const organizedNotes = [...notes].sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );

    return organizedNotes.map((note) =>
      note.userId === userId ? (
        <NoteCard key={note.id} {...note} refreshState={refreshState} />
      ) : null
    );
  };

  return (
    <div>
      {!user ? (
        <div className="bg-gray-300 m-10 shadow-lg rounded-lg p-10">
          <h2 className="text-center text-xl sm:text-3xl font-bold text-yellow-600">
            Sign in and start to organize your agenda!
          </h2>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center m-5">
          {displayNoteCards()}
        </div>
      )}
    </div>
  );
};

export default Home;
