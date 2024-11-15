import {
    FETCH_BRANCHES_REQUEST,
    FETCH_BRANCHES_SUCCESS,
    FETCH_BRANCHES_FAILURE,
} from './actionTypes';

const fetchBranchesRequest = () => ({
    type: FETCH_BRANCHES_REQUEST,
});

const fetchBranchesSuccess = (branches) => ({
    type: FETCH_BRANCHES_SUCCESS,
    payload: branches,
});

const fetchBranchesFailure = (error) => ({
    type: FETCH_BRANCHES_FAILURE,
    payload: error,
});

// Thunk action for fetching branches from API
export const fetchBranches = () => {
    return (dispatch) => {
        dispatch(fetchBranchesRequest());
        // Replace the URL with your actual API endpoint
        fetch('https://api.example.com/branches')
            .then((response) => response.json())
            .then((data) => {
                dispatch(fetchBranchesSuccess(data));
            })
            .catch((error) => {
                dispatch(fetchBranchesFailure(error.message));
            });
    };
};
