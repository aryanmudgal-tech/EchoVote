import "./App.css";
import About from "./components/About";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthProvider";
import CreatePost from "./components/CreatePost";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/create-post" element={<CreatePost />}/>
          </Routes>
          <Footer />
          <Toaster />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
