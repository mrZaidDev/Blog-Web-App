import { Link } from "react-router-dom";

const Button = ({text,e}) => {
  return (
      <Link to={`/posts/${e._id}`} className="underline text-gray-600">
        {text}
      </Link>
  );
};

export default Button;
