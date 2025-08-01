import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

const CreateBlog = () => {
  const navigate = useNavigate()
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  
  // Handling Form Submit
  const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post(`https://blog-web-app-taupe.vercel.app/api/post`, post, {
            withCredentials: true,
          });
          navigate('/dashboard')
        } catch (error) {
            console.log(error)
        }
  };

  return (
    <main className="m-auto max-w-[80%] border sm:h-[85vh] lg:h-[79vh] mt-20 p-5 flex flex-col gap-10 md:max-w-[500px] rounded-xl">
      {/* HEADER */}
      <Header text={"Create New Blog"} />
      {/* FORM */}
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        {/* TITLE */}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-[22px]">
            Title
          </label>
          <input
            id="title"
            onChange={(e) =>
              setPost({ ...post, title: e.target.value })
            }
            type="text"
            className="border h-9 rounded pl-2"
            value={post.title}
            required
          />
        </div>
        {/* CONTENT*/}
        <div className="flex flex-col">
          <label htmlFor="Content" className="text-[22px]">
            Content
          </label>
          <textarea
            id="Content"
            onChange={(e) =>
              setPost({ ...post, content: e.target.value })
            }
            type="text"
            className="border h-90 p-2 rounded resize-none"
            value={post.content}
            required
          />
        </div>
        {/* Submit Button */}
        <input
          type="submit"
          value="Create"
          className=" text-black underline text-2xl p-2 mt-8 cursor-pointer"
        />
      </form>
    </main>
  );
};

export default CreateBlog;
