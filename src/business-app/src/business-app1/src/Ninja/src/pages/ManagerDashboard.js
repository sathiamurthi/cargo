// src/components/ManagerDashboard.js
import React, { useState } from 'react';
import { Button, Container, Header, Card, Grid } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const initialProjectData = [
    // Mock data including the last month
    { project: 'Project A',projectid: '3', user: 'INN013', status: 'Pending', weekend: '2024-08-31',hours:{"Friday": null, "Monday": null, "Sunday": null, "Tuesday": null, "Saturday": null, "Thursday": null, "Wednesday": null}},
    { project: 'Project A',projectid: '3', user: 'INN013', status: 'Pending', weekend: '2024-08-31',hours:{"Friday": null, "Monday": null, "Sunday": null, "Tuesday": null, "Saturday": null, "Thursday": null, "Wednesday": null}},

];

const ManagerDashboard = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [projects] = useState(initialProjectData);

    // Function to calculate monthly metrics
    const calculateMonthlyMetrics = () => {
        const startOfMonth = moment(selectedMonth).startOf('month');
        const endOfMonth = moment(selectedMonth).endOf('month');

        const submittedCount = projects.filter(p => moment(p.weekend, 'MM/DD/YYYY').isBetween(startOfMonth, endOfMonth, null, '[]') && p.status === 'Submitted').length;
        const pendingCount = projects.filter(p => moment(p.weekend, 'MM/DD/YYYY').isBetween(startOfMonth, endOfMonth, null, '[]') && p.status === 'Pending').length;
        const approvedCount = projects.filter(p => moment(p.weekend, 'MM/DD/YYYY').isBetween(startOfMonth, endOfMonth, null, '[]') && p.status === 'Approved').length;
        const rejectedCount = projects.filter(p => moment(p.weekend, 'MM/DD/YYYY').isBetween(startOfMonth, endOfMonth, null, '[]') && p.status === 'Rejected').length;

        return {
            submittedCount,
            pendingCount,
            approvedCount,
            rejectedCount,
            totalProjects: submittedCount + pendingCount + approvedCount + rejectedCount, // Total of all statuses
        };
    };

    const metrics = calculateMonthlyMetrics();

    const handleMonthChange = (date) => {
        setSelectedMonth(date);
    };

    return (
        <Container>
            <Header as="h2" textAlign="center">Manager Dashboard</Header>
            <DatePicker
                selected={selectedMonth}
                onChange={handleMonthChange}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                style={{ marginBottom: '20px' }}
            />
            <Grid>
                <Grid.Row columns={4}>
                    <Grid.Column>
                        <Card>
                            <Card.Content>
                                <Card.Header>Submitted Projects</Card.Header>
                                <Card.Description>{metrics.submittedCount}</Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card>
                            <Card.Content>
                                <Card.Header>Pending Projects</Card.Header>
                                <Card.Description>{metrics.pendingCount}</Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card>
                            <Card.Content>
                                <Card.Header>Approved Projects</Card.Header>
                                <Card.Description>{metrics.approvedCount}</Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card>
                            <Card.Content>
                                <Card.Header>Rejected Projects</Card.Header>
                                <Card.Description>{metrics.rejectedCount}</Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Card>
                            <Card.Content>
                                <Card.Header>Total Projects Handled</Card.Header>
                                <Card.Description>{metrics.totalProjects}</Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default ManagerDashboard;
