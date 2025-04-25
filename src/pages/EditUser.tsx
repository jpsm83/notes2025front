import React, { useState, useEffect } from "react";
import UserForm from "../components/UserForm";
import { withAuth } from "../context/auth.context";
import { userValidators } from "../components/Validators";
import { useHistory } from "react-router-dom";

// edit & user (parameters) comes from context/auth.context.js - withAuth
const EditUser = ({ edit, user }) => {
  const [fields, setFields] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
  });
  const [errors, setErrors] = useState({
    username: null,
    email: null,
    password: null,
    image: null,
  });

  const history = useHistory();

  // better get the user details on the DB so you
  // can get the image as well
  // user from auth gives you email & username only
  useEffect(() => {
    setFields(user);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      edit(fields);
      history.push("/");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: userValidators[name](value),
    });
  };

  const isValid = () => {
    return !Object.keys(errors).some((key) => errors[key]);
  };

  return (
    <div className="flex justify-center">
      <UserForm
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

// withAuth comes from context and alow the component to use it
// methods - isLoading, isLoggedin, user, signup, login, logout, edit
export default withAuth(EditUser);
