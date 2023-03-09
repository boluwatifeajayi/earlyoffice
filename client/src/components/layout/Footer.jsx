import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
	<div>
		<footer className="footer">
			<div className="container">
			  <div className="row">
				<div className="footer-col">
				  <h4>earlyoffice</h4>
				  <ul>
					<li><Link to="about-us">about us</Link></li>
					<li><Link to="/blog">Blog</Link></li>
					<li><Link to="/privacy-policy">privacy policy</Link></li>
					<li><Link to="/contact-us">contact Us</Link></li>
				  </ul>
				</div>
				<div className="footer-col">
				  <h4>Students</h4>
				  <ul>
					<li><Link href="/companies/locations">Locations</Link></li>
					<li><Link href="/company/categories">Categories</Link></li>
					<li><Link href="/internships">Internships</Link></li>
					<li><Link href="/stundent/register">Register</Link></li>
	  
				   
				  </ul>
				</div>
				<div className="footer-col">
				  <h4>Employer</h4>
				  <ul>
					
					<li><Link to='/employer/register'>Register</Link></li>
					<li><Link to="/employer/login">Login</Link></li>
					<li><Link to="/companies/all">Profiles</Link></li>
					
				  </ul>
				</div>
				<div className="footer-col">
				  <h4>follow us</h4>
				  <div className="social-links">
					<Link to="facebook.com"><i className="fab fa-facebook-f"></i></Link>
					<Link to="twitter.com"><i className="fab fa-twitter"></i></Link>
					<Link to="instagram.com"><i className="fab fa-instagram"></i></Link>
					<Link to="linkedin.com"><i className="fab fa-linkedin-in"></i></Link>
				  </div>
				</div>
			  </div>
			 
			</div>
			<div></div>
			<center>
			  <p className="text-white">&copy; 2022 earlyoffice</p>
			</center>
		   
		 </footer>
	</div>
  )
}

export default Footer