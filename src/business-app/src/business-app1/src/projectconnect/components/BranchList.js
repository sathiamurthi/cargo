// src/components/BranchList.js

import React , { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Icon } from 'semantic-ui-react';
import { fetchBranches } from '../actions/branchActions'; // Adjust the import based on your project structure
import mockBranches from '../mockData/branches';
const BranchList = () => {
    const dispatch = useDispatch();
    const { branches, loading, error } = useSelector((state) => state.branches);

    // Fetch branches on component mount
    useEffect(() => {
        // dispatch(fetchBranches()); // Uncomment this line if you want to fetch from API
        // Mock API response for testing
        dispatch({
            type: 'FETCH_BRANCHES_SUCCESS',
            payload: mockBranches,
        });
    }, [dispatch]);

    // Handle loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Handle errors
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Card.Group>
            {branches.map((branch) => (
                <Card key={branch.id} fluid>
                    <Card.Content>
                        <Card.Header>{branch.name}</Card.Header>
                        <Card.Meta>{branch.phone}</Card.Meta>
                        <Card.Description>
                            {branch.street}, {branch.city}, {branch.state}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button primary>
                            <Icon name='phone' /> Call
                        </Button>
                        <Button secondary>
                            <Icon name='info circle' /> More Info
                        </Button>
                    </Card.Content>
                </Card>
            ))}
        </Card.Group>
    );
};

export default BranchList;
