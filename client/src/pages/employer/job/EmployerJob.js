import {React, useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {GetSingleJob, GetSingleJob2, reset, acceptStudent, declineStudent, deleteJob} from '../../../features/job/jobSlice'
import Spinner from '../../../media/loading-gif.gif'
import { Button, Modal, Form } from 'react-bootstrap';

function EmployerJob() {
  
	const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams();
    const [status, setStatus] = useState([]);
    const [showb, setshowb] = useState(true)
    const [showModal, setShowModal] = useState(false);


    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);


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


 
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await dispatch(deleteJob(id));
        // Reload the page after successful deletion
        alert("Job Deleted")
        navigate('/employer/internships');
      } catch (error) {
        console.error('Error deleting job:', error);
        // Alert an error if there was an error
        alert('Error deleting job');
      }
    }
  };
  
	useEffect(() => {
    if (isError && message) {
      console.log(message);
    } 
  
    dispatch(GetSingleJob(id));
    
    return () => {
      dispatch(reset());
    };
  }, [dispatch, id, isError, message]);

  if(isLoading){
    return <h1 className='loading'>
    <img src={Spinner} alt="Loading..." className='spinner-img'/>
  </h1>
  }
  
  
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
            <div dangerouslySetInnerHTML={{ __html: jobDescription.slice(0, 200)  }} />
            
            <b className='pinkish bigger'>Skills needed</b>
            <div dangerouslySetInnerHTML={{ __html: skillsRequired.slice(0, 200) }} />
            <b className='pinkish bigger'>Internship Benefits</b>
            <div dangerouslySetInnerHTML={{ __html: benefits.slice(0, 200) }} />
            <b className='pinkish bigger'>Additional Information</b>
            <div dangerouslySetInnerHTML={{ __html: applicationInfo.slice(0, 200) }} />


           <div>
       <Link to={`/job/update/${id}`}> <button className='btn btn-secondary'>Update Job</button></Link>    
            <button className='btn btn-danger ml-2' onClick={handleDelete}>Delete Job</button>
            
            </div>

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
          



       
         
      <button
        className="btn btn-primary mt-4 mb-4 mr-3"
        onClick={() => {
          dispatch(acceptStudent({ studentId: student.studentId, jobId: id }));
          setTimeout(() => {
            setShowModal(true);
            
          }, 2000);
        }}
      >
        Accept
      </button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Successfully Accpeted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Send this student a custom email now
          <Link to='/student/dashboard' >
            <Button
              type='submit'
              className=' mt-4 w-100'
              aria-disabled={false}
              variant='success'
            >
             Send Email
            </Button>
          </Link>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    
           
            <button className="btn btn-danger mt-4 mb-4" onClick={() => dispatch(declineStudent({studentId: student.studentId, jobId: id}))}>Decline</button>
            <hr/>
        </div>
      ))} 
    
        </div>
       
    </div>
  </div>
  )
}

export default EmployerJob