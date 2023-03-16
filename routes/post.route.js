const express = require("express");
var route = express.Router();


const {
  protectedRoutes,
} = require("../middlewares/authentication/protectedRoutes");

const {
  createPost,
  getAllPosts,
  getPostById,
  getCategoryPosts,
  commentPost,
  updatePost,
  deletePost
} = require("../controllers/post.controller");

// Create post
// route.post("/api/post/create", createPost);
route.post(
  "/api/admin/post/create",
  protectedRoutes,
  createPost
);

// Get all posts
route.get("/api/posts", getAllPosts);


// Get post by id
route.get("/api/posts/id/:postId", getPostById);

// Get post by category
route.get("/api/posts/category/:category", getCategoryPosts);

// Update post by id
route.put(
	"/api/admin/post/update/:postId",
	protectedRoutes,
	updatePost
  );
  
// Delete post by id
route.delete(
"/api/admin/post/delete/:postId",
protectedRoutes,
deletePost
);


// TO APPLY FOR A PARTICULAR POST
route.post(
  "/api/posts/:postid/comment",
  protectedRoutes,
  commentPost
);



module.exports = route;
