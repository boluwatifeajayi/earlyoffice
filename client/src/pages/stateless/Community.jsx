import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Communities = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h2 className="display-4">Join Our Thriving Community</h2>
            <p className="lead">
              Connect with passionate individuals, kickstart your career, and gain valuable insights into the job market.
            </p>
            <p>
              Are you a recent graduate looking for your first job, an intern searching for hands-on experience, or a young professional eager to advance your career? Look no further!
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac justo sed libero vulputate cursus.
              Suspendisse potenti. Vivamus ac velit a metus dictum laoreet in a velit.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Why Join Our Community?</h5>
                <ul className="list-group">
                  <li className="list-group-item">Expand your professional network</li>
                  <li className="list-group-item">Access to exclusive industry insights and trends</li>
                  <li className="list-group-item">Participate in informative webinars and workshops</li>
                  <li className="list-group-item">Receive personalized job search tips and advice</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Registration Form */}
        <div className="row mt-5">
          <div className="col-lg-6">
            <h3>Join Our Community Today!</h3>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Your Name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Your Email" />
              </div>
              <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
          </div>
          <div className="col-lg-6">
            <h3>Connect with Us on Social Media</h3>
            <p>Stay updated with our latest news and events. Follow us on:</p>
            <ul className="list-inline">
              <li className="list-inline-item"><a href="#" className="text-primary"><FontAwesomeIcon icon={faFacebook} size="2x" /></a></li>
              <li className="list-inline-item"><a href="#" className="text-info"><FontAwesomeIcon icon={faTwitter} size="2x" /></a></li>
              <li className="list-inline-item"><a href="#" className="text-secondary"><FontAwesomeIcon icon={faLinkedin} size="2x" /></a></li>
              <li className="list-inline-item"><a href="#" className="text-danger"><FontAwesomeIcon icon={faInstagram} size="2x" /></a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Communities;
