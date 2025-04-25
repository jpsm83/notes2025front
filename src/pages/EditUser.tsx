import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// imported hooks
import { useAuth } from "../context/auth.context";

// imported components
import UserForm from "../components/UserForm";
import { IUserFormFields } from "../components/UserForm";

const EditUser: React.FC = () => {
  const { user, edit } = useAuth(); // Access user and edit from the auth context
  const [defaultValues, setDefaultValues] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Populate default values with user data
      setDefaultValues({
        username: user.username || "",
        email: user.email || "",
        password: "", // Password should be empty for security reasons
        image: user.image || "",
      });
      setLoading(false);
    }
  }, [user]);

  const handleUpdateUser: SubmitHandler<IUserFormFields> = async (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      await edit(data); // Call the edit method from the auth context
      navigate("/"); // Redirect to the home page after successful update
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex justify-center">
      <UserForm
        onSubmit={handleUpdateUser}
        buttonType="Update"
        isEditMode={true}
        defaultValues={defaultValues}
      />
    </div>
  );
};

export default EditUser;
