// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import { UserProvider, useUser } from './UserContext';
import ManagerDashboard from './Ninja/src/pages/ManagerDashboard';
import UserDashboard from './usermanagement/components/UserDashboard';
import LoginPage from './components/LoginPage';
import Dashboard from './projectconnect/components/Dashboard';
import RegisterPage from './components/RegisterPage';
import DashboardBizOps from './Ninja/src/pages/DashboardBizOps';
import EmployeeDetails from './Ninja/src/pages/EmployeeDetails';
import ClientProjects from './Ninja/src/pages/ClientProjects';
import ClientDetails from './Ninja/src/pages/ClientDetails';
import EmpPage from './Ninja/src/pages/EmpPage';
import Projects from './Ninja/src/pages/Projects';
import ClientPage from './Ninja/src/pages/ClientPage';
import ProjectPage from './Ninja/src/pages/ProjectPage';
import Timesheet from './Ninja/src/pages/Timesheet';
import TimeTable from './Ninja/src/pages/TimeTable';
import ManagerView from './Ninja/src/pages/UserPage';
import ManagerComponent from './Ninja/src/pages/ManagerComponent';
import LeaderDashboard from './Ninja/src/pages/LeadersDashboard/LeaderDashboard';

const PegionConectApp = () => {
  return (
      <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Private Routes */}
          <Route 
              path="/manager" 
              element={
                  <PrivateRoute>
                      <Dashboard />
                  </PrivateRoute>
              } 
          />
          <Route 
              path="/user" 
              element={
                  <PrivateRoute>
                      <UserDashboard />
                  </PrivateRoute>
              } 
          />
          <Route 
              path="/admin" 
              element={
                  <PrivateRoute>
                      <DashboardBizOps />
                  </PrivateRoute>
              } 
             
          />
           {(
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/projects" element={<Projects />} />
                </>
              )}

              {/* Protected Routes for 'bizops' role */}
              { (
                <>
                 <Route path="/" element={<Navigate to="/business-app1/dashboardbizops" replace />} /> {/* Redirect root path to /dashboard */}
                  <Route path="/dashboardbizops" element={<DashboardBizOps />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="/employees" element={<EmpPage />} />
                  <Route path="/clients" element={<ClientPage />} />
                  <Route path="/manageprojects" element={<ProjectPage />} />
                  <Route path="/timesheet" element={<Timesheet />} />
                  <Route path="/managerview" element={<ManagerComponent />} />
                  <Route path="/timesheet1" element={<TimeTable />} />
                  <Route path="/managerview1" element={<ManagerView />} />
                  <Route path="/leader" element={<LeaderDashboard />} />

                </>
              )}
              {/* Common Protected Routes */}
              <Route path="/employees" element={<EmpPage />} />
                <Route path="/employee/:id" element={<EmployeeDetails />} />
                <Route path="/client/:clientId/projects" element={<ClientProjects />} />
                <Route path="/client/:clientId/project/:projectId" element={<ClientDetails />} />

                {/* Redirect any unknown route to a default dashboard based on role */}
                <Route path="*" element={<Navigate to={"something" === 'leader' ? "/dashboard" : "/dashboardbizops"} replace />} />
      </Routes>
  );
};

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useUser(); // Get authentication state from context
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PegionConectApp;
