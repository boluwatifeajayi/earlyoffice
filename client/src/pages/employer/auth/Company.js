import {React, useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { GetEmployer, employerreset } from '../../../features/employerAuth/employerSlice'

import { Helmet } from 'react-helmet';

function Company() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams();
  
 
  
  const {meEmployer, isLoading, isError, isSuccess, message} = useSelector((state) => state.employerauth)

  const { orgEmail, orgName, orgDescription, orgBenefits, orgIndustry, orgLocation, orgLogo, orgMission, orgSize, orgWebsite } = meEmployer

  
  
    useEffect(() => {
      
      dispatch(GetEmployer(id));
    
      return () => {
        dispatch(employerreset());
      };
    }, [dispatch, GetEmployer, id]);

    useEffect(() => {
      if (isError) {
        console.log(message);
      }
    }, [isError, message]);


        

  if(isLoading){
    return <h1 className='loading'>Loading...</h1>
  }


  

  return (
	<div className='container'>
      {/* <Helmet>
        <title>{jobName ? `${jobName} | Early Office - Internships For Nigerians` : "Early Office - Internships For Nigerians"}</title>
        <meta name="description" content={jobName ? `Internship for ${jobName} in Nigeria` : "Early Office is a job board website for interns in Nigeria to connect them to companies."} />
        {jobName && <meta property="og:title" content={`${jobName} | Early Office - Internships For Nigerians`} />}
        {jobName && <meta property="og:description" content={`internship for ${jobName} in Nigeria.`} />}
        {jobName && jobProfile && companyname && <meta name="keywords" content={`${jobName}, internships, Nigeria, EarlyOffice, ${jobProfile}, ${companyname}`} />}
      </Helmet> */}


    <Link to="/internships">
      <button className='btn btn-block  mt-4 mb-4 w-25' style={{backgroundColor: '#d9dce2'}}> <i className='fa fa-arrow-left'></i>{" "}Back To Interships</button>
      </Link>
          
   <div className='row gx-5 mx-1'>
        <div className='col-md-12 border-b job-d mb-4 p-4 inside mr-4 ml-4'>
        <div className='inside'>
        <h2 className='mb-4'><b>{orgName}</b></h2>
        
            
		<p className='bigger'><i className="fa fa-map-marker mt-2"></i>{" "} {orgEmail}</p>

            <h5 className='pinkish'><b><i className='fa fa-building'></i>{" "}{orgIndustry}</b></h5> 
            <p className='bigger'><i className="fa fa-map-marker mt-2"></i>{" "} {orgLocation}</p>
           

           
            <hr/>
            
            <div class="mt-3 mb-3">
              <b class="pinkish bigger push-down">organisation Description</b>
              <div class="mb-3" dangerouslySetInnerHTML={{ __html: orgDescription }} />

              <b class="pinkish bigger mt-3 mb-3 push-down"> Mission</b>
              <div class="mb-3" dangerouslySetInnerHTML={{ __html: orgMission }} />

              <b class="pinkish bigger mt-3 mb-3 push-down">Benefits</b>
              <div class="mb-3" dangerouslySetInnerHTML={{ __html: orgBenefits }} />

              <b class="pinkish bigger mt-3 mb-3 push-down">Size</b>
              <div class="mb-3" dangerouslySetInnerHTML={{ __html: orgSize }} />

              <b class="pinkish bigger">Website</b>
	  		  <p className='primary'>{orgWebsite}</p>
	  		
             
          </div>

	  	<Link to={`/internships/companies/${orgName}`}>
		  <button className='w-100 mt-4 normal-btn'>
        View Posted Jobs
      </button>
		</Link>
        
        </div>
        <div className='col-md-0 '>
           <p className='text-white'>......</p>
        </div>
        </div>
      </div>
  </div>
  )
}

export default Company