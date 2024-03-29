import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { getEmployerProfile, employerreset, employerUpdate } from '../../../features/employerAuth/employerSlice';
import Spinner from '../../../media/loading-gif.gif'

function UpdateEmployerProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { employerProfile, isLoading, isError, isSuccess, message, theEmployer } = useSelector(state => state.employerauth);
  
  // set default values for employer data
  const [orgLocation, setOrgLocation] = useState(theEmployer.orgLocation || '');
  const [orgIndustry, setOrgIndustry] = useState(theEmployer.orgIndustry || '');
  const [orgMission, setOrgMission] = useState(theEmployer.orgMission || '');
  const [orgSize, setOrgSize] = useState(theEmployer.orgSize || '');
  const [orgDescription, setOrgDescription] = useState(theEmployer.orgDescription || '');
  const [orgWebsite, setOrgWebsite] = useState(theEmployer.orgWebsite || '');
  const [orgBenefits, setOrgBenefits] = useState(theEmployer.orgBenefits || '');
  const [orgLogo, setOrgLogo] = useState(theEmployer.orgLogo || '');

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getEmployerProfile());
    
    return () => {
      dispatch(employerreset());
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();

    dispatch(employerUpdate({
      orgLocation,
      orgIndustry,
      orgMission,
      orgSize,
      orgDescription,
      orgWebsite,
      orgBenefits, 
      orgLogo,
    }));
    alert("profile update succesful") 
    navigate('/employer/internships'); 
  };

  if (isLoading) {
    return <h1 className='loading'>
    <img src={Spinner} alt="Loading..." className='spinner-img'/>
  </h1>
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Update Employer Profile</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Organization Location: </label>
          <input type="text" className="form-input" value={orgLocation && orgLocation} onChange={e => setOrgLocation(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Industry: </label>
          <input type="text" className="form-input" value={orgIndustry} onChange={e => setOrgIndustry(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Mission: </label>
          <textarea className="form-input" value={orgMission} onChange={e => setOrgMission(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Size: </label>
          <input type="text" className="form-input" value={orgSize} onChange={e => setOrgSize(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <textarea className="form-input" value={orgDescription} onChange={e => setOrgDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Website: </label>
          <input type="text" className="form-input" value={orgWebsite} onChange={e => setOrgWebsite(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Benefits: </label>
          <input type="text" className="form-input" value={orgBenefits} onChange={e => setOrgBenefits(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Logo: </label>
          <input type="text" className="form-input" value={orgLogo} onChange={e => setOrgLogo(e.target.value)} />
        </div>
        <div className="text-center">
      <input type="submit" className="btn normal-btn" value="Update" />
    </div>
        </form>
        </div>
  )
}
export default UpdateEmployerProfile;