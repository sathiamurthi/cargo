import React, { useState, useContext } from 'react';
import { Menu, Icon, Button } from 'semantic-ui-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/images/logo.png'; // Preferably use SVG
const Navbar = ({ userRole, setUserRole }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeItem = location.pathname;
  const [showLogout, setShowLogout] = useState(false);
  const{displayName} = 'sathiamurthi';//useContext(ProfileContext);

  // Function to handle logout
  const handleLogout = () => {
    setUserRole(null);
    navigate('/');
  };

  return (
    <div className="sidebar">
      {/* Logo at the top */}
      <div className="logo-container">
        <img src={logo} alt="Platform X Logo" className="navbar-logo" />
      </div>

      {/* Menu items in the middle */}
      <Menu vertical pointing secondary className="navbar-menu" style={{width: "auto"}}>
        {userRole === 'leader' && (
          <>
            <Menu.Item
              name="dashboard"
              active={activeItem === '/business-app1/dashboard'}
              as={Link}
              to="/business-app1/dashboard"
              className="item"
            >
              Overview
            </Menu.Item>
            <Menu.Item
              name="employees"
              active={activeItem === '/business-app1/employees'}
              as={Link}
              to="/business-app1/employees"
              className="item"
            >
              Employees
            </Menu.Item>
            <Menu.Item
              name="projects"
              active={activeItem === '/business-app1/projects'}
              as={Link}
              to="/business-app1/projects"
              className="item"
            >
              Projects
            </Menu.Item>
            <Menu.Item
              name="manageclients"
              active={activeItem === '/business-app1/clients'}
              as={Link}
              to="/business-app1/clients"
              className="item"
            >
              Manage Clients
            </Menu.Item>
            <Menu.Item
              name="manageprojects"
              active={activeItem === '/business-app1/clientprojects'}
              as={Link}
              to="/business-app1/clientprojects"
              className="item"
            >
              Manage Projects
            </Menu.Item>
          </>
        )}

        { (
          <>
            <Menu.Item
              name="dashboardbizops"
              active={activeItem === '/business-app1/dashboardbizops'}
              as={Link}
              to="/business-app1/dashboardbizops"
              className="item"
            >
              Overview
            </Menu.Item>
            <Menu.Item
              name="employees"
              active={activeItem === '/business-app1/employees'}
              as={Link}
              to="/business-app1/employees"
              className="item"
            >
              Employees
            </Menu.Item>
            <Menu.Item
              name="projects"
              active={activeItem === '/business-app1/projects'}
              as={Link}
              to="/business-app1/projects"
              className="item"
            >
              Projects
            </Menu.Item>
            <Menu.Item
              name="manageclients"
              active={activeItem === '/business-app1/clients'}
              as={Link}
              to="/business-app1/clients"
              className="item"
            >
              Manage Clients
            </Menu.Item>
            <Menu.Item
              name="manageprojects"
              active={activeItem === '/business-app1/manageprojects'}
              as={Link}
              to="/business-app1/manageprojects"
              className="item"
            >
              Manage Projects
            </Menu.Item>
            <Menu.Item
              name="timesheet"
              active={activeItem === '/business-app1/timesheet'}
              as={Link}
              to="/business-app1/timesheet1"
              className="item"
            >
              Timesheet
            </Menu.Item>
            <Menu.Item
              name="managerview"
              active={activeItem === '/business-app1/managerview'}
              as={Link}
              to="/business-app1/managerview1"
              className="item"
            >
              Timeshee ManagerView
            </Menu.Item>
            <Menu.Item
              name="leaderboard"
              active={activeItem === '/business-app1/leader'}
              as={Link}
              to="/business-app1/leader"
              className="item"
            >
              LeaderView
            </Menu.Item>
          </>
        )}
      </Menu>

      {/* User Info Section - Positioned at the bottom */}
      <div className={`user-info ${showLogout ? 'expanded' : ''}`} onClick={() => setShowLogout(!showLogout)}>
        <div className="profile-details">
          <div className="profile-photo">
            <Icon name="user" className="user-icon" />
          </div>
          <div className="user-text">
            <h3 className="user-name">{"sathia"}</h3>
            <span className={`role-tag ${userRole}`}>
              {userRole === 'bizops' ? 'BizOps' : 'Leader'}
            </span>
          </div>
        </div>

        {showLogout && (
          <div className="logout-container">
            <hr/>
            <Button
              variant="contained"
              className="logout-button"
              onClick={handleLogout}
            >
               Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
