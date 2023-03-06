import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getStudentProfile, studentreset } from '../../../features/studentAuth/studentSlice';

function UpdateProfile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {student, studentProfile, isLoading, isError, isSuccess, message, theStudent} = useSelector((state => state.studentauth))	

  useEffect(() => {

    if (isError) {
      console.log(message)
    } 

    dispatch(getStudentProfile())
    
    return () => {
      dispatch(studentreset())
    }
  }, [])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <label>First Name: </label>
        <input type="text" defaultValue={theStudent.firstname} />
      </div>
      <div>
        <label>Last Name: </label>
        <input type="text" defaultValue={theStudent.lastname} />
      </div>
      <div>
        <label>Email: </label>
        <input type="email" defaultValue={theStudent.email} />
      </div>
      <div>
        <label>Email: </label>
        <input type="email" defaultValue={theStudent.email} />
      </div>
	  <div>
        <label>Interest: </label>
        <input type="text" defaultValue={theStudent.fieldOfInterest} />
    </div>
    <div>
        <label>Place: </label>
        <input type="text" defaultValue={theStudent.currentLocation} />
      </div>
      <div>
      <label>Grade: </label>
        <input type="text" defaultValue={theStudent.grade} />
      </div>
    </div>
 
  )
}

export default UpdateProfile;
