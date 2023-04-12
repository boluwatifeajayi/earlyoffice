import {React, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { adminRegister, adminreset } from '../../../features/adminAuth/adminSlice'



const AdminRegister = (props) => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const {username, email, password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {admin, isLoading, isError, isSuccess, message} = useSelector((state => state.adminauth))

  useEffect (() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess || admin){
      navigate('/admin/dashboard')
    } 

    dispatch(adminreset())
  }, [admin, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

      const adminData = {
        username,
        email,
        password,
      }
      dispatch(adminRegister(adminData))
    }

  
  
  return (

    <div className='container'>
      <div>
       
        <div>
        <div className="reg-container admin-reg">
      <div className="reg-wrapper">
      <h3 className='mt-4'><b>Admin Register</b></h3>
          <p className='mt-4'>Please Create A <span className='pinkish'>admin</span> account to continue</p>
         
          <hr/>
       

        <form className='form' onSubmit={onSubmit}>
        <div>
             
              <div className="form-group">
                <input
                  id="name"
                  type="text"
                  name="username"
                  placeholder='Username'
                  onChange={onChange}
                  className="form-input"
                  style={{paddingLeft: 15,}}
                  value={username}
                  required
                />
             
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
          to="/admin/login"
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

export default AdminRegister;
