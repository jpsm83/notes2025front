import React from "react";
import { useHistory } from "react-router-dom";

export default function UserForm(props) {
  const { handleSubmit, handleChange, errors, fields, buttonType, isValid } =
    props;

  const history = useHistory();

  return (
    <div className="flex w-full flex-col bg-blue-200 m-10 shadow-lg space-y-4 rounded-lg p-5">
      <form
        className="flex flex-col p-5 space-y-3 bg-gray-100 rounded-lg"
        onSubmit={handleSubmit}
      >
        {/* window.location.pathname is the browser address */}
        {window.location.pathname.split("/").pop() !== "login" && (
          <div className="flex justify-start w-full">
            <label className="font-bold text-yellow-800" htmlFor="username">
              Username:{" "}
            </label>
            <input
              className="text-yellow-800 ml-2 outline-0 rounded-lg px-2 flex-grow"
              type="text"
              value={fields.username}
              name="username"
              onChange={handleChange}
            />
            {errors.username && (
              <p className="errorInputs sm:text-md">{errors.username}</p>
            )}
          </div>
        )}
        <div className="flex justify-start w-full">
          <label className="font-bold text-yellow-800" htmlFor="email">
            Email:{" "}
          </label>
          <input
            className="text-yellow-800 ml-2 outline-0 rounded-lg px-2 flex-grow"
            type="text"
            value={fields.email}
            name="email"
            onChange={handleChange}
          />
          {errors.email && (
            <p className="errorInputs sm:text-md">{errors.email}</p>
          )}
        </div>
        <div className="flex justify-start w-full">
          <label className="font-bold text-yellow-800" htmlFor="password">
            Password:{" "}
          </label>
          <input
            className="text-yellow-800 ml-2 outline-0 rounded-lg px-2 flex-grow"
            type="password"
            value={fields.password}
            name="password"
            onChange={handleChange}
          />
          {errors.password && (
            <p className="errorInputs sm:text-md">{errors.password}</p>
          )}
        </div>
        {window.location.pathname.split("/")[1] === "edit-user" && (
          <div className="flex justify-start w-full">
            <label className="font-bold text-yellow-800" htmlFor="photo">
              Photo:{" "}
            </label>
            <input
              className="text-yellow-800 ml-2 outline-0 rounded-lg px-2 flex-grow"
              type="text"
              value={fields.photo}
              name="photo"
              onChange={handleChange}
              placeholder={"URL Please"}
            />
            {errors.photo && (
              <p className="errorInputs sm:text-md">{errors.photo}</p>
            )}
          </div>
        )}
        <div className="flex justify-between">
          <button
            className="shadow-md text-white w-40 text-center justify-center px-6 py-1 hover:shadow-xl bg-green-700 hover:scale-105 transition transhtmlForm duration-200 ease-out rounded-lg"
            disabled={!isValid()}
            type="submit"
          >
            {buttonType}
          </button>
          <button
            className="shadow-md text-white w-40 text-center justify-center px-6 py-1 hover:shadow-xl bg-red-800 hover:scale-105 transition transhtmlForm duration-200 ease-out rounded-lg"
            onClick={() => history.push("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
