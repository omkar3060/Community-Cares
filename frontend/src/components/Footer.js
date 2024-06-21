import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css'; // Add this line to import the CSS

const Footer = (props) => {
  return (
    <Container fluid className="bg-dark text-white">
      <footer className="text-center">
        <Container>
          <section>
            <Row className="text-center d-flex justify-content-center pt-5">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/about" label="About" />
              <FooterLink to="/mission" label="Mission" />
              <FooterLink to="/support" label="Support" />
            </Row>
          </section>

          <hr className="my-4" />

          <section className="">
            <Row className="d-flex justify-content-center">
              <Col lg={8}>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                  distinctio earum repellat quaerat voluptatibus placeat nam,
                  commodi optio pariatur est quia magnam eum harum corrupti
                  dicta, aliquam sequi voluptate quas.
                </p>
              </Col>
            </Row>
          </section>
        </Container>
      </footer>
    </Container>
  );
};

export default Footer;

const FooterLink = ({ to = '/', label }) => {
  return (
    <Col md={2}>
      <h6 className="text-uppercase font-weight-bold ">
        <Link to={to} className="nav-link">
          {label}
        </Link>
      </h6>
    </Col>
  );
};
