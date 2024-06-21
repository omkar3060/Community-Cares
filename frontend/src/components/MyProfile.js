import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FaUserCircle, FaHandHoldingHeart, FaClipboardList, FaHeart, FaRegBell, FaCog, FaQuestionCircle, FaShareAlt, FaTrophy } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import SupportInfo from './SupportInfo';  // Import the new component

const ProfileContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
`;

const StyledLink = styled(RouterLink)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfilePicture = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  color: #fff;
  margin-right: 20px;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: black;
`;

const ProfileEmail = styled.p`
  font-size: 16px;
  color: #757575;
`;

const ProfileSections = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
`;

const ProfileSection = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
    cursor: pointer;
  }
`;

const SectionIcon = styled.div`
  font-size: 32px;
  color: #4caf50;
  margin-bottom: 10px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #673ab7;
`;

const SectionContent = styled.p`
  font-size: 14px;
  color: #757575;
`;

const MyProfile = () => {
  const { email } = useContext(AuthContext);
  const username = email.split('@')[0];
  const [showSupport, setShowSupport] = useState(false);

  const handleShowSupport = () => setShowSupport(true);
  const handleCloseSupport = () => setShowSupport(false);

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfilePicture>
          <FaUserCircle />
        </ProfilePicture>
        <ProfileInfo>
          <ProfileName>{username}</ProfileName>
          <ProfileEmail>{email}</ProfileEmail>
        </ProfileInfo>
      </ProfileHeader>
      <ProfileSections>
        <ProfileSection>
          <SectionIcon>
            <FaHandHoldingHeart />
          </SectionIcon>
          <SectionTitle>Donation History</SectionTitle>
          <SectionContent>View your past donations</SectionContent>
        </ProfileSection>
        <ProfileSection as={StyledLink} to="/my-campaigns">
          <SectionIcon>
            <FaClipboardList />
          </SectionIcon>
          <SectionTitle>Fundraising Campaigns</SectionTitle>
          <SectionContent>Manage your campaigns</SectionContent>
        </ProfileSection>
        <ProfileSection>
          <SectionIcon>
            <FaHeart />
          </SectionIcon>
          <SectionTitle>Saved Projects</SectionTitle>
          <SectionContent>View your saved projects</SectionContent>
        </ProfileSection>
        <ProfileSection>
          <SectionIcon>
            <FaRegBell />
          </SectionIcon>
          <SectionTitle>Notifications</SectionTitle>
          <SectionContent>Stay updated</SectionContent>
        </ProfileSection>
        <ProfileSection as={StyledLink} to="/edit-profile">
          <SectionIcon>
            <FaCog />
          </SectionIcon>
          <SectionTitle>Account Settings</SectionTitle>
          <SectionContent>Manage your account</SectionContent>
        </ProfileSection>
        <ProfileSection onClick={handleShowSupport}>
          <SectionIcon>
            <FaQuestionCircle />
          </SectionIcon>
          <SectionTitle>Support</SectionTitle>
          <SectionContent>Get help and support</SectionContent>
        </ProfileSection>
        <ProfileSection>
          <SectionIcon>
            <FaShareAlt />
          </SectionIcon>
          <SectionTitle>Share</SectionTitle>
          <SectionContent>Share your involvement</SectionContent>
        </ProfileSection>
        <ProfileSection>
          <SectionIcon>
            <FaTrophy />
          </SectionIcon>
          <SectionTitle>Achievements</SectionTitle>
          <SectionContent>View your badges</SectionContent>
        </ProfileSection>
      </ProfileSections>
      <SupportInfo show={showSupport} handleClose={handleCloseSupport} />
    </ProfileContainer>
  );
};

export default MyProfile;
