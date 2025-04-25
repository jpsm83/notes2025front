import React, { useState } from "react";
import UserForm from "../components/UserForm";
import { withAuth } from "../context/auth.context";
import { userValidators } from "../components/Validators";
import { useHistory } from "react-router-dom";

// signup (parameters) comes from context/auth.context.js - withAuth
const Signup = ({ signup }) => {
  const [fields, setFields] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    username: null,
    password: null,
    email: null,
  });

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      // signup comes from context/auth.context.js - withAuth
      signup(fields);
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
      <div className="m-10 flex flex-shrink">
        <UserForm
          isValid={() => isValid()}
          handleSubmit={(e) => handleSubmit(e)}
          handleChange={(e) => handleChange(e)}
          buttonType="Signup"
          fields={{ ...fields }}
          errors={{ ...errors }}
        />
      </div>
    </div>
  );
};

// withAuth comes from context and alow the component to use it
// methods - isLoading, isLoggedin, user, signup, login, logout, edit
export default withAuth(Signup);
