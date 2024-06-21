import React, { useContext, useState } from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { LogoSVG } from '../assets';
import { AuthContext } from "./AuthContext";
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { FaSignOutAlt, FaUser, FaBullhorn } from 'react-icons/fa';
import { userIcon } from '../assets'; // Adjust the path as needed

const StyledNavDropdown = styled(NavDropdown)`
  .dropdown-toggle {
    background-color: transparent;
    border: none;
    color: #fff;
    font-size: 24px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      color: #ffc107;
    }
  }

  .dropdown-menu {
    background-color: #dc3545;
    border: none;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 10px;
    transform: translateX(-10%);

    .dropdown-item {
      color: #fff;
      font-size: 17px;
      padding: 8px 16px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.3s ease;

      &:hover {
        background-color: #c82333;
      }
    }
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setIsDropdownOpen(false);
  };

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <header>
      <Navbar variant="dark" bg="danger">
        <Container>
          <HeaderContainer>
            <Navbar.Brand as={Link} to="/">
              <LogoSVG height={38} width={38} />
            </Navbar.Brand>
            <Nav>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/" activeClassName="active" style={{ fontSize: '18px' }}>Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/about" activeClassName="active" style={{ fontSize: '18px' }}>About</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/mission" activeClassName="active" style={{ fontSize: '18px' }}>Mission</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={NavLink} to="/support" activeClassName="active" style={{ fontSize: '18px' }}>Support</Nav.Link>
              </Nav.Item>
            </Nav>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button size="lg" variant="warning" style={{ marginRight: "25px" }}>
                <Link to="/education-projects" style={{ textDecoration: 'none', color: 'inherit' }}>Donate</Link>
              </Button>
              {isAuthenticated ? (
                <StyledNavDropdown
                  title={<img src={userIcon} alt="User Icon" style={{ width: 45, height: 45 }} />}
                  id="user-dropdown"
                  show={isDropdownOpen}
                  onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <NavDropdown.Item as={NavLink} to="/campaign" activeClassName="active">
                    <FaBullhorn /> Fundraising
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/profile" activeClassName="active">
                    <FaUser /> My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleSignOut}>
                    <FaSignOutAlt /> Sign Out
                  </NavDropdown.Item>
                </StyledNavDropdown>
              ) : (
                <Button size={isMobile ? "sm" : "lg"} variant="warning">
                  <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Sign In/Up
                  </Link>
                </Button>
              )}
            </div>
          </HeaderContainer>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
