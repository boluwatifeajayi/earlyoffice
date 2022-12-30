import {React, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { studentRegister, studentreset } from '../../../features/studentAuth/studentSlice'


const StudentRegister = (props) => {

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phoneNumber: '',
  })

  const {firstname, lastname, email, password, phoneNumber} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {student, isLoading, isError, isSuccess, message} = useSelector((state => state.studentauth))

  useEffect (() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess || student){
      navigate('/student/create')
    } 

    dispatch(studentreset())
  }, [student, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

      const studentData = {
        firstname,
        lastname,
        email,
        phoneNumber,
        password
    
      }
      dispatch(studentRegister(studentData))
    }

  
  
  return (

    <div className='container'>
      <div className='row'>
        <div className='col-md-7 hide img-down'>
        <img src="https://source.wustl.edu/wp-content/uploads/2018/01/shutterstock_126952187.jpg" className="img-contain" alt="login"/>
        </div>
        <div className='col-md-5 downn'>
        <div className="reg-container">
      <div className="reg-wrapper">
      <h3><b>Get Started</b></h3>
          <p className='mt-4'>Please Create A <span className='pinkish'>student</span> account to continue</p>
         
          <hr/>
       

        <form className='form' onSubmit={onSubmit}>
        <div className='row'>
              <div className='col'>
              <div className="form-group">
                <input
                  id="name"
                  type="text"
                  name="firstname"
                  placeholder='First Name'
                  onChange={onChange}
                  className="form-input"
                  style={{paddingLeft: 15,}}
                  value={firstname}
                  required
                />
              </div>
              </div>
              <div className='col'>
              <div className="form-group">
                <input
                  id="name"
                  type="text"
                  name="lastname"
                  onChange={onChange}
                  value={lastname}
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
              id="email"
              type="email"
              name="email"
              onChange={onChange}
              value={email}
              style={{paddingLeft: 15,}}
              className="form-input"
              placeholder="Email"
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
              id="password"
              type="password"
              name="password"
              value={password}
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
          to="/student/login"
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

export default StudentRegister
