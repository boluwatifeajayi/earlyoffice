import {React, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { employerLogin, employerreset } from '../../../features/employerAuth/employerSlice'


const EmployerLogin = (props) => {

  const [formData, setFormData] = useState({
    orgEmail: '',
    orgPassword: '',
  })

  const {orgEmail, orgPassword} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {employer, isLoading, isError, isSuccess, message} = useSelector((state => state.employerauth))

  useEffect (() => {
    if(isError){
      toast.error("invalid orgEmail or orgPassword")
    }
    if(isSuccess || employer){
      navigate('/employer/internships')
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
        orgEmail,
        orgPassword
    
      }
      dispatch(employerLogin(employerData))
    }

  
  
  return (

    <div className='container'>
      <div className='row'>
        <div className='col-md-7 hide img-down'>
        <img src="https://s3.amazonaws.com/media.youthradio.org/wp-content/uploads/2020/08/21114957/Youngwomanarguesduringvideoconference.jpg" className="img-contain" alt="logine"/>
        </div>
        <div className='col-md-5 downn'>
        <div className="reg-container">
      <div className="reg-wrapper">
      <h3><b>Login To Your account</b></h3>
          <p className='mt-4'>Please login to your <span className='pinkish'>employer</span> account to continue</p>
         
          <hr/>
       

        <form className='form' onSubmit={onSubmit}>
        <div className='row'>
             
             
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
              placeholder="Email"
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
				        {isLoading ? 'Loading...' : 'Login'}
              </b> 
          </button>
         
        </form>

        <span>Don't have an account? </span>
        <Link
          to="/employer/register"
          className="secondary"
          style={{ textDecoration: 'none' }}
        >
          Register
        </Link>
        <br/>
        
      </div>
    </div>
        </div>
      </div>
    </div>
    
  )
}

export default EmployerLogin
