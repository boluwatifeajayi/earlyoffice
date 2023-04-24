import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';

function EmployerJobItem({job}) {

	const timeDiff = moment(job.createdAt).fromNow();

  return (
	<div>
		<div className="my-custom-card-job">
        
		<div className="spacer">
		  <div className="intersnhip-box">
			  <b>{job.jobType}</b>
		  </div>
		  <div className="profile-box">
			  <b className="primary">{job.jobProfile}</b>
		  </div>
		</div>
		<h4>
			{job.jobName}
		</h4>

	   
	
		<div className="spacer mt-3 mb-4">
		  <div className="intersnhip-box">
			  <b>{timeDiff}</b>
		  </div>
		  <div className="profile-box">
			  <b>Openings: <span className='primary'>{job.numberOfOpenings}</span> </b>
		  </div>
		</div>

		<div>

		<h5 className='mt-4'>Student Applications: <b className='pinkish'>{job.student?.length}</b></h5>
			
		</div>
		<Link to={`/employer/internship/${job._id}`}>
			<button className="bottom-0 end-0 mb-4 me-4 learn-button">Learn More</button>
		</Link>

		{/*  <Route path='/employer/internship/:id' element={<EmployerJob/>}/> */}
		
	  </div>
	</div>
  )
}

export default EmployerJobItem