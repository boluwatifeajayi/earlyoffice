import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';

function EmployerJobItem({job}) {

	const timeDiff = moment(job.createdAt).fromNow();

  return (
	<div>
		<div className="my-custom-card-job">
        
		<div className="spacer">
		</div>
		<h4>
			{job.jobName}
		</h4>

	   
	
		

		<div>

		<h5 className='mt-4'>Student Applications: <b className='pinkish'>{job.student?.length}</b></h5>
			
		</div>
		<Link to={`/employer/internship/${job._id}`}>
			<button className="learn-button">Learn More</button>
		</Link>

		{/*  <Route path='/employer/internship/:id' element={<EmployerJob/>}/> */}
		
	  </div>
	</div>
  )
}

export default EmployerJobItem