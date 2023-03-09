import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { InternshipCategory } from '../utils/data';


function Home() {
  const [category, setCategory] = useState('');

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const isButtonDisabled = category === '';

  
  return (
  <div >
    <div className="banner-area">
   
    <section className="main">
      <div className="main-content-area container">
        <h3 className="main-heading">Internship Board For Passionate  Youths and Students In Nigeria</h3>
        <p className="gray main-sub-text">Early Office bring students , youth, copper and new grads  to connect with  the best companys in Nigeria ready to offer them internships and great work experiences</p>

        <form className='home-search'>
          <div className="form-box">
           
            {/* <input type="text" name="" id="" className="intern-field msf" placeholder="Search Internships Category..."/> */}

            <select
        required
        style={{ paddingLeft: 15 }}
        className="intern-field msf"
        value={category}
        onChange={handleCategoryChange}
      >
        <option value="" disabled hidden>
          -Search Internship Category-
        </option>
        {InternshipCategory.map((st) => (
          <option key={st.value} value={st.value}>
            {st.text}
          </option>
        ))}
      </select>

      <Link to={`/internships/${category}`}>
        <button className="intern-btn" type="button" disabled={isButtonDisabled}>
          Search
        </button>
      </Link>
            
          </div>
        </form>
        <form className='other-search'>
          <div className="form-box">
            <Link to='/internships'>
               <button className="intern-btn" type="button">Search</button>
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

  
    <section className="section-2 container">
      <div className="sub-heading-div">
        <h1 className="section-heading">Popular Intersnhip Categories</h1>
      <p className="center mb-4">Looking for an internship opportunity but not sure which category to explore? Here are some of the most popular internship categories </p>
      </div>
      
      <div className="cat-cards mt-4">
        <div className="my-custom-card">
          <p className="card-icon">
            <i className="fas fa-code primary"></i>
          </p>
          <h4>Software Development</h4>
          <p>Interested in coding and technology? Try a software development internship! You'll learn programming, testing, and debugging software applications alongside experienced developers.</p>
          <button>
           
            <Link to="/internships/software developer"> Explore</Link>
          </button>
        </div>
        <div className="my-custom-card">
          <p className="card-icon primary">
            <i className="fas fa-money-bill-wave"></i>
          </p>
          <h4>Finance</h4>
          <p>Got a knack for numbers and an interest in finance? Consider a finance internship where you'll analyze financial data, prepare reports, and assist with financial planning under experienced finance professionals.</p>
          <button>Explore</button>
        </div>
        <div className="my-custom-card">
          <p className="card-icon primary">
            <i className="fas fa-headphones"></i>
          </p>
          <h4>Customer Support</h4>
          <p>Enjoy helping people and communicating? A customer support internship may suit you. You'll assist customers with issues, respond to inquiries, and improve customer satisfaction alongside experienced customer support professionals.</p>
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
<p className="center mb-4">Explore the following popular places for internships:</p>
      </div>
      
      <div className="cat-cards mt-4">
        <div className="my-custom-card">
          <p className="card-icon primary">
            <i className="fas building "></i>
          </p>
          <h4>Lagos</h4>
          <p>Looking for an internship in Lagos? Check out our list of available opportunities in the city, ranging from software development to finance and customer support.</p>
          <Link to="/internships/locations/lagos">
          <button>Explore</button>
          </Link>
         
        </div>
        <div className="my-custom-card">
          <p className="card-icon primary">
            <i className="fas fa-building"></i>
          </p>
          <h4>Abuja</h4>
          <p>If you're looking for internships in Abuja, we have a range of options available to suit your interests and skills. From marketing to engineering, you're sure to find an opportunity that fits your needs.</p>
          <button>Explore</button>
        </div>
        <div className="my-custom-card">
          <p className="card-icon primary">
            <i className="fas fa-building"></i>
          </p>
          <h4>Port Harcout</h4>
          <p>Looking to gain experience in Port Harcourt? Browse our selection of available internships in the city, from business administration to graphic design and more.</p>
          <button>Explore</button>
        </div>
        
        
      </div>
      <center>
        <button className="mt-4 all-cat-btn mb-4">View All Locations</button>
      </center>
    </section>
  

    
     <section className="section-4 container">
      <div className="sub-heading-div">
        <hr/>
        <h1 className="section-heading">Why Early Office ?</h1>
      
      </div>
      
      <div className="cat-cards mt-4">
        <div className="my-custom-card-no-border">
          <p className="card-icon-no-border primary center">
            <i className="fas fa-building center"></i>
          </p>
          <h4 className="center">100+ Internships</h4>
          <p className="center">Early Office offers over 100 internship opportunities for students to gain practical experience in their fields of interest.</p>
          
        </div>
        <div className="my-custom-card-no-border">
          <p className="card-icon-no-border primary center">
            <i className="fas fa-building center"></i>
          </p>
          <h4 className="center">Other Benefits</h4>
          <p className="center">In addition to internships, Early Office provides other benefits such as career counseling, resume building, and interview preparation to help students succeed.</p>
          
        </div>
        <div className="my-custom-card-no-border">
          <p className="card-icon-no-border primary center">
            <i className="fas fa-building center"></i>
          </p>
          <h4  className="center">Quick Response</h4>
          <p className="center">Early Office has a quick response time to inquiries and applications, ensuring that students can secure their desired internships as soon as possible.</p>
          
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
          <p>Looking for top talent to fill your internships? Early Office can help connect you with bright and motivated students and recent graduates. Our platform allows you to easily post your internship opportunities and browse candidate profiles. You can also take advantage of our matching algorithm, which helps you find the best fit for your company culture and internship position. Join Early Office today to start building your team of future leaders.</p>
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