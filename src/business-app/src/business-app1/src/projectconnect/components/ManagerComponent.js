// src/components/ManagerComponent.js
import React, { useState } from 'react';
import { Button, Container, Header, Table, Message, Label, Modal } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, startOfWeek } from 'date-fns';
import moment from 'moment';

const initialProjectData = [
    { project: 'Project A', user: 'User1', status: 'Submitted', weekend: '09/01/2024', hours: { Monday: 4, Tuesday: 5, Wednesday: 2, Thursday: 3, Friday: 1 } },
    { project: 'Project A', user: 'User1', status: 'Submitted', weekend: '09/08/2024', hours: { Monday: 2, Tuesday: 3, Wednesday: 4, Thursday: 2, Friday: 4 } },
    { project: 'Project B', user: 'User2', status: 'Submitted', weekend: '09/01/2024', hours: { Monday: 3, Tuesday: 2, Wednesday: 1, Thursday: 5, Friday: 0 } },
    { project: 'Project B', user: 'User2', status: 'Submitted', weekend: '09/08/2024', hours: { Monday: 1, Tuesday: 2, Wednesday: 1, Thursday: 1, Friday: 5 } },
    { project: 'Project C', user: 'User3', status: 'Submitted', weekend: '09/15/2024', hours: { Monday: 4, Tuesday: 2, Wednesday: 3, Thursday: 2, Friday: 2 } },
    { project: 'Project D', user: 'User4', status: 'Submitted', weekend: '09/22/2024', hours: { Monday: 1, Tuesday: 1, Wednesday: 2, Thursday: 1, Friday: 2 } },
];

const ManagerComponent = () => {
    const [projects, setProjects] = useState(initialProjectData);
    const [expandedProjects, setExpandedProjects] = useState({});
    const [selectedWeekend, setSelectedWeekend] = useState(new Date());
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState({});

    // Set default to expanded
    const defaultExpanded = () => {
        const expanded = {};
        projects.forEach(project => {
            expanded[project.project] = true; // Expand all entries by default
        });
        setExpandedProjects(expanded);
    };

    const handleApprove = (projectName) => {
        const updatedProjects = projects.map(project => {
            if (project.project === projectName) {
                return { ...project, status: 'Approved' };
            }
            return project;
        });
        setProjects(updatedProjects);
    };

    const handleReject = (projectName) => {
        const updatedProjects = projects.map(project => {
            if (project.project === projectName) {
                return { ...project, status: 'Rejected' };
            }
            return project;
        });
        setProjects(updatedProjects);
    };

    const toggleProject = (projectName) => {
        setExpandedProjects(prev => ({ ...prev, [projectName]: !prev[projectName] }));
    };

    const handleWeekendChange = (date) => {
        setSelectedWeekend(date);
    };

    const handleViewDetails = (project) => {
        setModalContent(project);
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    // Effect to run default expand on first load
    React.useEffect(() => {
        defaultExpanded();
    }, []);

    // Grouping projects by name
    const groupedProjects = Object.values(projects.reduce((acc, project) => {
        if (!acc[project.project]) {
            acc[project.project] = [];
        }
        acc[project.project].push(project);
        return acc;
    }, {}));

    return (
        <Container>
            <Header as="h2">Manage Submitted Projects</Header>
            <DatePicker
                selected={selectedWeekend}
                onChange={handleWeekendChange}
                dateFormat="MM/dd/yyyy"
                showPopperArrow={false}
                style={{ marginBottom: '20px' }} // Adjust style for better positioning
            />
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
                                            <Button color="green" onClick={() => handleApprove(project.project)} disabled={project.status !== 'Submitted'}>
                                                Approve
                                            </Button>
                                            <Button color="red" onClick={() => handleReject(project.project)} disabled={project.status !== 'Submitted'}>
                                                Reject
                                            </Button>
                                            <Button color="blue" onClick={() => handleViewDetails(project)}>View</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </React.Fragment>
                        );
                    })}
                </Table.Body>
            </Table>

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
    );
};

export default ManagerComponent;
