import React from 'react';
import styled from 'styled-components';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';

const SupportInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const SupportHeading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #673ab7;
  margin-bottom: 20px;
`;

const ContactDetail = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-bottom: 10px;
  color: #757575;
`;

const ContactIcon = styled.div`
  margin-right: 10px;
  color: #4caf50;
`;

const CloseButton = styled(Button)`
  background-color: #673ab7;
  border: none;
  color: #fff;
  font-weight: bold;
  margin-top: 20px;

  &:hover {
    background-color: #512da8;
  }
`;

const SupportInfo = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <SupportInfoContainer>
          <SupportHeading>Get Help and Support</SupportHeading>
          <ContactDetail>
            <ContactIcon>
              <FaPhone />
            </ContactIcon>
            +91 9353050644
          </ContactDetail>
          <ContactDetail>
            <ContactIcon>
              <FaEnvelope />
            </ContactIcon>
            omkargouda306@gmail.com
          </ContactDetail>
          <CloseButton onClick={handleClose}>Close</CloseButton>
        </SupportInfoContainer>
      </Modal.Body>
    </Modal>
  );
};

export default SupportInfo;
