import { SET_ORDERS, SEARCH_ORDERS, SET_SELECTED_ORDER } from '../actions/orderActions';
import  mockOrders  from '../mockData/mockOrders';

const initialState = {
  orders: [], // Ensure this is an empty array
  searchTerm: ''
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return { ...state, orders: action.payload };
    case SEARCH_ORDERS:
      const filteredOrders = mockOrders.filter(order =>
        order.id.includes(action.payload)
      );
      return { 
        ...state, 
        searchTerm: action.payload,
        orders: filteredOrders.length > 0 ? filteredOrders : [] // Always return an array
      };
    case SET_SELECTED_ORDER:
        return { ...state, selectedOrder: action.payload };
    default:
      return state;
  }
};

export default orderReducer;
