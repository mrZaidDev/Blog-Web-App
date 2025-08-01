import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/authUser";
import axios from "axios";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  useEffect(()=>{
    const checkUser = async () => {
     try {
      const res = await axios.get('https://blog-web-app-taupe.vercel.app/api/user/profile',{withCredentials:true})
     setUser(res.data)
     } catch (error) {
      console.log(error)
      setUser(null)
     }
    }
    checkUser()
  },[])
  const Logout = async () => {
    try {
      await axios.get("http://localhost:5000/api/user/logout", {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="lg:p-3 sm:p-2">
      {user ? (
        <nav className="flex h-[70px]  items-center justify-between p-3">
          <Link to={"/"}>
            <p className="font-stretch-extra-expanded bg-blue-300 text-white px-2 rounded">
              ZBLG
            </p>
          </Link>
          <div className="flex gap-5">
            <Link to={"/dashboard"}>
              <button className="underline cursor-pointer">My Blogs</button>
            </Link>
            <Link to="/create">
              <button className="underline cursor-pointer">Create</button>
            </Link>
            <button className="underline cursor-pointer" onClick={Logout}>
              logout
            </button>
          </div>
        </nav>
      ) : (
        <nav className="flex h-[70px]  items-center justify-between p-3">
          <Link to={"/"}>
            <p className="font-stretch-extra-expanded bg-blue-300 text-white px-2 rounded">
              ZBLG
            </p>
          </Link>
          <div className="flex gap-5 ">
            <Link to={"/login"}>
              <button className="underline cursor-pointer">Login</button>
            </Link>
            <Link to={"/register"}>
              <button className="underline cursor-pointer">Register</button>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
