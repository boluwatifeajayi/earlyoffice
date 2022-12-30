import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
  return (
    <div>
    <div className="banner-area">
   
    <section className="main">
      <div className="main-content-area">
        <h3 className="main-heading">Internship Board For Passionate <br/> Youths and Students In Nigeria</h3>
        <p className="gray main-sub-text">Early Office bring students , youth, copper and new grads  to connect with  <br/> the best companys in Nigeria ready to offer them internships and great work experiences</p>

        <form>
          <div className="form-box">
            <i className="fa fa-briefcase mr-2 bigger-icon" aria-hidden="true"></i>
            <input type="text" name="" id="" className="search-field internship-field" placeholder="Search Internships..."/>
            <i className="fa fa-map-marker  ml-2 mr-2 bigger-icon" aria-hidden="true"></i>
            <input type="text" name="" id="" className="search-field location-field" placeholder="Search Locations..."/>
            <Link to='/internships'>
               <button className="search-btn" type="button">Explore</button>
            </Link>
            
          </div>
        </form>
        <div className="under-text">
          <p className="gray border-around">Powered By The early Office Team</p>
        </div>
      </div>
    </section>
       
    </div>

   

   
    <div className="bg-2">

  
    <section className="container section-2">
      <div className="sub-heading-div">
        <h1 className="section-heading">Popular Intersnhip Categories</h1>
      <p className="center mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident molestias,  dicta omnis est excepturi <br/>aliquid fuga harum natus officia laborum nesciunt </p>
      </div>
      
      <div className="cat-cards mt-4">
        <div className="my-custom-card">
          <p className="card-icon">
            <i className="fas fa-code primary"></i>
          </p>
          <h4>Software Development</h4>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          <button>Explore</button>
        </div>
        <div className="my-custom-card">
          <p className="card-icon primary">
            <i className="fas fa-money-bill-wave"></i>
          </p>
          <h4>Finance</h4>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          <button>Explore</button>
        </div>
        <div className="my-custom-card">
          <p className="card-icon primary">
            <i className="fas fa-headphones"></i>
          </p>
          <h4>Customer SUpport</h4>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          <button>Explore</button>
        </div>
        
        
      </div>
      <center>
        <button className="mt-4 all-cat-btn mb-4">View All Categories</button>
      </center>
    </section>
  </div>

    <hr/>
  
    <section className="container section-3">
      <div className="sub-heading-div">
        <h1 className="section-heading">Popular Places</h1>
      <p className="center mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident molestias,  dicta omnis est excepturi <br/>aliquid fuga harum natus officia laborum nesciunt </p>
      </div>
      
      <div className="cat-cards mt-4">
        <div className="my-custom-card">
          <p className="card-icon primary">
            <i className="fas building "></i>
          </p>
          <h4>Lagos</h4>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          <button>Explore</button>
        </div>
        <div className="my-custom-card">
          <p className="card-icon primary">
            <i className="fas fa-building"></i>
          </p>
          <h4>Abuja</h4>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          <button>Explore</button>
        </div>
        <div className="my-custom-card">
          <p className="card-icon primary">
            <i className="fas fa-building"></i>
          </p>
          <h4>Port Harcout</h4>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          <button>Explore</button>
        </div>
        
        
      </div>
      <center>
        <button className="mt-4 all-cat-btn mb-4">View All Locations</button>
      </center>
    </section>
  

    
     <section className="container section-4">
      <div className="sub-heading-div">
        <h1 className="section-heading">Why Early Office ?</h1>
      
      </div>
      
      <div className="cat-cards mt-4">
        <div className="my-custom-card-no-border">
          <p className="card-icon-no-border primary center">
            <i className="fas fa-building center"></i>
          </p>
          <h4 className="center">100+ Internships</h4>
          <p className="center">orem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, laudantium velit enim magnam blanditiis optio!  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, ut!</p>
          
        </div>
        <div className="my-custom-card-no-border">
          <p className="card-icon-no-border primary center">
            <i className="fas fa-building center"></i>
          </p>
          <h4 className="center">Other Benefits</h4>
          <p className="center">orem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, laudantium velit enim magnam blanditiis optio!  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, ut!</p>
          
        </div>
        <div className="my-custom-card-no-border">
          <p className="card-icon-no-border primary center">
            <i className="fas fa-building center"></i>
          </p>
          <h4  className="center">Quick Response</h4>
          <p className="center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, laudantium velit enim magnam blanditiis optio!  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, ut!</p>
          
        </div>
        
        
      </div>
      
    </section>
    <hr/>

    

    <section className="container mb-4 section-4">
      <div className="row mt-4">
        <div className="col-md-6">
          <img src="https://i.pinimg.com/736x/e8/e2/46/e8e2469e6a21893eb66df75ddd9869a8.jpg" className="round-border" alt=""/>
        </div>
        <div className="col-md-6 down">
          <h1 className="mb-4">Early Office for Employers</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quasi, corporis, quaerat pariatur harum ducimus excepturi aliquam inventore doloremque consequatur possimus quos sit fugit doloribus facilis reprehenderit? Omnis, perspiciatis commodi?</p>
          <Link to='/employer/register' className="cta-small mt-4">
            <button>Get Started</button>
          </Link>
        </div>
      </div>
    </section>

    </div>
  )
}

export default Home;