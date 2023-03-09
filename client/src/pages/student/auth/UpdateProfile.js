import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getStudentProfile, studentreset, studentUpdate } from '../../../features/studentAuth/studentSlice';

function UpdateProfile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { student, studentProfile, isLoading, isError, isSuccess, message, theStudent } = useSelector((state => state.studentauth))

  const [currentLocation, setCurrentLocation] = useState(theStudent?.currentLocation || '');
  const [status, setStatus] = useState(theStudent?.status || '');
  const [fieldOfInterest, setFieldOfInterest] = useState(theStudent?.fieldOfInterest || '');
  const [grade, setGrade] = useState(theStudent?.grade || '');
  const [schoolName, setSchoolName] = useState(theStudent?.schoolName || '');
  const [workName, setWorkName] = useState(theStudent?.workName || '');
  const [workTitle, setWorkTitle] = useState(theStudent?.workTitle || '');
  const [workDescription, setWorkDescription] = useState(theStudent?.workDescription || '');
  const [works, setWorks] = useState(theStudent?.works || '');
  const [skills, setSkills] = useState(theStudent?.skills || '');
  const [resume, setResume] = useState(theStudent?.resume || '');
  const [degree, setDegree] = useState(theStudent?.degree || '');

  useEffect(() => {

    if (isError) {
      console.log(message)
    }

    dispatch(getStudentProfile())

    return () => {
      dispatch(studentreset())
    }
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(studentUpdate({
      currentLocation,
      status,
      fieldOfInterest,
      grade,
      schoolName,
      workName,
      workTitle,
      workDescription,
      works,
      skills,
      resume,
      degree
    }))
    alert("student profile updated succesfully")
    navigate('/student/dashboard')
  }

  


  if (isLoading) {
    return <h2 className='loading'>Loading...</h2>;
  }

  return (
    <div className="container">
  <h2 className="text-center my-3">User Profile</h2>
  <form onSubmit={onSubmit}>
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="firstName">Course:</label>
          <input type="text" id="firstName" className="form-input" defaultValue={theStudent?.degree} onChange={e => setDegree(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">schoolName:</label>
          <input type="text" id="lastName" className="form-input" defaultValue={theStudent?.schoolName} onChange={e => setSchoolName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Skills:</label>
          <input type="text" id="email" className="form-input" defaultValue={theStudent?.skills} onChange={e => setSkills(e.target.value)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Status:</label>
          <input type="text" id="email" className="form-input" defaultValue={theStudent?.status} onChange={e => setStatus(e.target.value)} required/>
        </div>
      </div>
      <div className="col-md-6">
      <div className="form-group">
          <label htmlFor="email">Link To Portfolio:</label>
          <input type="text" id="email" className="form-input" defaultValue={theStudent?.works} onChange={e => setWorks(e.target.value)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="interest">Interest:</label>
          <input type="text" id="interest" className="form-input" defaultValue={theStudent?.fieldOfInterest} onChange={e => setFieldOfInterest(e.target.value)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="place">Place:</label>
          <input type="text" id="place" className="form-input" defaultValue={theStudent?.currentLocation} onChange={e => setCurrentLocation(e.target.value)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="grade">Grade:</label>
          <input type="text" id="grade" className="form-input" defaultValue={theStudent?.grade} onChange={e => setGrade(e.target.value)} required />
        </div>
      </div>
    </div>
    <div className="text-center">
      <input type="submit" className="btn normal-btn" value="Update" />
    </div>
  </form>
</div>





  )
}

export default UpdateProfile;
