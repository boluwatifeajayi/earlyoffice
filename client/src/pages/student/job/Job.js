import {React, useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {GetSingleJob, reset} from '../../../features/job/jobSlice'
import {ApplyForJob} from '../../../features/job/jobSlice'
import { Button, Modal, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import Spinner from '../../../media/loading-gif.gif'

function Job() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams();
  const {companylocation} = useParams();
  const {companyname} = useParams();
  const [companyInfo, setCompanyInfo] = useState('')
  const [companyEmail, setCompanyEmail] = useState('')
  const [seeComp, setSeeComp] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
 
  const {student} = useSelector((state) => state.studentauth) 

  const [formData, setFormData] = useState({
    coverLetter: '',
  })

  const {coverLetter} = formData

  const {singleJob, isLoading, isError, isSuccess, message} = useSelector((state) => state.job)

  const { org, place, jobProfile, jobName, jobDescription, jobType, numberOfOpenings, skillsRequired, salary, duration, benefits, applicationInfo, createdAt, applicationDeadline, educationLevel, experienceLevel} = singleJob


  

  function showCompanyInfo(){
    setCompanyEmail(org.orgEmail)
    setCompanyInfo(org.orgDescription)
    setSeeComp(true)
  }

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseConfirmationModal = () => setShowConfirmationModal(false);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
      e.preventDefault();

      const applyData = {
        coverLetter
    }
    dispatch(ApplyForJob({jobId: id, applyData})) 
    setShowModal(false);
    setShowConfirmationModal(true);
    }

    useEffect(() => {
      console.log(student);
      dispatch(GetSingleJob(id));
    
      return () => {
        dispatch(reset());
      };
    }, [dispatch, GetSingleJob, id, student]);

    useEffect(() => {
      if (isError) {
        console.log(message);
      }
    }, [isError, message]);


  const timeDiff = moment(createdAt).fromNow();

  
  const date = moment(applicationDeadline);

  const deadline = date.format("Do MMMM YYYY");


  if(isLoading){
    return <h1 className='loading'>
    <img src={Spinner} alt="Loading..." className='spinner-img'/>
  </h1>
  }


  

  return (
	<div className='container'>
      <Helmet>
        <title>{jobName ? `${jobName} | Early Office - Internships For Nigerians` : "Early Office - Internships For Nigerians"}</title>
        <meta name="description" content={jobName ? `Internship for ${jobName} in Nigeria` : "Early Office is a job board website for interns in Nigeria to connect them to companies."} />
        {jobName && <meta property="og:title" content={`${jobName} | Early Office - Internships For Nigerians`} />}
        {jobName && <meta property="og:description" content={`internship for ${jobName} in Nigeria.`} />}
        {jobName && jobProfile && companyname && <meta name="keywords" content={`${jobName}, internships, Nigeria, EarlyOffice, ${jobProfile}, ${companyname}`} />}
      </Helmet>


    <Link to="/internships">
      <button className='btn mt-4 mb-4 back-btn' style={{backgroundColor: '#d9dce2'}}> <i className='fa fa-arrow-left'></i>{" "}Back To Interships</button>
      </Link>
          
   <div className='row gx-5 mx-1'>
        <div className='col-md-12 border-b job-d mb-4 p-4 inside'>
        <div className='inside'>
        <h2 className='mb-4'><b>{jobName}</b></h2>
        <b className='pinkish bigger'>Category</b>
            <p>{jobProfile}</p>
            
            <h5 className='pinkish'><b><i className='fa fa-building'></i>{" "}{companyname}</b></h5> 
            {org && <Link to={`/company/${org.orgId}`}>
  <button className='small-normal-btn mt-3 mb-3'>More About {companyname}</button>
</Link>}

            <p className='bigger'><i className="fa fa-map-marker mt-2"></i>{" "} {place}</p>

            
            
            

            {seeComp ? <div>
              <b>Company Email</b>
            <p className='text-primary'>{companyEmail}</p>
            <b>About Company</b>
            <p>{companyInfo}</p>
            </div> : <div>{""}</div>}



           
            <hr/>
            <div>
  <div class="row">
    <div class="col-12 col-md-4 mb-3 mb-md-0">
      <p class="bigger"><b><i class="fa fa-circle"></i> {jobType}</b></p>
    </div>
    <div class="col-12 col-md-4 mb-3 mb-md-0">
      <p class="bigger"><b><i class="fa fa-clock"></i> {duration}</b></p>
    </div>
    <div class="col-12 col-md-4">
      <p class="bigger"><b><span>Stipend:</span> {salary}</b></p>
    </div>
  </div>
  <hr class="my-4"/>
  <div class="row">
    <div class="col-12 col-md-4 mb-3 mb-md-0">
      <p class="bigger"><b>Openings: {numberOfOpenings}</b></p>
    </div>
    <div class="col-12 col-md-4 mb-3 mb-md-0">
      <p class="bigger"><b><span>Posted:</span> {timeDiff}</b></p>
    </div>
    <div class="col-12 col-md-4">
      <p class="bigger"><b>Deadline: {deadline}</b></p>
    </div>
  </div>
  <hr class="my-4"/>
</div>

           
           
            
            
            <div class="mt-3 mb-3">
              <b class="pinkish bigger push-down">Internship Description</b>
              <div class="mb-3" dangerouslySetInnerHTML={{ __html: jobDescription }} />

              <b class="pinkish bigger mt-3 mb-3 push-down">Experience Level</b>
              <div class="mb-3" dangerouslySetInnerHTML={{ __html: experienceLevel }} />

              <b class="pinkish bigger mt-3 mb-3 push-down">Education Level</b>
              <div class="mb-3" dangerouslySetInnerHTML={{ __html: educationLevel }} />

              <b class="pinkish bigger mt-3 mb-3 push-down">Required Skills</b>
              <div class="mb-3" dangerouslySetInnerHTML={{ __html: skillsRequired }} />

              <b class="pinkish bigger">Key Responsibilities</b>
              <div class="mb-3" dangerouslySetInnerHTML={{ __html: benefits }} />

              <b class="pinkish bigger">Application Information</b>
              <div dangerouslySetInnerHTML={{ __html: applicationInfo }} />
          </div>


          <Button  className='w-100 mt-4 normal-btn' onClick={handleShowModal}>
        Apply Now
      </Button>
        </div>
        <div className='col-md-0 '>
           <p className='text-white'>......</p>
        </div>
        </div>
        
       

        <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal" className='themod'>
  <Modal.Header closeButton>
    <Modal.Title>Internship Application To {jobName}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formTextArea">
        <b className='pinkish mb-4'>Write A Cover Letter</b>
        <textarea
          type='text'
          placeholder='A convincing statement to get you hired by the company'
          name='coverLetter'
          value={coverLetter}
          onChange={onChange}
          className="form-control mb-4 mt-4"
          rows={10}
          required
        />
      </Form.Group>
      {student ? (
        <Button
          type='submit'
          className='normal-btn mb-4'
          aria-disabled={false}
          variant='danger'
        >
          Submit
        </Button>
      ) : (
        <center>
          <Link to='/student/register' className='secondary'>
            Create Account To Apply
          </Link>
        </center>
      )}
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Cancel
    </Button>
  </Modal.Footer>
</Modal>

<Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Application to {jobName} successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your application has been sent, track the progress of your application in your dashboard, click the button to go there dash
        <Link to='/student/dashboard' >
        <Button
          type='submit'
          className=' mt-4 w-100'
          aria-disabled={false}
          variant='danger'
        >
          Go To Dashboard
        </Button>
        </Link>
        
        
        </Modal.Body>
       
        <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Close
    </Button>
  </Modal.Footer>
      </Modal>



     

      </div>
  </div>
  )
}

export default Job