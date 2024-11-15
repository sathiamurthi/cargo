import React, { useState, useEffect } from 'react';
import { Button, Table, Input, Icon, Message, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Ensure to import your Navbar component

const ClientPage = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [sortColumn, setSortColumn] = useState('ClientName');
    const [sortDirection, setSortDirection] = useState('ascending');
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({ ClientID: null, ClientName: '', ClientCountry: '', ClientPartner: '', Headcount: 0 });
    const [isEditMode, setIsEditMode] = useState(false);

    const fetchClients = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:7071/api/clients');
            setClients(response.data);
        } catch (err) {
            setError('Failed to load clients');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    // Handle changing the input value for search
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle sorting of table rows
    const handleSort = (column) => {
        const direction = sortColumn === column && sortDirection === 'ascending' ? 'descending' : 'ascending';
        setSortColumn(column);
        setSortDirection(direction);
    };

    // Filter and sort clients based on search term and selected column
    const filteredAndSortedData = clients
        .filter(client => {
            return (
                client.ClientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                client.ClientID?.toString().includes(searchTerm)
            );
        })
        .sort((a, b) => {
            const order = sortDirection === 'ascending' ? 1 : -1;
            if (a[sortColumn] < b[sortColumn]) return -1 * order;
            if (a[sortColumn] > b[sortColumn]) return 1 * order;
            return 0;
        });

    // Open modal for adding or editing clients
    const openModal = (client = null) => {
        if (client) {
            setFormData(client);
            setIsEditMode(true);
        } else {
            setFormData({ ClientID: null, ClientName: '', ClientCountry: '', ClientPartner: '', Headcount: 0 });
            setIsEditMode(false);
        }
        setModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setModalOpen(false);
        setError(null);
    };

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Save or update client information
    const handleSave = async () => {
        try {
            if (isEditMode) {
                await axios.put(`http://localhost:7071/api/clients/${formData.ClientID}`, formData);
            } else {
                await axios.post('http://localhost:7071/api/clients', formData);
            }
            fetchClients(); // Refresh clients
            closeModal(); // Close modal
        } catch (err) {
            setError('Failed to save client');
        }
    };

    // Handle client deletion
    const handleDelete = async (clientId) => {
        try {
            await axios.delete(`http://localhost:7071/api/clients/${clientId}`);
            fetchClients(); // Refresh clients
        } catch (err) {
            setError('Failed to delete client');
        }
    };

    return (
        <div className='main-layout'>
            <Navbar />
            <div className='right-content'>
                <div className='breadcrumb'>
                    <h2 className="breadcrumb-text">Clients</h2>
                </div>
                <div className="controls">
                    <Input
                        icon="search"
                        placeholder="Search Client"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-bar"
                        style={{ marginRight: '10px', width: '300px' }}
                    />
                    <Button
                        icon
                        labelPosition="left"
                        color="blue"
                        onClick={() => openModal()}
                        className="add-client-button"
                    >
                        <Icon name="add" />
                        Add Client
                    </Button>
                </div>

                <div className='table'>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <Table celled striped selectable sortable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell
                                        sorted={sortColumn === 'ClientName' ? sortDirection : null}
                                        onClick={() => handleSort('ClientName')}
                                    >
                                        Company
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                        sorted={sortColumn === 'ClientCountry' ? sortDirection : null}
                                        onClick={() => handleSort('ClientCountry')}
                                    >
                                        Country
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                        sorted={sortColumn === 'ClientPartner' ? sortDirection : null}
                                        onClick={() => handleSort('ClientPartner')}
                                    >
                                        Client Partner
                                    </Table.HeaderCell>
                                    <Table.HeaderCell
                                        sorted={sortColumn === 'Headcount' ? sortDirection : null}
                                        onClick={() => handleSort('Headcount')}
                                    >
                                        Headcount
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Actions</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {filteredAndSortedData.length > 0 ? (
                                    filteredAndSortedData.map((client) => (
                                        <Table.Row key={client.ClientID} style={{ cursor: 'pointer', maxWidth: '700px' }}>
                                            <Table.Cell>
                                                <Icon name="building" /> {client.ClientName}
                                            </Table.Cell>
                                            <Table.Cell>{client.ClientCountry}</Table.Cell>
                                            <Table.Cell>{client.ClientPartner}</Table.Cell>
                                            <Table.Cell>{client.Headcount}</Table.Cell>
                                            <Table.Cell>
                                                <Button 
                                                    icon 
                                                    color="orange" 
                                                    onClick={() => openModal(client)} 
                                                    compact
                                                >
                                                    <Icon name="edit" />
                                                </Button>
                                                <Button 
                                                    icon 
                                                    color="red" 
                                                    onClick={() => handleDelete(client.ClientID)} 
                                                    compact
                                                >
                                                    <Icon name="trash" />
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                ) : (
                                    <Table.Row>
                                        <Table.Cell colSpan="5" textAlign="center">
                                            No matching clients found.
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    )}
                    {error && <Message negative>{error}</Message>}
                </div>

                {/* Modal for adding/editing clients */}
                <Modal open={modalOpen} onClose={closeModal}>
                    <Modal.Header>{isEditMode ? 'Edit Client' : 'Add Client'}</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Client Name</label>
                                <Input name="ClientName" value={formData.ClientName} onChange={handleInputChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Client Country</label>
                                <Input name="ClientCountry" value={formData.ClientCountry} onChange={handleInputChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Client Partner</label>
                                <Input name="ClientPartner" value={formData.ClientPartner} onChange={handleInputChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Headcount</label>
                                <Input type="number" name="Headcount" value={formData.Headcount} onChange={handleInputChange} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={closeModal}>Cancel</Button>
                        <Button primary onClick={handleSave}>{isEditMode ? 'Update' : 'Save'}</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        </div>
    );
};

export default ClientPage;
