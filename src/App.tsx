import { Outlet } from "react-router-dom";

// imported components
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="mx-6 sm:mx-12 md:mx-20">
        <Outlet />
      </div>{" "}
      <Footer />
    </>
  );
}

export default App;
