import { useEffect } from "react";
import { useUser } from "../context/authUser";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  });
  return children;
};

export default ProtectedRoutes;
