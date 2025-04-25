/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../context/auth.context";
import { BookOpenIcon, LogoutIcon } from "@heroicons/react/outline";

function Header(props) {
  // user and logout come from context/auth.context.js
  // it can be use in any component because it is exported as AuthProvider
  // and wrap all the aplication in its root index.js
  const { user, logout } = props;

  return (
    <nav>
      <div className="p-5 bg-blue-400 text-white flex justify-between">
        <Link to="/">
          <div className="cursor-pointer flex space-x-2 items-center justify-start mr-6">
            <BookOpenIcon className="h-10" />
            <p>To Do App</p>
          </div>
        </Link>
        {user ? (
          <div className="flex space-x-4 items-center justify-between">
            <Link
              className="flex space-x-4 items-center"
              to={`/edit-user/${user.id}`}
            >
              <p className="font-bold sm:text-xl text-md">
                Hello {user.username}
              </p>
              <div>
                <img
                  src={user.photo}
                  alt="User photo"
                  className="object-cover cursor-pointer h-12 w-12 flex justify-center flex-shrink-0 overflow-hidden items-center rounded-full"
                />
              </div>
            </Link>
            <div
              onClick={logout}
              className="cursor-pointer flex space-x-2 items-center"
            >
              <LogoutIcon className="h-8" />
            </div>
          </div>
        ) : (
          <div className="text-gray-200 flex items-center text-right text-xs sm:text-sm space-x-6 mr-4 whitespace-nowrap">
            <div className="cursor-pointer">
              <Link to="/login">
                <p className="font-bold">LogIn</p>
              </Link>
              <Link to="/signup">
                <p className="sm:text-sm">SignIn</p>
              </Link>
            </div>
          </div>
        )}
      </div>
      {user && (
        <div className="bg-gray-300 p-3 flex justify-center">
          <Link to="/create-note">
            <button className="cursor-pointer shadow-md items-center pb-1 text-white text-center justify-center px-6 hover:bg-green-800 font-bold hover:shadow-xl bg-green-700 hover:scale-105 transition transform duration-200 ease-out active:scale-90 rounded-lg ">
              Create Note
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}

// withAuth comes from context and alow the component to use it
// methods - isLoading, isLoggedin, user, signup, login, logout, edit
export default withAuth(Header);
