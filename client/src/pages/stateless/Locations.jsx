import React from 'react'
import { Link } from 'react-router-dom'
import { States } from '../../utils/data'

export const Locations = () => {
  return (
	<div className='container'>
		<section className="section-2 container">
      <div className="sub-heading-div">
        <h1 className="section-heading">Early Office Intersnhip Locations</h1>
      </div>
      
      <div className="cat-cards mt-4">
	  {States.map(st => (
                    <div key={st.value}>
                      
					  <div className="my-custom-card" key={st.value}>
          
         				 <h4>{st.text}</h4>
		  
                  
        
          
          <Link to={`/internships/locations/${st.text}`}>
            <button className='mt-4'>
              Explore
            </button>
          </Link>
        </div>
                    </div>
                  ))}
        
       
        
      </div>
    </section>
	</div>
  )
}
