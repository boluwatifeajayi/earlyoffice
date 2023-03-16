const postModel = require("../models/post.model");
const adminModel = require("../models/admin.model");
const studentModel = require("../models/student.model");

const createPost = async (req, res) => {
  try {
    const { adminId } = res.locals.decodedToken;
    if (adminId == null)
      return res.status(400).json({
        error: "Ensure you are a registered admin to access this route",
      });
    const {
      title,
	  content,
	  image, 
	  category,
	  tags
    } = req.body;
    // const { adminName: orgName } = req.params;
    const currentAdmin = await adminModel.findById(adminId);
    const { _id: adId, email, username } = currentAdmin;
    const newPost = await postModel.create({
      title,
	  content,
	  image, 
	  category,
	  tags,
      admin: {
        adId,
        username,
        email,
        
      },
    });

    return res.status(201).json(newPost);
  } catch (error) {
    console.log(error.message);
    if (error.code == 11000)
      return res.status(400).json({ error: "Post already exists" });
    return res.status(400).json({ error: error.message });
  }
};


const getAllPosts = async (req, res) => {
  try {
    const allPosts = await postModel.find().sort({ updatedAt: -1 });
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(404).json({ error: "No posts available" });
  }
};


const getPostById = async (req, res) => {
	try {
	  const { postId } = req.params;
	  const currentPost = await postModel.findById(postId);
	  res.status(200).json(currentPost);
	} catch (error) {
	  res.status(404).json({ error: error.message });
	}
  };


const getCategoryPosts = async (req, res) => {
  try {
    const { category } = req.params;
    const currentPost = await postModel
      .find({ category } )
      .sort({ updatedAt: -1 });
    res.status(200).json(currentPost);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


const commentPost = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const { postid } = req.params;
    const appliedAt = Date.now();
    const newPostApplication = await postModel.findByIdAndUpdate(
      postid,
      {
        $push: {
          comment: { name, email, message, appliedAt},
        },
      },
      { new: true }
    );

    res.status(201).json(newPostApplication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
	try {
	  const { adminId } = res.locals.decodedToken;
	  if (adminId == null)
		return res.status(400).json({
		  error: "Ensure you are a registered admin to access this route",
		});
  
	  const { postId } = req.params;
	  const updatedPost = req.body;
  
	  const updated = await postModel.findByIdAndUpdate(postId, updatedPost, { new: true });
	  res.status(200).json(updated);
	} catch (error) {
	  res.status(400).json({ error: error.message });
	}
  };
  

  const deletePost = async (req, res) => {
	try {
	  const { adminId } = res.locals.decodedToken;
	  if (adminId == null) {
		return res.status(400).json({
		  error: "Ensure you are a registered admin to access this route",
		});
	  }
  
	  const { postId } = req.params;
  
	  const deletedPost = await postModel.findByIdAndDelete(postId);
	  if (!deletedPost) {
		return res.status(404).json({
		  error: `Post with ID ${postId} not found`,
		});
	  }
  
	  res.status(200).json(deletedPost);
	} catch (error) {
	  res.status(400).json({ error: error.message });
	}
  };
  


module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getCategoryPosts,
  commentPost,
  updatePost,
  deletePost
};
