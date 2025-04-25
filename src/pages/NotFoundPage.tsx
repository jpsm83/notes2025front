import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden gap-10">
      <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;
