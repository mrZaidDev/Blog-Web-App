import { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import Header from "../components/Header";
import PostDesign from "../components/PostDesign";
const Home = () => {
  const [posts, setPosts] = useState(false);
  const [currentPage,setCurrentPage] = useState(1)
  const [totalPages,setTotalPages] = useState(null)
  // Fetching all Posts
  useEffect(() => {
    const fetchingAllPosts = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/posts?page=${currentPage}&limit=5`,
        { withCredentials: true }
      );
      setPosts(res.data);
      setTotalPages(res.data.totalPages)
        // ✅ Scroll to top after posts are updated
    window.scrollTo({ top: 0, behavior: "smooth" });
    };
    fetchingAllPosts();
  }, [currentPage]);
  return (
    <main className="p-5 w-screen flex flex-col gap-10">
      {/* HEADER */}
      <Header text={'Explore Blogs'}/>
      {/* POSTS SECTION */}
      <section className="p-5 flex flex-col sm:max-w-[90%] md:max-w-[70%] lg:max-w-[50%] m-auto gap-15">
        {!posts ? (
          <ClipLoader color="#000000" size={50} />
        ) : (
          posts.data.map((e) => {
            return (
              <PostDesign e={e}/>
            );
          })
        )}
      </section>
      {/* PAGINATION SECTION */}
      <section className="m-auto flex gap-2">
        {
        currentPage > 1 && <button className="underline cursor-pointer" onClick={()=>setCurrentPage(currentPage - 1)}>PREVIOUS</button> 
        }
        {
          currentPage < totalPages && <button className="underline cursor-pointer" onClick={()=>setCurrentPage(currentPage + 1)}>NEXT</button>
        }
      </section>
    </main>
  );
};

export default Home;
