import express from "express";
import userRouter from "./routes/userRoutes.js";
import connectDB from "./config/connectdb.js";
import cookieParser from "cookie-parser";
import authenticatedPostRoutes from "./routes/authenticatedPostRoutes.js";
import authenticatingUser from "./middlewares/authUser.js";
import commonPostRouter from "./routes/commonPostRoutes.js";
import cors from "cors";
const app = express();
const corsOptions = {
  origin: "https://blog-web-app-nzot.vercel.app/", // Replace with your frontend's origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // If you need to send cookies or authentication headers
  optionsSuccessStatus: 204, // For preflight requests
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/',(req,res) => {
  return res.send("Salam")
})
app.use("/api/user", userRouter);
app.use("/api/post", authenticatingUser, authenticatedPostRoutes);
app.use("/api/posts", commonPostRouter);
// Server + DB setup
app.listen(5000, async () => {
  await connectDB();
  console.log("Server Started ...");
});
