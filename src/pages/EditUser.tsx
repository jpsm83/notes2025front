import React, { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// interfaces
import { IEditUserFields } from "../interfaces/user";

// hooks
import { useAuth } from "../context/auth.context";

// components
import UserForm from "../components/UserForm";

// services
import UserService from "../services/user.service";
import { toast } from "react-toastify";

const EditUser: React.FC = () => {
  const { isLoggedin, user, setUser } = useAuth(); // Access user and edit from the auth context
  const userService = new UserService();
  const navigate = useNavigate();

  const defaultValues = {
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    roles: user?.roles || [],
    active: user?.active !== undefined ? user?.active : false,
  };

  useEffect(() => {
    if (!isLoggedin || !user) {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [isLoggedin, navigate]);

  console.log("user", user);

  const handleUpdateUser: SubmitHandler<IEditUserFields> = async (data) => {
    try {
      if (!user?._id) {
        toast.error("User ID is missing");
        return;
      }
      const { success, error } = await userService.updateUser(user._id, data);
      if (!success && error) {
        toast.warn(error);
        return;
      }
      // Update the user in the context
      setUser((prevUser) => (prevUser ? { ...prevUser, ...data } : null));
      toast.success("User updated successfully");
      navigate("/");
    } catch (error) {
      toast.error(`Update failed, error: ${error}`);
    }
  };

  return (
    <UserForm
      onSubmit={handleUpdateUser}
      buttonType="Update"
      isEditMode={true}
      defaultValues={defaultValues}
    />
  );
};

export default EditUser;
