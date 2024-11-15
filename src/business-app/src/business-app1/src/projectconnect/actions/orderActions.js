// Action types
export const SET_ORDERS = 'SET_ORDERS';
export const SEARCH_ORDERS = 'SEARCH_ORDERS';
export const SET_SELECTED_ORDER = 'SET_SELECTED_ORDER';

// Action creators
export const setOrders = (orders) => ({
  type: SET_ORDERS,
  payload: orders
});

export const searchOrders = (searchTerm) => ({
  type: SEARCH_ORDERS,
  payload: searchTerm
});



export const setSelectedOrder = (orderId) => ({
  type: SET_SELECTED_ORDER,
  payload: orderId,
});