import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'
import axios from 'axios'
const API_URL = '/api'


axios.defaults.withCredentials = true



const initialState = {
  posts: [],
  singlePost: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new post
export const createPost = createAsyncThunk(
  'posts/create',
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminauth.admin.authToken
      return await postService.createPost(postData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


// get all posts
export const allPosts = createAsyncThunk(
	'posts/allPosts',
	async (_, thunkAPI) => {
	  try {
		return await postService.allPosts()
	  } catch (error) {
		const message =
		  (error.response &&
			error.response.data &&
			error.response.data.message) ||
		  error.message ||
		  error.toString()
		return thunkAPI.rejectWithValue(message)
	  }
	}
  )

// get posts by category
export const getPostsByCategory = createAsyncThunk(
	'posts/postsByCategory',
	async (postCategory, thunkAPI) => {
	  try {
		return await postService.getPostsByCategory(postCategory)
	  } catch (error) {
		const message =
		  (error.response &&
			error.response.data &&
			error.response.data.message) ||
		  error.message ||
		  error.toString()
		return thunkAPI.rejectWithValue(message)
	  }
	}
  )


  // get one posts
export const GetSinglePost = createAsyncThunk(
	'posts/singlePost',
	async (id, thunkAPI) => {
	  try {
		return await postService.GetSinglePost(id)
	  } catch (error) {
		const message =
		  (error.response &&
			error.response.data &&
			error.response.data.message) ||
		  error.message ||
		  error.toString()
		return thunkAPI.rejectWithValue(message)
	  }
	}
  )

  
// apply for post
export const ApplyForPost = createAsyncThunk(
  'posts/apply',
  async ({applyData, postId}, thunkAPI) => {
    try {
      const token = thunkAPI.getState().studentauth.student.authToken
      return await postService.ApplyForPost(applyData, postId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


// delete post 
export const deletePost = createAsyncThunk(
	'posts/deletePost',
	async (postId, thunkAPI) => {
	  try {
    const token = thunkAPI.getState().adminauth.admin.authToken
		return await postService.deletePost(postId, token)
	  } catch (error) {
		const docmessage =
		  (error.response &&
			error.response.data &&
			error.response.data.docmessage) ||
		  error.docmessage ||
		  error.toString()
		return thunkAPI.rejectWithValue(docmessage)
	  }
	}
  )

  // update post 
  export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async ({ postData, postId }, thunkAPI) => {
      try {
        const token = thunkAPI.getState().adminauth.admin.authToken
        return await postService.updatePost(postData, postId, token)
      } catch (error) {
        const docmessage =
          (error.response &&
            error.response.data &&
            error.response.data.docmessage) ||
          error.docmessage ||
          error.toString()
        return thunkAPI.rejectWithValue(docmessage)
      }
    }
  )
  


 


export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  // state management for functions 
  extraReducers: (builder) => {
    builder
    // create post
      .addCase(createPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts.push(action.payload)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // get all posts
	  .addCase(allPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(allPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = action.payload
      })
      .addCase(allPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

       // get all posts category
	  .addCase(getPostsByCategory.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getPostsByCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.posts = action.payload
    })
    .addCase(getPostsByCategory.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })

   

   

      
      // get single post
      .addCase(GetSinglePost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(GetSinglePost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.singlePost = action.payload
      })
      .addCase(GetSinglePost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
   
      // apply for post
      .addCase(ApplyForPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(ApplyForPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.singlePost = action.payload
      })
      .addCase(ApplyForPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // delete
      //   delete content
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })  

      // update
      // 
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.docmessage = action.payload
      })  
  },
})

export const { reset } = postSlice.actions
export default postSlice.reducer
