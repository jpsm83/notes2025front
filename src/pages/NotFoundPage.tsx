import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden gap-10">
      <h1 className="text-2xl font-bold">404 Not Found</h1>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default NotFoundPage;
