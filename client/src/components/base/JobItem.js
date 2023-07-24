import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';


function JobItem({job}) {

  const timeDiff = moment(job.createdAt).fromNow();

  return (
	<div>
		<div className="my-custom-card-job">
        
		{/* <div className="spacer">
		  <div className="intersnhip-box">
			  <b>{job.jobType}</b>
		  </div>
		  <div className="profile-box">
			  <b className="primary">{job.jobProfile}</b>
		  </div>
		</div> */}
		<h4>
			{job.jobName}
		</h4>

	   
		<div>
		  <div className="intersnhip-box">
			  <p><b className="primary"> <i className="far fa-building mr-2" aria-hidden="true"></i>{job.org.orgName}</b></p>
		  </div>
		  <div className="profile-box">
			  <p><b><i className="fa fa-map-marker mr-2 " aria-hidden="true"></i>{job.place}</b></p>
		  </div>
		</div>
		{/* <div className="spacer mt-3">
		  <div className="intersnhip-box">
			  <b>{timeDiff}</b>
		  </div>
		  <div className="profile-box">
			  <b>Openings: <span className='primary'>{job.numberOfOpenings}</span> </b>
		  </div>
		</div> */}

<div className='row'>
  <div className='col'>
    <p className='text-sm smalli'>
      <i className='fas fa-briefcase'></i> {job.jobType}
    </p>
  </div>
  <div className='col'>
    <p className='text-sm smalli'>
      <i className='fas fa-tasks'></i> {job.jobProfile}
    </p>
  </div>
  <div className='col'>
    <p className='text-sm smalli'>
      <i className='fas fa-calendar'></i> {job.duration}
    </p>
  </div>
  
</div>

<div className='row'>
  <div className='col'>
    <p className='text-sm smalli'>
      <i className='fas fa-clock'></i> {timeDiff}
    </p>
  </div>
  <div className='col'>
    <p className='text-sm smalli'>
	<i className='fas fa-clock'></i> {timeDiff}
    </p>
  </div>
  <div className='col'>
    <p className='text-sm smalli'>
      <i className='fas fa-users'></i> {job.numberOfOpenings} openings
    </p>
  </div>
</div>
			
	
		<Link to={`/internship/${job._id}/${job.org.orgName}/${job.place}`}>
			<button className='btn-view'>View Details &gt; </button>
		</Link>
		
	  </div>
	</div>
  )
}

export default JobItem