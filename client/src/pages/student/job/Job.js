import {React, useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {GetSingleJob, reset} from '../../../features/job/jobSlice'
import {ApplyForJob} from '../../../features/job/jobSlice'


function Job() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams();
  const {companylocation} = useParams();
  const {companyname} = useParams();
  const [companyInfo, setCompanyInfo] = useState('')
  const [companyEmail, setCompanyEmail] = useState('')
  const [seeComp, setSeeComp] = useState(false)
  const [sub, setSub] = useState('Login To Submit')
  const [showb, setShowB] = useState(false)
  const {student} = useSelector((state) => state.studentauth) 

  

  const [formData, setFormData] = useState({
    reasonToBeHired: '',
    jobAvailability: ''
  })




  const {reasonToBeHired, jobAvailability} = formData

  const {singleJob, isLoading, isError, isSuccess, message} = useSelector((state) => state.job)

  const { org, location, role, jobName, jobResponsibility, jobType, numberOfOpenings, skillsNeeded, salary, duration, benefits, additionalInformation, createdAt} = singleJob

  function showCompanyInfo(){
    setCompanyEmail(org.orgEmail)
    setCompanyInfo(org.orgDescription)
    setSeeComp(true)
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
      e.preventDefault();
      const applyData = {
      reasonToBeHired,
      jobAvailability
    }

    
    dispatch(ApplyForJob({jobId: id, applyData})) 
    // console.log(jobData)
    alert("you have applied")
    }

  useEffect(() => {

    if (isError) {
      console.log(message)
    } 

    console.log(student)

    // if(sub != 'Submit'){
    //   setShowB(true)
    // }

    
    dispatch(GetSingleJob(id))
      
  
    return () => {
      dispatch(reset())
    }
  }, [dispatch, navigate, message, isError, student, GetSingleJob])

  if(isLoading){
    return <h1 className='loading'>Loading...</h1>
  }
  

  return (
	<div className='container'>
    <Link to="/internships">
      <button className='btn btn-block  mt-4 mb-4 w-25' style={{backgroundColor: '#d9dce2'}}> <i className='fa fa-arrow-left'></i>{" "}Back To Interships</button>
      </Link>
          
   <div className='row gx-5 mx-1'>
        <div className='col-md-7 border-b job-d mb-4'>
       
        <h2 className='mt-4'><b>{jobName}</b></h2>
            
            <h5 className='pinkish'><b><i className='fa fa-building'></i>{" "}{companyname}</b></h5> 
            <p className='bigger'><i className="fa fa-map-marker mt-2"></i>{" "} {companylocation}</p>
            <Link className='pinkish' onClick={showCompanyInfo}><b>View Company Information</b></Link>
            

            {seeComp ? <div>
              <b>Company Email</b>
            <p className='text-primary'>{companyEmail}</p>
            <b>About Company</b>
            <p>{companyInfo}</p>
            </div> : <div>{""}</div>}

           
            <hr/>
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
            <p>{role}</p>
            <b className='pinkish bigger'>Responsibilities</b>
            <p>{jobResponsibility}</p>
            <b className='pinkish bigger'>Skills needed</b>
            <p>{skillsNeeded}</p>
            <b className='pinkish bigger'>Internship Benefits</b>
            <p>{benefits}</p>
            <b className='pinkish bigger'>Aditional Information</b>
            <p>{additionalInformation}</p>
        </div>
        <div className='col-md-0 '>
           <p className='text-white'>......</p>
        </div>
        <div className='col-md-4 border-b apply'>
        <form onSubmit={onSubmit}>
              <h4 className='mt-4 mb-2'>
               <b>Apply Now</b>
              </h4>
              <hr/>
              <b className='pinkish mb-4'>Cover Letter</b>
              <textarea
                type='text'
                placeholder='This is your chance to convince the company to hire you'
                name='reasonToBeHired'
                value={reasonToBeHired}
                onChange={onChange}
                className="form-control mb-4"
                rows={4}
                required
              >
              </textarea>
              <b className='pinkish mb-4'>Availability</b>
              <textarea
                type='text'
                placeholder='How Long Would You Be Available for this internship'
                name='jobAvailability'
                value={jobAvailability}
                onChange={onChange}
                className="form-control mb-4"
                required
              >
              </textarea>

              {student ?  <button
                  type='submit'
                  className='normal-btn mb-4'
                  aria-disabled={true}
                >
                  Submit
                </button>  :  <center>
                <Link to='/student/register' className='secondary'>
                  Create Account To Apply
                </Link>
                </center>}
            
             
               
            
    </form>       
        </div>
      </div>
  </div>
  )
}

export default Job