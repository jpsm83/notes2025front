import React from "react";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";
import { Check, Star, Trash2, Undo2 } from "lucide-react";
import { toast } from "react-toastify";

// services
import NoteService from "../services/note.service";

// Define the props for the NoteDetail component
interface INoteDetailProps {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: boolean;
  dueDate: string;
  refreshNotes: () => void; // Callback to refresh the note data
}

const NoteDetail: React.FC<INoteDetailProps> = (props) => {
  const {
    _id,
    title,
    description,
    completed,
    priority,
    dueDate,
    refreshNotes,
  } = props;

  const noteService = new NoteService();
  const navigate = useNavigate();

  // Toggle the priority of a note
  const togglePriority = async () => {
    try {
      if (!_id) {
        console.error("Note is undefined");
        return;
      }
      await noteService.updateNote(_id, {
        ...props,
        priority: !priority,
      });
      toast.success(
        `Note ${priority ? "removed from" : "added to"} priority list!`
      );
      refreshNotes(); // Refresh the note data
    } catch (error) {
      console.error("Error toggling priority:", error);
      toast.error("Error toggling priority");
    }
  };

  // Toggle the completion status of a note
  const toggleCompleted = async () => {
    try {
      if (!_id) {
        console.error("Note is undefined");
        return;
      }

      await noteService.updateNote(_id, {
        ...props,
        completed: !completed,
      });
      toast.success(
        `Note ${completed ? "marked as incomplete" : "marked as complete"}!`
      );
      refreshNotes(); // Refresh the note data
    } catch (error) {
      console.error("Error toggling completion status:", error);
      toast.error("Error toggling completion status");
    }
  };

  // Delete a note
  const deleteNote = async () => {
    try {
      if (!_id) {
        console.error("Note is undefined");
        return;
      }

      await noteService.deleteNote(_id);
      toast.success("Note deleted successfully!");
      navigate("/"); // Redirect to the home page after deletion
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Error deleting note");
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto bg-white shadow-lg hover:shadow-xl m-5 rounded-lg p-8 transition duration-200">
      {/* Due Date */}
      <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4">
        <p
          onClick={togglePriority}
          className="cursor-pointer"
          title={priority ? "Remove from priority" : "Mark as priority"}
        >
          {priority ? (
            <Star className="h-7 text-yellow-500" />
          ) : (
            <Star className="h-7 text-gray-400" />
          )}
        </p>
        <p className="text-md sm:text-lg italic font-bold text-gray-500">
          Due Date:{" "}
          {dueDate
            ? moment(new Date(dueDate)).format("DD-MMM-yyyy")
            : "No due date"}
        </p>
        <p
          onClick={toggleCompleted}
          className="cursor-pointer"
          title={completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {completed ? (
            <Check className="h-7 text-green-600" />
          ) : (
            <Check className="h-7 text-gray-400" />
          )}
        </p>
      </div>

      {/* Title and Description */}
      <div className="flex flex-col bg-gray-100 rounded-lg p-4 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          {title}
        </h2>
        <p className="text-md sm:text-lg text-gray-600">{description}</p>
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
          to={`/edit-note/${_id}`}
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

export default NoteDetail;
