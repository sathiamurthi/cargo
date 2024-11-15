// src/Dashboard.js

import React from 'react';
import { Card, Icon, Header, List } from 'semantic-ui-react';

const Dashboard = () => {
  const shipments = [
    {
      id: '4b27dfa7-9266-424f-b617-532084a6306e',
      status: 'Pending',
      driver: 'John Doe',
      route: 'to',
      createdAt: '2024-10-08 14:11',
    },
    {
      id: '7f1a08b6-186a-4a46-96b7-96d4d3af14b0',
      status: 'Pending',
      driver: 'Mike Jones',
      route: 'to',
      createdAt: '2024-10-08 14:11',
    },
  ];

  return (
    <div style={{ marginTop: '56px' }}>
      <Header as='h2'>Dashboard</Header>
      <p>Welcome to the operations dashboard for CargoMasters Ltd.</p>

      <Card.Group itemsPerRow={2}>
        <Card>
          <Card.Content>
            <Icon name='users' />
            <Card.Header>Active Drivers</Card.Header>
            <Card.Description>0</Card.Description>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Icon name='truck' />
            <Card.Header>Pending Shipments</Card.Header>
            <Card.Description>0</Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>

      <Header as='h3' style={{ marginTop: '40px' }}>Recent Shipments</Header>
      <List divided relaxed>
        {shipments.map((shipment, index) => (
          <List.Item key={index}>
            <Icon name='truck' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>Shipment ID: {shipment.id}</List.Header>
              <List.Description>
                Status: {shipment.status} <br />
                Driver: {shipment.driver} <br />
                Route: {shipment.route} <br />
                <Icon name='clock outline' /> Created: {shipment.createdAt}
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default Dashboard;
