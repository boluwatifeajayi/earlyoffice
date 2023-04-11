import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';

function PostItem({post}) {

  const timeDiff = moment(post.createdAt).fromNow();

  return (
	<div>
		<div className="my-custom-card-post">
        
		<img src={post.image} alt={post.title}/>
		<h4>
        	
			{post.title.slice(0, 40) + '...'}
      	</h4>
	   
		<div className="spacer mb-3">
		  <div className="intersnhip-box">
			  <b>Posted {timeDiff}</b>
		  </div>
		  <div className="profile-box">
			  <b><span> <b>{post.category}</b></span><span className='text-white'>......</span> </b>
		  </div>
		</div>
		<div class="mb-3" dangerouslySetInnerHTML={{ __html: post.content.slice(0, 125) + '...' }} />

		<div>

		</div>
		<Link to={`/post/${post._id}/`}>
			<button>Keep Reading</button>
		</Link>
		
	  </div>
	</div>
  )
}

export default PostItem