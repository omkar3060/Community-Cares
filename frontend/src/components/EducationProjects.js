import React, { useState, useEffect, useContext } from 'react';
import { Card, Col, Container, Row, Button, ProgressBar, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import SidebarFilter from './SidebarFilter';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { FaSadTear } from 'react-icons/fa';

const StyledContainer = styled(Container)`
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

const StyledHeading = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
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

const StyledCardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
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

const StyledDonateButton = styled(StyledButton)`
  margin-top: auto;
  text-decoration: none;
  text-align: center;
`;

const StyledProgressBar = styled(ProgressBar)`
  height: 20px;
  border-radius: 10px;
  background-color: #e9ecef;
  margin-bottom: 5px;

  .progress-bar {
    background-color: #673ab7;
    border-radius: 10px;
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

const NoProjectsIcon = styled(FaSadTear)`
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

const EducationProjects = () => {
  const [projects, setProjects] = useState([]);
  const { email, isAuthenticated } = useContext(AuthContext);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8080/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      console.log(data);
      setProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const calculateProgress = (raised, goal) => {
    return (raised / goal) * 100;
  };

  const handleFilterChange = (amount) => {
    if (amount === '') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) => project.goalAmount < parseInt(amount)
      );
      setFilteredProjects(filtered);
    }
  };

  const handleDonateClick = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in before you start donating.", {
        className: 'toastify-custom',
      });
      navigate('/login');
    } else {
      navigate('/donate');
    }
  };

  return (
    <StyledContainer className="py-5">
      <Row>
        <Col md={3}>
          <SidebarFilter onFilterChange={handleFilterChange} />
        </Col>
        <Col md={9}>
          <StyledHeading>Projects Requiring Fundraising for Education</StyledHeading>
          {loading ? (
            <CenteredSpinner animation="border" />
          ) : filteredProjects.length === 0 ? (
            <NoProjectsContainer>
              <NoProjectsIcon />
              <NoProjectsMessage>No Projects Available</NoProjectsMessage>
              <NoProjectsText>
                Currently, there are no projects available for fundraising. Please check back later or create a new project.
              </NoProjectsText>
              <StyledButton as={Link} to="/campaign">
                Create Project
              </StyledButton>
            </NoProjectsContainer>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {filteredProjects.map((project) => (
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
                      <StyledCardContent>
                        <StyledCardTitle>{project.name}</StyledCardTitle>
                        <StyledCardText>Description: {project.description}</StyledCardText>
                        <StyledCardText className="fst-italic text-secondary">
                          Beneficiary Address: {project.beneficiaryAddress}
                        </StyledCardText>
                        <StyledCardText className="fw-bold text-dark">
                          Goal Amount: Rs.{project.goalAmount}
                        </StyledCardText>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="fw-bold text-dark">
                            Amount Raised: Rs.{project.raisedAmount}
                          </span>
                        </div>
                        <StyledProgressBar
                          now={calculateProgress(project.raisedAmount, project.goalAmount)}
                          label={`${calculateProgress(project.raisedAmount, project.goalAmount)}%`}
                        />
                      </StyledCardContent>
                      <StyledDonateButton
                        as={Link}
                        variant="success"
                        className="w-100 fw-bold"
                        to={`/donate?email=${encodeURIComponent(project.email)}&campId=${encodeURIComponent(project.campId)}`}
                      >
                        Donate Now
                      </StyledDonateButton>
                    </StyledCardBody>
                  </StyledCard>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default EducationProjects;
