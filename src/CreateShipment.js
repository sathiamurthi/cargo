import React, { useState } from 'react';
import { Form, Button, Dropdown } from 'semantic-ui-react';

const CreateShipment = () => {
  const [formData, setFormData] = useState({
    pickupDate: '',
    deliveryDate: '',
    weight: '',
    driver: '',
    vehicle: '',
    startLocation: '',
    endLocation: '',
    route: '',
  });

  const driverVehicleMapping = {
    'Mike Jones': 'TUV6789',
    'John Doe': 'XYZ1234',
    // Add additional driver-vehicle pairs
  };

  const driverOptions = Object.keys(driverVehicleMapping).map(driver => ({
    text: driver,
    value: driver,
  }));

  const startLocationOptions = [
    { text: 'West Storage Facility', value: 'West Storage Facility' },
    { text: 'Central Warehouse', value: 'Central Warehouse' },
    // Add more start locations as needed
  ];

  const endLocationOptions = [
    { text: 'Central Warehouse', value: 'Central Warehouse' },
    { text: 'East Distribution Center', value: 'East Distribution Center' },
    // Add more end locations as needed
  ];

  const routeOptions = [
    { text: 'Route 1: West to Central', value: 'West to Central' },
    { text: 'Route 2: Central to East', value: 'Central to East' },
    // Add additional routes as needed
  ];

  const handleChange = (e, { name, value }) => {
    let updatedFormData = { ...formData, [name]: value };

    if (name === 'driver') {
      updatedFormData.vehicle = driverVehicleMapping[value] || '';
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = () => {
    console.log('Shipment Created:', formData);
    // Handle form submission
    // Reset the form
    setFormData({
      pickupDate: '',
      deliveryDate: '',
      weight: '',
      driver: '',
      vehicle: '',
      startLocation: '',
      endLocation: '',
      route: '',
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create New Shipment</h2>
      <p>Enter the details below to create a new shipment and assign a driver.</p>

      <Form onSubmit={handleSubmit}>
        <Form.Input
          required
          label="Pickup Date"
          type="date"
          name="pickupDate"
          value={formData.pickupDate}
          onChange={handleChange}
        />
        <Form.Input
          required
          label="Delivery Date"
          type="date"
          name="deliveryDate"
          value={formData.deliveryDate}
          onChange={handleChange}
        />
        <Form.Input
          required
          label="Weight (kg)"
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
        />
        <Form.Field 
          required
          label="Assign Driver"
          control={Dropdown}
          options={driverOptions}
          name="driver"
          placeholder="Select a driver"
          value={formData.driver}
          onChange={handleChange}
          selection
        />
        <Form.Field
          required
          label="Assign Vehicle"
          control="input"
          value={formData.vehicle}
          readOnly
        />
        <Form.Field 
          required
          label="Start Location"
          control={Dropdown}
          options={startLocationOptions}
          name="startLocation"
          placeholder="Select a start location"
          value={formData.startLocation}
          onChange={handleChange}
          selection
        />
        <Form.Field 
          required
          label="End Location"
          control={Dropdown}
          options={endLocationOptions}
          name="endLocation"
          placeholder="Select an end location"
          value={formData.endLocation}
          onChange={handleChange}
          selection
        />
        <Form.Field
          required
          label="Select Route"
          control={Dropdown}
          options={routeOptions}
          name="route"
          placeholder="Select a route"
          value={formData.route}
          onChange={handleChange}
          selection
        />
        <Button primary type="submit">Create Shipment</Button>
      </Form>
    </div>
  );
};

export default CreateShipment;
