import { combineReducers } from 'redux';
import productReducers from './productReducers';
import branchReducer from './branchReducers';
import customerReducer from './customerReducer';
import quoteReducer from './quoteReducer';
import orderReducer from './orderReducer';


const rootReducer = combineReducers({
  products: productReducers,
  branches: branchReducer,
  customers: customerReducer,
  quoteData: quoteReducer, 
  orders:orderReducer,
});

export default rootReducer;