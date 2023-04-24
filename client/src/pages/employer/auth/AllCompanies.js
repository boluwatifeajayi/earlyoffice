import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { employerreset, AllEmployers } from '../../../features/employerAuth/employerSlice';
import CompanyItem from '../../../components/base/CompanyItem';
import { Spinner } from 'react-bootstrap';

function AllCompanies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { employers, isLoading, isError, message } = useSelector((state) => state.employerauth);

  useEffect(() => {
    dispatch(AllEmployers());
    return () => {
      dispatch(employerreset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
  }, [isError, message]);

  if(isLoading){
    return <h1 className='loading'>
        <Spinner animation='border' role='status' className='spinner-img spin'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
  </h1>
  }

  return (
    <div className='container'>
      <div className='job-page-search container main-content-area'>
        <h3 className='mt-4'>Companies On Earlyoffice</h3>
      </div>
     
      <section className='content'>
        {employers.length > 0 ? (
          <div className='cat-cards mt-4'>
            {employers.map((employer) => (
              <CompanyItem employer={employer} key={employer.id} />
            ))}
          </div>
        ) : (
          <h3>No Companies</h3>
        )}
      </section>
    </div>
  );
}

export default AllCompanies;
