import {React, useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {GetSinglePost, reset, deletePost} from '../../../features/post/postSlice'
import {ApplyForPost} from '../../../features/post/postSlice'
import { Button, Modal, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import Spinner from '../../../media/loading-gif.gif'

function Post() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams(); 
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
 
  

  const [formData, setFormData] = useState({
    name: '',
	email: '',
	comment: ''
  })

  const {name, email, comment} = formData

  const {singlePost, isLoading, isError, isSuccess, message} = useSelector((state) => state.post)

  const {admin} = useSelector((state) => state.adminauth );

  const { title, content, image, category, tags, createdAt, _id } = singlePost



  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseConfirmationModal = () => setShowConfirmationModal(false);


  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await dispatch(deletePost(id));
        // Reload the page after successful deletion
        alert("Post Deleted")
        navigate('/admin/dashboard');
      } catch (error) {
        console.error('Error deleting post:', error);
        // Alert an error if there was an error
        alert('Error deleting post');
      }
    }
  };
  

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
      e.preventDefault();

      const applyData = {
        name,
		email,
		comment
    }
    dispatch(ApplyForPost({postId: id, applyData})) 
    setShowModal(false);
    setShowConfirmationModal(true);
    }

    useEffect(() => {
    
      dispatch(GetSinglePost(id));
    
      return () => {
        dispatch(reset());
      };
    }, [dispatch, GetSinglePost, id]);

    useEffect(() => {
      if (isError) {
        console.log(message);
      }
    }, [isError, message]);


  const timeDiff = moment(createdAt).fromNow();


  if(isLoading){
    return <h1 className='loading'>
      <img src={Spinner} alt="Loading..." className='spinner-img'/>
    </h1>
  }


  return (
	<div className='container posty'>
      <Helmet>
        <title>{title ? `${title} | Early Office - Internships For Nigerians` : "Early Office - Internships For Nigerians"}</title>
        <meta name="description" content={"Early Office is a post board website for interns in Nigeria to connect them to companies."} />
      </Helmet>


   <div className='mt-4'>
        <div className='border-post'>
        <div className='inside'>
        <img src={image} alt={title} className="post-img"/>
        <h1 className='mb-4 mt-4'><b>{title}</b></h1>   
        <p class="bigger"><b>#{tags}</b></p>
        <div>

  
 
  <div class="row">
    <div class="col-12 col-md-4 mb-3 mb-md-0">
      <p class="bigger"><b>Category: {category}</b></p>
    </div>
    <div class="col-12 col-md-4 mb-3 mb-md-0">
      <p class="bigger"><b><span>Posted:</span> {timeDiff}</b></p>
    </div>
    <div class="col-12 col-md-4">
      <p class="bigger"><b>By Admin</b></p>
    </div>
  </div>
  <hr class="my-4"/>
</div>

         <div class="mt-3 mb-3">
              <div class="mb-3" dangerouslySetInnerHTML={{ __html: content }} />
          </div>

          {admin && <div>
       <Link to={`/post/update/${id}`}> <button className='btn btn-secondary'>Update Post</button></Link>    
            <button className='btn btn-danger ml-2' onClick={handleDelete}>Delete Post</button>
            
            </div>}


          {/* <Button  className='w-100 mt-4 normal-btn' onClick={handleShowModal}>
        	Add Comment
      </Button> */}
        </div>
        <div className='col-md-0 '>
           <p className='text-white'>......</p>
        </div>
        </div>
        
       

        <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal" className='themod'>
  <Modal.Header closeButton>
    <Modal.Title>Internship Application To {title}</Modal.Title>
  </Modal.Header>
  {/* <Modal.Body>
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formTextArea">
        <b className='pinkish mb-4'>Write A Cover Letter</b>
        <textarea
          type='text'
          placeholder='A convincing statement to get you hired by the company'
          name='coverLetter'
          value={coverLetter}
          onChange={onChange}
          className="form-control mb-4 mt-4"
          rows={10}
          required
        />
      </Form.Group>
    
        <Button
          type='submit'
          className='normal-btn mb-4'
          aria-disabled={false}
          variant='danger'
        >
          Submit
        </Button>
      
    </Form>
  </Modal.Body> */}
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Cancel
    </Button>
  </Modal.Footer>
</Modal>

<Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Application  successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your application has been sent, track the progress of your application in your dashboard, click the button to go there dash
        <Link to='/student/dashboard' >
        <Button
          type='submit'
          className=' mt-4 w-100'
          aria-disabled={false}
          variant='danger'
        >
          Go To Dashboard
        </Button>
        </Link>
        
        
        </Modal.Body>
       
        <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Close
    </Button>
  </Modal.Footer>
      </Modal>



     

      </div>
  </div>
  )
}

export default Post