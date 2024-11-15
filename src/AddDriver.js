// src/AddDriver.js

import React, { useState } from 'react';
import { Modal, Form, Button, Icon, Grid, Table, Pagination } from 'semantic-ui-react';

const AddDriver = () => {
  const [drivers, setDrivers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    licenseNumber: '',
    licenseExpiryDate: '',
  });
  
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [activePage, setActivePage] = useState(1);

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setDrivers([...drivers, { id: drivers.length + 1, ...formData }]);
    setFormData({
      name: '',
      email: '',
      password: '',
      licenseNumber: '',
      licenseExpiryDate: '',
    });
    setModalOpen(false); // Close the modal after submission
  };

  const handleEdit = (id) => {
    const driverToEdit = drivers.find(driver => driver.id === id);
    setFormData(driverToEdit);
    setModalOpen(true); // Open modal for editing
  };

  const handleDelete = (id) => {
    setDrivers(drivers.filter(driver => driver.id !== id));
  };

  return (
    <Grid container style={{ padding: '20px' }}>
      <Grid.Row>
        <Grid.Column>
          <h2>
            <Icon name="user plus" />
            Driver List
          </h2>
          
          {/* Add Driver Button */}
          <Button primary onClick={() => setModalOpen(true)}>
            Add Driver
          </Button>

          <Table celled style={{ marginTop: '20px' }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>License Number</Table.HeaderCell>
                <Table.HeaderCell>License Expiry Date</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {drivers.slice((activePage - 1) * 5, activePage * 5).map((driver) => (
                <Table.Row key={driver.id}>
                  <Table.Cell>{driver.name}</Table.Cell>
                  <Table.Cell>{driver.email}</Table.Cell>
                  <Table.Cell>{driver.licenseNumber}</Table.Cell>
                  <Table.Cell>{driver.licenseExpiryDate}</Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => handleEdit(driver.id)}>Edit</Button>
                    <Button onClick={() => handleDelete(driver.id)}>Delete</Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          <Pagination
            activePage={activePage}
            onPageChange={(e, { activePage }) => setActivePage(activePage)}
            totalPages={Math.ceil(drivers.length / 5)}
          />
        </Grid.Column>
      </Grid.Row>

      {/* Modal for Adding/Editing Driver */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        size='small'>
        <Modal.Header>Add New Driver</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              required
              label="Name"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Form.Input
              required
              label="Email"
              placeholder="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Form.Input
              required
              label="Password"
              placeholder="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Form.Input
              label="License Number"
              placeholder="License Number"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
            />
            <Form.Input
              label="License Expiry Date"
              type="date"
              name="licenseExpiryDate"
              value={formData.licenseExpiryDate}
              onChange={handleChange}
            />
            <Button primary type="submit">Submit</Button>
          </Form>
        </Modal.Content>
      </Modal>
    </Grid>
  );
};

export default AddDriver;
