import React, { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Check, Star, Trash2 } from "lucide-react";

// services
import NoteService from "../services/note.service";
import { toast } from "react-toastify";

// Define the props for the NoteCard component
interface INote {
  _id: string;
  title: string;
  completed: boolean;
  priority: boolean;
  dueDate: string;
  description: string; // Optional description field
  refreshNotes: () => void; // Callback to refresh notes after an update
}

const NoteCard: React.FC<INote> = (props) => {
  const { _id, title, completed, priority, dueDate, refreshNotes } = props;

  const noteService = useMemo(() => new NoteService(), []);
  const navigate = useNavigate();

  // Toggle the priority of a note
  const togglePriority = useCallback(async () => {
    try {
      await noteService.updateNote(_id, {
        ...props,
        priority: !priority,
      });
      toast.success(
        `Note ${priority ? "removed from" : "added to"} priority list!`
      );
      refreshNotes(); // Refresh notes
    } catch (error) {
      console.error("Error toggling priority:", error);
      toast.error("Error toggling priority");
    }
  }, [noteService, _id, priority, props, refreshNotes]);

  // Toggle the completion status of a note
  const toggleCompleted = useCallback(async () => {
    try {
      await noteService.updateNote(_id, {
        ...props,
        completed: !completed,
      });
      toast.success(
        `Note ${completed ? "marked as incomplete" : "marked as complete"}!`
      );
      refreshNotes(); // Refresh notes
    } catch (error) {
      console.error("Error toggling completion status:", error);
      toast.error("Error toggling completion status");
    }
  }, [noteService, _id, completed, props, refreshNotes]);

  // Delete a note
  const deleteNote = useCallback(async () => {
    try {
      await noteService.deleteNote(_id);
      toast.success("Note deleted successfully!");
      refreshNotes(); // Refresh notes
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Error deleting note");
    }
  }, [noteService, _id, refreshNotes]);

  // Navigate to the note detail page
  const noteDetail = useCallback(() => {
    navigate(`/note/${_id}`);
  }, [navigate, _id]);

  return (
    <div className="flex flex-col w-80 mx-5 bg-white shadow-lg hover:shadow-2xl m-3 rounded-lg p-4 transition duration-200">
      {/* Due Date */}
      <div className="gap-4 bg-gray-100 rounded-lg p-2 flex justify-center items-center">
        <p className="text-gray-500 text-xl">
          {moment(new Date(dueDate)).format("MMM YYYY")}
        </p>
        <div className="text-4xl font-bold text-yellow-600">
          {moment(new Date(dueDate)).format("DD")}
        </div>
      </div>
      <div className="text-md sm:text-lg flex flex-col w-full mt-3 gap-4">
        {/* Title */}
        <h2 className="text-lg font-bold text-gray-800 mt-2">
          <span
            onClick={noteDetail}
            className="cursor-pointer hover:text-blue-600 transition duration-200"
          >
            {title}
          </span>
        </h2>

        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {/* Priority Toggle */}
              <button
                onClick={togglePriority}
                title={priority ? "Remove from priority" : "Mark as priority"}
              >
                <Star
                  size={20}
                  strokeWidth={3}
                  className={`cursor-pointer ${
                    priority ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              </button>
              {/* Completed Toggle */}
              <button
                onClick={toggleCompleted}
                title={completed ? "Mark as incomplete" : "Mark as complete"}
              >
                <Check
                  size={20}
                  strokeWidth={3}
                  className={`cursor-pointer ${
                    completed ? "text-green-600" : "text-gray-300"
                  }`}
                />
              </button>
            </div>
          </div>
          {/* Delete Note */}
          <button onClick={deleteNote} title="Delete note">
            <Trash2
              size={20}
              className="cursor-pointer text-red-500 hover:text-red-600"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
