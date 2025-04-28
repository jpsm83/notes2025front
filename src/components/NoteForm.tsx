import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

// Define the form fields
interface INoteFormFields {
  dueDate: string;
  title: string;
  description: string;
}

interface INoteFormProps {
  onSubmit: SubmitHandler<INoteFormFields>;
  buttonType: string;
  defaultValues?: Partial<INoteFormFields>; // Default values for the form
}

const NoteForm: React.FC<INoteFormProps> = ({
  onSubmit,
  buttonType,
  defaultValues = {},
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<INoteFormFields>({
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
        {/* Due Date Field */}
        <div className="flex justify-end">
          <label className="font-bold text-yellow-800" htmlFor="dueDate">
            Date:
          </label>
          <input
            className="text-yellow-800 outline-0 ml-2 rounded-lg px-2"
            type="date"
            {...register("dueDate", {
              required: "Due date is required",
            })}
          />
          {errors.dueDate && (
            <p className="errorInputs sm:text-md">{errors.dueDate.message}</p>
          )}
        </div>

        {/* Title Field */}
        <div className="flex justify-start w-full">
          <label className="font-bold text-yellow-800" htmlFor="title">
            Title:
          </label>
          <input
            className="text-yellow-800 ml-2 outline-0 rounded-lg px-2 flex-grow"
            type="text"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
            })}
          />
          {errors.title && (
            <p className="errorInputs sm:text-md">{errors.title.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div className="flex justify-start w-full">
          <label className="font-bold text-yellow-800" htmlFor="description">
            Description:
          </label>
          <input
            className="text-yellow-800 ml-2 outline-0 rounded-lg px-2 flex-grow"
            type="text"
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 5,
                message: "Description must be at least 5 characters",
              },
            })}
          />
          {errors.description && (
            <p className="errorInputs sm:text-md">
              {errors.description.message}
            </p>
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

export default NoteForm;