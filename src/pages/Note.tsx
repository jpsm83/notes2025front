import React, { useEffect, useState } from "react";
import NoteDetail from "../components/NoteDetail";
import NoteService from "../services/note.service";

const Note = (props) => {
  const [note, setNote] = useState({});

  const noteService = new NoteService();

  // useEffect is the first method to execute in a component
  useEffect(() => {
    refreshState();
  }, []);

  const refreshState = () => {
    noteService
      .getOne(props.match.params.id)
      .then((res) => {
        // axios gives the response in '.data'
        setNote(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <main className="flex max-w-7xl mx-auto mt-3">
        <div className="flex flex-col w-full">
          <NoteDetail {...note} refreshState={() => refreshState()} />
        </div>
      </main>
    </div>
  );
};

export default Note;
