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

// update employer profile

const employerUpdate = async(employerData) => {
	const response = await axios.put(`${API_URL}/company/profile/update`, employerData)

	if(response.data){
		localStorage.setItem('employer', JSON.stringify(response.data))
	}

	return response.data
}

const getEmployerProfile = async(token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			withCredentials: true,
			Cookie: `authToken=${token}`
		}
	}
	const response = await axios.get(`${API_URL}/company/profile`, config)
	console.log(response.data)
	return response.data	

}

// get company by ID
const GetEmployer = async(employerId) => {
	const response = await axios.get(`${API_URL}/company/id/${employerId}`)
	return response.data	
}

// get all companies

const AllEmployers = async() => {
	const response = await axios.get(`${API_URL}/company/all`)
	console.log("found")
	return response.data	
}

const employerService = {
	employerRegister,
	employerLogin,
	employerLogout,
	employerUpdate,
	getEmployerProfile,
	GetEmployer,
	AllEmployers
}

export default employerService