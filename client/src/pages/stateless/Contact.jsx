import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const ContactUs = () => {
  const email = "contact@earlyoffice.com";
  const phone = "+1 (555) 555-5555";
  const facebookUrl = "https://www.facebook.com/earlyoffice";
  const twitterUrl = "https://www.twitter.com/earlyoffice";
  const instagramUrl = "https://www.instagram.com/earlyoffice";

  const handleEmail = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1>Contact Us</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <p>
            Have a question, comment, or feedback for us? We'd love to hear from
            you! You can reach us by phone, email, or social media.
          </p>
          <div className="d-flex">
            <div className="mr-3">
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div>
              <p>{phone}</p>
            </div>
          </div>
          <div className="d-flex">
            <div className="mr-3">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div>
              <p>{email}</p>
            </div>
          </div>
          <div className="d-flex">
            <div className="mr-3">
              <FontAwesomeIcon icon={faFacebook} />
            </div>
            <div>
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </div>
          </div>
          <div className="d-flex">
            <div className="mr-3">
              <FontAwesomeIcon icon={faTwitter} />
            </div>
            <div>
              <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </div>
          </div>
          <div className="d-flex">
            <div className="mr-3">
              <FontAwesomeIcon icon={faInstagram} />
            </div>
            <div>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </div>
          </div>
          <Button variant="primary" onClick={handleEmail}>
            Send us an email
          </Button>
        </Col>
        <Col md={6}>
          <img
            src="/images/contact-us.jpg"
            alt="Contact us"
            className="img-fluid"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
