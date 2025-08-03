import express from "express";
import userRouter from "../routes/userRoutes.js";
import connectDB from "../config/connectdb.js";
import cookieParser from "cookie-parser";
import authenticatedPostRoutes from "../routes/authenticatedPostRoutes.js";
import authenticatingUser from "../middlewares/authUser.js";
import commonPostRouter from "../routes/commonPostRoutes.js";
import cors from "cors";
import serverless from "serverless-http";

const app = express();

// Connect to MongoDB before anything else
await connectDB(); // ✅ make sure connectDB is async and uses await

const corsOptions = {
  origin: "https://blog-web-app-nzot.vercel.app", // frontend origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Salam from Vercel");
});

app.use("/api/user", userRouter);
app.use("/api/post", authenticatingUser, authenticatedPostRoutes);
app.use("/api/posts", commonPostRouter);


export const handler = serverless(app); // ✅ correct export
