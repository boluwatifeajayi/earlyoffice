import axios from 'axios'
const API_URL = '/api'

axios.defaults.withCredentials = true



// get all jobs
const allJobs = async () => {
	const response = await axios.get(`${API_URL}/jobs`)

	return response.data

	

	
}

// create new job
const createJob = async (jobData, token) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			withCredentials: true,
			Cookie: `authToken=${token}`
		}
	}
	const response = await axios.post(`${API_URL}/company/job/create`, jobData, config, {withCredentials: true})

	return response.data
	
}

// get user jobs
const getJobs = async () => {

	const response = await axios.get(`${API_URL}/jobs`)

	return response.data
}

// get jobs by search

const getJobsBySearch = async (search, location) => {
	try {
	  const response = await axios.get(`${API_URL}/jobs/search`, {
		params: {
		  search: search,
		  location: location,
		},
	  });
	  return response.data;
	} catch (error) {
	  console.error(error);
	}
  };


// get single job

const GetSingleJob = async (id) => {
	const response = await axios.get(`${API_URL}/jobs/id/${id}`)
	return response.data	
}

const GetSingleJob2 = async (id, token) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			withCredentials: true,
			Cookie: `authToken=${token}`
		}
	}
	
	const response = await axios.get(`${API_URL}/jobs/id/${id}`, config)
	return response.data	
}



// apply for job

const ApplyForJob = async (applyData, jobId, token) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			withCredentials: true,
			Cookie: `authToken=${token}`
		}
	}
	
	const response = await axios.post(`${API_URL}/jobs/${jobId}/apply`, applyData, config)
	return response.data	


}

// get employer jobs
const EmployerJobs = async(token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			withCredentials: true,
			Cookie: `authToken=${token}`
		}
	}
	const response = await axios.get(`${API_URL}/company/jobs`, config)
	return response.data
}

// accept Job

const acceptStudent = async(studentId, jobId, token) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			withCredentials: true,
			Cookie: `authToken=${token}`
		}
	}
	const response = await axios.patch(`${API_URL}/jobs/${jobId}/decide?status=accepted&studentId=${studentId}`, config, {withCredentials: true})
	return response.data	
}

// decline student
const declineStudent = async(studentId, jobId, token) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			withCredentials: true,
			Cookie: `authToken=${token}`
		}
	}
	const response = await axios.patch(`${API_URL}/jobs/${jobId}/decide?status=declined&studentId=${studentId}`, config, {withCredentials: true})
	return response.data	
}



const jobService = {
	createJob,
	getJobs,
	allJobs,
	GetSingleJob,
	ApplyForJob,
	EmployerJobs,
	acceptStudent,
	declineStudent,
	GetSingleJob2,
	getJobsBySearch
	
}


export default jobService