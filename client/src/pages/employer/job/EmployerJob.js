import {React, useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {GetSingleJob, GetSingleJob2, reset} from '../../../features/job/jobSlice'
import { acceptStudent, declineStudent } from '../../../features/job/jobSlice'



function EmployerJob() {
  
	const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams();
    const [status, setStatus] = useState([]);
    const [showb, setshowb] = useState(true)

	const {singleJob, isLoading, isError, isSuccess, message} = useSelector((state) => state.job)

	const { org, jobProfile, jobName, jobDescription, jobType, numberOfOpenings, applicationDeadline, skillsRequired, salary, applicationInfo, educationLevel, experienceLevel, duration, place, benefits, createdAt, student} = singleJob

  function viewStudents(){
    dispatch(GetSingleJob2(id))
    const students = singleJob.student
    setStatus(students)  
    setshowb(false)
    if(students.length === 0){
      alert("no students have applied for this job yet")
    }
  }

 
  
  
	useEffect(() => {
    if (isError && message) {
      console.log(message);
    } 
  
    dispatch(GetSingleJob(id));
    
    return () => {
      dispatch(reset());
    };
  }, [dispatch, id, isError, message]);
  
  
  return (
	<div className='container'>
    <Link to="/employer/internships">
      <button className='btn btn-block  mt-4 mb-4 w-25' style={{backgroundColor: '#d9dce2'}}> <i className='fa fa-arrow-left'></i>{" "}Back To Interships</button>
      </Link>
          
   <div className='row gx-5 mx-1'>
        <div className='col-md-7 border-b job-d mb-4'>
       
        <h2 className='mt-4'><b>{jobName}</b></h2>
            <div className='row'>
              <div className='col'>
                <p className='bigger'><b><i className='fa fa-circle'></i>{" "}{jobType}</b></p>
              </div>
              <div className='col'>
              <p className='bigger'><b><i className='fa fa-clock'></i>{" "}{duration}</b></p>
              </div>
              <div className='col'>
              <p className='bigger'><b><span>₦</span>{" "}{salary}</b></p>
              </div>
            </div>
            <hr/> 
            <b className='pinkish bigger'>Profile</b>
            <p>{jobProfile}</p>
            <b className='pinkish bigger'>Responsibilities</b>
            <p>{jobDescription}</p>
            <b className='pinkish bigger'>Skills needed</b>
            <p>{skillsRequired}</p>
            <b className='pinkish bigger'>Internship Benefits</b>
            <p>{benefits}</p>
            <b className='pinkish bigger'>Aditional Information</b>
            <p>{applicationInfo}</p>
        </div>
        <div className='col-md-0 '>
           <p className='text-white'>......</p>
        </div>
		<div className='col-md-4 apply'>
			<h3>Applications</h3>
      {showb ?  <button onClick={viewStudents} className="btn normal-btn mt-4 mb-4">View Student Applications</button> : ""}
     
      
      {status.map((student) => (
        <div key={student.studentId}>
          <b>Status</b>
          <p>{student.status}</p>

          <b>Cover Letter</b>
          <p>{student.coverLetter}</p>
          <Link to={`/employer/application/${student.studentId}`}>
            <button className='normal-btn'>
              More About This student 
            </button>
          </Link>
           
           
           
        
          <span>
            <button className="btn btn-primary mt-4 mb-4 mr-3" onClick={() => dispatch(acceptStudent({studentId: student.studentId, jobId: id}))}>Accept</button>
            </span>
            <button className="btn btn-danger mt-4 mb-4" onClick={() => dispatch(declineStudent({studentId: student.studentId, jobId: id}))}>Decline</button>
            <hr/>
        </div>
      ))} 
      {/* <p>{student[0].studentId}</p> */}
      {/* <section classNameName='content'>
        {student.length > 0 ? (
          <div className='cat-cards mt-4'> 
            {student.map((stud) => (
              <p>{stud.reasonToBeHired}</p>
            ))}
          </div>
        ) : (
        <h3>No Jobs</h3>
        )}

      </section> */}
        </div>
       
    </div>
  </div>
  )
}

export default EmployerJob