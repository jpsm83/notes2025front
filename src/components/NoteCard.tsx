import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Check, Star } from "lucide-react";

// imported hooks
import NoteService from "../services/note.service";

// Define the props for the NoteCard component
interface INoteCardProps {
  _id: string;
  title: string;
  completed: boolean;
  priority: boolean;
  dueDate: string;
  refreshState: () => void;
}

const NoteCard: React.FC<INoteCardProps> = ({
  _id,
  title,
  completed,
  priority,
  dueDate,
  refreshState,
}) => {
  const noteService = new NoteService();
  const navigate = useNavigate();

  // Delete a note
  const deleteNote = async () => {
    try {
      await noteService.deleteOne(_id);
      refreshState();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Toggle the priority of a note
  const togglePriority = async () => {
    try {
      await noteService.updateOne(_id, { priority: !priority });
      refreshState();
    } catch (error) {
      console.error("Error toggling priority:", error);
    }
  };

  // Toggle the completion status of a note
  const toggleDone = async () => {
    try {
      await noteService.updateOne(_id, { completed: !completed });
      refreshState();
    } catch (error) {
      console.error("Error toggling completion status:", error);
    }
  };

  // Navigate to the note detail page
  const noteDetail = () => {
    navigate(`/note/${_id}`);
  };

  return (
    <div className="flex justify-start w-80 mx-5 bg-gray-300 shadow-lg hover:shadow-xl hover:bg-blue-200 m-3 rounded-lg p-2">
      <h1
        onClick={noteDetail}
        className="text-4xl mr-2 cursor-pointer sm:text-5xl bg-gray-100 font-bold text-yellow-600 rounded-lg p-1 flex justify-center items-center"
      >
        {moment(new Date(dueDate)).format("DD")}
      </h1>
      <div className="text-md sm:text-lg flex flex-col w-full">
        <div className="flex justify-between">
          <p className="text-gray-700">
            {moment(new Date(dueDate)).format("MMM-yyyy")}
          </p>
          <div className="flex cursor-pointer">
            <p onClick={togglePriority}>
              {priority ? (
                <Star className="h-5 text-yellow-500" />
              ) : (
                <Star className="h-5 text-gray-400" />
              )}
            </p>
            <p onClick={toggleDone}>
              {completed ? (
                <Check className="h-5 text-green-600" />
              ) : (
                <Check className="h-5 text-gray-400" />
              )}
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <h2
              onClick={noteDetail}
              className="text-md font-bold cursor-pointer text-yellow-800 sm:text-lg"
            >
              {title}
            </h2>
          </div>

          {completed && (
            <button
              className="shadow-md items-center text-white text-center justify-center px-6 hover:shadow-xl bg-red-700 hover:scale-105 transition transform duration-200 ease-out rounded-lg"
              onClick={deleteNote}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
