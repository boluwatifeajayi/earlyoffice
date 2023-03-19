import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getJobsByCompany, reset, getJobsBySearch } from '../../../features/job/jobSlice'
import JobItem from '../../../components/base/JobItem'
import Spinner from '../../../media/loading-gif.gif';

function JobCompany() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { jobs,isLoading, isError, isSuccess, message } = useSelector((state) => state.job)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const { organisation } = useParams();

  useEffect(() => {
    if (isError) {
      console.log(message)
    } 

    dispatch(getJobsByCompany(organisation))
  
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
       <h3 className='mt-4 mb-4 '>Internships By {organisation}</h3>
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
          <h3>No Jobs</h3>
        )}
      </section>
    </div>
  )
}

export default JobCompany
