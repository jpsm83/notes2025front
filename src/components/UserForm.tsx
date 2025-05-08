import {
  useForm,
  SubmitHandler,
  FieldPath,
  FieldValues,
  DefaultValues,
} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

// utils
import { roles } from "../utils/enums";

interface IUserFormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  buttonType: string;
  defaultValues?: Partial<T>;
}

const UserForm = <T extends FieldValues>({
  onSubmit,
  buttonType,
  defaultValues = {},
}: IUserFormProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
    mode: "onTouched",
  });

  const navigate = useNavigate();

  return (
    <div className="flex w-full max-w-lg mx-auto flex-col bg-white shadow-lg rounded-lg p-8 border-1 border-gray-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {buttonType === "Update" ? "Edit User" : buttonType === "Login" ? "Login" : "Signup"}
      </h2>
      <form
        className="flex flex-col space-y-6"
        onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
      >
        {/* Username field (only for signup or edit-user) */}
        {( buttonType === "Update" || buttonType !== "Login") && (
          <div className="flex flex-col">
            <label
              className="text-sm font-medium text-gray-700 mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              {...register("username" as FieldPath<T>, {
                required: "Username is required",
                minLength: {
                  value: 5,
                  message: "Username must be at least 5 characters",
                },
              })}
              defaultValue={
                defaultValues.username
                  ? String(defaultValues.username)
                  : undefined
              }
            />
            {errors["username" as FieldPath<T>] && (
              <p className="text-sm text-red-600 mt-1">
                {String(errors["username" as FieldPath<T>]?.message)}
              </p>
            )}
          </div>
        )}

        {/* Email field */}
        <div className="flex flex-col">
          <label
            className="text-sm font-medium text-gray-700 mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            {...register("email" as FieldPath<T>, {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            defaultValue={
              defaultValues.email ? String(defaultValues.email) : undefined
            }
          />
          {errors["email" as FieldPath<T>] && (
            <p className="text-sm text-red-600 mt-1">
              {String(errors["email" as FieldPath<T>]?.message)}
            </p>
          )}
        </div>

        {/* Password field */}
        <div className="flex flex-col">
          <label
            className="text-sm font-medium text-gray-700 mb-1"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            {...register("password" as FieldPath<T>, {
              required:
                buttonType === "Login" || buttonType === "Signup"
                  ? "Password is required"
                  : false, // Not required for edit mode
              minLength:
                buttonType === "Login" || buttonType === "Signup"
                  ? {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    }
                  : undefined, // No minLength validation for edit mode
            })}
          />
          {errors["password" as FieldPath<T>] && (
            <p className="text-sm text-red-600 mt-1">
              {String(errors["password" as FieldPath<T>]?.message)}
            </p>
          )}
        </div>

        {/* Roles field (only for signup or edit-user) */}
        {( buttonType === "Update" || buttonType === "Signup") && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <label
                className="text-sm font-medium text-gray-700 mb-1"
                htmlFor="roles"
              >
                Roles
              </label>
              <div className="flex flex-wrap gap-4">
                {roles.map((role) => (
                  <label key={role} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={role}
                      {...register("roles" as FieldPath<T>)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">{role}</span>
                  </label>
                ))}
              </div>
              {errors["roles" as FieldPath<T>] && (
                <p className="text-sm text-red-600 mt-1">
                  {String(errors["roles" as FieldPath<T>]?.message)}
                </p>
              )}
            </div>
            {buttonType !== "Signup" && (
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register("active" as FieldPath<T>)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked={defaultValues.active} // Use defaultChecked for initial state
                  />
                  <span className="text-gray-700">Active</span>
                </div>
                {errors["active" as FieldPath<T>] && (
                  <p className="text-sm text-red-600 mt-1">
                    {String(errors["active" as FieldPath<T>]?.message)}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            className="w-40 bg-blue-600 text-white font-medium py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 cursor-pointer"
            disabled={!isValid}
            type="submit"
          >
            {buttonType}
          </button>
          <button
            className="w-40 bg-gray-300 text-gray-700 font-medium py-2 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-200 cursor-pointer"
            type="button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
      {buttonType === "Login" && (
        <div className="flex items-center mt-10 gap-4 justify-center">
          <p className="text-gray-400">Doesn't have an account?</p>
          <Link to="/signup">
            <button className="text-blue-600 hover:underline font-bold cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserForm;
