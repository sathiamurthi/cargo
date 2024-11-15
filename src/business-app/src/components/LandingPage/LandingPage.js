import React, { useState } from 'react';
import { Button, Header, Modal, Menu, Container } from 'semantic-ui-react';
import Login from '../Login';
import Register from '../Register'; // Import the Register component
import ProtectedLogin from '../ProtectedLogin';

import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);
  return (
    <div className="landing-container">
      <h1 style={{ marginLeft: '20px' }}>Innover Digital</h1>
      <Container>
      <Menu>
        <Menu.Item header>Sample</Menu.Item>
        <Menu.Item name="services" />
        <Menu.Item name="drivers" />
        <Menu.Item name="pricing" />
        <Menu.Item name="contactUs" />
        <Menu.Item position="right">
          <Button primary onClick={handleOpenLogin}>Sign In</Button>
          <Button secondary onClick={handleOpenRegister}>Register</Button>
        </Menu.Item>
      </Menu>
      
      <Header as='h1' style={{ marginTop: '2rem' }}>
        Meet the Industry's Most Competitive Ground Shipping Service.
      </Header>

      {/* Modal for Login */}
      <Modal open={openLogin} onClose={handleCloseLogin} closeIcon>
        <Modal.Header>Login</Modal.Header>
        <Modal.Content>
          <ProtectedLogin />
        </Modal.Content>
      </Modal>

      {/* Modal for Registration */}
      <Modal open={openRegister} onClose={handleCloseRegister} closeIcon>
        <Modal.Header>Register</Modal.Header>
        <Modal.Content>
          <Register />
        </Modal.Content>
      </Modal>
    </Container>
      <div className="cards-container">
        {/* Leader's View Card */}
        <div className="card">
          <div className="card-header">
            {/* <FaRegClipboard className="icon" /> */}
            <h3>Leader's View</h3>
          </div>
          <p className="subtitle">Overview of key information for leaders</p>
          <p>Access comprehensive insights and make informed decisions with our Leaders Dashboard.</p>
          <button className="button" onClick={() => navigate('/leadersview')}>
            Access Leaders Page
          </button>
        </div>
        
        {/* Manager's View Card */}
        <div className="card">
          <div className="card-header">
            {/* <FaUsers className="icon" /> */}
            <h3>Manager's View</h3>
          </div>
          <p className="subtitle">Timesheet approval and team management</p>
          <p>Review and approve timesheets, manage team resources, and oversee project allocations.</p>
          <button className="button" onClick={() => navigate('/managerview')}>
            Access Managers View
          </button>
        </div>

        {/* Resource Allocation Card */}
        <div className="card">
          <div className="card-header">
            {/* <FaUser className="icon" /> */}
            <h3>Resource Allocation</h3>
          </div>
          <p className="subtitle">Efficiently manage and allocate resources</p>
          <p>Optimize your resource distribution and track allocation across projects.</p>
          <button className="button" onClick={() => navigate('/allocations/employees')}>
            Manage Resources
          </button>
        </div>

        {/* Resource Allocation Card */}
        <div className="card">
          <div className="card-header">
            {/* <FaRegChartBar className="icon" /> */}
            <h3>Allocation Report</h3>
          </div>
          <p className="subtitle">Efficiently manage and allocate resources</p>
          <p>Optimize your resource distribution and track allocation across projects.</p>
          <button className="button" onClick={() => navigate('/allocations')}>
            Manage Resources
          </button>
        </div>

        {/* Employee Timesheet Card */}
        <div className="card">
          <div className="card-header">
            {/* <FaClock className="icon" /> */}
            <h3>Employee Timesheet</h3>
          </div>
          <p className="subtitle">Track and manage employee work hours</p>
          <p>Easily log work hours, manage projects, and submit timesheets for approval.</p>
          <button className="button" onClick={() => navigate('/mytimesheet')}>
            Access Timesheet
          </button>
        </div>

        {/* Project Allocation Card */}
        <div className="card">
          <div className="card-header">
            {/* <FaProjectDiagram className="icon" /> */}
            <h3>Project Allocation</h3>
          </div>
          <p className="subtitle">In-house client and resource management</p>
          <p>Comprehensive tool for managing clients, resources, and project workflows.</p>
          <button className="button" onClick={() => navigate('/allocations/projects')}>
            Access Project Allocation
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
