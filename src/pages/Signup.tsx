import React from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import UserService from "../services/user.service";
import UserForm from "../components/UserForm";
import { ISignupFields } from "../interfaces/user";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const userService = new UserService();

  const handleSignup: SubmitHandler<ISignupFields> = async (data) => {
    try {
      await userService.signup(data);
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