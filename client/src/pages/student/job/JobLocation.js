import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getJobsByLocation, reset, getJobsBySearch } from '../../../features/job/jobSlice'
import JobItem from '../../../components/base/JobItem'
import Spinner from '../../../media/loading-gif.gif'

function JobLocation() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { jobs,isLoading, isError, isSuccess, message } = useSelector((state) => state.job)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const { theplace } = useParams();

  useEffect(() => {
    if (isError) {
      console.log(message)
    } 

    dispatch(getJobsByLocation(theplace))
  
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
        <form onSubmit={handleSearch}>
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
             <h3>Ops No Internships for that Location</h3>
             <Link to='/internships'>
              <button className='btn btn-secondary'>View All Internships</button>
             </Link>
          </center>
        )}
      </section>
    </div>
  )
}

export default JobLocation
