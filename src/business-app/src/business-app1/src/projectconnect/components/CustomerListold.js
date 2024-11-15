// src/components/CustomerList.js

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Icon, Input } from 'semantic-ui-react';
import { fetchCustomers } from '../actions/customerActions';
import mockCustomers from '../mockData/customers';

const CustomerListold = () => {
    const dispatch = useDispatch();
    const { customers, loading, error } = useSelector((state) => state.customers);
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch({
            type: 'FETCH_CUSTOMERS_SUCCESS',
            payload: mockCustomers,
        });
    }, [dispatch]);

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setSearch(value);
        dispatch(fetchCustomers(value));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Input
                icon='search'
                placeholder='Search by name, city, or state...'
                value={search}
                onChange={handleSearchChange}
            />
            <Card.Group>
                {customers.map((customer) => (
                    <Card key={customer.id} fluid>
                        <Card.Content>
                            <Card.Header>{customer.name}</Card.Header>
                            <Card.Meta>{customer.phone}</Card.Meta>
                            <Card.Description>
                                {customer.street}, {customer.city}, {customer.state}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button primary>
                                <Icon name='phone' /> Call
                            </Button>
                            <Button secondary>
                                <Icon name='info circle' /> More Info
                            </Button>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </div>
    );
};

export default CustomerListold;
