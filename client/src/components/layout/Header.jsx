import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { studentLogout, studentreset } from '../../features/studentAuth/studentSlice';
import { employerLogout, employerreset } from '../../features/employerAuth/employerSlice';



function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.studentauth);
  const { employer } = useSelector((state) => state.employerauth);
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
      }
    };
  }, [dispatch, employer, student, isMounted]);

  const onLogout = () => {
    if (student) {
      dispatch(studentLogout());
      dispatch(studentreset());
      navigate('/');
    } else if (employer) {
      dispatch(employerLogout());
      dispatch(employerreset());
      navigate('/');
    } else {
      console.log('we have some issues');
    }
  };

  return (
    <div>
      <header className="sticky-top py-3">
        <Link to='/'>
          <h5 className='logo'>
            early<span className='primary'>office</span>
          </h5>
        </Link>

        <nav>
          <ul className='nav_link'>
            {employer ? (
              ''
            ) : (
              <span>
                <li>
                  <Link to='/internships'>Internships</Link>
                </li>
                <li>
                  <Link to='/internships/categories'>Categories</Link>
                </li>
                <li>
                  <Link to='/internships/locations'>Locations</Link>
                </li>
                <li>
                  <Link to='/companies/all'>Companies</Link>
                </li>
                <li>
                  <Link to='/blog'>Blog</Link>
                </li>
              </span>
            )}
          </ul>
        </nav>

        <div>
          {student || employer ? (
            <div className='prof'>
              <Link className='text-primary' to={employer ? '/employer/internships' : '/student/dashboard'}>
                <i className='fas disp fa-user mr-2'></i>
                <b>
                  {' '}
                  <span className='disp'>Welcome</span>
                  {employer?.adminFirstName || student?.firstname} {employer?.currentCompany?.adminFirstName || student?.currentStudent?.firstname}
                </b>{' '}
              </Link>
              <button className='btn' onClick={onLogout}>
                <i className='fas fa-sign-out-alt mr-1'></i>
                <b className='primary ml-2 disp'>Logout</b>
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
</header>
</div>
);
}

export default Header;