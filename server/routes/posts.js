import express from "express";
// import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import {deleteComment, getFeedPosts , getUserPosts , likePost, createComment, reportPost, postComment, deletePost } from "../controllers/posts.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:postId/:userId/comment/delete", verifyToken, deleteComment)
router.patch("/:id/report", verifyToken, reportPost);

// POST
router.post("/:postId/:userId/comment", verifyToken, postComment);
router.post("/:id/comments", verifyToken, createComment);

// DELETE
router.delete("/:id", verifyToken, deletePost);

export default router;
