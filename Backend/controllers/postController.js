import postModel from "../models/postModel.js";

export const postingPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  if (!title || !content) {
    return res.status(400).json({ message: "all fields are required" });
  }
  try {
    await postModel.create({ title, content, author: userId });
    return res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatingPost = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "all fields are required." });
  }
  const postId = req.params.id;
  try {
    const existingPost = await postModel.findById(postId);
    const userId = req.user.id;
    if (existingPost.author != userId) {
      return res
        .status(403)
        .json({ message: "you can't update someone else's post." });
    }
    existingPost.title = title;
    existingPost.content = content;
    await existingPost.save();
    return res.status(200).json({ message: "post updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deletingPost = async (req, res) => {
  const postId = req.params.id;
  try {
    const existingPost = await postModel.findById(postId);
    const userId = req.user.id;
    if (existingPost.author != userId) {
      return res
        .status(403)
        .json({ message: "you can't delete someone else's post." });
    }
    await postModel.findByIdAndDelete(postId);
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const gettingSinglePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const foundPost = await postModel
      .findById(postId)
      .populate("author", "username email");
    return res.status(200).json(foundPost);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const gettingMyPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const myPosts = await postModel
      .find({ author: userId })
      .populate("author", "username email");
    res.status(200).json({ myPosts });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

export const gettingAllPosts = async (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 5
  const skip = (page - 1) * limit
  try {
    const totalPosts = await postModel.countDocuments()
    const posts = await postModel.find({}).populate("author", "username email").limit(limit).skip(skip)
    // response
    return res.status(200).json({
      data:posts,
      totalPosts,
      currentPage:page,
      totalPages: Math.ceil(totalPosts / limit)
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};
