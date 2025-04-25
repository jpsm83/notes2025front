import { Link } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { BookOpen, CircleUserRound, LogOut } from "lucide-react";

function Navbar() {
  // Access user and logout directly from the useAuth hook
  const { user, logout } = useAuth();

  return (
    <nav>
      <div className="p-5 bg-blue-400 text-white flex justify-between">
        <Link to="/">
          <div className="cursor-pointer flex space-x-2 items-center justify-start mr-6">
            <BookOpen className="h-10" />
            <p>To Do App</p>
          </div>
        </Link>
        {user ? (
          <div className="flex space-x-4 items-center justify-between">
            <Link
              className="flex space-x-4 items-center"
              to={`/edit-user/${user._id}`}
            >
              <p className="font-bold sm:text-xl text-md">
                Hello {user.username}
              </p>
              <div>
                {user?.image ? (
                  <img
                    src={user?.image}
                    alt="User image"
                    className="object-cover cursor-pointer h-12 w-12 flex justify-center flex-shrink-0 overflow-hidden items-center rounded-full"
                  />
                ) : (
                  <CircleUserRound size={24} />
                )}
              </div>
            </Link>
            <div
              onClick={logout}
              className="cursor-pointer flex space-x-2 items-center"
            >
              <LogOut className="h-8" />
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

export default Navbar;
