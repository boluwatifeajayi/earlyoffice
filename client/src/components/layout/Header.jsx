import {React} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {studentLogout, studentreset} from '../../features/studentAuth/studentSlice'
import {employerLogout, employerreset} from '../../features/employerAuth/employerSlice'


function Header() {

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const {student} = useSelector((state) => state.studentauth) 
	const {employer} = useSelector((state) => state.employerauth)
	
	

	const onLogout = () => {

		if(student){
		  dispatch(studentLogout())
		  dispatch(studentreset())
		  navigate('/')

		 
		}
		else if(employer){
		  dispatch(employerLogout())
		  dispatch(employerreset())
		  navigate('/')
		 
		}
		else{
		  console.log("we have some issues")
		}
		  
		}

		// console.log(employer.currentCompany.adminFistName)

		// nav student name logic
		// var stud = ""

		// if(student === null){
		// 	stud = ""
		// }
		// else if(student !== null){
		// 	if(student.currentStudent === undefined){
		// 		stud = student.newStudent.firstname
		// 	}
		// 	else if(student.newStudent === undefined){
		// 		stud = student.currentStudent.firstname
		// 	}
		// 	else{
		// 		console.log("nada")
		// 	}
		// }
		// else if(student === null){
		// 	stud = ""
		// }
		// else{
		// 	stud = ""
		// }


		// // nav employer name logic
		// var emp = ""

		// if(employer === null){
		// 	emp = ""
		// }
		// else if(employer !== null){
		// 	if(employer.currentCompany === undefined){
		// 		emp = employer.newCompany.adminFirstName
		// 	}
		// 	else if(employer.newCompany === undefined){
		// 		emp = employer.currentCompany.adminFirstName
		// 	}
		// 	else{
		// 		emp = ""
		// 	}
		// }
		// else if(employer === null){
		// 	emp = ""
		// }
		// else{
		// 	emp = ""
		// }


		


		
  
  return (
	<div>
	<header>
	<Link to="/">
	<h5 className="logo">early<span className="primary">office</span></h5>
	</Link>
      
      <nav>
        <ul className="nav_link">
		{employer ? (
			""
		) : (
			<span>
				<li>
			<Link to='/internships'>Internships</Link>
		</li>
		 <li><Link to='/internships'>Categories</Link></li>
		<li><Link to='/internships'>Locations</Link></li> 
		 <li><Link to='/employer/register'>Employer</Link></li>
			</span>
			
		)}
		
        </ul>
      </nav>
      <div>
	  {student || employer ? (
          <div>
			<Link className='text-primary' to={employer ? '/employer/internships' : '/student/dashboard'}><i className='fas fa-user mr-2'></i><b> welcome {employer ? employer.adminFirstName : student.firstname} {employer ? employer.currentCompany.adminFirstName : student.currentStudent.firstname} </b> </Link>
            <button className='btn' onClick={onLogout}>
              <b className='primary ml-2'>Logout</b>
            </button>
        
          </div>
        ) : (
          
          <>
        <Link to='/student/login' className="cta-outline">
          <button>
			Login
		  </button>
        </Link>
        <Link to='/student/register' className="cta-small">
          <button>Register</button>
        </Link>
          </>
        )}
        
       
      </div>
     
    </header>
	</div>
  )
}

export default Header