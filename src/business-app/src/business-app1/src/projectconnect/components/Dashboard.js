
import React, { useState } from 'react';
import { Sidebar, Menu, Icon, Segment, Container, Card, Grid, Header } from 'semantic-ui-react';
import BranchList from './BranchList';
import CustomerList from './CustomerList';
import InventoryLookup from './InventoryLookup';
import ProductLookup from './ProductLookup';
import CreateQuote from './CreateQuote';
import CustomerOrders from './CustomerOrders';
import ProductList from './ProductList';
import PurchaseOrderForm from './PurchaseOrderForm';
import DashboardSample from './DashboardSample';
import CandidateDashboard from './CandidateDashboard';
import Timesheet from './Timesheet';
import ManagerComponent from './ManagerComponent';
import ManagerDashboard from './ManagerDashboard';

const Dashboard = () => {
  const [visible, setVisible] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  const toggleVisibility = () => setVisible(!visible);
  const handleMenuItemClick = (name) => {
    setActiveItem(name);
    setVisible(false);
  };

  const renderContent = () => {
    if (activeItem === 'Home') {
      return (
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column>
              <Card centered>
                <Icon name="search" size="huge" />
                <Card.Content>
                  <Card.Header>Products in Branches</Card.Header>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card centered>
                <Icon name="address book" size="huge" />
                <Card.Content>
                  <Card.Header>Customer Directory</Card.Header>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Card centered>
                <Icon name="file alternate" size="huge" />
                <Card.Content>
                  <Card.Header>Create Quote</Card.Header>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card centered>
                <Icon name="file" size="huge" />
                <Card.Content>
                  <Card.Header>Manage Quotes</Card.Header>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Card centered>
                <Icon name="warehouse" size="huge" />
                <Card.Content>
                  <Card.Header>Branch Deliveries</Card.Header>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card centered>
                <Icon name="truck" size="huge" />
                <Card.Content>
                  <Card.Header>Customer Orders</Card.Header>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    } else {
      switch (activeItem) {
        case 'Products in Branches':
          return <PurchaseOrderForm/>;
        case 'Customer Directory':
          return <CreateQuote/>;
        case 'Create Quote':
          return <DashboardSample/>;
        case 'Manage Quotes':
          return <CandidateDashboard/>;
        case 'Branch Deliveries':
          return<Timesheet/>
        case 'Customer Orders':
          return <ManagerComponent/>;
          case 'Manage Customers':
            return <ManagerDashboard/>;
        default:
          return <div>Home Content</div>;
      }
    }
  };
  return (
    <Container>
      {/* Trigger button for sidebar */}
      <Menu attached="top" inverted>
        <Menu.Item onClick={toggleVisibility}>
          <Icon name="sidebar" />
        </Menu.Item>
        <Menu.Item header>Home</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Icon name="user circle" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      {/* Sidebar menu */}
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation="overlay"
          direction="left"
          visible={visible}
          vertical
          width="thin"
        >
          <Menu.Item header>
            Menu
            <Icon name="close" onClick={toggleVisibility} style={{ float: 'right' }} />
          </Menu.Item>
          <Menu.Item name="Home" onClick={() => handleMenuItemClick('Home')}>
            Home
          </Menu.Item>
          <Menu.Item name="select-customer" header>
            Select Customer
          </Menu.Item>
          <Menu.Item>No Customer Selected</Menu.Item>
          <Menu.Item name="products" onClick={() => handleMenuItemClick('Products in Branches')}>
            Products in Branches
          </Menu.Item>
          <Menu.Item name="directory" onClick={() => handleMenuItemClick('Customer Directory')}>
            Customer Directory
          </Menu.Item>
          <Menu.Item name="create-quote" onClick={() => handleMenuItemClick('Create Quote')}>
            Create Quote
          </Menu.Item>
          <Menu.Item name="manage-quotes" onClick={() => handleMenuItemClick('Manage Quotes')}>
            Manage Quotes
          </Menu.Item>
          <Menu.Item name="branch-deliveries" onClick={() => handleMenuItemClick('Branch Deliveries')}>
            Branch Deliveries
          </Menu.Item>
          <Menu.Item name="customer-orders" onClick={() => handleMenuItemClick('Customer Orders')}>
            Customer Orders
          </Menu.Item>
          <Menu.Item name="manage-customer" onClick={() => handleMenuItemClick('Manage Customers')}>
            Manage Customers
          </Menu.Item>
        </Sidebar>

        {/* Content area */}
        <Sidebar.Pusher dimmed={visible}>
          <Segment basic>
            <Header as="h3">{activeItem}</Header>
            {renderContent()}
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Container>
  );
};

export default Dashboard;
