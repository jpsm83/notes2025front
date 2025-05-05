import { useEffect, useState, useCallback, useMemo } from "react";
import { useAuth } from "../context/auth.context";

// interfaces
import { INote } from "../interfaces/note";

// components
import NoteCard from "../components/NoteCard";
import NoteService from "../services/note.service";

const Home: React.FC = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const { user } = useAuth();
  const noteService = useMemo(() => new NoteService(), []);

  // get notes from the backend
  const getUserNotes = useCallback(async () => {
    if (!user) return; // If user is not logged in, do not fetch notes
    try {
      const response = await noteService.getNoteByUserId(user?._id);
      setNotes(Array.isArray(response) ? response : [response]); // Ensure response is an array
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }, [noteService]);

  console.log(notes);

  // Fetch notes when the component mounts
  useEffect(() => {
    if (user) {
      getUserNotes();
    } else {
      setNotes([]); // Clear notes if user is not logged in
    }
  }, [user, getUserNotes]);

  // Display note cards for the logged-in user
  const displayNoteCards = () => {
    if (!notes) return null;

    const organizedNotes = [...notes].sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    ); // Sort notes by due date

    return organizedNotes.map((note) => <NoteCard key={note._id} {...note} />);
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
