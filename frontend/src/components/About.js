import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { BookImage, GiftImage, HealthImage, OrphanImage } from '../assets';
import { Link } from 'react-router-dom';
const services = [
  {
    id: 1,
    img: HealthImage,

    title: 'Medical Services',
  },
  {
    id: 2,
    img: BookImage,
    title: 'School Education',
  },
  {
    id: 3,
    img: OrphanImage,
    title: 'Orphanages Care',
  },
  {
    id: 4,
    img: GiftImage,
    title: 'Gift Giving',
  },
];
const About = (props) => {
  return (
    <section className="bg-light" id="about">
      <Container className="vh-100">
        <Row className="d-flex align-items-center justify-content-center  h-100">
          <Col>
            <Badge
              bg="light"
              className="text-muted border fs-4 mb-1 lead fw-light"
              pill
            >
              What we do
            </Badge>
            <h1 className="display-4 fw-bold lh-2">
              The mission and goals of our organization
            </h1>
            <p className="fs-5">
              Charity is the global movement encouraging the power of people and
              organizations to transform their communities and the world. What
              can we do in order to make some changes?
            </p>
            <Button size="lg" variant="warning" style={{ marginRight: "15px" }}>
              <Link to="/donate" style={{ textDecoration: 'none', color: 'inherit' }}>DONATE NOW</Link>
            </Button>
          </Col>
          <Col>
            <Row sm={2}>
              {services.map((service) => {
                return (
                  <Col key={service.id} className="mb-2">
                    <Card
                      bg="primary"
                      text="white"
                      border="warning"
                      className="p-3 pb-0"
                    >
                      <div className="d-flex align-items-center justify-content-center">
                        <Card.Img
                          variant="top"
                          src={service.img}
                          style={{ maxWidth: '150px' }}
                        />
                      </div>
                      <Card.Body>
                        <Card.Title className="fs-3 fw-normal">
                          {service.title}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
