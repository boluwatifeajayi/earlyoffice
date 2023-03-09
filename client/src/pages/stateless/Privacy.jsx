import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Privacy = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1>Privacy Policy</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            At EarlyOffice, we take your privacy very seriously. This privacy
            policy explains how we collect, use, and protect your personal
            information when you use our job board website to connect with
            potential employers or students.
          </p>
          <p>
            When you register as a student or employer on our website, we may
            collect personal information such as your name, email address,
            password, and profile information. We use this information to create
            your account, facilitate your job search or internship recruitment,
            and communicate with you about your account or services.
          </p>
          <p>
            We may also collect non-personal information such as your IP address,
            browser type, and operating system to analyze site usage and improve
            our services.
          </p>
          <p>
            EarlyOffice will not share, sell, or rent your personal information
            to third parties for their marketing purposes. However, we may share
            your personal information with our partners, service providers, or
            other trusted third parties to provide our services, process your
            job applications or postings, or for legal or security reasons.
          </p>
          <p>
            We use industry-standard security measures to protect your personal
            information from unauthorized access, disclosure, or misuse. However,
            we cannot guarantee the absolute security of your information, and
            you use our services at your own risk.
          </p>
          <p>
            By using EarlyOffice, you consent to the terms of this privacy policy
            and our collection, use, and disclosure of your personal information
            as described herein. We may update this policy from time to time, and
            your continued use of our website after any such changes will
            constitute your acceptance of the updated policy.
          </p>
          <p>
            If you have any questions or concerns about our privacy policy or
            our handling of your personal information, please contact us at
            privacy@earlyoffice.com.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Privacy;
