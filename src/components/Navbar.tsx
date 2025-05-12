import { Link } from "react-router-dom";
import { BookOpen, CircleUserRound, LogIn, LogOut } from "lucide-react";

// imported hooks
import { useAuth } from "../context/auth.context";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-500 w-full shadow-md h-16 flex flex-col">
      <div className="p-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-white" />
          <span className="text-xl font-bold text-white">To Do App</span>
        </Link>

        {user ? (
          <div className="flex items-center space-x-6">
            <Link
              to={`/edit-user/${user._id}`}
              className="flex items-center space-x-3"
            >
              <span className="text-white font-medium text-lg">
                Hello, {user.username}
              </span>
              {user.image ? (
                <img
                  src={user.image}
                  alt="User"
                  className="h-10 w-10 rounded-full object-cover border-2 border-white"
                />
              ) : (
                <CircleUserRound className="h-10 w-10 text-white" />
              )}
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-white font-bold text-l"
            >
              Logout
              <LogOut />
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 text-white font-bold text-l"
          >
            Login
            <LogIn />
          </Link>
        )}
      </div>

      {user && (
        <div className="bg-gray-100 py-3">
          <div className="container mx-auto flex justify-center">
            <Link to="/create-note">
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition transform duration-200">
                Create Note
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
