import axios from 'axios'

const API_URL = '/api'

axios.defaults.withCredentials = true

// register student

const studentRegister = async(studentData) => {
	const response = await axios.post(`${API_URL}/student/signUp`, studentData)

	if(response.data){
		localStorage.setItem('student', JSON.stringify(response.data))
	}

	return response.data
}

// login student

const studentLogin = async(studentData) => {
	const response = await axios.post(`${API_URL}/student/signIn`, studentData)

	if(response.data){
		localStorage.setItem('student', JSON.stringify(response.data))
	}

	return response.data
}

// logout
const studentLogout = () => {
	localStorage.removeItem('student')
}

// update student profile

const studentUpdate = async(studentData) => {
	const response = await axios.put(`${API_URL}/student/profile/update`, studentData)

	if(response.data){
		localStorage.setItem('student', JSON.stringify(response.data))
	}

	return response.data
}

const studentService = {
	studentRegister,
	studentLogin,
	studentLogout,
	studentUpdate
}

export default studentService