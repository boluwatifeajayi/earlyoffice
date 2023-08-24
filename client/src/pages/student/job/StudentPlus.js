import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { studentreset, getStudentProfile } from '../../../features/studentAuth/studentSlice';
import { useNavigate, Link } from 'react-router-dom';
import { StudentAppliedJobs, reset } from '../../../features/job/jobSlice';
import { Badge, Spinner } from 'reactstrap';
import axios from 'axios'; // Import Axios library



function StudentPlus() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { student, studentProfile, isError, isSuccess, message, theStudent } = useSelector(
    state => state.studentauth,
  );

  const { jobs, isLoading } = useSelector(state => state.job);

  useEffect(() => {
    if (student === null) {
      navigate('/student/login');
    }

    if (isError) {
      console.log(message);
    }

    dispatch(getStudentProfile());
    
    return () => {
      dispatch(studentreset());
      dispatch(reset());
    };
  }, []);

  // Function to initialize the Paystack payment
  const handleActivateEarlyofficePlus = async () => {
    try {
      // Make a POST request to your backend route to initialize the payment
      const response = await axios.post('/api/students/payment', {
        amount: 600000,
        email: theStudent.email,
      });

      // Check if the payment initialization was successful
      if (response.data.status === true) {
        // Navigate to the authorization URL
        window.location.href = response.data.data.authorization_url;
      } else {
        // Handle the case where payment initialization failed
        console.error('Payment initialization failed');
      }
    } catch (error) {
      console.error(error);
      // Handle any errors here, such as displaying an error message
    }
  };



  if(isLoading){
     return <h1 className='loading'>
     <Spinner animation='border' role='status' className='spinner-img spin'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
   </h1>
  }

  return (
    <div>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-4">
            <small className="primary">Name</small>
            <h4>
              {theStudent.firstname} {theStudent.lastname}
            </h4>
          </div>
          <div className="col-md-4">
            <small className="primary">Profile</small>
            <h4>{theStudent.fieldOfInterest}</h4>
          </div>
          
          <div className="col-md-4">
         
          </div>
        </div>
        <hr className="mb-4" />
        <h4 className='fw-bold'>Subscribe To Early Office Premium to gain New Features <br/> at 6,000 NGN</h4>
        <ul className='ml-4'>
    <li>Priority Application Review</li>
    <li>Advanced Resume Builder</li>
    <li>Enhanced Profile Visibility</li>
    <li>Application Tracking Dashboard</li>
    <li>Customized Job Alerts</li>
    <li>Premium Customer Support</li>
    <li>Video Interview Practice</li>
</ul>

<button className="btn mt-4 btn-md btn-dark mt-3" onClick={handleActivateEarlyofficePlus}>
              Subscribe Now
            </button> 

      </div>
    </div>
  );
}

export default StudentPlus;
