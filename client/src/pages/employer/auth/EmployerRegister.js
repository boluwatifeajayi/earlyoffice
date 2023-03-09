import {React, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { employerRegister, employerreset } from '../../../features/employerAuth/employerSlice'
import fifth from '../../../media/fifth.jpg';


const EmployerRegister = (props) => {

  const [formData, setFormData] = useState({
    adminFirstName: '',
    adminLastName: '',
    orgEmail: '',
    orgPassword: '',
    phoneNumber: '',
	  orgName: '',
  })

  const {adminFirstName, adminLastName, orgEmail, orgPassword, phoneNumber, orgName} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {employer, isLoading, isError, isSuccess, message} = useSelector((state => state.employerauth))

  useEffect (() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess || employer){
      navigate('/employer/create')
    } 

    dispatch(employerreset())
  }, [employer, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

      const employerData = {
        adminFirstName,
        adminLastName,
        orgEmail,
        phoneNumber,
        orgPassword,
		    orgName,
      }
      dispatch(employerRegister(employerData))
    }

  
  
  return (

    <div className='container'>
      <div className='row'>
        <div className='col-md-7 hide img-down'>
        <img src={fifth} className="img-contain" alt="login"/>
        </div>
        <div className='col-md-5 downn'>
        <div className="reg-container">
      <div className="reg-wrapper">
      <h3><b>Get Started</b></h3>
          <p className='mt-4'>Please Create A <span className='pinkish'>employer</span> account to continue</p>
         
          <hr/>
       

        <form className='form' onSubmit={onSubmit}>
        <div className='row'>
              <div className='col'>
              <div className="form-group">
                <input
                  id="name"
                  type="text"
                  name="adminFirstName"
                  placeholder='First Name'
                  onChange={onChange}
                  className="form-input"
                  style={{paddingLeft: 15,}}
                  value={adminFirstName}
                  required
                />
              </div>
              </div>
              <div className='col'>
              <div className="form-group">
                <input
                  id="name"
                  type="text"
                  name="adminLastName"
                  onChange={onChange}
                  value={adminLastName}
                  style={{paddingLeft: 15,}}
                  placeholder="Last Name"
                  className="form-input"
                  required
                />
             </div>
              </div>
            </div>

            <div className="form-group">
            
            <input
              id="orgEmail"
              type="email"
              name="orgEmail"
              onChange={onChange}
              value={orgEmail}
              style={{paddingLeft: 15,}}
              className="form-input"
              placeholder="orgEmail"
              required
            />
          </div>
          
          
          <div className="form-group">
           
            <input
              id="name"
              type="number"
              name="phoneNumber"
              style={{paddingLeft: 15,}}
              placeholder="Phone Number"
              className="form-input"
              onChange={onChange}
              value={phoneNumber}
              required
            />
          </div>

		  <div className="form-group">
            
            <input
              id="orgName"
              type="text"
              name="orgName"
              onChange={onChange}
              value={orgName}
              style={{paddingLeft: 15,}}
              className="form-input"
              placeholder="organisation name"
              required
            />
          </div>    
          <div className="form-group">
            <input
              id="orgPassword"
              type="password"
              name="orgPassword"
              value={orgPassword}
              placeholder="Password"
              style={{paddingLeft: 15,}}
              onChange={onChange}
              className="form-input"
              required
              minLength="6"
            />
          </div>
          
          <button className="normal-btn mt-2 mb-4">
              <b>
				        {isLoading ? 'Loading...' : 'Register'}
              </b> 
          </button>
         
        </form>

        <span>Already have an account? </span>
        <Link
          to="/employer/login"
          className="secondary"
          style={{ textDecoration: 'none' }}
        >
          Login
        </Link>
        <br/>
        
      </div>
    </div>
        </div>
      </div>
    </div>
    
  )
}

export default EmployerRegister
