import React, { useState, useEffect, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './AuthContext';
import CampaignSteps from './CampaignSteps';

const StyledFormContainer = styled.div`
  .tick-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }

  .tick-image img {
    width: 25px;
    height: 25px;
  }
`;

const CampaignForm = () => {
  const { email } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    beneficiaryAddress: '',
    goalAmount: 0.0,
    email: email,
    image: null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [projects, setProjects] = useState([]);

  // Function to fetch projects from the database
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8080/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setProjects(data); // Set the fetched projects in state
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  // Fetch projects when the component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Check if any field is empty
    if (!formData.name || !formData.description || !formData.beneficiaryAddress || !formData.goalAmount || !formData.image) {
      toast.error('Please fill in all fields, including the image.', {
        className: 'toastify-custom',
      });
      setSubmitting(false);
      return;
    }

    try {
      // Check if there's already a campaign with the same name
      const existingCampaign = projects.find(project => project.name === formData.name);
      if (existingCampaign) {
        toast.error('A campaign with the same name already exists. Please change the name!!!', {
          className: 'toastify-custom',
        });
        setSubmitting(false);
        return;
      }

      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post('http://localhost:8080/pending-campaigns', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success('Campaign created successfully. Pending admin approval', {
          className: 'toastify-custom',
        });
      } else {
        toast.error('Failed to create campaign. Please try again later.', {
          className: 'toastify-custom',
        });
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to create campaign. Please try again later.', {
        className: 'toastify-custom',
      });
    }

    setSubmitting(false);
  };

  return (
    <StyledFormContainer className="container d-flex flex-column justify-content-center my-5">
      <CampaignSteps />
      <h2 className="text-center mb-4">Create Fundraising Campaign</h2>
      <Form className="align-self-center" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formCampaignName">
          <Form.Label>Campaign Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter campaign name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBeneficiaryAddress">
          <Form.Label>Beneficiary Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter beneficiary address"
            name="beneficiaryAddress"
            value={formData.beneficiaryAddress}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGoalAmount">
          <Form.Label>Goal Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter goal amount"
            name="goalAmount"
            value={formData.goalAmount}
            onChange={(e) => setFormData({ ...formData, goalAmount: parseFloat(e.target.value) })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImage">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100" disabled={submitting}>
          {submitting ? 'Creating Campaign...' : 'Create Campaign'}
        </Button>
      </Form>
      <p className="text-center mt-3">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Back to Home
        </Link>
      </p>
    </StyledFormContainer>
  );
};

export default CampaignForm;
