import React, { useState, useEffect, useContext } from 'react';
import { Table, Container, Button, Modal, Spinner, Alert } from 'react-bootstrap';
import { AuthContext } from './AuthContext';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledContainer = styled(Container)`
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

const SectionHeading = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  color: #673ab7;
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: center;
`;

const StyledTable = styled(Table)`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  th.action-column {
    width: 250px; /* Adjust the width as needed */
  }
`;

const TableRow = styled.tr`
  transition: all 0.3s ease;

  &:hover {
    background-color: #f8f9fa;
    cursor: pointer;
  }
`;

const StyledButton = styled(Button)`
  background-color: #673ab7;
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: #512da8;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const StyledModal = styled(Modal)`
  .modal-content {
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .modal-header {
    background-color: #673ab7;
    color: #fff;
    border-bottom: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .modal-title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .modal-body {
    font-size: 1.2rem;
  }

  .modal-footer {
    border-top: none;
  }
`;

const StyledViewDetailsButton = styled(Button)`
  background-color: #673ab7;
  border: none;
  color: #fff;
  font-weight: bold;
  transition: all 0.3s ease;
  padding: 8px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #512da8;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }

  &:active {
    background-color: #3f51b5;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    transform: translateY(1px);
  }
`;

const StyledShareButton = styled(Button)`
  background-color: #25d366; /* WhatsApp green */
  border: none;
  color: #fff;
  font-weight: bold;
  transition: all 0.3s ease;
  padding: 8px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-left: 10px;

  &:hover {
    background-color: #1ebe57;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }

  &:active {
    background-color: #128c7e;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    transform: translateY(1px);
  }
`;

const CenteredSpinner = styled(Spinner)`
  display: block;
  margin: 0 auto;
`;

const NoProjectsMessage = styled(Alert)`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 20px;
`;

const EducationProjects = () => {
  const { email } = useContext(AuthContext);
  const [pendingProjects, setPendingProjects] = useState([]);
  const [acceptedProjects, setAcceptedProjects] = useState([]);
  const [loadingPending, setLoadingPending] = useState(true);
  const [loadingAccepted, setLoadingAccepted] = useState(true);

  const fetchPendingProjects = async () => {
    try {
      const response = await fetch(`http://localhost:8080/pending-projects/${email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch pending projects');
      }
      const data = await response.json();
      setPendingProjects(data);
      setLoadingPending(false);
    } catch (error) {
      console.error('Error fetching pending projects:', error);
      setLoadingPending(false);
    }
  };

  const fetchAcceptedProjects = async () => {
    try {
      const response = await fetch(`http://localhost:8080/projects/${email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch accepted projects');
      }
      const data = await response.json();
      setAcceptedProjects(data);
      setLoadingAccepted(false);
    } catch (error) {
      console.error('Error fetching accepted projects:', error);
      setLoadingAccepted(false);
    }
  };

  useEffect(() => {
    fetchPendingProjects();
    fetchAcceptedProjects();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchProjectDetails = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:8080/project/${projectId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch project details');
      }
      const data = await response.json();
      setSelectedProject(data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const shareOnWhatsApp = (project) => {
    const message = `Check out this campaign: ${project.name}\nDescription: ${project.description}\nGoal Amount: ${project.goalAmount}\nRaised Amount: ${project.raisedAmount}\nURL: http://localhost:3000/education-projects`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <StyledContainer className="py-5">
      <Heading>My Campaigns</Heading>
      <StyledLink to="/campaign">
        <StyledButton>Create Campaign</StyledButton>
      </StyledLink>
      <StyledContainer>
        <SectionHeading>Pending Projects</SectionHeading>
        {loadingPending ? (
          <CenteredSpinner animation="border" />
        ) : pendingProjects.length === 0 ? (
          <NoProjectsMessage variant="info">No pending projects</NoProjectsMessage>
        ) : (
          <StyledTable striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pendingProjects.map((project, index) => (
                <TableRow key={project.id}>
                  <td>{index + 1}</td>
                  <td>{project.name}</td>
                  <td>{project.description}</td>
                  <td>Pending</td>
                </TableRow>
              ))}
            </tbody>
          </StyledTable>
        )}
        <SectionHeading>Accepted Projects</SectionHeading>
        {loadingAccepted ? (
          <CenteredSpinner animation="border" />
        ) : acceptedProjects.length === 0 ? (
          <NoProjectsMessage variant="info">No accepted projects</NoProjectsMessage>
        ) : (
          <StyledTable striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th className="action-column">Action</th>
                <th className="action-column">Share</th>
              </tr>
            </thead>
            <tbody>
              {acceptedProjects.map((project, index) => (
                <TableRow key={project.id}>
                  <td>{index + 1}</td>
                  <td>{project.name}</td>
                  <td>{project.description}</td>
                  <td>
                    <StyledViewDetailsButton
                      variant="primary"
                      onClick={() => fetchProjectDetails(project.id)}
                    >
                      View Details
                    </StyledViewDetailsButton>
                  </td>
                  <td>
                    <StyledShareButton
                      variant="success"
                      onClick={() => shareOnWhatsApp(project)}
                    >
                      Share on WhatsApp
                    </StyledShareButton>
                  </td>
                </TableRow>
              ))}
            </tbody>
          </StyledTable>
        )}
      </StyledContainer>
      <StyledModal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProject?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Description:</strong> {selectedProject?.description}</p>
          <p><strong>Beneficiary Address:</strong> {selectedProject?.beneficiaryAddress}</p>
          <p><strong>Goal Amount:</strong> {selectedProject?.goalAmount}</p>
          <p><strong>Email:</strong> {selectedProject?.email}</p>
          <p><strong>Raised Amount:</strong> {selectedProject?.raisedAmount}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </StyledModal>
    </StyledContainer>
  );
};

export default EducationProjects;
