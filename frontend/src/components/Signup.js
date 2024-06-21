import React, { useState, useContext } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { LogoSVG } from "../assets";
import { AuthContext } from "./AuthContext";
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
  const { setIsAuthenticated, setEmail } = useContext(AuthContext);

  // State variables to store form values
  const [email, setEmailState] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state variable for loading state
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true before making API requests

    // Create a data object with form values
    const userData = {
      email,
      password,
      name,
      PhoneNo,
    };
    try {
      console.log("Email data sent to PHP:", email);
      // Call validate_email.php to validate the email
      const emailValidationResponse = await fetch(
        "http://localhost:8000/validate_email.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!emailValidationResponse.ok) {
        console.error("Email validation request failed.");
        return;
      }

      console.log(emailValidationResponse);

      const emailValidationResult = await emailValidationResponse.json();
      console.log("Email validation result:", emailValidationResult);

      console.log(emailValidationResult.deliverability);

      if (emailValidationResult.deliverability === "UNDELIVERABLE") {
        toast.error("Please enter a valid email address.", {
          className: "toastify-custom",
        });
        setIsLoading(false); // Set loading state back to false after an error occurs
        return;
      }

      // Proceed with signup if email is valid
      // Check if the email is already registered
      const checkResponse = await fetch(
        `http://localhost:8080/login/check-email?email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the request was successful
      if (checkResponse.ok) {
        const isRegistered = await checkResponse.json(); // Extract the boolean value from the response

        // Check if the email is registered
        if (isRegistered) {
          toast.error(
            "Email is already registered. Sign In / Please use a different email.",
            {
              className: "toastify-custom",
            }
          );
          setIsLoading(false); // Set loading state back to false after an error occurs
          return;
        } else {
          // If email is not registered, proceed with signup
          const signupResponse = await fetch("http://localhost:8080/login/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });

          // Handle signup response
          if (signupResponse.ok) {
            setIsAuthenticated(true); // Set authentication status in context
            setEmail(email); // Set email in context
            toast.success("User signed up successfully!Navigating to Home page", {
              className: "toastify-custom",
              onClose: () => navigate("/"), // Navigate to home page when toast is closed
            });
            console.log("Signup successful!");
            const sendEmailResponse = await fetch(
              `http://localhost:8080/mail/send/${email}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  subject: "sign up mail",
                  message: "Thank u for signing up",
                }),
              }
            );

            console.log(sendEmailResponse);

            // Handle the response for email sending
            if (sendEmailResponse.ok) {
              const emailSendingResult = await sendEmailResponse.json();
              if (emailSendingResult.status === "success") {
                console.log("Email sent successfully");
                // Handle any further actions after sending the email
              } else {
                console.error(
                  "Failed to send email:",
                  emailSendingResult.message
                );
              }
            } else {
              console.error("Failed to send email: Server error.");
            }
          } else {
            console.error("Signup failed.");
          }
        }
      } else {
        console.error("Email check failed.");
      }

      setIsLoading(false); // Set loading state back to false after the signup process is complete
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false); // Set loading state back to false if an error occurs
    }
  };

  return (
    <div>
      <section className="vh-100" id="signup">
        <Container>
          <Row className="justify-content-center">
            <Col md={4} className="d-flex flex-column justify-content-center">
              <div className="text-center mb-4 mt-3">
                <LogoSVG height={80} width={80} />
              </div>
              <Card>
                <Card.Body>
                  <h2 className="text-center mb-4">Sign Up</h2>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicNo">
                      <Form.Label>PhoneNo</Form.Label>
                      <Form.Control
                        type="PhoneNo"
                        placeholder="Enter PhoneNo"
                        value={PhoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmailState(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Create Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing up..." : "Sign Up"}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
              <div className="text-center mt-2">
                <span>Already have an account? </span>
                <Link to="/login">Sign In</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Signup;