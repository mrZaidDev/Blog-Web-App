import { Link } from "react-router-dom";
import Button from "./Button";

const PostDesign = ({e,hr}) => {
  return (
             <div className=" flex flex-col gap-2" key={e._id}>
                <p className="text-[21px] font-thin">{e.author.username}</p>
                <h1 className="text-[28px] font-extrabold">{e.title}</h1>
                <p className="text-[22px] text-gray-700">
                  {e.content.slice(0, 70)}...
                </p>
                {/* Date */}
                <div className="text-gray-700 text-[15px]">
                  <span>{new Date(String(e.createdAt)).toLocaleDateString("en-GB")}</span>
                </div>
                {/* Read More */}
                <Button e={e} text={'Read more'}/>
                {hr === false ? '' :<hr className="mt-5 text-gray-500" />}
              </div>
  )
}

export default PostDesign
