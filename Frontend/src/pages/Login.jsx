import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [regForm, setRegForm] = useState({
    email: "",
    password: "",
  });
  // Handling Form Submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/user/login", regForm, {
        withCredentials: true,
      });
      navigate('/dashboard')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="m-auto max-w-[80%] border h-[80vh] mt-20 p-5 flex flex-col gap-10 md:max-w-[500px] rounded-xl">
      {/* HEADER */}
      <Header text={"Login"} />
      {/* FORM */}
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        {/* EMAIL */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-[22px]">
            Email
          </label>
          <input
            id="email"
            onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
            type="email"
            className="border h-9 rounded pl-2"
            value={regForm.email}
            required
          />
        </div>
        {/* PASSWORD*/}
        <div className="flex flex-col">
          <label htmlFor="password" className="text-[22px]">
            Password
          </label>
          <input
            id="password"
            onChange={(e) =>
              setRegForm({ ...regForm, password: e.target.value })
            }
            type="password"
            className="border h-9 rounded pl-2"
            value={regForm.password}
            required
          />
        </div>
        {/* Submit Button */}
        <input
          type="submit"
          className=" text-black underline text-2xl p-2 mt-8 cursor-pointer"
        />
      </form>
    </main>
  );
};

export default Login;
