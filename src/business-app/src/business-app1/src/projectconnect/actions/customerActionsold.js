// src/actions/customerActions.js

export const oldfetchCustomers = (search) => ({
    type: 'FETCH_CUSTOMERS',
    payload: search
});
