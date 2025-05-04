import React from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import AuthService from "../services/auth.service";
import UserForm from "../components/UserForm";
import { ILoginFields } from "../interfaces/user";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const authService = new AuthService();

  const handleLogin: SubmitHandler<ILoginFields> = async (data) => {
    try {
      await authService.login(data);
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <UserForm<ILoginFields>
      onSubmit={handleLogin}
      buttonType="Login"
    />
  );
};

export default Login;