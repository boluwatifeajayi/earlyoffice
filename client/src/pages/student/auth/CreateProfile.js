import {React, useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { studentUpdate, studentreset } from '../../../features/studentAuth/studentSlice'
import { States, Status, Schools, Course , Profile} from '../../../utils/data'

function CreateProfile() {
	    const [currentLocation, setcurrentLocation] = useState("");
      const [status, setstatus] = useState("");
      const [fieldOfInterest, setfieldOfInterest] = useState('');
      const [grade, setGrade] = useState("");
      const [schoolName, setschoolName] = useState("");
      const [workName, setworkName] = useState("");
      const [workTitle, setworkTitle] = useState("");
      const [workDescription, setworkDescription] = useState("");
      const [works, setworks] = useState("");
      const [resume, setResume] = useState("none yet");
      const [skills, setskills] = useState("");
      const [degree, setdegree] = useState("");
      
      const navigate = useNavigate()
      const dispatch = useDispatch()

	  const {student, studentProfile, isLoading, isError, isSuccess, message} = useSelector((state => state.studentauth))	

    useEffect (() => {
      if(isError){
        toast.error(message)
      }
      if(isSuccess){
        navigate('/internships')
      } 
  
      dispatch(studentreset())
    }, [student, studentProfile, isError, isSuccess, message, navigate, dispatch])
	  
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

  return (
	<div>
		<div className="container mt-4">
        <span className="lefty">
        <form onSubmit={onSubmit}>
        <h3><b>Create Your Profile</b></h3>
        <hr/>
        <div className="rowland">
      <div className="collins border-b">
          <div>
            
      
      <div className='row'>
              <div className='col'>
              <div className="form-group">
                
                <select value={currentLocation} required style={{paddingLeft: 15,}} className="form-input" onChange={(e) => setcurrentLocation(e.target.value)}>
                  {States.map(st => (
                    <option key={st.value} value={st.value}>
                      {st.text}
                    </option>
                  ))}
                </select>
              </div>
              </div>
              <div className='col'>
              <div className="form-group">
              <select value={status} required style={{paddingLeft: 15,}} className="form-input" onChange={(e) => setstatus(e.target.value)}>
                  {Status.map(st => (
                    <option key={st.value} value={st.value}>
                      {st.text}
                    </option>
                  ))}
                </select>
             </div>
              </div>
            </div>
            <div className="form-group">
            <select value={fieldOfInterest} required style={{paddingLeft: 15,}} name="fieldOfIntrest" className="form-input" onChange={(e) => setfieldOfInterest(e.target.value)}>
                  {Profile.map(st => (
                    <option key={st.value} value={st.value}>
                      {st.text}
                    </option>
                  ))}
                </select>
             </div>
             <div className="form-group">
                <input
                  id="name"
                  type="text"
                  name="lastname"
                 
                  value={skills}
                  onChange={(e) => setskills(e.target.value)}
                  style={{paddingLeft: 15,}}
                  placeholder="Special Skills"
                  className="form-input"
                  required
                />
             </div>
             <div className="form-group">
              <p>Resume</p>
                <input
                  id="name"
                  type="file"
                  name="lastname"
                 
                 
                  style={{paddingLeft: 15,}}
                  placeholder="Resume"
                  className="form-input"
                  
                />
             </div>
             <div className="form-group">
                <textarea
                  id="name"
                  type="text"
                  name="grade"
                  onChange={(e) => setGrade(e.target.value)}
                  style={{paddingLeft: 15,}}
                  placeholder="Short Bio"
                  className="form-control mb-4"
                  rows={4}
                  value={grade}
                  required
                ></textarea>
             </div>
      
        </div>
          </div>
          {/* <div className="col-0">
            
          </div> */}
          <p className="text-white">........</p>
          <div className="collins border-b">
          <div>
            
            <p>Education</p>
            <div className="form-group">
            <select value={schoolName} required style={{paddingLeft: 15,}} className="form-input" onChange={(e) => setschoolName(e.target.value)}>
                  {Schools.map(st => (
                    <option key={st.value} value={st.value}>
                      {st.text}
                    </option>
                  ))}
                </select>
                   </div>
            <div className='row'>
                    <div className='col'>
                    <div className="form-group">
                      <input
                        id="name"
                        type="text"
                        name="workName"
                        placeholder='Company Name'
                        className="form-input"
                        style={{paddingLeft: 15,}}
                        value={workName}
                        onChange={(e) => setworkName(e.target.value)}
                        required
                      />
                    </div>
                    </div>
                    <div className='col'>
                    <div className="form-group">
                      <input
                        id="name"
                        type="text"
                        name="workTitle"
                       
                        value={workTitle}
                        onChange={(e) => setworkTitle(e.target.value)}
                        style={{paddingLeft: 15,}}
                        placeholder="Job title"
                        className="form-input"
                        required
                      />
                   </div>
                    </div>
                  </div>
                  
                  <div className="form-group">
                  <select value={degree} required style={{paddingLeft: 15,}} className="form-input" onChange={(e) => setdegree(e.target.value)}>
                  {Course.map(st => (
                    <option key={st.value} value={st.value}>
                      {st.text}
                    </option>
                  ))}
                </select>
                   </div>
                   <p>Recent Experience (optional)</p>
                   <div className="form-group">
                      <input
                        id="name"
                        type="text"
                        name="workDescription"
                        value={workDescription}
                        onChange={(e) => setworkDescription(e.target.value)}
                        style={{paddingLeft: 15,}}
                        placeholder="description"
                        className="form-input"
                        required
                      />
                   </div>
                   <div className="form-group">
                      <input
                        id="name"
                        type="text"
                        name="works"
                        value={works}
                        onChange={(e) => setworks(e.target.value)}
                        style={{paddingLeft: 15,}}
                        placeholder="Work"
                        className="form-input"
                        required
                      />
                   </div>
              </div>
          </div>
        </div>
       
        <center>
        <button

          className='btn normal-btn btn-block mt-4 w-50 mb-4'
        >
			submit

        </button>
        </center>
        
        </form>
        </span>
      </div>
	</div>
  )
}

export default CreateProfile