import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { allPosts, reset } from '../../../features/post/postSlice'
import PostItem from '../../../components/base/PostItem'
import { Link } from 'react-router-dom'
import Spinner from '../../../media/loading-gif.gif'

function AdminDashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { posts, isLoading, isError, isSuccess, message } = useSelector((state) => state.post)
  

  useEffect(() => {
    if (isError) {
      console.log(message)
    } 

    dispatch(allPosts())
  
    return () => {
      dispatch(reset())
    }
  }, [])

 

  if (isLoading) {
    return <h1 className='loading'>
    <img src={Spinner} alt="Loading..." className='spinner-img'/>
  </h1>
  }

  return (
    <div className='container'>
    <div className='row'>
      <div className='col-9'>
        <h1 className='mt-4'>Published Posts</h1>
      </div>
      <div className='col-3'>
        <Link className='btn btn-primary mt-4' to='/post/create'>
          Publish New Post +
        </Link>
      </div>
    </div>
  
  
    
    
    
    <section className='content'>
      {posts.length > 0 ? (
        <div className='cards-posts mt-4'> 
          {posts.map((post) => (
            <PostItem post={post} key={post.id} /> 
          ))}
        </div>
      ) : (
        <center>
           <h3> No Posts Yet</h3>
        </center>
      )}
    </section>
  </div>
  )
}

export default AdminDashboard
