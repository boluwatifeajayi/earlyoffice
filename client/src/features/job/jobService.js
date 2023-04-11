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

// get student applied jobs
const StudentAppliedJobs = async(token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			withCredentials: true,
			Cookie: `authToken=${token}`
		}
	}
	const response = await axios.get(`${API_URL}/jobs/student/applications/applied-jobs`, config)

	console.log(response.data)
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

// get jobs by location
const getJobsByLocation = async (place) => {
	try {
	  const response = await axios.get(`${API_URL}/jobs/state/${place}`);
	  return response.data;
	} catch (error) {
	  console.error(error);
	}
  };

// get jobs by category
const getJobsByCategory = async (jobProfile) => {
	try {
	  const response = await axios.get(`${API_URL}/jobs/type/${jobProfile}`);
	  return response.data;
	} catch (error) {
	  console.error(error);
	}
  };

// get jobs by company
const getJobsByCompany = async (orgName) => {
	try {
	  const response = await axios.get(`${API_URL}/jobs/${orgName}`);
	  return response.data;
	} catch (error) {
	  console.error(error);
	}
  };

// delete Job
const deleteJob = async (JobId, token) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			withCredentials: true,
			Cookie: `authToken=${token}`
		}
	}

	try {
	  const response = await axios.delete(`${API_URL}/jobs/delete/${JobId}`, config, {withCredentials: true});
	  return response.data;
	} 
	
	catch (error) {
	  console.error(error);
	}
  };

// delete Job
const updateJob = async (jobData, jobId, token) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
			withCredentials: true,
			Cookie: `authToken=${token}`
		}
	}

	try {
	  const response = await axios.put(`${API_URL}/jobs/update/${jobId}`, jobData, config, {withCredentials: true});
	  return response.data;
	 
	} 
	
	catch (error) {
	  console.error(error);
	}
  };





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
	getJobsBySearch,
	StudentAppliedJobs,
	getJobsByCategory,
	getJobsByCompany,
	getJobsByLocation,
	deleteJob,
	updateJob
	
}


export default jobService