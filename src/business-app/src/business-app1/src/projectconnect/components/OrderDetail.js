import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Container, Header, Button, Segment, Label, Icon } from 'semantic-ui-react';

const OrderDetail = () => {
  const { orders } = useSelector(state => state.orders);
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the current order and its index
  const currentOrderIndex = orders.findIndex(order => order.id === id);
  const order = orders[currentOrderIndex];

  // Function to handle navigation
  const handleNavigate = (offset) => {
    const newIndex = currentOrderIndex + offset;

    // Check bounds and navigate to the new order if valid
    if (newIndex >= 0 && newIndex < orders.length) {
      const nextOrderId = orders[newIndex].id;
      navigate(`/order/${nextOrderId}`);
    }
  };

  if (!order) return <div>No order found.</div>;

  return (
    <Container>
      <Header as='h2' block>
        <Link to="/">
          <Icon name='angle left' />
          Customer Orders
        </Link>
        <Header.Content>Order #{order.id}</Header.Content>
      </Header>
      <Segment>
        <Label ribbon>VMG Construction</Label>
        <div>
          <p>Ship To: Southland Casino Parking</p>
          <p>Ship From: Orlando - 235</p>
          <p>Status: Delivered</p>
        </div>
        <div>
          <Label content={`Items 1/3`} />
          <Button floated='right'>Move Items</Button>
        </div>
        <Segment.Group>
          <Segment>
            <strong>54600132</strong>
            <div>Rebar from Special Vendor (UOM - Each)</div>
            <div>Quantity: 1</div>
            <div>Price per Unit: $100</div>
          </Segment>
        </Segment.Group>
      </Segment>
      <Button.Group>
        <Button onClick={() => handleNavigate(-1)} disabled={currentOrderIndex === 0}>
          Prev. Delivery
        </Button>
        <Button onClick={() => handleNavigate(1)} disabled={currentOrderIndex === orders.length - 1}>
          Next Delivery
        </Button>
      </Button.Group>
    </Container>
  );
};

export default OrderDetail;
