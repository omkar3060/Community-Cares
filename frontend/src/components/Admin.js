import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row, Button, Spinner } from 'react-bootstrap';
import ConfirmationModal from './ConfirmationModal';
import { ToastContainer, toast } from 'react-toastify';
import { FaInbox } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import '../global.css'; // Ensure this file contains the custom Toastify styles

const StyledContainer = styled(Container)`
  background-color: #f8f9fa;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledHeading = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 40px;
`;

const StyledCard = styled(Card)`
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
`;

const StyledCardBody = styled(Card.Body)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledCardTitle = styled(Card.Title)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const StyledCardText = styled(Card.Text)`
  font-size: 1rem;
  color: #555;
  margin-bottom: 15px;
`;

const StyledButton = styled(Button)`
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
`;

const CenteredSpinner = styled(Spinner)`
  display: block;
  margin: 0 auto;
`;

const NoProjectsContainer = styled.div`
  text-align: center;
  margin-top: 50px;
  padding: 20px;
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NoProjectsIcon = styled(FaInbox)`
  font-size: 3rem;
  color: #856404;
  margin-bottom: 20px;
`;

const NoProjectsMessage = styled.h2`
  font-size: 1.5rem;
  color: #856404;
  margin-bottom: 10px;
`;

const NoProjectsText = styled.p`
  font-size: 1rem;
  color: #856404;
`;

const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/pending-projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleApprove = async (project) => {
    try {
      const existingProjectResponse = await fetch('http://localhost:8080/projects');
      if (!existingProjectResponse.ok) {
        throw new Error('Failed to fetch existing projects');
      }
      const existingProjects = await existingProjectResponse.json();
      const existingProject = existingProjects.find(
        (project1) => project1.name === project.name
      );

      if (existingProject) {
        const rejectResponse = await fetch(
          `http://localhost:8080/admin/reject/${project.id}`,
          {
            method: 'PUT',
          }
        );
        if (!rejectResponse.ok) {
          throw new Error('Failed to reject project');
        }
        toast.error('A project with the same name already exists. This campaign has been rejected', {
          className: 'toastify-custom',
        });
        setProjects(projects.filter((proj) => proj.id !== project.id));
      } else {
        setCurrentProject(project);
        setShowApproveModal(true);
      }
    } catch (error) {
      console.error('Error fetching existing projects:', error);
    }
  };

  const handleApproveConfirm = async () => {
    setLoading(true);
    try {
      const projectId = currentProject.campId;
      const userEmail = currentProject.email;
      const response = await fetch(`http://localhost:8080/admin/approve/${projectId}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to approve project');
      }
      const notificationResponse = await fetch('http://localhost:8080/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, status: 'approved' }),
      });

      if (!notificationResponse.ok) {
        throw new Error('Failed to send notification');
      }
      toast.success('Campaign approved successfully', {
        className: 'toastify-custom',
      });
      setProjects(projects.filter(project1 => project1.id !== currentProject.id));
      setShowApproveModal(false);
      setCurrentProject(null);
    } catch (error) {
      console.error('Error approving project:', error);
      toast.error('Failed to approve project', {
        className: 'toastify-custom',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (project) => {
    setCurrentProject(project);
    setShowRejectModal(true);
  };

  const handleRejectConfirm = async () => {
    setLoading(true);
    try {
      const userEmail = currentProject.email;
      const projectId = currentProject.id;
      const response = await fetch(`http://localhost:8080/admin/reject/${projectId}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to reject project');
      }
      const notificationResponse = await fetch('http://localhost:8080/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, status: 'rejected' }),
      });

      if (!notificationResponse.ok) {
        throw new Error('Failed to send notification');
      }
      toast.success('Campaign rejected successfully', {
        className: 'toastify-custom',
      });
      setProjects(projects.filter(project => project.id !== currentProject.id));
      setShowRejectModal(false);
      setCurrentProject(null);
    } catch (error) {
      console.error('Error rejecting project:', error);
      toast.error('Failed to reject project', {
        className: 'toastify-custom',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer>
      <StyledHeading>Projects Requiring Fundraising for Education</StyledHeading>
      {loading ? (
        <CenteredSpinner animation="border" />
      ) : projects.length === 0 ? (
        <NoProjectsContainer>
          <NoProjectsIcon />
          <NoProjectsMessage>No Pending Projects</NoProjectsMessage>
          <NoProjectsText>
            Currently, there are no projects pending approval. Please check back later.
          </NoProjectsText>
        </NoProjectsContainer>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {projects.map(project => (
            <Col key={project.id}>
              <StyledCard>
                {project.image && (
                  <Card.Img
                    variant="top"
                    src={`data:image/jpeg;base64,${project.image}`}
                    alt="Project Image"
                    className="img-fluid"
                  />
                )}
                <StyledCardBody>
                  <StyledCardTitle>{project.name}</StyledCardTitle>
                  <StyledCardText>Description: {project.description}</StyledCardText>
                  <StyledCardText>Goal Amount: Rs.{project.goalAmount}</StyledCardText>
                  <StyledCardText>Beneficiary Address: {project.beneficiaryAddress}</StyledCardText>
                  <div className="d-flex justify-content-between mt-auto">
                    <StyledButton
                      variant="success"
                      onClick={() => handleApprove(project)}
                    >
                      Approve
                    </StyledButton>
                    <StyledButton
                      variant="danger"
                      onClick={() => handleReject(project)}
                    >
                      Reject
                    </StyledButton>
                  </div>
                </StyledCardBody>
              </StyledCard>
            </Col>
          ))}
        </Row>
      )}
      <ConfirmationModal
        show={showApproveModal}
        handleClose={() => setShowApproveModal(false)}
        handleConfirm={handleApproveConfirm}
        title="Approve Campaign"
        message={loading ? "Sending mail..." : "Are you sure you want to approve this campaign?"}
      />
      <ConfirmationModal
        show={showRejectModal}
        handleClose={() => setShowRejectModal(false)}
        handleConfirm={handleRejectConfirm}
        title="Reject Campaign"
        message={loading ? "Sending mail..." : "Are you sure you want to reject this campaign?"}
      />
      <ToastContainer />
    </StyledContainer>
  );
};

export default Admin;
