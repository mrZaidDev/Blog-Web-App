import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import OnePost from "./pages/OnePost";
import Dashboard from "./pages/Dashboard";
import EditPost from "./pages/EditPost";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import CreateBlog from './pages/CreateBlog'
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<OnePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/dashboard" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
        <Route path="/create" element={< CreateBlog/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
