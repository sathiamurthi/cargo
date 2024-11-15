import React, { useState } from 'react';
import { Table, Button, Modal, Form, Pagination, Dropdown } from 'semantic-ui-react';

const RoutePlanning = () => {
  const [shipments, setShipments] = useState([
    {
      id: '7f1a08b6-186a-4a46-96b7-96d4d3af14b0',
      from: 'West Storage Facility',
      to: 'Central Warehouse',
      driver: 'Mike Jones',
      status: 'Pending',
    },
    {
      id: '4b27dfa7-9266-424f-b617-532084a6306e',
      from: 'West Storage Facility',
      to: 'Central Warehouse',
      driver: 'John Doe',
      status: 'Pending',
    },
    {
      id: 'c865e8ef-1535-4b1d-a0d8-a4cc12e8940c',
      from: 'West Storage Facility',
      to: 'West Storage Facility',
      driver: 'John Doe',
      status: 'Delivered',
    },
  ]);

  const [activePage, setActivePage] = useState(1);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newDriver, setNewDriver] = useState('');

  const driverOptions = [
    { text: 'Mike Jones', value: 'Mike Jones' },
    { text: 'John Doe', value: 'John Doe' },
    // Add more drivers as needed
  ];

  const handleReassignDriver = (shipmentId) => {
    setSelectedShipment(shipmentId);
    setModalOpen(true);
  };

  const handlePageChange = (e, { activePage }) => setActivePage(activePage);

  const handleDriverChange = (e, { value }) => setNewDriver(value);

  const handleDriverReassignSubmit = () => {
    setShipments(shipments.map(shipment => 
      shipment.id === selectedShipment ? { ...shipment, driver: newDriver } : shipment
    ));
    setModalOpen(false);
    setNewDriver('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Route Planning</h2>
      <p>View and manage shipment routes and driver assignments for CargoMasters Ltd.</p>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Shipment ID</Table.HeaderCell>
            <Table.HeaderCell>Start Location</Table.HeaderCell>
            <Table.HeaderCell>End Location</Table.HeaderCell>
            <Table.HeaderCell>Driver</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {shipments.slice((activePage - 1) * 5, activePage * 5).map(shipment => (
            <Table.Row key={shipment.id}>
              <Table.Cell>{shipment.id}</Table.Cell>
              <Table.Cell>{shipment.from}</Table.Cell>
              <Table.Cell>{shipment.to}</Table.Cell>
              <Table.Cell>{shipment.driver}</Table.Cell>
              <Table.Cell>{shipment.status}</Table.Cell>
              <Table.Cell>
                {shipment.status !== 'Delivered' && (
                  <Button onClick={() => handleReassignDriver(shipment.id)}>
                    Reassign Driver
                  </Button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Pagination
        activePage={activePage}
        onPageChange={handlePageChange}
        totalPages={Math.ceil(shipments.length / 5)}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} size='small'>
        <Modal.Header>Reassign Driver</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleDriverReassignSubmit}>
            <Form.Field 
              required
              control={Dropdown}
              label='Select New Driver'
              placeholder='Select a driver'
              selection
              options={driverOptions}
              onChange={handleDriverChange}
            />
            <Button type='submit' primary>Submit</Button>
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default RoutePlanning;
