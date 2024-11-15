// src/components/CandidateDashboard.js

import React from 'react';
import { Card, Grid, Header, Menu } from 'semantic-ui-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const CandidateDashboard = () => {
    // Mock data
    const mockData = {
        coursesAttended: 10,
        mockInterviewsTaken: 5,
        mentorsAvailable: 3,
        availableReferrers: 4,
        referralsConsumed: 7,
        referralGraphData: [
            { name: 'Mock Interviews', value: 5 },
            { name: 'Courses Attended', value: 10 },
            { name: 'Referrals Consumed', value: 7 },
        ],
    };

    const cardStyles = {
        textAlign: 'center',
        padding: '20px',
    };

    return (
        <div className="candidate-dashboard">
            {/* Top Menu */}
            <Menu>
                <Menu.Item header>Candidate Dashboard</Menu.Item>
                <Menu.Item name="profile-setup">Profile Setup</Menu.Item>
                <Menu.Item name="upload-resume">Upload Resume</Menu.Item>
                <Menu.Item name="view-mock-interviewer">View Mock Interviewer Details</Menu.Item>
                <Menu.Item name="referrals-details">Referrals Details</Menu.Item>
                <Menu.Item name="course-details">Course Details</Menu.Item>
                <Menu.Item name="request-mock-interview">Request for Mock Interview</Menu.Item>
                <Menu.Item name="refer-me">Refer Me</Menu.Item>
                <Menu.Item name="intern-opportunity">Intern Opportunity</Menu.Item>
            </Menu>

            {/* Dashboard Content */}
            <div style={{ marginTop: '20px' }}> {/* Space below the menu */}
                <Header as='h1'>Candidate Dashboard</Header>
                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column computer={4} tablet={8} mobile={16}>
                            <Card style={cardStyles}>
                                <Card.Content>
                                    <Card.Header>Courses Attended</Card.Header>
                                    <Card.Description>{mockData.coursesAttended}</Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={8} mobile={16}>
                            <Card style={cardStyles}>
                                <Card.Content>
                                    <Card.Header>Mock Interviews Taken</Card.Header>
                                    <Card.Description>{mockData.mockInterviewsTaken}</Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={8} mobile={16}>
                            <Card style={cardStyles}>
                                <Card.Content>
                                    <Card.Header>Mentors Available</Card.Header>
                                    <Card.Description>{mockData.mentorsAvailable}</Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={8} mobile={16}>
                            <Card style={cardStyles}>
                                <Card.Content>
                                    <Card.Header>Available Referrers</Card.Header>
                                    <Card.Description>{mockData.availableReferrers}</Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={8} mobile={16}>
                            <Card style={cardStyles}>
                                <Card.Content>
                                    <Card.Header>Referrals Consumed</Card.Header>
                                    <Card.Description>{mockData.referralsConsumed}</Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Header as='h2'>Referral Data Overview</Header>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockData.referralGraphData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#00b5ad" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CandidateDashboard;
