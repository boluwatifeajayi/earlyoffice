import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import studentService from './studentService'
import axios from 'axios'

const student = JSON.parse(localStorage.getItem('student'))
const studentProfile = JSON.parse(localStorage.getItem('studentProfile'))

const initialState = {
	student: student ? student: null, 
	studentProfile: studentProfile ? studentProfile: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ''
}

// register student

export const studentRegister = createAsyncThunk('studentauth/studentregister', async (student, thunkAPI) => {
	try{
		return await studentService.studentRegister(student)
	} 
	catch(error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	 }
	
})

// login student
export const studentLogin = createAsyncThunk('studentauth/studentlogin', async (student, thunkAPI) => {
	try{
		return await studentService.studentLogin(student)
	} 
	catch(error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	 }
	
})

// update student
export const studentUpdate = createAsyncThunk('studentauth/studentupdate', async (studentProfile, thunkAPI) => {
	try{
		const token = thunkAPI.getState().studentauth.student.authToken
     	 axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		return await studentService.studentUpdate(studentProfile)
	} 
	catch(error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	 }
	
})

// logout
export const studentLogout =  createAsyncThunk('studentauth/studentlogout', async () => {
	await studentService.studentLogout()
})


export const studentSlice = createSlice({
	name: 'studentauth',
	initialState,

	// standard reducer logic, with auto-generated action types per reducer
	reducers: {
		studentreset: (state) => {
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
			.addCase(studentRegister.pending, (state) => {
				state.isLoading = true
			})
			.addCase(studentRegister.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.student = action.payload
			})
			.addCase(studentRegister.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.student = null
			})

			// login
			.addCase(studentLogin.pending, (state) => {
				state.isLoading = true
			})
			.addCase(studentLogin.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.student = action.payload
			})
			.addCase(studentLogin.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.student = null
			})
			// update
			.addCase(studentUpdate.pending, (state) => {
				state.isLoading = true
			})
			.addCase(studentUpdate.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.studentProfile = action.payload
			})
			.addCase(studentUpdate.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.studentProfile = null
			})

			// logout
			.addCase(studentLogout.fulfilled, (state) => {
				state.student = null
			})
	}
})

export const {studentreset} = studentSlice.actions
export default studentSlice.reducer


