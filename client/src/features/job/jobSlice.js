import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import jobService from './jobService'
import axios from 'axios'
const API_URL = '/api'


axios.defaults.withCredentials = true



const initialState = {
  jobs: [],
  singleJob: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new job
export const createJob = createAsyncThunk(
  'jobs/create',
  async (jobData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().employerauth.employer.authToken
      return await jobService.createJob(jobData, token)
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


// get all jobs
export const allJobs = createAsyncThunk(
	'jobs/allJobs',
	async (_, thunkAPI) => {
	  try {
		return await jobService.allJobs()
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

// get all jobs
// export const getJobsBySearch = createAsyncThunk(
// 	'jobs/allJobsBySearch',
// 	async (_, thunkAPI) => {
// 	  try {
// 		return await jobService.getJobsBySearch()
// 	  } catch (error) {
// 		const message =
// 		  (error.response &&
// 			error.response.data &&
// 			error.response.data.message) ||
// 		  error.message ||
// 		  error.toString()
// 		return thunkAPI.rejectWithValue(message)
// 	  }
// 	}
//   )

export const getJobsBySearch = createAsyncThunk(
  'jobs/getJobsBySearch',
  async (params, thunkAPI) => {
    try {
      const { search, location } = params;
      const response = await axios.get(`${API_URL}/jobs/search?search=${search}&location=${location}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);







  // get one jobs
export const GetSingleJob = createAsyncThunk(
	'jobs/singleJob',
	async (id, thunkAPI) => {
	  try {
		return await jobService.GetSingleJob(id)
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

  // get one job 2
  export const GetSingleJob2 = createAsyncThunk(
    'jobs/singleJob2',
    async (id, thunkAPI) => {
      try {
      const token = thunkAPI.getState().employerauth.employer.authToken
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return await jobService.GetSingleJob2(id, token)
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

// Get user jobs
export const getJobs = createAsyncThunk(
  'jobs/getAll',
  async (_, thunkAPI) => {
    try {
	  const token = thunkAPI.getState().employerauth.employer.authToken
      return await jobService.getJobs(token)
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

// apply for job
export const ApplyForJob = createAsyncThunk(
  'jobs/apply',
  async ({applyData, jobId}, thunkAPI) => {
    try {
      const token = thunkAPI.getState().studentauth.student.authToken
      return await jobService.ApplyForJob(applyData, jobId, token)
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

// get empoyer jobs
export const EmployerJobs = createAsyncThunk(
	'jobs/employerJobs',
	async (_, thunkAPI) => {
	  try {
      const token = thunkAPI.getState().employerauth.employer.authToken
		return await jobService.EmployerJobs(token)
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

  // get student applied jobs
export const StudentAppliedJobs = createAsyncThunk(
	'jobs/studentAppliedJobs',
	async (_, thunkAPI) => {
	  try {
      const token = thunkAPI.getState().studentauth.student.authToken
		return await jobService.StudentAppliedJobs(token)
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

  // accept student

  export const acceptStudent = createAsyncThunk(
    'jobs/acceptstudent',
    async ({studentId, jobId}, thunkAPI) => {
      try {
        const token = thunkAPI.getState().employerauth.employer.authToken
        return await jobService.acceptStudent(studentId, jobId, token)
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

  // decline student

  export const declineStudent = createAsyncThunk(
    'jobs/declinestudent',
    async ({studentId, jobId}, thunkAPI) => {
      try {
        const token = thunkAPI.getState().employerauth.employer.authToken
        return await jobService.declineStudent(studentId, jobId, token)
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



export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  // state management for functions 
  extraReducers: (builder) => {
    builder
    // create job
      .addCase(createJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.jobs.push(action.payload)
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // get all jobs
	  .addCase(allJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(allJobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.jobs = action.payload
      })
      .addCase(allJobs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // get jobs by search
      .addCase(getJobsBySearch.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getJobsBySearch.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.jobs = action.payload
      })
      .addCase(getJobsBySearch.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      
      // get single job
      .addCase(GetSingleJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(GetSingleJob.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.singleJob = action.payload
      })
      .addCase(GetSingleJob.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // get single job
      .addCase(GetSingleJob2.pending, (state) => {
        state.isLoading = true
      })
      .addCase(GetSingleJob2.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.singleJob = action.payload
      })
      .addCase(GetSingleJob2.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // apply for job
      .addCase(ApplyForJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(ApplyForJob.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.singleJob = action.payload
      })
      .addCase(ApplyForJob.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      //get employer jobs
      .addCase(EmployerJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(EmployerJobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.jobs = action.payload
      })
      .addCase(EmployerJobs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      //get student applied jobs
      .addCase(StudentAppliedJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(StudentAppliedJobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.jobs = action.payload
      })
      .addCase(StudentAppliedJobs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // accept student
      .addCase(acceptStudent.pending, (state) => {
        state.isLoading = true
      })
      .addCase(acceptStudent.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.singleJob = action.payload
      })
      .addCase(acceptStudent.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // decline student
      .addCase(declineStudent.pending, (state) => {
        state.isLoading = true
      })
      .addCase(declineStudent.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.singleJob = action.payload
      })
      .addCase(declineStudent.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

     
  },
})

export const { reset } = jobSlice.actions
export default jobSlice.reducer
