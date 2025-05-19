import React, {
  useEffect,
  useState,
  useMemo,
  Suspense,
} from "react";
import { useSeo } from "../hooks/useSeo";

// context
import { useAuth } from "../context/auth.context";

// interfaces
interface INote {
  _id: string;
  description: string;
  dueDate: string;
  title: string;
  priority: boolean;
  completed: boolean;
}

// components
const NoteCard = React.lazy(() => import("../components/NoteCard"));

// services
import NoteService from "../services/note.service";
import { useFetch } from "../hooks/useFetch";
import { toast } from "react-toastify";
import { ErrorFallback } from "../components/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import NoteSkeleton from "../skeletons/NoteSkeleton";
import Spinner from "../components/Spinner";

const Home: React.FC = () => {
  const helmet = useSeo({
    title: "Notes Home Page",
    description: "Main page where user notes are rendered",
    keywords: "react, notes, todo, app",
    image:
      "https://play.google.com/store/apps/details?id=com.apps.diary.notepad.notebook.privatenotes.color.note&hl=en_AU",
    url: "https://localhost:5173/",
  });

  const [notes, setNotes] = useState<INote[]>([]);
  const { user } = useAuth();
  const noteService = useMemo(() => new NoteService(), []);

  // // service to fetch notes by user ID
  // const getUserNotes = useCallback(async () => {
  //   if (!user) return [];
  //   try {
  //     return await noteService.getNoteByUserId(user._id);
  //   } catch (error) {
  //     toast.error("Error fetching notes!");
  //     console.error(`Error fetching notes: ${error}`);
  //   }
  // }, [noteService, user]);

  // useFetch hook to fetch notes
const { data, loading, error, refetch } = useFetch(async() => {
  if (!user) return Promise.resolve([]);
  return await noteService.getNoteByUserId(user._id);
});

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setNotes(data as INote[]);
    }
  }, [data]);

  if (error) {
    toast.error("Error fetching notes!");
    console.error(`Error fetching notes: ${error}`);
  }

  const displayNoteCards = () => {
    return notes
      .slice()
      .sort((a, b) => {
        const aPriority = a.priority ? 1 : 0;
        const bPriority = b.priority ? 1 : 0;

        if (aPriority !== bPriority) return bPriority - aPriority;

        const aDate = new Date(a.dueDate || 0).getTime();
        const bDate = new Date(b.dueDate || 0).getTime();
        return aDate - bDate;
      })
      .map((note) => (
        <ErrorBoundary
          key={note._id}
          FallbackComponent={ErrorFallback}
          onReset={() => {}}
        >
          <Suspense key={note._id} fallback={<NoteSkeleton />}>
            <NoteCard key={note._id} {...note} refreshNotes={refetch} />
          </Suspense>
        </ErrorBoundary>
      ));
  };

  return (
    <div className="py-10">
      {helmet}
      {!user ? (
        <div className="bg-white shadow-md rounded-lg p-10 mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Sign in and start organizing your agenda!
          </h2>
        </div>
      ) : loading ? (
        <Spinner />
      ) : notes.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-10 mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            No notes available
          </h2>
          <p className="text-gray-600 mt-2">
            Create your first note to get started!
          </p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col gap-4 items-center justify-start">
            {displayNoteCards()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
