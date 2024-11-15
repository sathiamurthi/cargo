import React, { useState } from 'react';
import { Modal, Form, Button, Grid, Table, Pagination, Dropdown, Input } from 'semantic-ui-react';

const ShipmentComponent = () => {
  const [shipments, setShipments] = useState([
    // Your existing sample data (unchanged)
  ]);

  const [filteredShipments, setFilteredShipments] = useState(shipments);
  const [activePage, setActivePage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    status: '',
    pickupDate: '',
    driver: '',
    vehicle: '',
    from: '',
    to: '',
  });

  const driverVehicleMapping = {
    'Mike Jones': 'TUV6789', // Example vehicle for Mike Jones
    'John Doe': 'XYZ1234',   // Example vehicle for John Doe
    // Add more drivers and their vehicles as needed
  };

  const statusOptions = [
    { text: 'Pending', value: 'Pending' },
    { text: 'Delivered', value: 'Delivered' },
  ];

  const driverOptions = Object.keys(driverVehicleMapping).map(driver => ({
    text: driver,
    value: driver,
  }));

  const handleChange = (e, { name, value }) => {
    let updatedFormData = { ...formData, [name]: value };
    
    // Automatically fill in the vehicle if the driver changes
    if (name === 'driver') {
      updatedFormData.vehicle = driverVehicleMapping[value] || ''; // Set vehicle based on selected driver
    }
    
    setFormData(updatedFormData);
  };

  const handleSubmit = () => {
    setShipments([...shipments, { ...formData, id: Math.random().toString(36).substr(2, 9) }]);
    setFormData({
      id: '',
      status: '',
      pickupDate: '',
      driver: '',
      vehicle: '',
      from: '',
      to: '',
    });
    setModalOpen(false);
  };

  const handleFilterChange = (e, { value }) => {
    if (value === 'All') {
      setFilteredShipments(shipments);
    } else {
      setFilteredShipments(shipments.filter(shipment => shipment.status === value));
    }
    setActivePage(1);
  };

  return (
    <Grid container style={{ padding: '20px' }}>
      <Grid.Row>
        <Grid.Column>
          <h2>Shipments</h2>
          <p>View and manage all shipments, both active and completed.</p>
          
          <Input icon='search' placeholder='Search shipments...' />
          <Dropdown
            placeholder='All'
            selection
            options={statusOptions}
            onChange={handleFilterChange}
            style={{ margin: '0 10px' }}
          />
          <Input placeholder='Filter by date' type='date' />
          <Button primary onClick={() => setModalOpen(true)} style={{ marginLeft: '10px' }}>
            Add Shipment
          </Button>

          <Table celled style={{ marginTop: '20px' }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Pickup Date</Table.HeaderCell>
                <Table.HeaderCell>Driver</Table.HeaderCell>
                <Table.HeaderCell>Vehicle</Table.HeaderCell>
                <Table.HeaderCell>From</Table.HeaderCell>
                <Table.HeaderCell>To</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {filteredShipments.slice((activePage - 1) * 5, activePage * 5).map((shipment) => (
                <Table.Row key={shipment.id}>
                  <Table.Cell>{shipment.id}</Table.Cell>
                  <Table.Cell>{shipment.status}</Table.Cell>
                  <Table.Cell>{shipment.pickupDate}</Table.Cell>
                  <Table.Cell>{shipment.driver}</Table.Cell>
                  <Table.Cell>{shipment.vehicle}</Table.Cell>
                  <Table.Cell>{shipment.from}</Table.Cell>
                  <Table.Cell>{shipment.to}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          <Pagination
            activePage={activePage}
            onPageChange={(e, { activePage }) => setActivePage(activePage)}
            totalPages={Math.ceil(filteredShipments.length / 5)}
          />
        </Grid.Column>
      </Grid.Row>

      {/* Modal for Adding Shipment */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} size='small'>
        <Modal.Header>Add New Shipment</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field 
              required
              label="Status"
              control={Dropdown}
              options={statusOptions}
              name="status"
              placeholder="Select status"
              value={formData.status}
              onChange={handleChange}
            />
            <Form.Input
              required
              label="Pickup Date"
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
            />
            <Form.Field 
              required
              label="Driver"
              control={Dropdown}
              options={driverOptions}
              name="driver"
              placeholder="Select driver"
              value={formData.driver}
              onChange={handleChange}
            />
            <Form.Input
              required
              label="Vehicle"
              placeholder="Vehicle"
              name="vehicle"
              value={formData.vehicle}
              onChange={handleChange}
            />
            <Form.Input
              required
              label="From"
              placeholder="From"
              name="from"
              value={formData.from}
              onChange={handleChange}
            />
            <Form.Input
              required
              label="To"
              placeholder="To"
              name="to"
              value={formData.to}
              onChange={handleChange}
            />
            <Button primary type="submit">Submit</Button>
          </Form>
        </Modal.Content>
      </Modal>
    </Grid>
  );
};

export default ShipmentComponent;
