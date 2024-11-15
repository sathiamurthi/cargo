// ../actions/productActions.js

import { ADD_PRODUCT, REMOVE_PRODUCT, SET_PRODUCTS, SELECT_PRODUCT, SELECT_ALL_PRODUCTS, DESELECT_ALL_PRODUCTS } from '../actions/actionTypes';

// Action to set products from the API
export const setProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: products,
});

// Action to add a product
export const addProduct = (product) => ({
    type: ADD_PRODUCT,
    payload: product,
});

// Action to remove a product
export const removeProduct = (productId) => ({
    type: REMOVE_PRODUCT,
    payload: productId,
});

// Action to select a product
export const selectProduct = (productId) => ({
    type: SELECT_PRODUCT,
    payload: productId,
});

// Action to select all products
export const selectAllProducts = () => ({
    type: SELECT_ALL_PRODUCTS,
});

// Action to deselect all products
export const deselectAllProducts = () => ({
    type: DESELECT_ALL_PRODUCTS,
});

// Async action to fetch products
export const fetchProductsAsync = () => {
    return async (dispatch) => {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        dispatch(setProducts(data));
    };
};

// Async action to add a product
export const addProductAsync = (product) => {
    return async (dispatch) => {
        const response = await fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        
        const newProduct = await response.json();
        dispatch(addProduct(newProduct));
    };
};

// Async action to remove a product
export const removeProductAsync = (productId) => {
    return async (dispatch) => {
        await fetch(`http://localhost:5000/products/${productId}`, {
            method: 'DELETE',
        });
        dispatch(removeProduct(productId));
    };
};

export const updateProduct = (product) => ({
  type: 'UPDATE_PRODUCT',
  payload: product,
});

// Async action to update a product
export const updateProductAsync = (product) => {
  return async (dispatch) => {
      const response = await fetch(`http://localhost:5000/products/${product.id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
      });
      const updatedProduct = await response.json();
      dispatch(updateProduct(updatedProduct)); // Assuming you create an updateProduct action
  };
};
