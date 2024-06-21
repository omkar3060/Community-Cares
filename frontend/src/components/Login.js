import React, { useState, useContext } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { LogoSVG } from "../assets";
import { AuthContext } from "./AuthContext";
import { ToastContainer, toast } from "react-toastify";

const Login = ({ history }) => {
  const { setIsAuthenticated, setEmail } = useContext(AuthContext);
  const [email, setEmailState] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    const resetLink = `http://localhost:3000/resetp?email=${email}`;
    const message = `Click <a href="${resetLink}">here</a> to reset your password.`;

    const requestBody = JSON.stringify({
      subject: "testing",
      message: message,
    });

    try {
      const response = await fetch(`http://localhost:8080/mail/send/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (response.ok) {
        toast.success("Password reset email sent successfully!", {
          className: "toastify-custom",
        });
      } else {
        toast.error("Failed to send password reset email.", {
          className: "toastify-custom",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if admin credentials
    if (email === "admin@com" && password === "123") {
      setIsAuthenticated(true);
      setEmail(email);
      toast.success("Admin logged in successfully!", {
        className: "toastify-custom",
      });
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
      return;
    }

    const userData = {
      email,
      password,
    };

    try {
      const checkResponse = await fetch(`http://localhost:8080/login/check-email?email=${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (checkResponse.ok) {
        const isRegistered = await checkResponse.json();
        if (!isRegistered) {
          toast.error("Email is not registered. Please sign up.", {
            className: "toastify-custom",
          });
          return;
        }
      } else {
        console.error("Email check failed.");
        return;
      }

      setSigningIn(true);

      const passwordResponse = await fetch(`http://localhost:8080/login/validate-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!passwordResponse.ok) {
        toast.error("Incorrect password", {
          className: "toastify-custom",
        });
        setSigningIn(false);
        return;
      } else {
        setIsAuthenticated(true);
        setEmail(email);
        toast.success("User logged in successfully!", {
          className: "toastify-custom",
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during login.", {
        className: "toastify-custom",
      });
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <div>
      <section className="vh-100" id="login">
        <Container>
          <Row className="justify-content-center h-100">
            <Col md={4} className="d-flex flex-column justify-content-center">
              <div className="text-center mb-4" style={{ marginTop: "20px" }}>
                <LogoSVG height={80} width={80} />
              </div>
              <Card>
                <Card.Body style={{ padding: "20px" }}>
                  <h2 className="text-center mb-4">Sign In</h2>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter Registered Email"
                        value={email}
                        onChange={(e) => setEmailState(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100" disabled={signingIn}>
                      {signingIn ? "Signing In..." : "Sign In"}
                    </Button>
                  </Form>
                  <div className="text-center mt-2">
                    <Link to="#" onClick={handleForgotPassword}>
                      Forgot Password?
                    </Link>
                  </div>
                </Card.Body>
              </Card>
              <div className="text-center mt-2">
                <span>Don't have an account? </span>
                <Link to="/signup">Sign Up</Link>
              </div>
              <ToastContainer />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Login;
