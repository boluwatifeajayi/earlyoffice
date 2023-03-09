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
					<li><a href="#">Blog</a></li>
					<li><Link to="/privacy-policy">privacy policy</Link></li>
					<li><Link to="/contact-us">contact Us</Link></li>
				  </ul>
				</div>
				<div className="footer-col">
				  <h4>Students</h4>
				  <ul>
					<li><a href="#">Locations</a></li>
					<li><a href="#">Categories</a></li>
					<li><a href="#">Jobs</a></li>
					<li><a href="#">Register</a></li>
	  
				   
				  </ul>
				</div>
				<div className="footer-col">
				  <h4>Employer</h4>
				  <ul>
					<li><a href="#">Register</a></li>
					<li><a href="#">Post Jobs</a></li>
					<li><a href="#">Profiles</a></li>
					
				  </ul>
				</div>
				<div className="footer-col">
				  <h4>follow us</h4>
				  <div className="social-links">
					<a href="#"><i className="fab fa-facebook-f"></i></a>
					<a href="#"><i className="fab fa-twitter"></i></a>
					<a href="#"><i className="fab fa-instagram"></i></a>
					<a href="#"><i className="fab fa-linkedin-in"></i></a>
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