// src/components/DashboardSample.js

import React from 'react';
import { Card, Grid, Header } from 'semantic-ui-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const DashboardSample = () => {
    const mockData = {
        openPositions: 14,
        newRoles: 53,
        placementRate: '34%',
        totalCommission: '160,000$',
        avgCommissionRate: '2,463$',
        recruitmentFunnel: [
            { name: 'CVs Submitted', value: 650 },
            { name: 'Candidate Interviews', value: 259 },
            { name: 'Client Interviews', value: 87 },
            { name: 'Offers', value: 66 },
            { name: 'Candidates Placed', value: 9 },
        ],
    };

    const cardStyles = {
        textAlign: 'center',
        padding: '20px',
    };

    return (
        <div className="dashboard">
            <Header as='h1'>KPI Recruitment Dashboard for HR Recruitment</Header>
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column computer={4} tablet={8} mobile={16}>
                        <Card style={cardStyles}>
                            <Card.Content>
                                <Card.Header>Open Positions</Card.Header>
                                <Card.Description>{mockData.openPositions}</Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column computer={4} tablet={8} mobile={16}>
                        <Card style={cardStyles}>
                            <Card.Content>
                                <Card.Header>New Roles</Card.Header>
                                <Card.Description>{mockData.newRoles}</Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column computer={4} tablet={8} mobile={16}>
                        <Card style={cardStyles}>
                            <Card.Content>
                                <Card.Header>Placement Rate</Card.Header>
                                <Card.Description>{mockData.placementRate}</Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column computer={4} tablet={8} mobile={16}>
                        <Card style={cardStyles}>
                            <Card.Content>
                                <Card.Header>Total Commission</Card.Header>
                                <Card.Description>{mockData.totalCommission}</Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column computer={4} tablet={8} mobile={16}>
                        <Card style={cardStyles}>
                            <Card.Content>
                                <Card.Header>Avg. Commission Rate</Card.Header>
                                <Card.Description>{mockData.avgCommissionRate}</Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Header as='h2'>Recruitment Funnel</Header>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockData.recruitmentFunnel}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#00b5ad" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DashboardSample;
