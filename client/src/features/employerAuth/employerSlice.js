import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import employerService from './employerService'
import axios from 'axios'

const employer = JSON.parse(localStorage.getItem('employer'))
const employerProfile = JSON.parse(localStorage.getItem('employerProfile'))


const initialState = {
	employer: employer ? employer: null, 
	isError: false,
	isSuccess: false,
	employerProfile: employerProfile ? employerProfile: null,
	isLoading: false,
	theEmployer: {},
	meEmployer: {},
	employers: [],
	message: ''
}

// register employer

export const employerRegister = createAsyncThunk('employerauth/employerregister', async (employer, thunkAPI) => {
	try{
		return await employerService.employerRegister(employer)
	} 
	catch(error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	 }
	
})

// login employer
export const employerLogin = createAsyncThunk('employerauth/employerlogin', async (employer, thunkAPI) => {
	try{
		return await employerService.employerLogin(employer)
	} 
	catch(error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	 }
	
});

// update emlployer
export const employerUpdate = createAsyncThunk('employerauth/employerupdate', async (employerProfile, thunkAPI) => {
	try{
		const token = thunkAPI.getState().employerauth.employer.authToken
     	 axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		return await employerService.employerUpdate(employerProfile)
	} 
	catch(error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	 }
	
});

// get employer Profile
export const getEmployerProfile = createAsyncThunk(
	'employerauth/employerget',
	async (_, thunkAPI) => {
	  try {
      const token = thunkAPI.getState().employerauth.employer.authToken
		return await employerService.getEmployerProfile(token)
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

// get employer by id

export const GetEmployer = createAsyncThunk(
	'employers/getEmployer',
	async (employerId, thunkAPI) => {
	  try {
		return await employerService.GetEmployer(employerId)
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

// get all empployers

export const AllEmployers = createAsyncThunk(
	'employers/allEmployers',
	async (_, thunkAPI) => {
	  try {
		return await employerService.AllEmployers()
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






// logout
export const employerLogout =  createAsyncThunk('employerauth/employerlogout', async () => {
	await employerService.employerLogout()
})


export const employerSlice = createSlice({
	name: 'employerauth',
	initialState,

	// standard reducer logic, with auto-generated action types per reducer
	reducers: {
		employerreset: (state) => {
			state.isLoading = false
			state.isError = false
			state.isSuccess = false
			state.message = ''
		}
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle various state as needed
		builder
			// register actions
			.addCase(employerRegister.pending, (state) => {
				state.isLoading = true
			})
			.addCase(employerRegister.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.employer = action.payload
			})
			.addCase(employerRegister.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.employer = null
			})

			// login
			.addCase(employerLogin.pending, (state) => {
				state.isLoading = true
			})
			.addCase(employerLogin.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.employer = action.payload
			})
			.addCase(employerLogin.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.employer = null
			})
			// update
			.addCase(employerUpdate.pending, (state) => {
				state.isLoading = true
			})
			.addCase(employerUpdate.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.employerProfile = action.payload
			})
			.addCase(employerUpdate.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.employerProfile = null
			})
			// get employer
			.addCase(GetEmployer.pending, (state) => {
				state.isLoading = true
			  })
			  .addCase(GetEmployer.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.meEmployer = action.payload
			  })
			  .addCase(GetEmployer.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			  })

			// all employers
			.addCase(AllEmployers.pending, (state) => {
				state.isLoading = true
			  })
			  .addCase(AllEmployers.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.employers = action.payload
			  })
			  .addCase(AllEmployers.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			  })

			// get employer profile
			.addCase(getEmployerProfile.pending, (state) => {
				state.isLoading = true
			  })
			  .addCase(getEmployerProfile.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.theEmployer = action.payload
			  })
			  .addCase(getEmployerProfile.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			  })


			// logout
			.addCase(employerLogout.fulfilled, (state) => {
				state.employer = null
			})
	}
})

export const {employerreset} = employerSlice.actions
export default employerSlice.reducer


