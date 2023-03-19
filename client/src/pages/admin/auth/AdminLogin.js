import {React, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { adminLogin, adminreset } from '../../../features/adminAuth/adminSlice';
import third from '../../../media/third.jpg'



const AdminLogin = (props) => {

  const [formData, setFormData] = useState({
    username: '',
   	password: '',
  })

  const {username,password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {admin, isLoading, isError, isSuccess, message} = useSelector((state => state.adminauth))

  useEffect (() => {
    if(isError){
      toast.error("invalid username orpassword")
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
       	password
    
      }
      dispatch(adminLogin(adminData))
    }

  
  
  return (

    <div className='container'>
      <div >
       
        <div>
        <div className="reg-container">
      <div className="reg-wrapper admin-reg">
      <h3 className='mt-4'><b>Admin Login</b></h3>
          <p className='mt-4'>Please login to your <span className='pinkish'>admin</span> account to continue</p>
         
          <hr/>
       

        <form className='form' onSubmit={onSubmit}>
        <div>
             
             
            </div>

            <div className="form-group">
            
            <input
              id="username"
              type="text"
              name="username"
              onChange={onChange}
              value={username}
              style={{paddingLeft: 15,}}
              className="form-input"
              placeholder="Username"
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
				        {isLoading ? 'Loading...' : 'Login'}
              </b> 
          </button>
         
        </form>

        <span>Don't have an account? </span>
        <Link
          to="/admin/register"
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

export default AdminLogin
