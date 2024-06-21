import React from 'react';
import styled from 'styled-components';

const StyledStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;

  .step-number {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #007bff;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .step-description {
    text-align: center;
    font-size: 1.2rem;
    color: #333;
  }
`;

const CampaignSteps = () => {
  return (
    <div className="container">
      <h2 className="text-center mb-4">How to Start a Fundraising Campaign</h2>
      <div className="row">
        <div className="col-md-4">
          <StyledStepContainer>
            <div className="step-number">1</div>
            <div className="step-description">Fill out the campaign form with your campaign details.</div>
          </StyledStepContainer>
        </div>
        <div className="col-md-4">
          <StyledStepContainer>
            <div className="step-number">2</div>
            <div className="step-description">Wait for admin approval of your campaign.</div>
          </StyledStepContainer>
        </div>
        <div className="col-md-4">
          <StyledStepContainer>
            <div className="step-number">3</div>
            <div className="step-description">Once approved, start promoting your campaign and receiving donations!</div>
          </StyledStepContainer>
        </div>
      </div>
    </div>
  );
};

export default CampaignSteps;