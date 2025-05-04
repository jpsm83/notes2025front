import React from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import UserForm from "../components/UserForm";
import { ISignupFields } from "../interfaces/user";
import { useAuth } from "../context/auth.context";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup: SubmitHandler<ISignupFields> = async (data) => {
    try {
      await signup(data);
      navigate("/");
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <UserForm<ISignupFields>
      onSubmit={handleSignup}
      buttonType="Signup"
    />
  );
};

export default Signup;