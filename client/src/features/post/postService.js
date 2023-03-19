import axios from 'axios'
const API_URL = '/api'

axios.defaults.withCredentials = true



// get all posts
const allPosts = async () => {
	const response = await axios.get(`${API_URL}/posts`)
	return response.data
}

// create new post
const createPost = async (postData, token) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			withCredentials: true,
			Cookie: `authToken=${token}`
		}
	}
	const response = await axios.post(`${API_URL}/admin/post/create`, postData, config, {withCredentials: true})

	return response.data
	
}

// get single post

const GetSinglePost = async (id) => {
	const response = await axios.get(`${API_URL}/posts/id/${id}`)
	return response.data	
}

// apply for post

const ApplyForPost = async (applyData, postId, token) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			withCredentials: true,
			Cookie: `authToken=${token}`
		}
	}
	
	const response = await axios.post(`${API_URL}/posts/${postId}/comment`, applyData, config)
	return response.data	
}


// get posts by category
const getPostsByCategory = async (postCategory) => {
	try {
	  const response = await axios.get(`${API_URL}/posts/category/${postCategory}`);
	  return response.data;
	} catch (error) {
	  console.error(error);
	}
  };


// delete Post
const deletePost = async (postId, token) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			withCredentials: true,
			Cookie: `authToken=${token}`
		}
	}

	try {
	  const response = await axios.delete(`${API_URL}/admin/post/delete/${postId}`, config, {withCredentials: true});
	  return response.data;
	} 
	
	catch (error) {
	  console.error(error);
	}
  };

// delete Post
const updatePost = async (postData, postId, token) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			withCredentials: true,
			Cookie: `authToken=${token}`
		}
	}

	try {
	  const response = await axios.put(`${API_URL}/admin/post/update/${postId}`, postData, config, {withCredentials: true});
	  console.log("hey")
	  return response.data;
	 
	} 
	
	catch (error) {
	  console.error(error);
	}
  };


const postService = {
	createPost,
	allPosts,
	GetSinglePost,
	ApplyForPost,
	getPostsByCategory,
	deletePost,
	updatePost
	
}


export default postService