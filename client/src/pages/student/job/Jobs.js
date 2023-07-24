import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { allJobs, reset, getJobsBySearch } from '../../../features/job/jobSlice';
import JobItem from '../../../components/base/JobItem';
import { Spinner } from 'react-bootstrap';

function Jobs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { jobs, isLoading, isError, isSuccess, message } = useSelector((state) => state.job);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [profileType, setProfileType] = useState('');
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // State to keep track of current page
  const jobsPerPage = 9; // Number of jobs to show per page

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(allJobs());

    return () => {
      dispatch(reset());
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getJobsBySearch({ search, location, profileType, keyword }));
  };

  if (isLoading) {
    return (
      <h1 className='loading'>
        <Spinner animation='border' role='status' className='spinner-img spin'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      </h1>
    );
  }

  // Calculate the index of the last job to be shown on the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  // Calculate the index of the first job to be shown on the current page
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  // Get the jobs to be shown on the current page
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className='container'>
      {/* <div className='job-page-search container main-content-area'>
        <form onSubmit={handleSearch} className='search-form'>
          <div className='form-box'>
            <i className='fa fa-briefcase mr-2 bigger-icon job-s' aria-hidden='true'></i>
            <input
              type='text'
              name='searchTerm'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='search-field internship-field imp border'
              placeholder='Search Internships...'
            />
            <i className='fa fa-map-marker ml-2 mr-2 bigger-icon job-s' aria-hidden='true'></i>
            <input
              type='text'
              name='location'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className='search-field location-field imp border'
              placeholder='Search Locations...'
            />
            <button className='search-btn btn-s mr-2' type='submit'>
              Search
            </button>
          </div>
        </form>
      </div> */}
      <h3 className='mt-4 text-center'>All Internships</h3>
      
      <section className='content'>
        <div className='row'>
          <div className='col-md-4'>
          <div className='filter-internships mt-4 p-3 border fixed rounded'>
              <h4>Filter Internships</h4>
              <form onSubmit={handleSearch}>
              <div className='form-group'>
                
                <label>Internship</label>
                <input
                  type='text'
                  name='searchTerm'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='form-control'
                  placeholder='Search Internship....'
                />
              </div>
              <div className='form-group'>
                <label>Location</label>
                <input
                  type='text'
                 
                  className='form-control'
                 
                  name='location'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
             
              placeholder='Search Locations...'
                />
              </div>
              <button type='Submit' className='normal-btn'>
                Apply Filters
              </button>
              </form>
              
            </div>
          </div>
          <div className='col-md-8'>
            {currentJobs.length > 0 ? (
              <div className='jobs-cards mt-4'>
                {currentJobs.map((job) => (
                  <JobItem job={job} key={job.id} />
                ))}
              </div>
            ) : (
              <center>
                <h3> No Internships Yet</h3>
              </center>
            )}
          </div>
        </div>

        {/* Pagination buttons */}
        <div className='pagination'>
          {currentPage > 1 && (
            <button onClick={() => setCurrentPage(currentPage - 1)} className='btn btn-secondary'>
              <span className='arrow'>&#8592;</span> Previous Page
            </button>
          )}
          {currentPage < Math.ceil(jobs.length / jobsPerPage) && (
            <button onClick={() => setCurrentPage(currentPage + 1)} className='btn btn-secondary'>
              Next Page<span className='arrow'>&#8594;</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default Jobs;
