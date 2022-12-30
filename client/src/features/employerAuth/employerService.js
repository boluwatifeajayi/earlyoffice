import axios from 'axios'

const API_URL = '/api'

axios.defaults.withCredentials = true

// register employer

const employerRegister = async(employerData) => {
	const response = await axios.post(`${API_URL}/company/signUp`, employerData , {withCredentials: true})

	if(response.data){
		localStorage.setItem('employer', JSON.stringify(response.data))
	}

	return response.data
}

// login employer

const employerLogin = async(employerData) => {
	const response = await axios.post(`${API_URL}/company/signIn`, employerData, {withCredentials:true})

	if(response.data){
		localStorage.setItem('employer', JSON.stringify(response.data))
	}

	return response.data
}

// logout
const employerLogout = () => {
	localStorage.removeItem('employer')
}

const employerService = {
	employerRegister,
	employerLogin,
	employerLogout
}

export default employerService