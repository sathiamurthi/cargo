// src/components/CustomerList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers, deleteCustomer } from '../actions/customerActions';
import { Card, Button, Input, Container, Grid, Message, Modal, Icon } from 'semantic-ui-react';
import CustomerForm from './CustomerForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CustomerList.css'; // Import the CSS styles

const CustomerList = () => {
    const dispatch = useDispatch();
    const customers = useSelector(state => state.customers.customers) || []; // Ensure it's an array
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [customersPerPage] = useState(6);
    const [showFormModal, setShowFormModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [customerToEdit, setCustomerToEdit] = useState(null);
    const [customerDetails, setCustomerDetails] = useState(null);

    useEffect(() => {
        dispatch(fetchCustomers());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteCustomer(id));
    };

    const handleEdit = (customer) => {
        setCustomerToEdit(customer);
        setShowFormModal(true);
    };

    const handleViewDetails = (customer) => {
        setCustomerDetails(customer);
        setShowDetailsModal(true);
    };

    const handleAddCustomer = () => {
        setCustomerToEdit(null);
        setShowFormModal(true);
    };

    const handleCloseFormModal = () => {
        setShowFormModal(false);
        setCustomerToEdit(null); // Clear the form on close
    };

    const handleCloseDetailsModal = () => {
        setShowDetailsModal(false);
        setCustomerDetails(null);
    };

    // Pagination logic
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    return (
        <Container>
            <Button primary onClick={handleAddCustomer}>Add Customer</Button>
            <Input
                icon='search'
                placeholder='Search customers...'
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px', width: '100%' }}
            />
            {/* Check if no customers found */}
            {filteredCustomers.length === 0 ? (
                <Message
                    warning
                    header='No Records Found'
                    content='There are no customers matching your search criteria.'
                />
            ) : (
                <div>
                    <Grid relaxed columns={3} stackable>
                        {currentCustomers.map(customer => (
                            <Grid.Column key={customer.id}>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>{customer.name}</Card.Header>
                                        <Card.Meta>{customer.email}</Card.Meta>
                                        <Card.Description>
                                            Phone: {customer.phone}
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button icon primary onClick={() => handleEdit(customer)}>
                                            <Icon name='edit' />
                                        </Button>
                                        <Button icon color='red' onClick={() => handleDelete(customer.id)}>
                                            <Icon name='trash' />
                                        </Button>
                                        <Button icon onClick={() => handleViewDetails(customer)}>
                                            <Icon name='eye' />
                                        </Button>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        ))}
                    </Grid>
                </div>
            )}

            <div className="pagination">
                <Button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}>
                    Previous
                </Button>
                <Button 
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={indexOfLastCustomer >= filteredCustomers.length || filteredCustomers.length === 0}>
                    Next
                </Button>
            </div>

            {/* Modal for Customer Form */}
            <Modal open={showFormModal} onClose={handleCloseFormModal}>
                <Modal.Header>{customerToEdit ? 'Edit Customer' : 'Add Customer'}</Modal.Header>
                <Modal.Content>
                    <CustomerForm 
                        customerToEdit={customerToEdit} 
                        onCancel={handleCloseFormModal} 
                    />
                </Modal.Content>
            </Modal>

            {/* Modal for Customer Details */}
            <Modal open={showDetailsModal} onClose={handleCloseDetailsModal} closeIcon>
                <Modal.Header>
                    Customer Details
                    <Icon name='close' onClick={handleCloseDetailsModal} style={{ cursor: 'pointer', float: 'right' }} />
                </Modal.Header>
                {customerDetails && (
                    <Modal.Content>
                        <p><strong>Name:</strong> {customerDetails.name}</p>
                        <p><strong>Email:</strong> {customerDetails.email}</p>
                        <p><strong>Phone:</strong> {customerDetails.phone}</p>
                        <p><strong>Street:</strong> {customerDetails.street}</p>
                        <p><strong>City:</strong> {customerDetails.city}</p>
                        <p><strong>State:</strong> {customerDetails.state}</p>
                    </Modal.Content>
                )}
            </Modal>

            <ToastContainer />
        </Container>
    );
};

export default CustomerList;
