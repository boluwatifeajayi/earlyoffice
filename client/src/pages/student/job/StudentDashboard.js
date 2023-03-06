import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {studentreset, getStudentProfile} from '../../../features/studentAuth/studentSlice'
import { useNavigate, Link } from 'react-router-dom'

function StudentDashboard() {

	
	
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const {student, studentProfile, isLoading, isError, isSuccess, message, theStudent} = useSelector((state => state.studentauth))	

	
	console.log(student)

	useEffect(() => {

		if (student === null) {
		  navigate('/student/login')
		}


		if (isError) {
			console.log(message)
		  } 
	  
		  dispatch(getStudentProfile())
		  
		  return () => {
			dispatch(studentreset())
		  }

	}, [])

	// console.log(student.currentStudent.fieldOfInterest[0])





  return (
	<div>
		<div className="container">
		<div className="row mt-4">
			<div className="col-md-4">
				<small className="primary">Name</small>
				<h4>{theStudent.firstname}{" "}{theStudent.lastname}</h4>
			</div>
			<div className="col-md-4">
				<small className="primary">Profile</small>
			 {/* <h4>{theStudent.fieldOfInterest[0]}</h4>  */}
			</div>
			<div className="col-md-4">
				<Link to='/student/profile/update'>
					<button className="btn btn-success">Update Profile </button>
				</Link>
			</div>
		</div>
		<hr className="mb-4"/>
		<h2 className="mt-4">Job Applications</h2>
		<table className="table mt-4">
			<thead className="thead-dark">
			  <tr>
				<th scope="col">#</th>
				<th scope="col">Company</th>
				<th scope="col">Title</th>
				<th scope="col">Status</th>
			  </tr>
			</thead>
			<tbody>
			  <tr>
				<th scope="row">1</th>
				<td>Microsoft</td>
				<td>Flutter Developer</td>
				<td>Pending</td>
			  </tr>
			  <tr>
				<th scope="row">2</th>
				<td>Google</td>
				<td>Angular dev Intern</td>
				<td className="text-success">Accepted (Expect An Email)</td>
			  </tr>
			  <tr>
				<th scope="row">3</th>
				<td>Blackcopper</td>
				<td>Sales Intern</td>
				<td className="text-warning">declined (Expect An Email)</td>
			  </tr>
			</tbody>
		  </table>
		
	</div>
	</div>
  )
}

export default StudentDashboard