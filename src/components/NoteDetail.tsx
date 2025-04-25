import React from "react";
import moment from "moment";
import { StarIcon, CheckIcon } from "@heroicons/react/solid";
import NoteService from "../services/note.service";
import { useHistory, Link } from "react-router-dom";

export default function NoteDetail({
  title,
  description,
  done,
  priority,
  id,
  dueDate,
  refreshState,
}) {
  const noteService = new NoteService();
  const history = useHistory();

  const deleteNote = () => {
    noteService
      .deleteOne(id)
      .then(() => {
        history.push("/")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const togglePriority = () => {
    noteService
      .updateOne(id, { priority: !priority })
      .then(() => {
        refreshState();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleDone = () => {
    noteService
      .updateOne(id, { done: !done })
      .then(() => {
        refreshState();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="flex flex-col bg-blue-200 shadow-lg m-10 space-y-4 rounded-lg p-5">
        <div className="flex space-x-6 justify-center p-3 bg-gray-100 rounded-lg">
          <p onClick={() => togglePriority()}>
            {priority ? (
              <StarIcon className="h-7 text-yellow-500" />
            ) : (
              <StarIcon className="h-7 text-gray-400" />
            )}
          </p>
          <p className="text-md sm:text-lg italic font-bold text-gray-500">
            Due Date: {moment(new Date(dueDate)).format("DD-MMM-yyyy")}
          </p>
          <p onClick={() => toggleDone()}>
            {done ? (
              <CheckIcon className="h-7 text-green-600" />
            ) : (
              <CheckIcon className="h-7 text-gray-400" />
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
            onClick={() => history.push("/")}
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
}
