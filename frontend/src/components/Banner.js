import { Col, Container, Row, Button, Image, Accordion } from "react-bootstrap";
import ChildSvg from "../assets/images/child.png";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BannerContainer = styled(Container)`
  background: linear-gradient(to right, #faebd7, #f5f5f5);
  padding: 3rem 0;
`;

const BannerRow = styled(Row)`
  height: 90vh;
  align-items: center;
`;

const BannerHeading = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  color: #333;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 1.5rem;
`;

const BannerText = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
`;

const BannerButton = styled(Button)`
  font-size: 1.2rem;
  padding: 0.8rem 2rem;
  border-radius: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const FaqSection = styled.div`
  max-width: 800px;
  margin: 3rem auto;
  text-align: center;
`;

const FaqHeading = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background-color: #ffc107;
    border-radius: 2px;
  }
`;

const FaqAccordion = styled(Accordion)`
  max-width: 800px;
  margin: 0 auto;
`;

const FaqAccordionItem = styled(Accordion.Item)`
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FaqAccordionHeader = styled(Accordion.Header)`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

const FaqAccordionBody = styled(Accordion.Body)`
  font-size: 1rem;
  color: #555;
`;

const Banner = (props) => {
  return (
    <BannerContainer as="section" id="home" fluid {...props}>
      <BannerRow className="d-flex justify-content-center flex-wrap">
        <Col md={6} className="d-flex justify-content-center mb-4 mb-md-0">
          <Image src={ChildSvg} alt="children" fluid style={{ maxWidth: "65%" }} />
        </Col>
        <Col md={6}>
          <BannerHeading>Help the children. Make big changes and help the world</BannerHeading>
          <BannerText>
            A non-profit organisation that collaborates with volunteers to deliver humanitarian aid and disaster relief
            to vulnerable communities.
          </BannerText>
          <div>
            <BannerButton size="lg" variant="warning" className="mx-2">
              <Link to="/education-projects" style={{ textDecoration: 'none', color: 'inherit' }}>
                DONATE NOW
              </Link>
            </BannerButton>
            <Link to="/about">
              <BannerButton size="lg" variant="outline-secondary" className="mx-2">
                Learn More
              </BannerButton>
            </Link>
          </div>
        </Col>
      </BannerRow>

      <FaqSection>
        <FaqHeading>Frequently Asked Questions</FaqHeading>
        <FaqAccordion defaultActiveKey="0">
          <FaqAccordionItem eventKey="0">
            <FaqAccordionHeader>What is the mission of this organization?</FaqAccordionHeader>
            <FaqAccordionBody>
              Our mission is to provide quality education to underprivileged children and promote literacy in areas where
              access to education is limited. We believe that education is the key to breaking the cycle of poverty and
              creating a better future for all.
            </FaqAccordionBody>
          </FaqAccordionItem>
          <FaqAccordionItem eventKey="1">
            <FaqAccordionHeader>How can I contribute to the cause?</FaqAccordionHeader>
            <FaqAccordionBody>
              You can contribute by donating to our fundraising campaigns or by volunteering your time and skills. We
              welcome individuals, organizations, and companies to partner with us and support our educational initiatives.
            </FaqAccordionBody>
          </FaqAccordionItem>
          <FaqAccordionItem eventKey="2">
            <FaqAccordionHeader>Where does my donation go?</FaqAccordionHeader>
            <FaqAccordionBody>
              Your donation is used to fund various educational projects, such as building schools, providing educational
              materials, training teachers, and offering scholarships to deserving students. We ensure that your
              contribution is used efficiently and transparently.
            </FaqAccordionBody>
          </FaqAccordionItem>
        </FaqAccordion>
      </FaqSection>
    </BannerContainer>
  );
};

export default Banner;