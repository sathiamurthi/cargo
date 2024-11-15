// src/DriversManagement.js

import React from 'react';
import { Input, Table, Button, Icon, Header } from 'semantic-ui-react';

const DriversManagement = () => {
  const drivers = [
    {
      name: 'John Doe',
      email: 'test@test.com',
      licenseNumber: 'C3456789',
      licenseExpiryDate: '1/16/2025',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Header as='h2'>Drivers Management</Header>
      <p>View and manage all drivers in your organization.</p>

      <Input icon='search' placeholder='Search drivers...' style={{ marginBottom: '20px' }} />

      <Button primary icon labelPosition='left'>
        <Icon name='add user' />
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
          {drivers.map((driver, index) => (
            <Table.Row key={index}>
              <Table.Cell>{driver.name}</Table.Cell>
              <Table.Cell>{driver.email}</Table.Cell>
              <Table.Cell>{driver.licenseNumber}</Table.Cell>
              <Table.Cell>{driver.licenseExpiryDate}</Table.Cell>
              <Table.Cell>
                <Button size='small'>View Details</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default DriversManagement;
