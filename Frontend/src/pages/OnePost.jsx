import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const ReadMore = () => {
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState(false);
  useEffect(() => {
    const fetchingSinglePost = async () => {
      const res = await axios.get(`https://blog-web-app-taupe.vercel.app/api/posts/${id}`, {
        withCredentials: true,
      });
      setSinglePost(res.data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    fetchingSinglePost();
  }, [id]);
  return (
    // Reading the Blog
    <main className="m-auto md:max-w-[70%] sm:max-w-[100%]  h-screen p-10">
      {!singlePost ? (
        <div className="text-center">
          <ClipLoader color="#000000" size={50} />
        </div>
      ) : (
        <div>
          <h1 className="font-bold uppercase text-3xl lg:text-4xl">
            {singlePost.title}
          </h1>
          <p className="text-[20px] text-gray-600 capitalize">
            {singlePost.author.username}
          </p>
          <p className="text-[22px]">{singlePost.content}</p>
        </div>
      )}
    </main>
  );
};

export default ReadMore;
