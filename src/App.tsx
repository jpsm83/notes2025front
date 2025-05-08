import { Outlet } from "react-router-dom";

// imported components
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Navbar at the top */}
      <header className="top-0 left-0 right-0 z-10">
        <Navbar />
      </header>

      {/* Main content area */}
      <main className="flex-grow flex items-center justify-center">
        <Outlet />
      </main>

      {/* Fixed Footer at the bottom */}
      <footer className="bottom-0 left-0 right-0 z-10">
        <Footer />
      </footer>
    </div>
  );
}

export default App;