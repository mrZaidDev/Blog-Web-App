import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import PostDesign from "../components/PostDesign.jsx";
import { Link } from "react-router-dom";
import { TiEdit } from "react-icons/ti";
import { MdDeleteOutline } from "react-icons/md";

const Dashboard = () => {
  const [myPosts, setMyPosts] = useState(false);

  // Fetching All Posts
  useEffect(() => {
    const fetchingMyPosts = async () => {
      try {
        const res = await axios.get(
          `https://blog-web-app-taupe.vercel.app/api/posts/my-posts`,
          {
            withCredentials: true,
          }
        );
        setMyPosts(res.data.myPosts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchingMyPosts();
  }, []);
  //  Deleting Single Post
  const deletePost = async (e) => {
    try {
      await axios.delete(`https://blog-web-app-taupe.vercel.app/api/post/${e._id}`, {
        withCredentials: true,
      });
      const remPosts = myPosts.filter((p) => p._id != e._id);
      setMyPosts(remPosts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="p-5 w-screen flex flex-col gap-10">
      {/* Header */}
      <Header text={"My Blogs"} />
      {/* MY POSTS SECTION */}
      <section className="p-5 flex flex-col sm:max-w-[90%] md:max-w-[70%] lg:max-w-[50%] m-auto gap-15">
        {!myPosts ? (
          <ClipLoader color="#000000" size={50} />
        ) : (
          myPosts.map((e) => {
            return (
              <div>
                <PostDesign e={e} hr={false} />
                {/* EDIT + DELETE */}
                <div className="flex gap-3 mt-2">
                  <Link
                    to={`/edit/${e._id}`}
                    className="underline text-gray-600"
                  >
                    <TiEdit className="text-2xl" />
                  </Link>
                  <p
                    className="underline text-gray-600 cursor-pointer"
                    onClick={() => {
                      deletePost(e);
                    }}
                  >
                    <MdDeleteOutline className="text-2xl"/>
                  </p>
                </div>
                <hr className="mt-5 text-gray-500"/>
              </div>
            );
          })
        )}
      </section>
    </main>
  );
};

export default Dashboard;
