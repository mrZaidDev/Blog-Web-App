import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

const EditPost = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [editPost, setEditPost] = useState({
    title: "",
    content: "",
  });
// Fetching Single Post
  useEffect(() => {
    const fetchingSinglePost = async () => {
      const res = await axios.get(`https://blog-web-app-taupe.vercel.app/api/posts/${id}`, {
        withCredentials: true,
      });
      setEditPost({content:res.data.content,title : res.data.title})
    };
    fetchingSinglePost();
  }, [id]);
  
  // Handling Form Submit
  const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.put(`https://blog-web-app-taupe.vercel.app/api/post/${id}`, editPost, {
            withCredentials: true,
          });
          navigate('/dashboard')
        } catch (error) {
            console.log(error)
        }
  };

  return (
    <main className="m-auto max-w-[80%] border h-[80vh] mt-20 p-5 flex flex-col gap-10 md:max-w-[500px] rounded-xl">
      {/* HEADER */}
      <Header text={"Edit The Blog"} />
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
              setEditPost({ ...editPost, title: e.target.value })
            }
            type="text"
            className="border h-9 rounded pl-2"
            value={editPost.title}
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
              setEditPost({ ...editPost, content: e.target.value })
            }
            type="text"
            className="border h-90 p-2 rounded resize-none"
            value={editPost.content}
            required
          />
        </div>
        {/* Submit Button */}
        <input
          type="submit"
          value="Edit"
          className=" text-black underline text-2xl p-2 mt-8 cursor-pointer"
        />
      </form>
    </main>
  );
};

export default EditPost;
