import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

const authenticatingUser = (req, res, next) => {
  const token = req.cookies.Token;
  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided." });
  }
  try {
    const decoded = jwt.verify(token,'zaidkhanchamanwala')
    req.user = decoded
    next()
  } catch (error) {
    res.clearCookie('Token')
    return res.status(403).json({message:"Access Denied: Invalid token."})
  }
};

export default authenticatingUser