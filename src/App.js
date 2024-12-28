import "./App.css";
import About from "./components/About";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import AuthProvider, { useAuth } from "./context/AuthProvider";
import CreatePost from "./components/CreatePost";

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const [authUser] = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/create-post"
          element={
            <ProtectedRoute component={CreatePost} authUser={authUser} />
          }
        />
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
}

function ProtectedRoute({ component: Component, authUser }) {
  return authUser ? <Component /> : <Navigate to="/signup" replace />;
}

export default App;
