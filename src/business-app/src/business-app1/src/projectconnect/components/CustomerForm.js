// src/components/CustomerForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCustomer, updateCustomer } from '../actions/customerActions';
import { Form, Button } from 'semantic-ui-react';

const CustomerForm = ({ customerToEdit, onCancel }) => {
    const dispatch = useDispatch();
    
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
    });

    useEffect(() => {
        if (customerToEdit) {
            setCustomer(customerToEdit);
        }
    }, [customerToEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomer((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (customerToEdit) {
            dispatch(updateCustomer(customerToEdit.id, customer));
        } else {
            dispatch(addCustomer(customer));
        }
        onCancel(); // Close the form after submission
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>Name</label>
                <input name="name" value={customer.name} onChange={handleInputChange} required />
            </Form.Field>
            <Form.Field>
                <label>Email</label>
                <input name="email" type="email" value={customer.email} onChange={handleInputChange} required />
            </Form.Field>
            <Form.Field>
                <label>Phone</label>
                <input name="phone" value={customer.phone} onChange={handleInputChange} required />
            </Form.Field>
            <Form.Field>
                <label>Street</label>
                <input name="street" value={customer.street} onChange={handleInputChange} required />
            </Form.Field>
            <Form.Field>
                <label>City</label>
                <input name="city" value={customer.city} onChange={handleInputChange} required />
            </Form.Field>
            <Form.Field>
                <label>State</label>
                <input name="state" value={customer.state} onChange={handleInputChange} required />
            </Form.Field>
            <Button type='submit'>{customerToEdit ? 'Update' : 'Add'} Customer</Button>
            <Button type='button' onClick={onCancel}>Cancel</Button>
        </Form>
    );
};

export default CustomerForm;
