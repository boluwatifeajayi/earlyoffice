import {React, useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {GetSingleJob, reset} from '../../../features/job/jobSlice'
import {ApplyForJob} from '../../../features/job/jobSlice'
import { Button, Modal, Form, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import moment from 'moment';



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

  const onSubmit = async (e) => {
    e.preventDefault();
  
    const applyData = {
      coverLetter,
    };
  
    try {
      await dispatch(ApplyForJob({ jobId: id, applyData }));
      setShowModal(false);
      setShowConfirmationModal(true);
    } catch (error) {
      console.log("error is" + error)
      if (error.response.status === 400) {
        alert("you have already applied for this job, try soethign else")
        navigate("/internships")
        // Show alert here
      }
    }
  };
  
  
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
        <Spinner animation='border' role='status' className='spinner-img spin'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
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
      <button className='btn mt-4 mb-4 back-btn text-sm' style={{backgroundColor: '#d9dce2'}}> <i className='fa fa-arrow-left'></i>{" "}Back To Interships</button>
      </Link>
          
   <div className='row gx-5 mx-1'>
        <div className='col-md-12 border-b job-d mb-4 p-4 inside'>
        <div className='inside'>
        <h2 className='mb-4'><b>{jobName}</b></h2>
        <h5 className='pinkish'><b>{" "}{companyname}, {place}</b></h5> 
       
            <p>{jobProfile} Internship</p>
            
           
            {org && <Link to={`/company/${org.orgId}`}>
  <button className='small-normal-btn mt-3 mb-3'>More About {companyname}</button>
</Link>}

            

            
            
            

            {seeComp ? <div>
              <b>Company Email</b>
            <p className='text-sm text-primary'>{companyEmail}</p>
            <b>About Company</b>
            <p>{companyInfo}</p>
            </div> : <div>{""}</div>}



           
            <hr/>
            <div>
  <div className="row">
    <div className="col-12 col-md-4 mb-3 mb-md-0">
      <p className="text-sm">{jobType}</p> 
    </div>
    <div className="col-12 col-md-4 mb-3 mb-md-0">
      <p className="text-sm"> {duration}</p>
    </div>
    <div className="col-12 col-md-4">
      <p className="text-sm"><span>Stipend:</span> {salary}</p>
    </div>
  </div>
  <hr className="my-4"/>
  <div className="row">
    <div className="col-12 col-md-4 mb-3 mb-md-0">
      <p className="text-sm">{numberOfOpenings} openings</p>
    </div>
    <div className="col-12 col-md-4 mb-3 mb-md-0">
      <p className="text-sm "><span>Posted </span> {timeDiff}</p>
    </div>
    <div className="col-12 col-md-4">
      <p className="text-sm">Deadline {deadline}</p>
    </div>
  </div>
  <hr className="my-4"/>
</div>

           
           
            
            
            <div className="mt-3 mb-3">
              <b className="pinkish bigger push-down">Internship Description</b>
              <div className="mb-3 text-sm" dangerouslySetInnerHTML={{ __html: jobDescription }} />

              <b className="pinkish bigger mt-3 mb-3 push-down">Experience Level</b>
              <div className="mb-3" dangerouslySetInnerHTML={{ __html: experienceLevel }} />

              <b className="pinkish bigger mt-3 mb-3 push-down">Education Level</b>
              <div className="mb-3" dangerouslySetInnerHTML={{ __html: educationLevel }} />

              <b className="pinkish bigger mt-3 mb-3 push-down">Required Skills</b>
              <div className="mb-3 text-sm" dangerouslySetInnerHTML={{ __html: skillsRequired }} />

              <b className="pinkish bigger">Key Responsibilities</b>
              <div className="mb-3 text-sm" dangerouslySetInnerHTML={{ __html: benefits }} />

              {/* <b className="pinkish bigger">Application Information</b>
              <div dangerouslySetInnerHTML={{ __html: applicationInfo }} /> */}
          </div>


          <Button  className='w-100 mt-4 normal-btn text-sm' onClick={handleShowModal}>
        Apply Now
      </Button>
        </div>
        <div className='col-md-0 '>
           <p className='text-sm text-white'>......</p>
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