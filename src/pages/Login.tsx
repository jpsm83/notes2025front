import React from "react";
import { useNavigate } from "react-router-dom";

// imported hooks
import { useAuth } from "../context/auth.context";

// imported components
import UserForm from "../components/UserForm";

const Login: React.FC = () => {
  const { login } = useAuth(); // Access the login method from the auth context
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      await login(data); // Call the login method from the auth context
      navigate("/"); // Redirect to the home page after successful login
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="m-10 flex flex-shrink">
        <UserForm
          onSubmit={handleLogin}
          buttonType="Login"
          isEditMode={false} // Ensure username is not shown
        />
      </div>
    </div>
  );
};

export default Login;
