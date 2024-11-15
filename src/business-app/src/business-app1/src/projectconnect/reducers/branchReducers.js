import {
    FETCH_BRANCHES_REQUEST,
    FETCH_BRANCHES_SUCCESS,
    FETCH_BRANCHES_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    loading: false,
    branches: [],
    error: '',
};

const branchReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BRANCHES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_BRANCHES_SUCCESS:
            return {
                loading: false,
                branches: action.payload,
                error: '',
            };
        case FETCH_BRANCHES_FAILURE:
            return {
                loading: false,
                branches: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default branchReducer;
