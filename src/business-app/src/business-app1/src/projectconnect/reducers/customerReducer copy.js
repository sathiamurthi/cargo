// src/reducers/customerReducer.js

const initialState = {
    customers: [],
    loading: false,
    error: null,
};

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CUSTOMERS':
            const search = action.payload.toLowerCase();
            const filteredCustomers = state.allCustomers.filter(customer =>
                customer.name.toLowerCase().includes(search) ||
                customer.city.toLowerCase().includes(search) ||
                customer.state.toLowerCase().includes(search)
            );
            return {
                ...state,
                customers: filteredCustomers,
                loading: false
            };
        case 'FETCH_CUSTOMERS_SUCCESS':
            return {
                ...state,
                customers: action.payload,
                allCustomers: action.payload, // Store all customers for filtering
                loading: false
            };
        case 'FETCH_CUSTOMERS_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default customerReducer;
