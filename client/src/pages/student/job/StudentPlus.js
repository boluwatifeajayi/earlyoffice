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
        <section className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h2 className="display-4">Unlock Premium Features</h2>
            <p className="lead">
              Take your career to the next level with our Premium Membership. Enjoy exclusive benefits designed to accelerate your job search and professional growth at just 7,000 NGN one time payment.
            </p>
            <p>
              With Premium, you'll gain access to a world of opportunities, receive personalized guidance, and stand out to employers.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Premium Benefits</h5>
                <ul className="list-group">
                  <li className="list-group-item">Priority Application Review</li>
                  <li className="list-group-item">Advanced Resume Builder</li>
                  <li className="list-group-item">Enhanced Profile Visibility</li>
                  <li className="list-group-item">Application Tracking Dashboard</li>
                  <li className="list-group-item">Customized Job Alerts</li>
                  <li className="list-group-item">Premium Customer Support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row mt-5">
          <div className="col-lg-6">
            <h3>How to Activate Premium</h3>
            <p>Ready to unlock your potential? Follow these simple steps to activate Premium Membership:</p>
            <ol>
              <li>Create or log in to your account on our platform.</li>
              <li>Navigate to your profile settings.</li>
              <li>Choose the Premium Membership option.</li>
              <li>Complete the payment process securely.</li>
              <li>Enjoy Premium benefits instantly!</li>
            </ol>
          </div>
          <div className="col-lg-6">
            <h3>Ready to Get Started?</h3>
            <p>Activate Premium Membership today and supercharge your career!</p>
            <button type="button" className="btn btn-dark btn-lg" onClick={handleActivateEarlyofficePlus}>Pay With Paystack</button>
          </div>
        </div>
      </div>
    </section>
      </div>
    </div>
  );
}

export default StudentPlus;
