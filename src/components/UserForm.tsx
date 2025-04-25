import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Define the form fields
export interface IUserFormFields {
  username: string;
  email: string;
  password: string;
}

interface IUserFormProps {
  onSubmit: SubmitHandler<IUserFormFields>;
  buttonType: string;
  isEditMode?: boolean; // Determines if the form is for editing a user
  defaultValues?: Partial<IUserFormFields>; // Default values for the form
}

const UserForm: React.FC<IUserFormProps> = ({
  onSubmit,
  buttonType,
  isEditMode = false,
  defaultValues = {},
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IUserFormFields>({
    defaultValues,
    mode: "onChange", // Enables validation on change
  });

  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col bg-blue-200 m-10 shadow-lg space-y-4 rounded-lg p-5">
      <form
        className="flex flex-col p-5 space-y-3 bg-gray-100 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Username field (only for signup or edit-user) */}
        {!isEditMode && (
          <div className="flex justify-start w-full">
            <label className="font-bold text-yellow-800" htmlFor="username">
              Username:
            </label>
            <input
              className="text-yellow-800 ml-2 outline-0 rounded-lg px-2 flex-grow"
              type="text"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
            />
            {errors.username && (
              <p className="errorInputs sm:text-md">
                {errors.username.message}
              </p>
            )}
          </div>
        )}

        {/* Email field */}
        <div className="flex justify-start w-full">
          <label className="font-bold text-yellow-800" htmlFor="email">
            Email:
          </label>
          <input
            className="text-yellow-800 ml-2 outline-0 rounded-lg px-2 flex-grow"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="errorInputs sm:text-md">{errors.email.message}</p>
          )}
        </div>

        {/* Password field */}
        <div className="flex justify-start w-full">
          <label className="font-bold text-yellow-800" htmlFor="password">
            Password:
          </label>
          <input
            className="text-yellow-800 ml-2 outline-0 rounded-lg px-2 flex-grow"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="errorInputs sm:text-md">{errors.password.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            className="shadow-md text-white w-40 text-center justify-center px-6 py-1 hover:shadow-xl bg-green-700 hover:scale-105 transition transform duration-200 ease-out rounded-lg"
            disabled={!isValid}
            type="submit"
          >
            {buttonType}
          </button>
          <button
            className="shadow-md text-white w-40 text-center justify-center px-6 py-1 hover:shadow-xl bg-red-800 hover:scale-105 transition transform duration-200 ease-out rounded-lg"
            type="button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
