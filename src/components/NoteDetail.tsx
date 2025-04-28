import React from "react";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";
import { Check, Star } from "lucide-react";

// imported hooks
import NoteService from "../services/note.service";

// Define the props for the NoteDetail component
interface INoteDetailProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: boolean;
  dueDate: string;
  refreshState: () => void;
}

const NoteDetail: React.FC<INoteDetailProps> = ({
  id,
  title,
  description,
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
      await noteService.deleteOne(id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Toggle the priority of a note
  const togglePriority = async () => {
    try {
      await noteService.updateOne(id, { priority: !priority });
      refreshState();
    } catch (error) {
      console.error("Error toggling priority:", error);
    }
  };

  // Toggle the completion status of a note
  const toggleDone = async () => {
    try {
      await noteService.updateOne(id, { completed: !completed });
      refreshState();
    } catch (error) {
      console.error("Error toggling completion status:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col bg-blue-200 shadow-lg m-10 space-y-4 rounded-lg p-5">
        <div className="flex space-x-6 justify-center p-3 bg-gray-100 rounded-lg">
          <p onClick={togglePriority}>
            {priority ? (
              <Star className="h-7 text-yellow-500" />
            ) : (
              <Star className="h-7 text-gray-400" />
            )}
          </p>
          <p className="text-md sm:text-lg italic font-bold text-gray-500">
            Due Date: {moment(new Date(dueDate)).format("DD-MMM-yyyy")}
          </p>
          <p onClick={toggleDone}>
            {completed ? (
              <Check className="h-7 text-green-600" />
            ) : (
              <Check className="h-7 text-gray-400" />
            )}
          </p>
        </div>
        <div className="flex flex-col justify-items-start p-3 bg-gray-100 rounded-lg">
          <p className="text-xl text-yellow-800 sm:text-3xl font-bold mb-3">
            {title}
          </p>
          <p className="text-md sm:text-lg">{description}</p>
        </div>
        <div className="flex justify-between">
          <button
            className="shadow-md items-center text-white text-center justify-center px-6 py-1 hover:shadow-xl bg-yellow-700 hover:scale-105 transition transform duration-200 ease-out rounded-lg"
            onClick={() => navigate("/")}
          >
            Back to To Dos
          </button>
          <button
            className="shadow-md items-center text-white text-center justify-center px-6 py-1 hover:shadow-xl bg-red-700 hover:scale-105 transition transform duration-200 ease-out rounded-lg"
            onClick={deleteNote}
          >
            Delete
          </button>
          <button className="shadow-md items-center text-white text-center justify-center px-6 py-1 hover:shadow-xl bg-green-700 hover:scale-105 transition transform duration-200 ease-out rounded-lg">
            <Link to={`/edit-note/${id}`}>Edit To Do</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
