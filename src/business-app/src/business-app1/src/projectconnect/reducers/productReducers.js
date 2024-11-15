// src/reducer/productReducer.js
import { 
  ADD_PRODUCT, 
  REMOVE_PRODUCT, 
  SELECT_ALL_PRODUCTS, 
  DESELECT_ALL_PRODUCTS, 
  SELECT_PRODUCT,
  SET_PRODUCTS
} from '../actions/actionTypes';

const initialState = {
  selectedProductIds: [],  // Ensure this is an array
  products: [],            // This will hold the list of products if you are using one
};

const productReducers = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      return {
        ...state,
        selectedProductIds: state.selectedProductIds.includes(action.payload)
          ? state.selectedProductIds.filter(id => id !== action.payload) // Deselecting the product
          : [...state.selectedProductIds, action.payload], // Selecting the product
      };
    case SELECT_ALL_PRODUCTS:
      return {
        ...state,
        selectedProductIds: action.payload, // Replace selected IDs with the new array of IDs
      };
    case DESELECT_ALL_PRODUCTS:
      return {
        ...state,
        selectedProductIds: [], // Reset the selected product IDs
      };
      case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload],
            };
        case REMOVE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload),
            };
            case SET_PRODUCTS:
              return {
                  ...state,
                  products: action.payload,
              };
    default:
      return state;
  }
};



export default productReducers;
