import React, { useState, useEffect } from "react";
import NoteService from "../services/note.service";
import NoteForm from "../components/NoteForm";
import { noteValidators } from "../components/Validators";
import { useHistory } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const EditNote = (props) => {
  const [fields, setFields] = useState({
    title: "",
    dueDate: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    title: null,
    dueDate: null,
    description: null,
  });

  // connection with NoteService to be able to use all it services
  // note.service.js is the bridge to connect frontend with backend
  const noteService = new NoteService();
  const history = useHistory();

  useEffect(() => {
    // props.match.params.id is how you get params from the browser
    // in this case we get the note "id"
    const id = props.match.params.id;
    noteService
      .getOne(id)
      .then((response) => {
        // axios gives the response in '.data'
        setFields(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      updateNote();
    }
  };

  const updateNote = () => {
    const id = props.match.params.id;
    noteService
      .updateOne(id, fields)
      .then(() => {
        history.push("/");
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: noteValidators[name](value),
    });
  };

  const isValid = () => {
    return !Object.keys(errors).some((key) => errors[key]);
  };

  return (
    <div className="flex justify-center">
      <NoteForm
        isValid={() => isValid()}
        handleSubmit={(e) => handleSubmit(e)}
        handleChange={(e) => handleChange(e)}
        buttonType="Update"
        fields={{ ...fields }}
        errors={{ ...errors }}
      />
    </div>
  );
};

export default EditNote;
