import {React, useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {GetSinglePost, reset, deletePost} from '../../../features/post/postSlice'
import {ApplyForPost} from '../../../features/post/postSlice'
import { Helmet } from 'react-helmet';
import moment from 'moment';
import Spinner from '../../../media/loading-gif.gif'
import { Container, Row, Col, Button } from 'react-bootstrap';

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
      <p>...</p>
    </h1>
  }


  return (
<Container className='posty'>
  <Helmet>
    <title>{title ? `${title} | Early Office - Internships For Nigerians` : "Early Office - Internships For Nigerians"}</title>
    <meta name="description" content={"Early Office is a post board website for interns in Nigeria to connect them to companies."} />
  </Helmet>

  <div className='mt-4'>
    <div className='border-post'>
      <div className='inside'>
        <img src={image} alt={title} className="post-img"/>
        <h1 className='mb-4 mt-4'><b>{title}</b></h1>   
        <p className="bigger"><b>#{tags}</b></p>
        <div>

          <Row>
            <Col xs={12} md={4} className='mb-3 mb-md-0'>
              <p className="bigger"><b>Category: {category}</b></p>
            </Col>
            <Col xs={12} md={4} className='mb-3 mb-md-0'>
              <p className="bigger"><b><span>Posted:</span> {timeDiff}</b></p>
            </Col>
            <Col xs={12} md={4}>
              <p className="bigger"><b>By Admin</b></p>
            </Col>
          </Row>
          <hr className="my-4"/>
        </div>

        <div className="mt-3 mb-3">
          <div className="mb-3" dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        {admin && (
          <div>
            <Link to={`/post/update/${id}`}>
              <Button className='btn btn-secondary'>Update Post</Button>
            </Link>    
            <Button className='btn btn-danger ml-2' onClick={handleDelete}>Delete Post</Button>
          </div>
        )}
      </div>
    </div>
  </div>
</Container>
  )
}

export default Post