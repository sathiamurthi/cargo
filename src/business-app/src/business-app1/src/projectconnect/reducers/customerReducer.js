// src/redux/reducers/customerReducer.js
import { FETCH_CUSTOMERS, ADD_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER } from '../actions/customerActions';

const initialState = {
    customers: [], // This should be initialized as an empty array.
};

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CUSTOMERS:
            console.log('reducers', action.payload);
            return { ...state, customers: action.payload };
        case ADD_CUSTOMER:
            return { ...state, customers: [...state.customers, action.payload] };
        case UPDATE_CUSTOMER:
            return {
                ...state,
                customers: state.customers.map((cust) =>
                    cust.id === action.payload.id ? action.payload : cust
                ),
            };
        case DELETE_CUSTOMER:
            return {
                ...state,
                customers: state.customers.filter(cust => cust.id !== action.payload),
            };
        default:
            return state;
    }
};

export default customerReducer;
