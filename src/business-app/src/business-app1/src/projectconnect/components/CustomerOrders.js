import React ,{ useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Input, List, Container, Header, Icon,Label, Button } from 'semantic-ui-react';
import {searchOrders, setOrders,setSelectedOrder  }  from '../actions/orderActions';
import mockOrders  from'../mockData/mockOrders'
import 'semantic-ui-css/semantic.min.css';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Change useHistory to useNavigate
import FilterComponent from './FilterComponent';

const CustomerOrders = () => {
    const { orders } = useSelector(state => state.orders);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const [filterOpen, setFilterOpen] = useState(false);

    // useEffect(() => {
    //   // Set initial orders when component mounts
    //   dispatch(setOrders(mockOrders));
    // }, [dispatch]);
    useEffect(() => {
        dispatch({
            type: 'SET_ORDERS',
            payload: mockOrders,
        });
        setOrders(orders.orders);
        console.log(orders.orders)
    }, [dispatch]);
    const handleSearch = (e) => {
      dispatch(searchOrders(e.target.value));
    };
    const handleOrderClick = (orderId) => {
        dispatch(setSelectedOrder(orderId));
        navigate(`/order/${orderId}`); // Use navigate instead of history.push
    };
  
    return (
      <Container>
        <Header as='h2' block>
          <Icon name='users' />
          <Header.Content>Customer Orders</Header.Content>
        </Header>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Input
          icon='search'
          placeholder='Search Order Number...'
          style={{ marginRight: '10px' }}
          onChange={handleSearch}
        />
        <Button onClick={() => setFilterOpen(true)}>Filter</Button>
      </div>
      <FilterComponent open={filterOpen} onClose={() => setFilterOpen(false)} />
        <List divided relaxed>
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map(order => (
                <List.Item key={order.id} onClick={() => handleOrderClick(order.id)}>
                <List.Content floated='right'>
                  <Icon name='chevron right' />
                </List.Content>
                <List.Content>
                  <List.Header>
                    <Label color='orange' ribbon>
                      ORDER
                    </Label>
                    #{order.id}
                  </List.Header>
                  <List.Description>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Order Date: {order.date}</span>
                      <span>Items: {order.items}</span>
                      <span>Total: ${order.total.toFixed(2)}</span>
                    </div>
                  </List.Description>
                </List.Content>
              </List.Item>
            ))
          ) : (
            <List.Item>
              <List.Content>No orders found.</List.Content>
            </List.Item>
          )}
        </List>
      </Container>
    );
  };
  
  export default CustomerOrders;
