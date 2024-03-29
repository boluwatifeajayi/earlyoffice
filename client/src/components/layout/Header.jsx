import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { studentLogout, studentreset } from '../../features/studentAuth/studentSlice';
import { employerLogout, employerreset } from '../../features/employerAuth/employerSlice';
import { adminLogout, adminreset } from '../../features/adminAuth/adminSlice';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';



function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.studentauth);
  const { employer } = useSelector((state) => state.employerauth);
  const {admin} = useSelector((state) => state.adminauth );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    return () => {
      if (student) {
        dispatch(studentLogout());
        dispatch(studentreset());
      } else if (employer) {
        dispatch(employerLogout());
        dispatch(employerreset());
      
    } else if (admin) {
      dispatch(adminLogout());
      dispatch(adminreset());
    }
    };
  }, [dispatch, employer, student, admin, isMounted]);

  const onLogout = () => {
    if (student) {
      dispatch(studentLogout());
      dispatch(studentreset());
      navigate('/');
    } else if (employer) {
      dispatch(employerLogout());
      dispatch(employerreset());
      navigate('/');
    } else if (admin) {
      dispatch(adminLogout());
      dispatch(adminreset());
      navigate('/');
    } else {
      console.log('we have some issues');
    }
  };

  console.log(employer)

  return (
    <div>
     <Navbar sticky='top' bg='' expand='md' className='btt p-3' style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)', borderBottom: '1px solid #f0f0f0' }}>
  <Container>
    <Link to='/'>
      <Navbar.Brand className='logo'>
        early<span className='primary'>office</span>
      </Navbar.Brand>
    </Link>
    <Navbar.Toggle aria-controls='navbar-nav' />
    <Navbar.Collapse id='navbar-nav'>
      <Nav className='mx-auto'>
        {!employer && (
          <Nav.Link as={Link} to='/internships'>
            Internships
          </Nav.Link>
        )}
        {!employer && (
          <Nav.Link as={Link} to='/internships/categories'>
            Categories
          </Nav.Link>
        )}
        {!employer && (
          <Nav.Link as={Link} to='/internships/locations'>
            Locations
          </Nav.Link>
        )}
        {!employer && (
          <Nav.Link as={Link} to='/companies/all'>
            Companies
          </Nav.Link>
        )}
        {!employer && (
          <Nav.Link as={Link} to='/posts'>
            Blog
          </Nav.Link>
        )}
        {!employer && (
          <Nav.Link as={Link} to='/community'>
            Community
          </Nav.Link>
        )}
        
      </Nav>
      <div className='ml-auto'>
        {student || employer || admin ? (
          <div className='prof'>
            <Link className='' to={admin ? '/admin/dashboard' : employer ? '/employer/internships' : '/student/dashboard'}>
              <i className='far disp text-primary fa-user mr-2'></i>
              <b>
                <span className='disp'>Hello,</span>
                {employer?.adminFirstName || student?.firstname || admin?.username} {employer?.currentCompany?.orgName || student?.currentStudent?.firstname || admin?.currentadmin?.username} 
              </b>{' '}
            </Link>
            <button className='btn' onClick={onLogout}>
              <i className='fas fa-sign-out-alt mr-1 pinkish'></i>
              <b className=' ml-2 disp'>Logout</b>
            </button>
          </div>
        ) : (
          <>
            <Link to='/student/login' className='cta-outline'>
              <button className='log-btn'>Login</button>
            </Link>
            <Link to='/student/register' className='cta-small'>
              <button className='reg-btn'>Register</button>
            </Link>
          </>
        )}
      </div>
    </Navbar.Collapse>
  </Container>
</Navbar>

</div>
);
}

export default Header;