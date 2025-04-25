/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { withAuth } from "../context/auth.context";
import NoteService from "../services/note.service";

const Home = ({ user }) => {
  const [notes, setNotes] = useState([]);

  // connection with RecipeService to be able to use all it services
  // note.service.js is the bridge to connect frontend with backend
  const noteService = new NoteService();

  // useEffect is the first method to execute in a component
  useEffect(() => {
    refreshState();
  }, []);

  const refreshState = () => {
    noteService
      .get()
      .then((response) => {
        // axios gives the response in '.data'
        setNotes(response.data);
      })
      .catch((err) => console.error(err));
  };

  const displayNoteCards = () => {
    const userId = user.id;
    let organizedNotes = [...notes].sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );
    return organizedNotes.map((note) => {
      // the username in notes comes with the id of the user
      if (note.username === userId) {
        return (
          <NoteCard
            key={note.id}
            {...note}
            refreshState={() => refreshState()}
          />
        );
      }
    });
  };

  // function sortByChoosen(sortType) {
  //   return (a, b) => b[sortType] - a[sortType];
  // }

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

// withAuth comes from context and alow the component to use it
// methods - isLoading, isLoggedin, user, signup, login, logout, edit
export default withAuth(Home);
