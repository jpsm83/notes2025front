import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import UserForm from "../components/UserForm";
import { ILoginFields } from "../interfaces/user";
import { useAuth } from "../context/auth.context";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin: SubmitHandler<ILoginFields> = async (data) => {
    const { success, error } = await login(data);
    if (!success && error) {
      toast.warn(error);
      return;
    }
    navigate("/");
  };

  return <UserForm<ILoginFields> onSubmit={handleLogin} buttonType="Login" />;
};

export default Login;
