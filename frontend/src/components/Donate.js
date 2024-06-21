import React, { useState, useEffect, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from "./AuthContext";
import { FaDonate, FaUser, FaEnvelope, FaArrowLeft } from 'react-icons/fa';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: #f8f9fa;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #343a40;
`;

const StyledForm = styled(Form)`
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`;

const StyledFormGroup = styled(Form.Group)`
  margin-bottom: 1.5rem;
`;

const StyledFormLabel = styled(Form.Label)`
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #495057;
`;

const StyledFormControl = styled(Form.Control)`
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 0.75rem 1.25rem;
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  text-align: center;

  &:hover {
    color: #0056b3;
  }
`;

const IconWrapper = styled.span`
  margin-right: 0.5rem;
`;

const DonateImage = styled.img`
  width: 100%;
  max-width: 300px;
  margin-bottom: 2rem;
`;

const Donate = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [projectEmail, setProjectEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [projectId, setProjectId] = useState('');

  console.log("isAuthenticated:", isAuthenticated);

  useEffect(() => {
    console.log("isauth:", isAuthenticated);
    if (!isAuthenticated) {
      navigate('/login');
    }
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');
    const campId = queryParams.get('campId');
    console.log(campId);
    setProjectEmail(email);
    setProjectId(campId);
    console.log("email:",email);
    console.log("camp ID:",campId);
  }, [location,isAuthenticated, navigate]);


  const handleDonate = async () => {
    const response = await fetch(`http://localhost:8080/donated?email=${projectEmail}&campId=${projectId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, donorEmail, name }),
    });

    const responseText = await response.text();
    console.log(responseText);

    if (response.ok) {
      alert("Donated successfully");
      const sendEmailResponse = await fetch(
        `http://localhost:8080/mail/send/${donorEmail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject: "Thanking mail",
            message: "Thank you for donating to charity.",
          }),
        }
      );

      console.log(sendEmailResponse);

      if (sendEmailResponse.ok) {
        const emailSendingResult = await sendEmailResponse.json();
        if (emailSendingResult.status === "success") {
          console.log("Email sent successfully");
        } else {
          console.error("Failed to send email:", emailSendingResult.message);
        }
      } else {
        console.error("Failed to send email: Server error.");
      }
    } else {
      alert("Error donating");
    }
  };

  return (
    <Container>
      <DonateImage src="https://img.freepik.com/premium-vector/donate-icon-vector_946691-933.jpg" alt="Donate" />
      <Title>Donate Now</Title>
      <StyledForm>
        <StyledFormGroup controlId="formAmount">
          <StyledFormLabel>
            <IconWrapper><FaDonate /></IconWrapper>
            Amount
          </StyledFormLabel>
          <StyledFormControl
            type="number"
            placeholder="Enter donation amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </StyledFormGroup>
        <StyledFormGroup controlId="formName">
          <StyledFormLabel>
            <IconWrapper><FaUser /></IconWrapper>
            Name
          </StyledFormLabel>
          <StyledFormControl
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </StyledFormGroup>
        <StyledFormGroup controlId="formEmail">
          <StyledFormLabel>
            <IconWrapper><FaEnvelope /></IconWrapper>
            Email
          </StyledFormLabel>
          <StyledFormControl
            type="email"
            placeholder="Enter your email"
            value={donorEmail}
            onChange={(e) => setDonorEmail(e.target.value)}
          />
        </StyledFormGroup>
        <SubmitButton onClick={handleDonate}>
          Submit Donation
        </SubmitButton>
      </StyledForm>
      <BackLink to="/">
        <IconWrapper><FaArrowLeft /></IconWrapper>
        Back to Home
      </BackLink>
    </Container>
  );
};

export default Donate;
