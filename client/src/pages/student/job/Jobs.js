import {React, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {allJobs, reset} from '../../../features/job/jobSlice'
import JobItem from '../../../components/base/JobItem'

function Jobs() {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const {jobs, isLoading, isError, isSuccess, message} = useSelector((state) => state.job)
  
  useEffect(() => {

  

    if (isError) {
      console.log(message)
    } 

   
    dispatch(allJobs())
  

    return () => {
      dispatch(reset())
    }
  }, [])

  if(isLoading){
    return <h1 className='loading'>Loading....</h1>
  }



  return (
	<div>
		 <div className="job-page-search container main-content-area">
		<form>
			<div className="form-box">
			  <i className="fa fa-briefcase mr-2 bigger-icon" aria-hidden="true"></i>
			  <input type="text" name="" id="" className="search-field internship-field" placeholder="Search Internships..."/>
			  <i className="fa fa-map-marker  ml-2 mr-2 bigger-icon" aria-hidden="true"></i>
			  <input type="text" name="" id="" className="search-field location-field" placeholder="Search Locations..."/>
			  <button className="search-btn" type="button">Explore</button>
			</div>
		  </form>
	</div>
	<hr/>
		<section classNameName='content'>
        {jobs.length > 0 ? (
          <div className='cat-cards mt-4'> 
            {jobs.map((job) => (
              <JobItem job={job}/> 
            ))}
          </div>
        ) : (
          <h3>No Jobs</h3>
        )}

      </section>

	 

	

		 


	</div>
	
  )
}

export default Jobs