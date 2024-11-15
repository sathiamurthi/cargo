import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Message, Grid, Dropdown, Icon } from 'semantic-ui-react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Ensure to import your Navbar component

const ProjectPage = () => {
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState(null);

    const initialFormState = {
        ProjectID: null,
        ProjectName: '',
        ClientID: null,
        ProjectStatus: '',
        ProjectCategory: '',
        ProjectManager: '',
        ProjectStartDate: '',
        ProjectEndDate: '',
    };
    
    const [formData, setFormData] = useState(initialFormState);

    // Define the Enum for ProjectStatus
    const projectStatusOptions = [
        { key: 'active', text: 'Active', value: 'Active' },
        { key: 'inactive', text: 'Inactive', value: 'Inactive' },
        { key: 'completed', text: 'Completed', value: 'Completed' },
        { key: 'on-hold', text: 'On Hold', value: 'On Hold' },
    ];

    // Define the Enum for ProjectCategory
    const projectCategoryOptions = [
        { key: 'web', text: 'Web Development', value: 'Web Development' },
        { key: 'mobile', text: 'Mobile Development', value: 'Mobile Development' },
        { key: 'marketing', text: 'Marketing', value: 'Marketing' },
        { key: 'research', text: 'Research', value: 'Research' },
    ];

    const initialFilterCriteria = {
        ProjectName: '',
        ClientID: null,
        ProjectStatus: '',
        ProjectCategory: '',
    };

    const [filterCriteria, setFilterCriteria] = useState(initialFilterCriteria);

    const fetchClients = async () => {
        try {
            const response = await axios.get('http://localhost:7071/api/clients');
            setClients(response.data.map(client => ({
                key: client.ClientID,
                text: client.ClientName,
                value: client.ClientID
            })));
        } catch (err) {
            console.error('Error fetching clients:', err);
            setError('Failed to load clients');
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:7071/api/projects');
            setProjects(response.data);
        } catch (err) {
            console.error('Error fetching projects:', err);
            setError('Failed to load projects');
        }
    };

    useEffect(() => {
        fetchClients();
        fetchProjects();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDropdownChange = (e, { name, value }) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleModalToggle = (project = null) => {
        setSelectedProject(project);
        setModalOpen(!modalOpen);
        if (project) {
            setFormData({
                ...initialFormState,
                ...project, // Spread to populate existing project details
            });
        } else {
            setFormData(initialFormState); // Reset form
        }
    };

    const handleSave = async () => {
        try {
            if (selectedProject) {
                await axios.put(`http://localhost:7071/api/projects/${formData.ProjectID}`, formData);
                setNotification({ type: 'success', message: 'Project updated successfully!' });
            } else {
                await axios.post('http://localhost:7071/api/projects', formData);
                setNotification({ type: 'success', message: 'Project created successfully!' });
            }
            setError(null);
            fetchProjects();
            setModalOpen(false); // Close modal after saving
        } catch (err) {
            console.error('Error saving project:', err);
            setError('Failed to save project');
            setNotification({ type: 'error', message: 'Failed to save project' });
        }
    };

    const handleDelete = async (projectId) => {
        try {
            await axios.delete(`http://localhost:7071/api/projects/${projectId}`);
            setNotification({ type: 'success', message: 'Project deleted successfully!' });
            fetchProjects();
        } catch (err) {
            console.error('Error deleting project:', err);
            setError('Failed to delete project');
            setNotification({ type: 'error', message: 'Failed to delete project' });
        }
    };

    const getClientNameById = (clientId) => {
        const client = clients.find(client => client.value === clientId);
        return client ? client.text : 'Unknown Client';
    };

    const openFilterModal = () => setFilterModalOpen(true);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterCriteria({ ...filterCriteria, [name]: value });
    };

    const applyFilters = () => {
        setFilterModalOpen(false);
    };

    const clearFilters = () => {
        setFilterCriteria(initialFilterCriteria);
    };

    const filteredProjects = projects.filter((project) => {
        return (
            (filterCriteria.ProjectName ? project.ProjectName.toLowerCase().includes(filterCriteria.ProjectName.toLowerCase()) : true) &&
            (filterCriteria.ClientID ? project.ClientID === filterCriteria.ClientID : true) &&
            (filterCriteria.ProjectStatus ? project.ProjectStatus === filterCriteria.ProjectStatus : true) &&
            (filterCriteria.ProjectCategory ? project.ProjectCategory === filterCriteria.ProjectCategory : true)
        );
    });

    return (
        <div className='main-layout'>
            <Navbar />
            <div className='right-content'>
                <div className='breadcrumb'>
                    <h2 className="breadcrumb-text">Projects</h2>
                </div>

                <div>
                    <Button primary onClick={handleModalToggle}>Add Project</Button>
                    <Button onClick={openFilterModal}>Filter</Button>
                    {error && <Message negative>{error}</Message>}
                    {notification && (
                        <Message positive={notification.type === 'success'} negative={notification.type === 'error'}>
                            {notification.message}
                        </Message>
                    )}
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Project Name</Table.HeaderCell>
                                <Table.HeaderCell>Client Name</Table.HeaderCell>
                                <Table.HeaderCell>Project Status</Table.HeaderCell>
                                <Table.HeaderCell>Project Category</Table.HeaderCell>
                                <Table.HeaderCell>Project Manager</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {filteredProjects.map(project => (
                                <Table.Row key={project.ProjectID}>
                                    <Table.Cell>{project.ProjectName}</Table.Cell>
                                    <Table.Cell>{getClientNameById(project.ClientID)}</Table.Cell>
                                    <Table.Cell>{project.ProjectStatus}</Table.Cell>
                                    <Table.Cell>{project.ProjectCategory}</Table.Cell>
                                    <Table.Cell>{project.ProjectManager}</Table.Cell>
                                    <Table.Cell>
                                        <Button icon color="orange" onClick={() => handleModalToggle(project)}>
                                            <Icon name="edit" />
                                        </Button>
                                        <Button icon color="red" onClick={() => handleDelete(project.ProjectID)}>
                                            <Icon name="trash" />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>

                {/* Add/Edit Modal */}
                <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                    <Modal.Header>{selectedProject ? 'Edit Project' : 'Add Project'}</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <Form.Field>
                                            <label>Project Name</label>
                                            <Input name="ProjectName" value={formData.ProjectName} onChange={handleInputChange} />
                                        </Form.Field>
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <Form.Field>
                                            <label>Client Name</label>
                                            <Dropdown
                                                placeholder='Select Client'
                                                fluid
                                                selection
                                                options={clients} // Ensure clients data is available
                                                name="ClientID"
                                                value={formData.ClientID}
                                                onChange={handleDropdownChange}
                                            />
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <Form.Field>
                                            <label>Project Status</label>
                                            <Dropdown
                                                placeholder='Select Project Status'
                                                fluid
                                                selection
                                                options={projectStatusOptions} // Ensure project status options is defined
                                                name="ProjectStatus"
                                                value={formData.ProjectStatus}
                                                onChange={handleDropdownChange}
                                            />
                                        </Form.Field>
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <Form.Field>
                                            <label>Project Category</label>
                                            <Dropdown
                                                placeholder='Select Project Category'
                                                fluid
                                                selection
                                                options={projectCategoryOptions} // Ensure project category options is defined
                                                name="ProjectCategory"
                                                value={formData.ProjectCategory}
                                                onChange={handleDropdownChange}
                                            />
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <Form.Field>
                                            <label>Project Manager</label>
                                            <Input name="ProjectManager" value={formData.ProjectManager} onChange={handleInputChange} />
                                        </Form.Field>
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <Form.Field>
                                            <label>Start Date</label>
                                            <Input type="date" name="ProjectStartDate" value={formData.ProjectStartDate} onChange={handleInputChange} />
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <Form.Field>
                                            <label>End Date</label>
                                            <Input type="date" name="ProjectEndDate" value={formData.ProjectEndDate} onChange={handleInputChange} />
                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                        <Button primary onClick={handleSave}>Save</Button>
                    </Modal.Actions>
                </Modal>

                {/* Filter Modal */}
                <Modal open={filterModalOpen} onClose={() => setFilterModalOpen(false)}>
                    <Modal.Header>Filter Projects</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Project Name</label>
                                <Input name="ProjectName" value={filterCriteria.ProjectName} onChange={handleFilterChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Client Name</label>
                                <Dropdown
                                    placeholder='Select Client'
                                    fluid
                                    selection
                                    options={clients}
                                    name="ClientID"
                                    value={filterCriteria.ClientID}
                                    onChange={(e, { name, value }) => handleFilterChange({ target: { name, value } })}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Project Status</label>
                                <Dropdown
                                    placeholder='Select Project Status'
                                    fluid
                                    selection
                                    options={projectStatusOptions}
                                    name="ProjectStatus"
                                    value={filterCriteria.ProjectStatus}
                                    onChange={(e, { name, value }) => handleFilterChange({ target: { name, value } })}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Project Category</label>
                                <Dropdown
                                    placeholder='Select Project Category'
                                    fluid
                                    selection
                                    options={projectCategoryOptions}
                                    name="ProjectCategory"
                                    value={filterCriteria.ProjectCategory}
                                    onChange={(e, { name, value }) => handleFilterChange({ target: { name, value } })}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={clearFilters}>Clear Filters</Button>
                        <Button onClick={() => setFilterModalOpen(false)}>Cancel</Button>
                        <Button primary onClick={applyFilters}>Apply Filters</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        </div>
    );
};

export default ProjectPage;
