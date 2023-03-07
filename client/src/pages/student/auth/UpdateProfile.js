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
  }


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
  <h2 className="text-center my-3">User Profile</h2>
  <form onSubmit={onSubmit}>
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" className="form-control" defaultValue={theStudent?.firstname} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" className="form-control" defaultValue={theStudent?.lastname} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="form-control" defaultValue={theStudent?.email} />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="interest">Interest:</label>
          <input type="text" id="interest" className="form-control" defaultValue={fieldOfInterest} onChange={e => setFieldOfInterest(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="place">Place:</label>
          <input type="text" id="place" className="form-control" defaultValue={currentLocation} onChange={e => setCurrentLocation(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="grade">Grade:</label>
          <input type="text" id="grade" className="form-control" defaultValue={grade} onChange={e => setGrade(e.target.value)} />
        </div>
      </div>
    </div>
    <div className="text-center">
      <input type="submit" className="btn btn-primary" value="Update" />
    </div>
  </form>
</div>





  )
}

export default UpdateProfile;
