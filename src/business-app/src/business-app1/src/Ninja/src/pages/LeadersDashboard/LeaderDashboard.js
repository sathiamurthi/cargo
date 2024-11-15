import React, { useState, useEffect } from 'react';
import { Container, Header, Grid, Segment, Table, Progress, List, Label } from 'semantic-ui-react';
import LineChart from '../../components/LeaderChart/LineChart';
import 'semantic-ui-css/semantic.min.css';
import './LeaderDashboard.css';
import { ProfileContext } from '../../context/ProfileContext';

const LeaderDashboard = () => {
  const{displayName} = "Sathia" //React.useContext(ProfileContext);
  const [currentDate, setCurrentDate] = useState('');
  const [clientData, setClientData] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [projectData, setProjectData] = useState([]);
  const [currentStatusType, setCurrentStatusType] = useState('Completed');


  useEffect(() => {
    // Set current date
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    setCurrentDate(formattedDate)
  }, []);
  
  // Fetch clients from the backend API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://localhost:7071/api/leaders-page/clients');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setClientData(data);
        setSelectedClientId(data[0]?.ClientID); // Set the first client as selected by default
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };
    fetchClients();
  }, []);

  // Fetch project data based on selected client
  useEffect(() => {
    const fetchProjects = async () => {
      if (selectedClientId) {
        try {
          const response = await fetch(`http://localhost:7071/api/leaders-page/client/${selectedClientId}/projects`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setProjectData(data);
        } catch (error) {
          console.error('Error fetching project data:', error);
        }
      }
    };
    fetchProjects();
  }, [selectedClientId]);

  // Handle status click to filter project status
  const handleStatusClick = (status) => {
    setCurrentStatusType(status);
  };

  // Color scheme for project status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'green';
      case 'On Hold':
        return 'purple';
      case 'In Progress':
        return 'yellow';
      default:
        return '';
    }
  };

  // Calculate project statistics
  const completedProjects = projectData.filter(project => project.ProjectStatus === 'Completed').length;
  const onHoldProjects = projectData.filter(project => project.ProjectStatus === 'On Hold').length;
  const inProgressProjects = projectData.filter(project => project.ProjectStatus === 'In Progress').length;
  const totalProjects = projectData.length;

  // Find the selected client name for display
  const selectedClient = clientData.find(client => client.ClientID === selectedClientId);

  return (
    <div className="main-layout">
      <div className='right-content'>
        <div className='top-content'>
          <div className='greeting'>
            <h1>Hello {"Sathia"},</h1>
            <h2>{currentDate}</h2>
          </div>
        </div>
      <Segment className="dashboard-chart">
          <LineChart />
        </Segment>

        <Grid columns={2} divided className="client-project-container">
          <Grid.Row stretched>
            <Grid.Column width={5}>
              <Segment className="client-details-table" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <Header as='h3'>Client Details</Header>
                <Table selectable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell style={{ width: '30%' }}>Client ID</Table.HeaderCell>
                      <Table.HeaderCell style={{ width: '70%' }}>Client Name</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {clientData.map((client) => (
                      <Table.Row key={client.ClientID} onClick={() => {
                        setSelectedClientId(client.ClientID);
                        setProjectData([]); // Reset project data when a new client is selected
                      }}>
                        <Table.Cell>{client.ClientID}</Table.Cell>
                        <Table.Cell>{client.ClientName}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Segment>
            </Grid.Column>
            <Grid.Column width={11}>
              <Segment className="project-details-table">
                <Header as='h3'>Project Details for {selectedClient ? selectedClient.ClientName : 'Select a Client'}</Header>
                {Array.isArray(projectData) && projectData.length > 0 ? (
                  <Table>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Project</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Project Manager</Table.HeaderCell>
                        <Table.HeaderCell>Start Date</Table.HeaderCell>
                        <Table.HeaderCell>End Date</Table.HeaderCell>
                        <Table.HeaderCell>Headcount</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {projectData.map((project) => (
                        <Table.Row key={project.ProjectID}>
                          <Table.Cell>{project.ProjectName}</Table.Cell>
                          {/* Apply color based on status */}
                          <Table.Cell>
                            <Label color={getStatusColor(project.ProjectStatus)}>
                              {project.ProjectStatus}
                            </Label>
                          </Table.Cell>
                          <Table.Cell>{project.ProjectManager}</Table.Cell>
                          <Table.Cell>
                            {project.ProjectStartDate ? new Date(project.ProjectStartDate).toLocaleDateString() : '-'}
                          </Table.Cell>
                          <Table.Cell>
                            {project.ProjectEndDate ? new Date(project.ProjectEndDate).toLocaleDateString() : '-'}
                          </Table.Cell>
                          <Table.Cell>{project.Headcount}</Table.Cell>
                        </Table.Row>
                      ))}  
                    </Table.Body>
                  </Table>
                ) : (
                  <p>No projects found for this client.</p>
                )}
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid columns={2} divided className="project-section-container">
          <Grid.Row>
            <Grid.Column>
              <Segment className="project-statistics">
                <Header as='h3'>Project Statistics</Header>
                <Segment className="stat-item" onClick={() => handleStatusClick('Completed')}>
                  <Header as='h4'>Completed</Header>
                  <Progress percent={totalProjects ? (completedProjects / totalProjects) * 100 : 0} progress className="completed">
                    {completedProjects} / {totalProjects}
                  </Progress>
                </Segment>
                <Segment className="stat-item" onClick={() => handleStatusClick('On Hold')}>
                  <Header as='h4'>On Hold</Header>
                  <Progress percent={totalProjects ? (onHoldProjects / totalProjects) * 100 : 0} progress className="on-hold">
                    {onHoldProjects} / {totalProjects}
                  </Progress>
                </Segment>
                <Segment className="stat-item" onClick={() => handleStatusClick('In Progress')}>
                  <Header as='h4'>In Progress</Header>
                  <Progress percent={totalProjects ? (inProgressProjects / totalProjects) * 100 : 0} progress className="in-progress">
                    {inProgressProjects} / {totalProjects}
                  </Progress>
                </Segment>
              </Segment>
            </Grid.Column>

            <Grid.Column>
              <Segment className="project-status">
                <Header as='h3'>Project Status - {currentStatusType}</Header>
                <List>
                  {projectData
                    .filter(project => project.ProjectStatus === currentStatusType)
                    .map(project => (
                      <List.Item key={project.ProjectID}>{project.ProjectName}</List.Item>
                    ))}
                </List>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

export default LeaderDashboard;
