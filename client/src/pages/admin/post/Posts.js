import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { allPosts, reset } from '../../../features/post/postSlice'
import PostItem from '../../../components/base/PostItem'
import Spinner from '../../../media/loading-gif.gif';

function Posts() {
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
      <h1 className='mt-4'>Lastest Blog Posts</h1>
      <hr />
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

export default Posts
