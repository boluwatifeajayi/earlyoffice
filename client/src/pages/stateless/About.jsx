import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1>About Us</h1>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <p>
            EarlyOffice is a job board website that connects employers with
            students looking for internships or part-time jobs. Our mission is
            to make it easier for young professionals to find meaningful
            opportunities that match their skills and interests, while helping
            employers attract and hire top talent.
          </p>
          <p>
            Our team consists of experienced recruiters, developers, and
            designers who are passionate about creating innovative solutions for
            the job market. We believe that the traditional recruitment process
            is outdated and ineffective, and that technology can help bridge the
            gap between job seekers and employers.
          </p>
        </Col>
        <Col md={6}>
          <img
            src="/images/about-us.jpg"
            alt="EarlyOffice team"
            className="img-fluid"
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h2>Our Values</h2>
          <ul>
            <li>
              <strong>Transparency:</strong> We believe in being open and honest
              with our users and partners, and building trust through
              transparency.
            </li>
            <li>
              <strong>Innovation:</strong> We strive to create innovative
              solutions that can transform the job market and improve the lives
              of job seekers and employers.
            </li>
            <li>
              <strong>Diversity:</strong> We celebrate diversity and inclusion
              in all aspects of our business, and aim to create a welcoming and
              inclusive environment for all our users and employees.
            </li>
            <li>
              <strong>Career Growth:</strong> We believe in supporting the
              career growth and development of our users, and providing them
              with the tools and resources they need to succeed in their careers.
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
