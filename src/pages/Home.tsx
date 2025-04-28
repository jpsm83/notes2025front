import { useEffect, useState, useCallback, useMemo } from "react";
import { useAuth } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

// interfaces
import { INote } from "../interfaces/note";

// components
import NoteCard from "../components/NoteCard";
import NoteService from "../services/note.service";

const Home: React.FC = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const { user } = useAuth();
  const noteService = useMemo(() => new NoteService(), []);
  const navigate = useNavigate();

  console.log("User in Home:", user);
  console.log("Notes in Home:", notes);

  // Redirect to login if no user is logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch notes from the backend
  const refreshState = useCallback(async () => {
    try {
      const response = await noteService.getNotes();
      const validNotes = response.data.filter(
        (note: INote) =>
          note.dueDate && !isNaN(new Date(note.dueDate).getTime()) && note.userId
      ); // Filter out invalid notes
      setNotes(validNotes); // Set only valid notes
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }, [noteService]);

  // Fetch notes when the component mounts
  useEffect(() => {
    if (user) {
      refreshState();
    }
  }, [refreshState, user]);

  // Display note cards for the logged-in user
  const displayNoteCards = () => {
    if (!user) return null;

    const userId = user._id;
    const organizedNotes = [...notes]
      .filter((note) => note.userId === userId) // Filter notes for the logged-in user
      .sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      ); // Sort notes by due date

    return organizedNotes.map((note) => (
      <NoteCard key={note._id} {...note} refreshState={refreshState} />
    ));
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center m-5">
        {displayNoteCards()}
      </div>
    </div>
  );
};

export default Home;