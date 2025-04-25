import React from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";

// imported hooks
import { useAuth } from "../context/auth.context";

// imported components
import UserForm from "../components/UserForm";
import { IUserFormFields } from "../components/UserForm";

const Signup: React.FC = () => {
  const { signup } = useAuth(); // Access the signup method from the auth context
  const navigate = useNavigate();

  const handleSignup: SubmitHandler<IUserFormFields> = async (data) => {
    try {
      await signup(data); // Call the signup method from the auth context
      navigate("/"); // Redirect to the home page after successful signup
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="m-10 flex flex-shrink">
        <UserForm onSubmit={handleSignup} buttonType="Signup" />
      </div>
    </div>
  );
};

export default Signup;
