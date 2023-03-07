import {React, useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { employerUpdate, employerreset } from '../../../features/employerAuth/employerSlice'
import { States, Status, Schools, Course , Profile} from '../../../utils/data'

function CreateEmployerProfile() {
	  const [orgLocation, setorgLocation] = useState("");
      const [orgIndustry, setorgIndustry] = useState('');
      const [orgMission, setorgMission] = useState("");
      const [orgSize, setorgSize] = useState("");
      const [orgDescription, setorgDescription] = useState("");
      const [orgWebsite, setorgWebsite] = useState("");
      const [orgLogo, setorgLogo] = useState("none yet");
      const [orgBenefits, setorgBenefits] = useState("");
      
      
      const navigate = useNavigate()
      const dispatch = useDispatch()

	  const {employer, employerProfile, isLoading, isError, isSuccess, message} = useSelector((state => state.employerauth))	

    useEffect (() => {
      if(isError){
        toast.error(message)
      }
      if(isSuccess){
        navigate('/employer/internships')
      } 
  
      dispatch(employerreset())
    }, [employer, employerProfile, isError, isSuccess, message, navigate, dispatch])
	  
	  const onSubmit = (e) => {
		e.preventDefault()

		dispatch(employerUpdate({
			    orgLocation,
      		orgIndustry,
      		orgMission,
      		orgSize,
      		orgDescription,
      		orgWebsite,
      		orgBenefits, 
      		orgLogo,
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
                
                <select value={orgLocation} required style={{paddingLeft: 15,}} className="form-input" onChange={(e) => setorgLocation(e.target.value)}>
                  {States.map(st => (
                    <option key={st.value} value={st.value}>
                      {st.text}
                    </option>
                  ))}
                </select>
              </div>
              </div>
             
            </div>
            <div className="form-group">
            <select value={orgIndustry} required style={{paddingLeft: 15,}} className="form-input" onChange={(e) => setorgIndustry(e.target.value)}>
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
                  value={orgBenefits}
                  onChange={(e) => setorgBenefits(e.target.value)}
                  style={{paddingLeft: 15,}}
                  placeholder="Special orgBenefits"
                  className="form-input"
                  required
                />
             </div>
             <div className="form-group">
              <p>orgLogo</p>
                <input
                  id="name"
                  type="file"
                  name="lastname"
                  style={{paddingLeft: 15,}}
                  placeholder="orgLogo"
                  className="form-input"
                  
                />
             </div>
            
      
        </div>
          </div>
          {/* <div className="col-0">
            
          </div> */}
          <p className="text-white">........</p>
          <div className="collins border-b">
          <div>
            
           
            <div className='row'>
                    <div className='col'>
                    <div className="form-group">
                      <input
                        id="name"
                        type="text"
                        name="orgMission"
                        placeholder='Mission'
                        className="form-input"
                        style={{paddingLeft: 15,}}
                        value={orgMission}
                        onChange={(e) => setorgMission(e.target.value)}
                        required
                      />
                    </div>
                    </div>
                    <div className='col'>
                    <div className="form-group">
                      <input
                        id="name"
                        type="text"
                        name="orgSize"
                        value={orgSize}
                        onChange={(e) => setorgSize(e.target.value)}
                        style={{paddingLeft: 15,}}
                        placeholder="Size"
                        className="form-input"
                        required
                      />
                   </div>
                    </div>
                  </div>
                   <div className="form-group">
                      <input
                        id="name"
                        type="text"
                        name="orgDescription"
                        value={orgDescription}
                        onChange={(e) => setorgDescription(e.target.value)}
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
                        name="orgWebsite"
                        value={orgWebsite}
                        onChange={(e) => setorgWebsite(e.target.value)}
                        style={{paddingLeft: 15,}}
                        placeholder="Website"
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

export default CreateEmployerProfile