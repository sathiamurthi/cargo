import React from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';
import { FaRegClipboard, FaRegChartBar, FaClock, FaUser, FaProjectDiagram, FaUsers } from 'react-icons/fa'; // Importing icons from react-icons

const LandingPage = ({ onNavigate }) => {
  const navigate = useNavigate();
  return (
    <div className="landing-container">
      <h1 style={{ marginLeft: '20px' }}>Innover Digital</h1>
      <div className="cards-container">
        {/* Leader's View Card */}
        <div className="card">
          <div className="card-header">
            <FaRegClipboard className="icon" />
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
            <FaUsers className="icon" />
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
            <FaUser className="icon" />
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
            <FaRegChartBar className="icon" />
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
            <FaClock className="icon" />
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
            <FaProjectDiagram className="icon" />
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
