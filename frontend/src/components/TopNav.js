import React from 'react';
import './TopNav.css';

const TopNav = () => {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);

  return (
    <nav className="top-nav">
      <div className="container-fluid"> {/* Use a container to limit the width */}
        <div className="top-nav-content">
          <span className="top-nav-title">{currentPage}</span>
          <div className="top-nav-icons">
            <i className="fa fa-search"></i>
            <i className="fa fa-bell"></i>
            <i className="fa fa-user"></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
