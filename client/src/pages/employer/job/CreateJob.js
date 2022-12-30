import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createJob } from "../../../features/job/jobSlice";
import { useNavigate, Link } from "react-router-dom";

const CreateJob = () => {
    const navigate = useNavigate()
	const [formData, setFormData] = useState({
		role: '',
		jobName: '',
		jobResponsibility: [""],
		jobType: '',
		numberOfOpenings: '',
		skillsNeeded: ["a few"],
		salary: '',
		duration: '',
		location: {state:'', country:'Nigeria'},
		benefits: '',
		additionalInformation: '', 
	})
    
	const {role, jobName, jobResponsibility, jobType, numberOfOpenings, skillsNeeded, salary, duration, location, benefits, additionalInformation} = formData;

	const dispatch = useDispatch()

	const onChange = (name,value) => setFormData((prevProfile)=>({...prevProfile,[name]:value}));

     

    const onSubmit = (e) => {
        e.preventDefault();
		const jobData = {
			role, jobName, jobResponsibility, jobType, numberOfOpenings, skillsNeeded, salary, duration, location, benefits, additionalInformation
		}
		dispatch(createJob(jobData)) 

        navigate('/employer/internships')
     
    }

	

    

    return (

        <div className="container2">
             <Link to="/employer/internships">
      <button className='btn btn-block  mt-4 mb-4 w-25' style={{backgroundColor: '#d9dce2'}}> <i className='fa fa-arrow-left'></i>{" "}Back</button>
      </Link>
            <h2 class="text-center">Create A New Internship</h2>
		<hr/>
            <form onSubmit={onSubmit}>
            <div class="row mt-4">
            <div class="col-md-4">
				<div className="form-group create-form">
				<input
					type='text'
					placeholder='Internship Title'
					name='jobName'
                    value={jobName}
                    onChange={(e)=>{onChange(e.target.name,e.target.value)}}
					className="form-input mb-4"
					required
            	/>
				<input
					type='text'
					placeholder='Profile'
					className="form-input mb-4"
                    name='role'
                    value={role}
                    onChange={(e)=>{onChange(e.target.name,e.target.value)}}
                    required
            	/>
				<div class="row">
					<div class="col-md">
						<input
							type='text'
							placeholder='Number Of Openings'
                            name="numberOfOpenings"
							value={numberOfOpenings}
                            onChange={(e)=>{onChange(e.target.name,e.target.value)}}
							className="form-input mb-4"
							required
            			/>
					</div>
					<div class="col-md">
						<input
							type='text'
							placeholder='Internship Type'
							name='jobType'
                            value={jobType}
                            onChange={(e)=>{onChange(e.target.name,e.target.value)}}
							className="form-input mb-4"
							required
            			/>
					</div>
				</div>
				<div class="row">
					<div class="col-md">
						<input
							type='text'
							placeholder='Salary'
							name='salary'
                            value={salary}
                            onChange={(e)=>{onChange(e.target.name,e.target.value)}}
							className="form-input mb-4"
							required
            			/>
					</div>
					<div class="col-md">
						<input
							type='text'
							placeholder='Duration'
							name='duration'
                            value={duration}
                            onChange={(e)=>{onChange(e.target.name,e.target.value)}}
							className="form-input mb-4"
							required
            			/>
					</div>
				</div>
				<input
					type='text'
					placeholder='Location'
					name='location'
                        value={location.state}
                    onChange={(e)=>{onChange(e.target.name,{['state']:e.target.value})}}
					className="form-input mb-4"
					required
            	/>
				
				
				</div>
		    </div>
			<div class="col-md-4">
				<div className="form-group">
					<textarea
					id='name'
					type='text'
					value={skillsNeeded[0][skillsNeeded]}
                onChange={(e)=>{onChange(e.target.name,[e.target.value])}}
                name='skillsNeeded'
					placeholder="Skills needed"
					className="form-control mb-4"
					rows="5"
					required
				
			  ></textarea>
			  <textarea
					id='name'
					type='text'
					name='jobResponsibility'
                    value={jobResponsibility[0][jobResponsibility]}
                    onChange={(e)=>{onChange(e.target.name,[e.target.value])}}
					placeholder="Responsibiliities Of Intern"
					className="form-control mb-4"
					cols="6"
					rows="5"
					required
				
			  ></textarea>
				</div>
		    </div>
			<div class="col-md-4">
				<div className="form-group">
					<textarea
					id='name'
					type='text'
                    name='benefits'
                    value={benefits}
                    onChange={(e)=>{onChange(e.target.name,e.target.value)}}
					placeholder="Internship Benefits"
					className="form-control mb-4"
					rows="5"
					required
				
			  ></textarea>
			  <textarea
					id='name'
					type='text'
                name='additionalInformation'
                value={additionalInformation}
                onChange={(e)=>{onChange(e.target.name,e.target.value)}}
					placeholder="Additional Information"
					className="form-control mb-4"
					rows="5"
					required
				
			  ></textarea>
				</div>

            </div>
            </div>
            
            
      <div>
        <center>
        <input
          type='submit'
          value='Create'
          className='btn btn-danger btn-block mb-4 w-50'
        />
        </center>
        
      </div>
    </form>
        </div>

        
    )
};

export default CreateJob;