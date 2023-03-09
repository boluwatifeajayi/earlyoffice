import {React, useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {GetStudent, studentreset} from '../../../features/studentAuth/studentSlice'




function EmployerJob() {
  
	const navigate = useNavigate()
    const dispatch = useDispatch()
    const { studentId } = useParams();
	const {meStudent, isError, message} = useSelector((state) => state.studentauth)
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
		degree } = meStudent;


    
  
  
		useEffect(() => {
			if (isError) {
			  console.log(message)
			} 
			
			dispatch(GetStudent(studentId))
		  
			return () => dispatch(studentreset())
		  }, [dispatch, isError, studentId, GetStudent])
		  
  return (
	<div className='container mt-4'>
  
          
   <div className='row gx-5 mx-1'>
        <div className='col-md-7 border-b job-d mb-4'>
       
        <h2 className='mt-4'><b>{firstname}{" "}{lastname}</b></h2>
            <div className='row'>
              <div className='col'>
                <p className='bigger'><b><i className='fa fa-circle'></i>{" "}{email}</b></p>
              </div>
              <div className='col'>
              <p className='bigger'><b><i className='fa fa-clock'></i>{" "}{phoneNumber}</b></p>
              </div>
              <div className='col'>
              <p className='bigger'><b><span>₦</span>{" "}{currentLocation}</b></p>
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
        </div>
        <div className='col-md-0 '>
           <p className='text-white'>......</p>
        </div>
		</div>
  </div>
  )
}

export default EmployerJob