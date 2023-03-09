import React from 'react'
import { Link } from 'react-router-dom'

function JobItem({job}) {
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
		<h3>{job.jobName}</h3>
	   
		<div className="spacer">
		  <div className="intersnhip-box">
			  <p><b className="primary"> <i className="fa fa-building  ml-2 mr-2" aria-hidden="true"></i>{job.org.orgName}</b></p>
		  </div>
		  <div className="profile-box">
			  <p><b><i className="fa fa-map-marker  ml-2 mr-2" aria-hidden="true"></i>{job.place}</b></p>
		  </div>
		</div>
		<div className="spacer mt-3">
		  <div className="intersnhip-box">
			  <b>{job.duration}</b>
		  </div>
		  <div className="profile-box">
			  <b>Openings: <span className='primary'>{job.numberOfOpenings}</span> </b>
		  </div>
		</div>
		<Link to={`/internship/${job._id}/${job.org.orgName}/${job.place}`}>
			<button className="bottom-0 end-0 mb-4 me-4 mt-4 learn-button">Learn More</button>
		</Link>
		
	  </div>
	</div>
  )
}

export default JobItem