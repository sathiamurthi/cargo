import React, { useState, useEffect } from 'react';
import { Button, Container, Header, Table, Message, Label, Modal, Icon, Tab } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import moment from 'moment';
import Navbar from '../components/Navbar';

const ManagerComponent = () => {
    const [projects, setProjects] = useState([]);
    const [expandedProjects, setExpandedProjects] = useState({});
    const [selectedWeekend, setSelectedWeekend] = useState(new Date());
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedProjectsForApproval, setSelectedProjectsForApproval] = useState([]);

    useEffect(() => {
        fetchProjects(); // Fetch projects when component mounts or when selectedWeekend changes
    }, [selectedWeekend]);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:7071/api/managerview', {
                params: { managerid: 'INN012', weekend: moment(selectedWeekend).format('YYYY-MM-DD')}
            });
            setProjects(response.data);
            defaultExpanded(); // Set default expansion after fetching data
        } catch (error) {
            console.error("Error fetching projects:", error);
            setErrorMessage("Failed to fetch project data.");
        }
    };

    const defaultExpanded = () => {
        const expanded = {};
        projects.forEach(project => {
            expanded[project.project] = true; // Expand all entries by default
        });
        setExpandedProjects(expanded);
    };

    const handleCheckboxChange = (projectName) => {
        setSelectedProjectsForApproval(prev =>
            prev.includes(projectName) ? prev.filter(name => name !== projectName) : [...prev, projectName]
        );
    };

    const handleBulkApprove = async () => {
        await Promise.all(selectedProjectsForApproval.map(projectName => handleApprove(projectName)));
        setSelectedProjectsForApproval([]); // Clear selection after approval
    };

    const handleApprove = async (projectName) => {
        const projectToApprove = projects.find(project => project.project === projectName);
        
        if (projectToApprove) {
            const updatedProjects = projects.map(project => {
                if (project.project === projectName) {
                    return { ...project, status: 'Approved' };
                }
                return project;
            });
            setProjects(updatedProjects);
            await sendStatusUpdate(projectToApprove, 'Approved'); // Send project data with 'Approved' status
        }
    };

    const handleReject = async (projectName) => {
        const projectToReject = projects.find(project => project.project === projectName);

        if (projectToReject) {
            const updatedProjects = projects.map(project => {
                if (project.project === projectName) {
                    return { ...project, status: 'Rejected' };
                }
                return project;
            });
            setProjects(updatedProjects);
            await sendStatusUpdate(projectToReject, 'Rejected'); // Send project data with 'Rejected' status
        }
    };

    const sendStatusUpdate = async (project, status) => {
        try {
            await axios.post('http://localhost:7071/api/managerview', {
                detail: project,
                status: status,
            });
            await sendNotification(project.project, status);
        } catch (error) {
            console.error("Error updating project status:", error);
            setErrorMessage(`Failed to update project ${project.project}.`);
        }
    };

    const sendNotification = async (projectName, status) => {
        try {
            await axios.post('http://localhost:7071/api/notify', {
                project: projectName,
                status: status,
                user: 'INN013',
            });
            console.log(`Notification sent for ${status} status of ${projectName}`);
        } catch (error) {
            console.error("Error sending notification:", error);
            setErrorMessage(`Failed to send notification for ${projectName}.`);
        }
    };

    const toggleProject = (projectName) => {
        setExpandedProjects(prev => ({ ...prev, [projectName]: !prev[projectName] }));
    };

    const handleWeekendChange = (date) => {
        setSelectedWeekend(date);
        fetchProjects();
    };

    const handleViewDetails = (project) => {
        setModalContent(project);
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const groupedProjects = Object.values(projects.reduce((acc, project) => {
        if (!acc[project.project]) {
            acc[project.project] = [];
        }
        acc[project.project].push(project);
        return acc;
    }, {}));

    const panes = [
        {
            menuItem: 'Manage Projects',
            render: () => (
                <Tab.Pane>
                    {/* Existing table code for managing projects */}
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Project</Table.HeaderCell>
                                <Table.HeaderCell>User</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {groupedProjects.map((group, index) => {
                                const projectName = group[0].project;
                                return (
                                    <React.Fragment key={index}>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Button onClick={() => toggleProject(projectName)}>
                                                    {expandedProjects[projectName] ? '-' : '+'}
                                                </Button>
                                                {projectName}
                                            </Table.Cell>
                                            <Table.Cell colSpan="3"></Table.Cell>
                                        </Table.Row>
                                        {expandedProjects[projectName] && group.map((project) => (
                                            <Table.Row key={project.weekend}>
                                                <Table.Cell></Table.Cell>
                                                <Table.Cell>{project.user}</Table.Cell>
                                                <Table.Cell>
                                                    <Label color={project.status === 'Approved' ? 'green' : project.status === 'Rejected' ? 'red' : 'blue'}>
                                                        {project.status}
                                                    </Label>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Button icon color="green" onClick={() => handleApprove(project.project)} disabled={project.status !== 'Submitted'}>
                                                        <Icon name="check" />
                                                    </Button>
                                                    <Button icon color="red" onClick={() => handleReject(project.project)} disabled={project.status !== 'Submitted'}>
                                                        <Icon name="times" />
                                                    </Button>
                                                    <Button icon color="blue" onClick={() => handleViewDetails(project)}>
                                                        <Icon name="eye" />
                                                    </Button>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </React.Fragment>
                                );
                            })}
                        </Table.Body>
                    </Table>
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Submitted Records',
            render: () => (
                <Tab.Pane>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Select</Table.HeaderCell>
                                <Table.HeaderCell>Project</Table.HeaderCell>
                                <Table.HeaderCell>User</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell> {/* Added column for actions */}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {projects.filter(project => project.status === 'Submitted').map((project) => (
                                <Table.Row key={project.weekend}>
                                    <Table.Cell>
                                        <input 
                                            type="checkbox" 
                                            checked={selectedProjectsForApproval.includes(project.project)}
                                            onChange={() => handleCheckboxChange(project.project)} 
                                        />
                                    </Table.Cell>
                                    <Table.Cell>{project.project}</Table.Cell>
                                    <Table.Cell>{project.user}</Table.Cell>
                                    <Table.Cell>
                                        <Label color='blue'>{project.status}</Label>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button 
                                            icon 
                                            color="red" 
                                            onClick={() => handleReject(project.project)} // Updated to use project.project
                                            disabled={project.status !== 'Submitted'}
                                        >
                                            <Icon name="times" />
                                        </Button>
                                        <Button 
                                            icon 
                                            color="blue" 
                                            onClick={() => handleViewDetails(project)} // Updated to use project for view details
                                        >
                                            <Icon name="eye" />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    <Button color="green" onClick={handleBulkApprove} disabled={selectedProjectsForApproval.length === 0}>
                        Approve Selected
                    </Button>
                    <Button color="blue" onClick={handleViewDetails} disabled={selectedProjectsForApproval.length === 0}>
                        View Selected
                    </Button>
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Rejected Records',
            render: () => (
                <Tab.Pane>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Select</Table.HeaderCell>
                                <Table.HeaderCell>Project</Table.HeaderCell>
                                <Table.HeaderCell>User</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell> {/* Added column for actions */}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {projects.filter(project => project.status === 'Rejected').map((project) => (
                                <Table.Row key={project.weekend}>
                                    <Table.Cell>
                                        <input 
                                            type="checkbox" 
                                            checked={selectedProjectsForApproval.includes(project.project)}
                                            onChange={() => handleCheckboxChange(project.project)} 
                                        />
                                    </Table.Cell>
                                    <Table.Cell>{project.project}</Table.Cell>
                                    <Table.Cell>{project.user}</Table.Cell>
                                    <Table.Cell>
                                        <Label color='blue'>{project.status}</Label>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button 
                                            icon 
                                            color="red" 
                                            onClick={() => handleReject(project.project)} // Updated to use project.project
                                            disabled={project.status !== 'Rejected'}
                                        >
                                            <Icon name="times" />
                                        </Button>
                                        <Button 
                                            icon 
                                            color="blue" 
                                            onClick={() => handleViewDetails(project)} // Updated to use project for view details
                                        >
                                            <Icon name="eye" />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    <Button color="green" onClick={handleBulkApprove} disabled={selectedProjectsForApproval.length === 0}>
                        Approve Selected
                    </Button>
                    <Button color="blue" onClick={handleViewDetails} disabled={selectedProjectsForApproval.length === 0}>
                        View Selected
                    </Button>
                </Tab.Pane>
            ),
        },
    ];

    return (
        <div className='main-layout'>
        <Navbar /> {/* Include the Navbar */}
        <Container>
            <Header as="h2">Manage Submitted Projects</Header>
            <DatePicker
                selected={selectedWeekend}
                onChange={handleWeekendChange}
                dateFormat="MM/dd/yyyy"
                showPopperArrow={false}
                style={{ marginBottom: '20px' }}
            />
            {errorMessage && (
                <Message negative>
                    <Message.Header>Error</Message.Header>
                    <p>{errorMessage}</p>
                </Message>
            )}
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            
            {/* Modal for detailed project view */}
            <Modal open={openModal} onClose={handleModalClose}>
                <Modal.Header>Project Details</Modal.Header>
                <Modal.Content>
                    <Table>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell><strong>Project</strong></Table.Cell>
                                <Table.Cell>{modalContent.project}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell><strong>User</strong></Table.Cell>
                                <Table.Cell>{modalContent.user}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell><strong>Status</strong></Table.Cell>
                                <Table.Cell>
                                    <Label color={modalContent.status === 'Approved' ? 'green' : modalContent.status === 'Rejected' ? 'red' : 'blue'}>
                                        {modalContent.status}
                                    </Label>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell><strong>Weekend</strong></Table.Cell>
                                <Table.Cell>{modalContent.weekend}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell><strong>Hours Breakdown</strong></Table.Cell>
                                <Table.Cell>
                                    <Table celled>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Day</Table.HeaderCell>
                                                <Table.HeaderCell>Hours</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {modalContent.hours ? Object.entries(modalContent.hours).map(([day, hours]) => (
                                                <Table.Row key={day}>
                                                    <Table.Cell>{day}</Table.Cell>
                                                    <Table.Cell>{hours}</Table.Cell>
                                                </Table.Row>
                                            )) : null}
                                        </Table.Body>
                                    </Table>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={handleModalClose}>Close</Button>
                </Modal.Actions>
            </Modal>
        </Container>
    </div>
    );
};

export default ManagerComponent;
