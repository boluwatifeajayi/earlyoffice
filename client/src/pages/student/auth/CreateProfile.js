import {React, useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { studentUpdate, studentreset } from '../../../features/studentAuth/studentSlice'
import { States, Status, Schools, Course , Profile} from '../../../utils/data'
import { Form } from 'react-bootstrap'
import axios from 'axios'

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
      const [selectedFile, setSelectedFile] = useState(null);
	    const [uploading, setUploading] = useState(false)
      const [docName, setDocName] = useState("");

      const allowedFileTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];

 
      
      const navigate = useNavigate()
      const dispatch = useDispatch()

	  const {student, studentProfile, isLoading, isError, isSuccess, message} = useSelector((state => state.studentauth))	

    const token = student.authToken


    // console.log(student.authToken)

    useEffect (() => {
      if(isError){
        toast.error(message)
      }
      
      if(isSuccess){
        navigate('/internships')
      } 
  
      dispatch(studentreset())
    }, [student, studentProfile, isError, isSuccess, message, navigate, dispatch])


    const headers = {
		  Authorization: `Bearer ${token}`,
		 
		}

	
	  const uploadFileHandler = async (e) => {

		const file = e.target.files[0]
		if (file && allowedFileTypes.includes(file.type)) {
   		setSelectedFile(file);
		setDocName(file.name);
		const formData = new FormData()
		formData.append('resume', file)
		setUploading(true)
		
		try {
		  const { data } = await axios.post('/api/upload', formData, {headers})
		  setResume(data)
		  setUploading(false)
		} catch (error) {
		  console.error(error)
		  setUploading(false)
		}

	} else {
		setSelectedFile(null)
		setUploading(false)
		alert('File type not supported! Please choose a different file.')
	  }
	  }
	  
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
              
              <Form.Group controlId='image'>
							<Form.File
								id='image-file'
								label={selectedFile ? selectedFile.name : 'Choose File'}
								type='file'
								custom
								accept=".docx,.dot,.doc,.pdf,.pptx"
								onChange={uploadFileHandler}
							/>
							{uploading && <p>Loading...</p>}
						</Form.Group>
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
                   <div className="form-group">
                  <select value={degree} required style={{paddingLeft: 15,}} className="form-input" onChange={(e) => setdegree(e.target.value)}>
                  {Course.map(st => (
                    <option key={st.value} value={st.value}>
                      {st.text}
                    </option>
                  ))}
                </select>
                   </div>
                   <p>Recent work experience</p>
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
                      <textarea
                        id="name"
                        type="text"
                        name="workDescription"
                        value={workDescription}
                        onChange={(e) => setworkDescription(e.target.value)}
                        style={{paddingLeft: 15,}}
                        placeholder="description"
                        rows={4}
                        className="form-input"
                        required
                      ></textarea>
                   </div>
                  
                 
                  
                   <div className="form-group">
                      <input
                        id="name"
                        type="text"
                        name="works"
                        value={works}
                        onChange={(e) => setworks(e.target.value)}
                        style={{paddingLeft: 15,}}
                        placeholder="Links to any previous works"
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