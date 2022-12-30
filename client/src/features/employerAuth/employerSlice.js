import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import employerService from './employerService'

const employer = JSON.parse(localStorage.getItem('employer'))

const initialState = {
	employer: employer ? employer: null, 
	isError: false,
	isSuccess: false,
	isLoading: false,
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
	
})

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

			// logout
			.addCase(employerLogout.fulfilled, (state) => {
				state.employer = null
			})
	}
})

export const {employerreset} = employerSlice.actions
export default employerSlice.reducer


