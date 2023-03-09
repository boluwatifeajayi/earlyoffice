import React from 'react'
import { Link } from 'react-router-dom'

function CompanyItem({employer}) {
  return (
	<div>
		<div className="my-custom-card-job">
        
		<div className="spacer">
		  <div className="intersnhip-box">
			  <b></b>
		  </div>
		  <div className="profile-box">
			  <b className="primary">{employer.industry}</b>
		  </div>
		</div>
		<h3>{employer.orgName}</h3>
	   
		<div className="spacer">
		 
		  <div className="profile-box">
			  <p><b><i className="fa fa-map-marker  ml-2 mr-2" aria-hidden="true"></i>{employer.orgLocation}</b></p>
		  </div>
		</div>
		<div className="spacer mt-3">
		  <div className="intersnhip-box">
			  <b>{employer.orgSize}</b>
		  </div>
		 
		</div>
		<Link to={`/company/${employer._id}`}>
			<button className="learn-button mt-4">Learn More</button>
		</Link>
		
	  </div>
	</div>
  )
}

export default CompanyItem