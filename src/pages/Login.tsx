import React, { useState } from "react";
import UserForm from "../components/UserForm";
import { withAuth } from "../context/auth.context";
import { userValidators } from "../components/Validators";
import { useHistory } from "react-router-dom";

// login (parameters) comes from context/auth.context.js - withAuth
const Login = ({ login }) => {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      // login comes from context/auth.context.js - withAuth
      login(fields);
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
          buttonType="Login"
          fields={{ ...fields }}
          errors={{ ...errors }}
        />
      </div>
    </div>
  );
};

// withAuth comes from context and alow the component to use it
// methods - isLoading, isLoggedin, user, signup, login, logout, edit
export default withAuth(Login);
