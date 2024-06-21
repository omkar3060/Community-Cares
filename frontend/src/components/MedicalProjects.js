import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

const MedicalProjects= ()=>{
    return (
        <Container className="py-5 ">
          <h1 className="display-4 fw-bold text-bold text-center">
            Projects Requiring Fundraising for Medical Aid
          </h1>
          <Container>
            <Row>
              {/* Sample projects */}
              <Col className="p-5" style={{ marginBottom: '20px' }}> {/* Add margin bottom style */}
                <Card text="dark" className="shadow shadow-sm">
                  {/* Add your project details */}
                  <Card.Body>
                    <h5>Project 1</h5>
                    <p>Description of Project 1</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="p-5" style={{ marginBottom: '105px' }}> {/* Add margin bottom style */}
                <Card text="dark" className="shadow shadow-sm">
                  {/* Add your project details */}
                  <Card.Body>
                    <h5>Project 2</h5>
                    <p>Description of Project 2</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Container>
    );    
}
export default MedicalProjects;