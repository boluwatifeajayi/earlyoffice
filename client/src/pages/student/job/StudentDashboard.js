import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { studentreset, getStudentProfile } from '../../../features/studentAuth/studentSlice';
import { useNavigate, Link } from 'react-router-dom';
import { StudentAppliedJobs, reset } from '../../../features/job/jobSlice';
import { Badge, Spinner } from 'reactstrap';


function StudentDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { student, studentProfile, isError, isSuccess, message, theStudent } = useSelector(
    state => state.studentauth,
  );

  const { jobs, isLoading } = useSelector(state => state.job);

  useEffect(() => {
    if (student === null) {
      navigate('/student/login');
    }

    if (isError) {
      console.log(message);
    }

    dispatch(getStudentProfile());
    dispatch(StudentAppliedJobs());

    return () => {
      dispatch(studentreset());
      dispatch(reset());
    };
  }, []);

  if(isLoading){
     return <h1 className='loading'>
     <Spinner animation='border' role='status' className='spinner-img spin'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
   </h1>
  }

  return (
    <div>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-4">
            <small className="primary">Name</small>
            <h4>
              {theStudent.firstname} {theStudent.lastname}
            </h4>
          </div>
          <div className="col-md-4">
            <small className="primary">Profile</small>
            <h4>{theStudent.fieldOfInterest}</h4>
          </div>
          <div className="col-md-4">
            <Link to="/student/profile/update">
              <button className="btn btn-success">Update Profile</button>
            </Link>
          </div>
        </div>
        <hr className="mb-4" />
        <h2 className="mt-4">Job Applications</h2>
        {jobs.length === 0 ? (
          <p className="text-muted mt-4">Not yet applied to any jobs</p>
        ) : (
          <table className="table mt-4">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Company</th>
                <th scope="col">Title</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={job._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{job.org.orgName}</td>
                  <td>{job.jobName}</td>
                  <td>
                    {job.student[0]?.status ? (
                      <Badge color={job.student[0].status === 'accepted' ? 'success' : job.student[0].status === 'declined' ? 'danger' : 'warning'}>
                        <strong>{job.student[0].status}</strong>{' '}
                        {job.student[0].status === 'accepted' && <span>(expect an email soon)</span>}
                      </Badge>
                    ) : (
                      <span className="text-muted">Not Applied</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
