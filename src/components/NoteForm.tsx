import { format, parseISO } from "date-fns";

import {
  useForm,
  SubmitHandler,
  FieldPath,
  FieldValues,
  DefaultValues,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface INoteFormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  buttonType: string;
  defaultValues?: Partial<T>;
}

const NoteForm = <T extends FieldValues>({
  onSubmit,
  buttonType,
  defaultValues = {},
}: INoteFormProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
    mode: "onTouched",
  });

  const navigate = useNavigate();

  console.log(isValid);
  
  return (
    <div className="flex flex-col w-full max-w-4xl mx-6 bg-white shadow-lg hover:shadow-xl m-5 rounded-lg p-8 transition duration-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {buttonType === "Update" ? "Edit Note" : "Create Note"}
      </h2>
      <form
        className="flex flex-col space-y-6"
        onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
      >
        {/* Due Date Field */}
        <div className="flex flex-col">
          <label
            className="text-sm font-medium text-gray-700 mb-1"
            htmlFor="dueDate"
          >
            Date
          </label>
          <input
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="date"
            {...register("dueDate" as FieldPath<T>, {
              required: "Due date is required",
            })}
            defaultValue={
              defaultValues.dueDate
                ? format(
                    parseISO(defaultValues.dueDate as string),
                    "yyyy-MM-dd"
                  )
                : undefined
            }
          />
          {errors["dueDate" as FieldPath<T>] && (
            <p className="text-sm text-red-600 mt-1">
              {String(errors["dueDate" as FieldPath<T>]?.message)}
            </p>
          )}
        </div>

        {/* Title Field */}
        <div className="flex flex-col">
          <label
            className="text-sm font-medium text-gray-700 mb-1"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            {...register("title" as FieldPath<T>, {
              required: "Title is required",
              maxLength: {
                value: 40,
                message: "Title must be max of 40 characters long",
              },
            })}
            defaultValue={
              defaultValues.title ? String(defaultValues.title) : undefined
            }
          />
          {errors["title" as FieldPath<T>] && (
            <p className="text-sm text-red-600 mt-1">
              {String(errors["title" as FieldPath<T>]?.message)}
            </p>
          )}
        </div>

        {/* Description Field */}
        <div className="flex flex-col">
          <label
            className="text-sm font-medium text-gray-700 mb-1"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            {...register("description" as FieldPath<T>, {
              required: "Description is required",
              maxLength: {
                value: 200,
                message: "Description must be max of 200 characters long",
              },
            })}
            defaultValue={
              defaultValues.description
                ? String(defaultValues.description)
                : undefined
            }
          />
          {errors["description" as FieldPath<T>] && (
            <p className="text-sm text-red-600 mt-1">
              {String(errors["description" as FieldPath<T>]?.message)}
            </p>
          )}
        </div>

        {/* Priority Field */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register("priority" as FieldPath<T>)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            defaultChecked={defaultValues.priority} // Use defaultChecked for initial state
          />
          <span className="text-gray-700">Priority</span>
        </div>

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
            onClick={() => navigate(`/note/${defaultValues._id}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
