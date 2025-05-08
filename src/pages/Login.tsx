import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

// components
import UserForm from "../components/UserForm";

// interfaces
import { ILoginFields } from "../interfaces/user";

// context
import { useAuth } from "../context/auth.context";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin: SubmitHandler<ILoginFields> = async (data) => {
    try {
      const { success, error } = await login(data);
      if (!success && error) {
        toast.warn(error);
        return;
      }
      navigate("/");
    } catch (error) {
      console.error(`Login failed, error: ${error}`);
      toast.error(`Login failed, error: ${error}`);
    }
  };

  return <UserForm<ILoginFields> onSubmit={handleLogin} buttonType="Login" />;
};

export default Login;
