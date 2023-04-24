import {React, useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {GetSingleJob, GetSingleJob2, reset, acceptStudent, declineStudent, deleteJob} from '../../../features/job/jobSlice'

import { Button, Spinner, Modal, Form } from 'react-bootstrap';
import moment from 'moment'

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
        <Spinner animation='border' role='status' className='spinner-img spin'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
  </h1>
  }
  
  return (
	<div className='container'>
    <Link to="/employer/internships">
      <button className='btn btn-block  mt-4 mb-4 w-25' style={{backgroundColor: '#d9dce2'}}> <i className='fa fa-arrow-left'></i>{" "}Back To Interships</button>
      </Link>
          
   <div className='row gx-5 mx-1'>
        <div className='col-md-4 job-d mb-4 fixed'>
       
        <h4 className='mt-4 mb-4'><b>{jobName}</b></h4>
          
           <div className='mt-3'>
       <Link to={`/job/update/${id}`}> <button className='btn btn-secondary'>View Internship</button></Link>    
            <button className='btn btn-danger ml-2' onClick={handleDelete}>Delete Internship</button>
            
            </div>

        </div>
        <div className='col-md-0 '>
           <p className='text-white'>......</p>
        </div>
		<div className='col-md-7 apply'>
			<h4 className='mb-4'>Student Applications</h4>
      <hr/>
     
      
      {student?.length === 0 ? (
    <p>No applications yet.</p>
  ) : (
    student?.map((student) => (
      <div key={student.studentId}>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              {student.studentFirstname} {student.studentLastname} ||{" "}
              {student.studentIntrest}
            </h5>
            <p class="card-text">
              <i class="fas fa-envelope"></i> {student.studentEmail}{" "}
              <i class="fas fa-phone"></i> {student.studentPhone}
            </p>
            <hr />
            <h5 class="card-title">About</h5>
            <ul class="list-unstyled">
              <li>
                <i class="fas fa-graduation-cap"></i> {student.studentGrade}
              </li>
              <li>
                <i class="fas fa-book"></i> {student.studentDegree} ||{" "}
                {student.studentSchool} || {student.studentStatus}
              </li>
              <li>
                <i class="fas fa-tools"></i> Skills: {student.studentSkills}
              </li>
            </ul>
            <hr />
            <h5 class="card-title">Link To Works</h5>
            <p class="card-text">
              {student.studentWorks} || {student.studentResume}
            </p>
            <hr />
            <h5 class="card-title">Experience</h5>
            <p class="card-text">
              {student.studentWorkName} || {student.studentTitle} <br />{" "}
              {student.studentDescription}
            </p>
            <hr />
            <h5 class="card-title">Cover Letter</h5>
            <p class="card-text">{student.coverLetter}</p>
            <button
              className="btn btn-primary mt-4 mb-4 mr-3"
              onClick={() => {
                dispatch(
                  acceptStudent({
                    studentId: student.studentId,
                    jobId: id,
                  })
                );
                setTimeout(() => {
                  setShowModal(true);
                }, 2000);
              }}
            >
              Accept Student
            </button>

            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Successfully Accpeted</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Send this {student.studentFirstname} a custom email now
                <a href={`mailto:${student.studentEmail}`}>
                  <Button
                    type="submit"
                    className=" mt-4 w-100"
                    aria-disabled={false}
                    variant="success"
                  >
                    Send Email
                  </Button>
                </a>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <button
              className="btn btn-danger mt-4 mb-4"
              onClick={() =>
                dispatch(
                  declineStudent({
                    studentId: student.studentId,
                    jobId: id,
                  })
                )
              }
            >
              Decline Student
            </button>
          </div>
          <div class="card-footer">
            <small className="text-muted">
              Applied {moment(student.appliedAt).fromNow()}
            </small>
          </div>
        </div>

        <hr />
      </div>
    ))
  )}

    
      </div>
       
    </div>
  </div>
  )
}

export default EmployerJob