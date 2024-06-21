import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { FaTachometerAlt, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Make sure you have AuthContext to manage authentication
import './SideNav.css';

const SideNav = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="sidenav">
      <div className="sidenav-header">Admin Dashboard</div>
      <Nav className="flex-column">
        <Nav.Link href="/admin-dashboard" className="sidenav-link" active={window.location.pathname === '/admin-dashboard'}>
          <span className="sidebar-icon">
            <FaTachometerAlt />
          </span>
          Dashboard
        </Nav.Link>
        <Nav.Link href="/admin" className="sidenav-link" active={window.location.pathname === '/admin'}>
          <span className="sidebar-icon">
            <FaCog />
          </span>
          Admin
        </Nav.Link>
        <div className="sidenav-signout" onClick={handleSignOut}>
          <span className="sidebar-icon">
            <FaSignOutAlt />
          </span>
          Sign Out
        </div>
      </Nav>
    </div>
  );
};

export default SideNav;
