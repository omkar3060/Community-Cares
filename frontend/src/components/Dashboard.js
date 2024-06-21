import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Card, CardContent, CardHeader, CardActions, Button, CircularProgress } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import ConfirmationModal from './ConfirmationModal';
import styled from 'styled-components';
import { FaInbox } from 'react-icons/fa';
import '../global.css'; // Ensure this file contains the custom styles

const StyledModal = styled(Modal)`
  .modal-header {
    border-bottom: none;
    padding: 5px;
  }

  .modal-header {
    font-size: 18px;
    color: #333;
  }

  .modalMessage {
    width: 75%;
  }

  .modal-header button {
    color: #fff;
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  .modal-header button:hover {
    border-color: #1e7e34;
  }

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

const CenteredSpinner = styled(CircularProgress)`
  display: block;
  margin: 0 auto;
`;

const NoCampaignsContainer = styled.div`
  text-align: center;
  margin-top: 50px;
  padding: 20px;
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NoCampaignsIcon = styled(FaInbox)`
  font-size: 3rem;
  color: #856404;
  margin-bottom: 20px;
`;

const NoCampaignsMessage = styled.h2`
  font-size: 1.5rem;
  color: #856404;
  margin-bottom: 10px;
`;

const NoCampaignsText = styled.p`
  font-size: 1rem;
  color: #856404;
`;

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [acceptedCampaigns, setAcceptedCampaigns] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Fetch the accepted campaigns from the server
    axios.get('http://localhost:8080/projects')
      .then(response => setAcceptedCampaigns(response.data))
      .catch(error => console.error('Error fetching accepted campaigns:', error));

    // Fetch the total number of users from the server
    fetch('http://localhost:8080/login/count/users')
      .then(response => response.json())
      .then(data => setTotalUsers(data))
      .catch(error => console.error('Error fetching total users:', error))
      .finally(() => setLoading(false));
  }, []);

  const handleReject = async (project) => {
    setCurrentProject(project);
    setShowRejectModal(true);
  };

  const handleRejectConfirm = async () => {
    try {
      const userEmail = currentProject.email;
      const projectId = currentProject.id;
      const response = await fetch(`http://localhost:8080/admin/remove/${projectId}`, {
        method: 'PUT',
      });
      console.log("response:", response);
      if (!response.ok) {
        throw new Error('Failed to reject project');
      }
      // Send notification to the user
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
      setAcceptedCampaigns(acceptedCampaigns.filter(project => project.id !== currentProject.id));
      setShowRejectModal(false);
      setCurrentProject(null);
    } catch (error) {
      console.error('Error rejecting project:', error);
    }
  };

  return (
    <Box mt={10}>
      {/* Add margin-top */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box bgcolor="#000" color="#fff" p={2} borderRadius={4}>
            <InsertChartIcon />
            <Typography variant="h5">Accepted</Typography>
            <Typography variant="h4">{acceptedCampaigns.length}</Typography>
            <Typography variant="body2">Just updated</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box bgcolor="#2196f3" color="#fff" p={2} borderRadius={4}>
            <InsertChartIcon />
            <Typography variant="h5">Total Users</Typography>
            <Typography variant="h4">{totalUsers}</Typography>
            <Typography variant="body2">Just updated</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box bgcolor="#4caf50" color="#fff" p={2} borderRadius={4}>
            <DesktopWindowsIcon />
            <Typography variant="h5">Revenue</Typography>
            <Typography variant="h4">34k</Typography>
            <Typography variant="body2">Just updated</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box bgcolor="#e91e63" color="#fff" p={2} borderRadius={4}>
            <PersonAddIcon />
            <Typography variant="h5">Followers</Typography>
            <Typography variant="h4">+91</Typography>
            <Typography variant="body2">Just updated</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Accepted Campaigns List */}
      <Box mt={4}>
        <Typography variant="h5" mb={2} fontWeight="bold">
          Accepted Campaigns
        </Typography>
        {loading ? (
          <CenteredSpinner />
        ) : acceptedCampaigns.length === 0 ? (
          <NoCampaignsContainer>
            <NoCampaignsIcon />
            <NoCampaignsMessage>No Accepted Campaigns</NoCampaignsMessage>
            <NoCampaignsText>
              Currently, there are no accepted campaigns. Please check back later.
            </NoCampaignsText>
          </NoCampaignsContainer>
        ) : (
          acceptedCampaigns.map(campaign => (
            <Card key={campaign.id} style={{ marginBottom: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
              <CardHeader
                title={<Typography fontWeight="bold">{campaign.title}</Typography>}
                subheader={`Campaign ID: ${campaign.id}`}
                style={{ padding: '16px' }}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" fontWeight="bold">
                  Description: {campaign.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" fontWeight="bold">
                  Owner: {campaign.email}
                </Typography>
                <Typography variant="body2" color="textSecondary" fontWeight="bold">
                  Target Amount: {campaign.goalAmount}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="danger"
                  className="fw-bold"
                  onClick={() => handleReject(campaign)}
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          ))
        )}
        <ConfirmationModal
          show={showRejectModal}
          handleClose={() => setShowRejectModal(false)}
          handleConfirm={handleRejectConfirm}
          title="Remove Campaign"
          message="Are you sure you want to remove this campaign?"
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
