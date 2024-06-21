import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogoSVG } from "../assets";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const urlParams = new URLSearchParams(window.location.search);

// Get the value of the 'email' parameter
  const email = urlParams.get('email');

  const handleSubmit =  async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      alert("Passwords do not match");
      return;
    }


  try {
      const response = await fetch(`http://localhost:8080/login/reset-password?email=${email}&password=${newPassword}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
      });

      const responseData = await response.text();


      console.log(responseData);

      if (response.ok) {
          setSuccessMessage("Password successfully updated!");
      } else {
          setErrorMessage("Failed to reset password.");
      }
  } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while resetting password.");
  }


  };

  return (
    <div>
      <section className="vh-100">
        <Container>
          <Row className="justify-content-center h-100">
            <Col md={6} className="d-flex flex-column justify-content-center">
              <div className="text-center mb-4" style={{marginTop : "20px"}}>
                <LogoSVG height={80} width={80} />
              </div>
              <Card className="p-4">
                <h2 className="text-center mb-4">Reset Password</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicPassword" className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="formBasicConfirmPassword"
                    className="mb-3"
                  >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Reset Password
                  </Button>
                  {errorMessage && (
                    <div className="text-danger mt-2">{errorMessage}</div>
                  )}
                  {successMessage && (
                    <div className="text-success mt-2">{successMessage}</div>
                  )}
                </Form>
                <div className="text-center mt-3">
                  <Link to="/login">Back to Login</Link>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ResetPassword;
