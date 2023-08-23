import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { InternshipCategory } from '../utils/data';
import fifth from '../media/undraw_Job_offers_re_634p.png'
import { useSpring, animated, useTrail } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import career from '../media/career.svg'
import { HomeIcon, CodeIcon, SearchIcon, BookmarkIcon, ChartBarIcon, CogIcon, UserCircleIcon, BellIcon, LogoutIcon, ViewListIcon } from '@heroicons/react/outline';




function Home() {


  const [category, setCategory] = useState('');

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const isButtonDisabled = category === '';

  const [ref, inView] = useInView({
    threshold: 0.2 // Change this value as per your requirement
  });

  const cardAnimations = useSpring({
    from: { opacity: 0 },
    to: { opacity: inView ? 1 : 1 },
    config: { duration: 500, delay: 200 }
  });
  

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { duration: 500, delay: 200 }
  });

  
  return (
  <div >
    <div className="banner-area">
   
    <section className="main container">
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-6 mt-6">
        <animated.div className="main-content-area" ref={ref} style={fadeIn}>
          <h3 className="main-heading ml-4">Kickstart Your career with earlyoffice Internships</h3>
          <p className="gray main-sub-text ml-4">Early Office bring students , youths, coppers and new grads to connect with the best companys in Nigeria ready to offer them internships and great work experiences</p>

          <form className='home-search'>
            <div className="form-box">

              {/* <input type="text" name="" id="" className="intern-field msf" placeholder="Search Internships Category..."/> */}

              <select
                required
                style={{ paddingLeft: 15, backgroundColor: 'white' }} // Added inline style for background color
                className="intern-field msf"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="" disabled hidden>
                  Search Internship Category...
                </option>
                {InternshipCategory.map((st) => (
                  <option key={st.value} value={st.value}>
                    {st.text}
                  </option>
                ))}
              </select>

              <Link to={`/internships/${category}`}>
                <button className="intern-btn" type="button" disabled={isButtonDisabled}>
                  <i className='fa fa-search'></i>
                </button>
              </Link>

            </div>
          </form>
          <form className='other-search'>
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
                  Search Internship Category
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
        
        </animated.div>
      </div>
      <div className="col-md-6">
        <img src={career} className="img-fluid ml-4 im" />
      </div>
     
    </div>
  </div>
  <center className="under-text center">
            <p className="gray border-around">Powered By The early Office Team</p>
          </center>
</section>

       
    </div>

   

   
    <div className="bg-2">

  
    <section className="section-2 container">
      <div className="sub-heading-div">
        <h1 className="section-heading">Popular Intersnhip Categories</h1>
      <p className="center mb-4">Looking for an internship opportunity but not sure which category to explore? Here are some of <br/> the most popular internship categories </p>
      </div>
      
      <div className="cat-cards mt-4">
      <animated.div className="my-custom-card" ref={ref} style={cardAnimations}>
          <p className="card-icon primary">
          <i className="fas fa-code"></i>
          </p>
          <h4>Technology</h4>
          <p className='text-sm'>Interested in coding and technology? Try a software development internship! You'll learn programming, testing, and debugging software applications alongside experienced developers.</p>
          <Link to="/internships/Technology">
            <button>
              Explore
            </button>
          </Link>
        </animated.div>

        <animated.div className="my-custom-card" ref={ref} style={cardAnimations}>
          <p className="card-icon primary">
            <i className="fas fa-money-bill-wave"></i>
          </p>
          <h4>Finance</h4>
          <p className='text-sm'>Got a knack for numbers and an interest in finance? Consider a finance internship where you'll analyze financial data, prepare reports, and assist with financial planning under experienced finance professionals.</p>
          <Link to="/internships/Finance">
            <button>
              Explore
            </button>
          </Link>
          </animated.div>

        <animated.div className="my-custom-card" ref={ref} style={cardAnimations}>
          <p className="card-icon primary">
            <i className="fas fa-headphones"></i>
          </p>
          <h4>Customer Support</h4>
          <p className='text-sm'>Enjoy helping people and communicating? A customer support internship may suit you. You'll assist customers with issues, respond to inquiries, and improve customer satisfaction alongside experienced customer support professionals.</p>
          <Link to="/internships/Marketing">
            <button>
              Explore
            </button>
          </Link>
        </animated.div>

        
        
      </div>
      <center>
        <Link to='/internships/categories'>
          <button className="mt-4 all-cat-btn mb-4">View All Categories</button>
        </Link>
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
      <animated.div className="my-custom-card" ref={ref} style={cardAnimations}>
          <p className="card-icon primary">
            <i className="fas fa-building"></i>
          </p>
          <h4>Lagos</h4>
          <p>Looking for an internship in Lagos? Check out our list of available opportunities in the city, ranging from software development to finance and customer support.</p>
          <Link to="/internships/locations/Lagos">
            <button>Explore</button>
          </Link>
         
        </animated.div>
        <animated.div className="my-custom-card" ref={ref} style={cardAnimations}>
          <p className="card-icon primary">
            <i className="fas fa-building"></i>
          </p>
          <h4>Abuja</h4>
          <p>If you're looking for internships in Abuja, we have a range of options available to suit your interests and skills. From marketing to engineering, you're sure to find an opportunity that fits your needs.</p>
          <Link to="/internships/locations/Abuja">
            <button>Explore</button>
          </Link>
       </animated.div>
       <animated.div className="my-custom-card" ref={ref} style={cardAnimations}>
          <p className="card-icon primary">
            <i className="fas fa-building"></i>
          </p>
          <h4>Port Harcout</h4>
          <p>Looking to gain experience in Port Harcourt? Browse our selection of available internships in the city, from business administration to graphic design and more.</p>
          <Link to="/internships/locations/Cross River">
            <button>Explore</button>
          </Link>
        </animated.div>
        
        
      </div>
      <center>
        <Link to="/internships/locations">
        <button className="mt-4 all-cat-btn mb-4">View All Locations</button>
        </Link>
        
      </center>
    </section>
  

    
     


    <section className="container section-3">
      <div className="sub-heading-div">
      <h1 className="section-heading">Why Early Office ?</h1>

      </div>
      
      <div className="cat-cards mt-4">
      <animated.div className="my-custom-card" ref={ref} style={cardAnimations}>
          <p className="card-icon primary">
            <i className="fas fa-suitcase"></i>
          </p>
          <h4>100+ Internships</h4>
          <p>Early Office offers over 100 internship opportunities for students to gain practical experience in their fields of interest.</p>
        </animated.div>
        <animated.div className="my-custom-card" ref={ref} style={cardAnimations}>
          <p className="card-icon primary">
            <i className="fas fa-users"></i>
          </p>
          <h4>Other Benefits</h4>
          <p>In addition to internships, Early Office provides other benefits such as career counseling, resume building, and interview preparation to help students succeed.</p>
         
        </animated.div>
        <animated.div className="my-custom-card" ref={ref} style={cardAnimations}>
          <p className="card-icon primary">
            <i className="fas fa-tachometer-alt"></i>
          </p>
          <h4>Quick Response</h4>
          <p>Early Office has a quick response time to inquiries and applications, ensuring that students can secure their desired internships as soon as possible.</p>
         
        </animated.div>
        
        
      </div>
      <center>
        <button className="mt-4 all-cat-btn mb-4">Read Our Blog</button>
      </center>
    </section>
    <hr/>

    

    <section className="container mb-4 section-4 mt-4">
    <animated.div  ref={ref} style={cardAnimations}>
      <div className="row mt-4">
        <div className="col-md-6">
          <img src={fifth}  alt=""/>
        </div>
        <div className="col-md-6 down">
          <h2 className="mb-4 section-heading2">Early Office for Employers</h2>
          <p>Looking for top talent to fill your internships? Early Office can help connect you with bright and motivated students and recent graduates. Our platform allows you to easily post your internship opportunities and browse candidate profiles. Join Early Office today to start building your team of future leaders.</p>
          <Link to='/employer/register' className="cta-small mt-4">
            <button>Get Started</button>
          </Link>
        </div>
      </div>
      </animated.div>
    </section>

    </div>
  )
}

export default Home;