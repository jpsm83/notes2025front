import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

// components
import UserForm from "../components/UserForm";

// interfaces
import { ISignupFields } from "../interfaces/user";

// context
import { useAuth } from "../context/auth.context";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup: SubmitHandler<ISignupFields> = async (data) => {
    try {
      const { success, error } = await signup(data);
      if (!success && error) {
        toast.warn(error);
        return;
      }
      navigate("/");
    } catch (error) {
      toast.error(`Signup failed, error: ${error}`);
    }
  };

  return (
    <UserForm<ISignupFields> onSubmit={handleSignup} buttonType="Signup" />
  );
};

export default Signup;
