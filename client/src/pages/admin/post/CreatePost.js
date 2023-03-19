import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../features/post/postSlice";
import { useNavigate, Link } from "react-router-dom";
import ReactQuill from 'react-quill';
import Spinner from '../../../media/loading-gif.gif'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.snow.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';


const CreatePost = () => {
    const navigate = useNavigate()
	const [formData, setFormData] = useState({
		category: '',
		title: '',
		content:'',
		image: '',
		tags: '',
	})
    
	const {category, title, content, image, tags} = formData;

	const {singlePost, isLoading, isError, isSuccess, message} = useSelector((state) => state.post)


	const dispatch = useDispatch()

	const onChange = (name,value) => setFormData((prevProfile)=>({...prevProfile,[name]:value}));

     

	const onSubmit = async (e) => {
		e.preventDefault();
		const postData = {
		  category, 
		  title, 
		  content, 
		  image, 
		  tags
		};
		
		try {
		  // Wait for the createPost function to complete
		  await dispatch(createPost(postData));
		  // If createPost is successful, navigate to '/admin/posts'
		  navigate('/admin/dashboard');
		} catch (error) {
		  console.error('Error creating post:', error);
		  alert('Error creating post:', error)
		}
	  };
	  


	if(isLoading){
		return <h1 className='loading'>
		<img src={Spinner} alt="Loading..." className='spinner-img'/>
	  </h1>
	}


	
    return (

      <div className="container">
      <Link to="/admin/dashboard">
      <button className='btn btn-block  mt-4 mb-4 w-50' style={{backgroundColor: '#d9dce2'}}> <i className='fa fa-arrow-left'></i>{" "}Back</button>
      </Link>
            <h2>New Post</h2>
		
            <form onSubmit={onSubmit} className="border-b">
            <div>
            <div>
				<div className="form-group create-form">
				<input
					type='text'
					placeholder='Post Title'
					name='title'
                    value={title}
                    onChange={(e)=>{onChange(e.target.name,e.target.value)}}
					className="form-input mb-4"
					required
            	/>
				
				</div>
				<div className="form-group create-form">
				<input
					type='text'
					placeholder='Image Url'
					name='image'
                    value={image}
                    onChange={(e)=>{onChange(e.target.name,e.target.value)}}
					className="form-input mb-4"
					required
            	/>
				
				</div>
		    </div>
			<div>
		
			<input
					type='text'
					placeholder='Category'
					name='category'
					value={category}
					onChange={(e)=>{onChange(e.target.name,e.target.value)}}
					className="form-input mb-4"
					required
            	/>
						
		    </div>
			<div>
			
			 
				<div className="form-group">
				
				
				<ReactQuill
					value={content}
					onChange={(value) => { onChange("content", value) }}
					modules={{
						toolbar: [
							[{ 'header': '1' }, { 'header': '2' }],
							['bold', 'italic', 'underline', 'blockquote'],
							[{ 'list': 'ordered' }, { 'list': 'bullet' },],
							['link'],
							['clean']
						],
						
					}}
					rows={12}
					placeholder='Start Writing Post Content....'
					className="mb-4"
					required
					name='content'
				/>
			 
				</div>
				<div className="form-group create-form">
				<input
					type='text'
					placeholder='Tags(leave  space to seprate each)'
					name='tags'
                    value={tags}
                    onChange={(e)=>{onChange(e.target.name,e.target.value)}}
					className="form-input mb-4"
					required
            	/>
				
				</div>

            </div>
            </div>
            
            
      <div>
        <center>
        <input
          type='submit'
          value='Publish'
          className='normal-btn mb-4'
        />
        </center>
        
      </div>
    </form>
        </div>

        
    )
};

export default CreatePost;