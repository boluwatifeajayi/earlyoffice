import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { allJobs, reset, getJobsBySearch } from '../../../features/job/jobSlice'
import JobItem from '../../../components/base/JobItem'
import Spinner from '../../../media/loading-gif.gif';

function Jobs() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { jobs, isLoading, isError, isSuccess, message } = useSelector((state) => state.job)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')

  useEffect(() => {
    if (isError) {
      console.log(message)
    } 

    dispatch(allJobs())
  
    return () => {
      dispatch(reset())
    }
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(getJobsBySearch({ search, location }))
  }

  if (isLoading) {
    return <h1 className='loading'>
    <img src={Spinner} alt="Loading..." className='spinner-img'/>
  </h1>
  }

  return (
    <div className='container'>
      <div className='job-page-search container main-content-area'>
      <form onSubmit={handleSearch} className='search-form'>
          <div className='form-box'>
            <i className='fa fa-briefcase mr-2 bigger-icon job-s' aria-hidden='true'></i>
            <input 
              type='text' 
              name='searchTerm' 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className='search-field internship-field imp' 
              placeholder='Search Internships...'
            />
            <i className='fa fa-map-marker  ml-2 mr-2 bigger-icon job-s' aria-hidden='true'></i>
            <input 
              type='text' 
              name='location' 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              className='search-field location-field imp' 
              placeholder='Search Locations...'
            />
            <button className='search-btn btn-s' type='submit'>Explore</button>
          </div>
      </form>

      </div>
      <hr />
      <section className='content'>
        {jobs.length > 0 ? (
          <div className='cat-cards mt-4'> 
            {jobs.map((job) => (
              <JobItem job={job} key={job.id} /> 
            ))}
          </div>
        ) : (
          <center>
             <h3> No Internships Yet</h3>
          
          </center>
        )}
      </section>
    </div>
  )
}

export default Jobs
