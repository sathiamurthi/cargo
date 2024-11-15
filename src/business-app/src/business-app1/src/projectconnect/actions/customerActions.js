// src/redux/actions/customerActions.js
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast from react-toastify

const API_URL = 'http://localhost:3000/customers';

export const FETCH_CUSTOMERS = 'FETCH_CUSTOMERS';
export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';

export const fetchCustomers = () => async (dispatch) => {
    try {
        const response = await axios.get(API_URL);
        const customers = Array.isArray(response.data.results) ? response.data.results : [];
        dispatch({ type: FETCH_CUSTOMERS, payload: customers });
    } catch (error) {
        console.error("Error fetching customers:", error);
        toast.error("Failed to fetch customers."); // Notification on fetch error
    }
};

export const addCustomer = (customer) => async (dispatch) => {
    try {
        const response = await axios.post(API_URL, customer);
        dispatch({ type: ADD_CUSTOMER, payload: response.data });
        toast.success("Customer added successfully!"); // Notification on success
    } catch (error) {
        console.error("Error adding customer:", error);
        toast.error("Failed to add customer."); // Notification on error
    }
};

export const updateCustomer = (id, customer) => async (dispatch) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, customer);
        dispatch({ type: UPDATE_CUSTOMER, payload: response.data });
        toast.success("Customer updated successfully!"); // Notification on success
    } catch (error) {
        console.error("Error updating customer:", error);
        toast.error("Failed to update customer."); // Notification on error
    }
};

export const deleteCustomer = (id) => async (dispatch) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        dispatch({ type: DELETE_CUSTOMER, payload: id });
        toast.success("Customer deleted successfully!"); // Notification on success
    } catch (error) {
        console.error("Error deleting customer:", error);
        toast.error("Failed to delete customer."); // Notification on error
    }
};
