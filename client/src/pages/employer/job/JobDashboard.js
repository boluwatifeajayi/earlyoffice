import {React, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { EmployerJobs, reset } from '../../../features/job/jobSlice'
import EmployerJobItem from '../../../components/base/EmployerJobItem'

function JobDashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {jobs, isLoading, isError, isSuccess, message} = useSelector((state) => state.job)

  useEffect(() => {

    if (isError) {
      console.log(message)
    } 

   
    dispatch(EmployerJobs())
  

    return () => {
      dispatch(reset())
    }
  }, [])

  
  if(isLoading){
    return <h1 className='loading'>Loading...</h1>
  }

  return (
	<div classNameName="container">
    <div className='container'>
   
      <div className='row'>
        <div className='col-8 mt-4'>
        <Link to='/employer/profile/update/'>
            <button className='btn btn-success mt-4 mb-4'>
             check profile
            </button>
          </Link>
          <h1>Posted Internships</h1>
         
        </div>
          <div className='col-4'>
          <Link to="/employer/createinternship">
        <button className='btn btn-block  mt-4 mb-4 text-white' style={{backgroundColor: '#27ba88'}}> {" "}New Internship +</button>
        </Link>
        </div>
        
      </div>
    </div>

    <hr/>
    
           
    <section classNameName='content'>
        {jobs.length > 0 ? (
          <div className='cat-cards mt-4'> 
            {jobs.map((job) => (
              <EmployerJobItem job={job}/> 
            ))}
          </div>
        ) : (
          <p className='center'>You havent Created Any Intersnhips...Click New Internship To Get Started </p>
        )}

      </section>
  </div>
  )
}

export default JobDashboard