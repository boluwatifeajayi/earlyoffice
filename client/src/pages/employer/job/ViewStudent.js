import {React, useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {GetStudent, studentreset} from '../../../features/studentAuth/studentSlice'
import { Spinner } from 'react-bootstrap'




function EmployerJob() {
  
	const navigate = useNavigate()
    const dispatch = useDispatch()
    const { studentId } = useParams();
	const {meStudent, isError, message, isLoading} = useSelector((state) => state.studentauth)
	const { _id, firstname, lastname, email, phoneNumber, currentLocation,
		status,
		fieldOfInterest,
		grade,
		schoolName,
		workName,
		workTitle,
		workDescription,
		works,
		skills, 
		resume,
		degree 
  } = meStudent;


    
    const onButtonClick = () => {
      // using JavaScript method to get PDF file
      fetch(resume)
        .then(res => res.blob())
        .then(blob => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.setAttribute("download", resume);
          document.body.appendChild(link);
          link.click();
          console.log(resume)
        })
  }
  
  
		useEffect(() => {
			if (isError) {
			  console.log(message)
			} 
			
			dispatch(GetStudent(studentId))
		  
			return () => dispatch(studentreset())
		  }, [dispatch, isError, studentId, GetStudent])


      if(isLoading){
        return <h1 className='loading'>
            <Spinner animation='border' role='status' className='spinner-img spin'>
              <span className='sr-only'>Loading...</span>
            </Spinner>
      </h1>
      }
		  
  return (
	<div className='container mt-4'>
  
          
   <div className='row gx-5 mx-1'>
        <div className='col-md-7 border-b job-d mb-4'>
       
        <h2 className='mt-4'><b>{firstname}{" "}{lastname}</b></h2>
            <div className='row'>
              <div className='col'>
                <p className='bigger'><b>{" "}{email}</b></p>
              </div>
              <div className='col'>
              <p className='bigger'><b>{" "}{phoneNumber}</b></p>
              </div>
              <div className='col'>
              <p className='bigger'><b>{" "}{currentLocation}</b></p>
              </div>
            </div>
            <hr/> 
            <b className='pinkish bigger'>Degree</b>
            <p>{degree}</p>
            <b className='pinkish bigger'>Feild Of Intrest</b>
            <p>{fieldOfInterest}</p>
            <b className='pinkish bigger'>Skills </b>
            <p>{skills}</p>
            <b className='pinkish bigger'>Grade</b>
            <p>{grade}</p>
            <b className='pinkish bigger'>Status</b>
            <p>{status}</p>
			      <b className='pinkish bigger'>School Name</b>
            <p>{schoolName}</p>

            <b className='pinkish bigger'>Resume</b><br/>
            <button className='normal-btn mt-4 w-50' onClick={onButtonClick}>
              View Resume
            </button>


        </div>
        <div className='col-md-0 '>
           <p className='text-white'>......</p>
        </div>
		</div>
  </div>
  )
}

// kill -9 101443

// sudo lsof -i :4070


export default EmployerJob