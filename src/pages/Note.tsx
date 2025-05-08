import React, { useCallback, useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import moment from "moment";
import { Check, Star, Trash2, Undo2 } from "lucide-react";
import { toast } from "react-toastify";

// services
import NoteService from "../services/note.service";

// hooks
import { useFetch } from "../hooks/useFetch";

const Note: React.FC = () => {
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

  const { data: note, loading, error, refetch } = useFetch(fetchNote);

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

  // Toggle the priority of a note
  const togglePriority = async () => {
    try {
      if (!noteId) {
        throw new Error("Note ID is undefined");
      }
      await noteService.updateNote(noteId, {
        ...note,
        priority: !note.priority,
      });
      toast.success(
        `Note ${note.priority ? "removed from" : "added to"} priority list!`
      );
      refetch(); // Refresh the note data
    } catch (error) {
      console.error("Error toggling priority:", error);
      toast.error("Error toggling priority");
    }
  };

  // Toggle the completion status of a note
  const toggleCompleted = async () => {
    try {
      if (!noteId) {
        throw new Error("Note ID is undefined");
      }
      await noteService.updateNote(noteId, {
        ...note,
        completed: !note.completed,
      });
      toast.success(
        `Note ${
          note.completed ? "marked as incomplete" : "marked as complete"
        }!`
      );
      refetch(); // Refresh the note data
    } catch (error) {
      console.error("Error toggling completion status:", error);
      toast.error("Error toggling completion status");
    }
  };

  // Delete a note
  const deleteNote = async () => {
    try {
      if (!noteId) {
        throw new Error("Note ID is undefined");
      }
      await noteService.deleteNote(noteId);
      toast.success("Note deleted successfully!");
      navigate("/"); // Redirect to the home page after deletion
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Error deleting note");
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-6 bg-white shadow-lg hover:shadow-xl m-5 rounded-lg p-8 transition duration-200">
      {/* Due Date */}
      <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4">
        <p
          onClick={togglePriority}
          className="cursor-pointer"
          title={note.priority ? "Remove from priority" : "Mark as priority"}
        >
          {note.priority ? (
            <Star className="h-7 text-yellow-500" />
          ) : (
            <Star className="h-7 text-gray-400" />
          )}
        </p>
        <p className="text-md sm:text-lg italic font-bold text-gray-500">
          Due Date:{" "}
          {note.dueDate
            ? moment(new Date(note.dueDate)).format("DD-MMM-yyyy")
            : "No due date"}
        </p>
        <p
          onClick={toggleCompleted}
          className="cursor-pointer"
          title={note.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {note.completed ? (
            <Check className="h-7 text-green-600" />
          ) : (
            <Check className="h-7 text-gray-400" />
          )}
        </p>
      </div>

      {/* Title and Description */}
      <div className="flex flex-col bg-gray-100 rounded-lg p-4 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          {note.title}
        </h2>
        <p className="text-md sm:text-lg text-gray-600">{note.description}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-2 md:gap-4 lg:gap-6">
        <button onClick={() => navigate("/")}>
          <Undo2
            size={20}
            strokeWidth={3}
            className="cursor-pointer text-gray-400 hover:text-green-700 transition duration-200"
          />
        </button>

        <Link
          to={`/edit-note/${noteId}`}
          className="w-40 bg-blue-600 text-white font-medium py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 cursor-pointer text-center"
        >
          Edit Note
        </Link>
        <button onClick={deleteNote} title="Delete note">
          <Trash2
            size={20}
            strokeWidth={3}
            className="cursor-pointer text-gray-400 hover:text-red-600 transition duration-200"
          />
        </button>
      </div>
    </div>
  );
};

export default Note;
