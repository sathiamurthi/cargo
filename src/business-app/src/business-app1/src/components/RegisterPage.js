import React from 'react';
import { Form, Button, Grid } from 'semantic-ui-react';
import './RegisterPage.css'; // Custom styles

const RegisterPage = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
    };

    return (
        <div className="register-page">
            <h2>Your Information</h2>
            <Form onSubmit={handleSubmit}>
                <Grid columns={2} stackable>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Input
                                label="Username"
                                placeholder="Enter your username"
                                required
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Input
                                label="First Name"
                                placeholder="Enter your first name"
                                required
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Input
                                label="Last Name"
                                placeholder="Enter your last name"
                                required
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Input
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                                required
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Input
                                label="Phone Number"
                                placeholder="Enter your phone number"
                                required
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                required
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Input
                                label="Confirm Password"
                                type="password"
                                placeholder="Re-enter your password"
                                required
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Select
                                label="Timezone"
                                options={[
                                    { key: 'gmt', text: 'GMT', value: 'gmt' },
                                    { key: 'est', text: 'EST', value: 'est' },
                                    // Add more options as needed
                                ]}
                                placeholder="Select a timezone"
                                required
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Button color="teal" fluid type="submit">
                                Continue
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        </div>
    );
};

export default RegisterPage;
