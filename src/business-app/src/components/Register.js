import React, { useState } from 'react';
import { Form, Button, Grid } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/user/userSlice'; // Adjust importing based on actual path
import { mockApi } from '../services/mockApi'; // Adjust importing based on actual path
import Notification from './Notification';

const Register = () => {
  const [formData, setFormData] = useState({
    userType: '',  // This will store the selected user type
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    timezone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setSuccess('');
      return;
    }

    mockApi.register(formData)
      .then(userData => {
        dispatch(addUser(userData));
        setSuccess('Registration successful!');
        setError('');
      })
      .catch(err => {
        setError(err);
        setSuccess('');
      });
  };

  return (
    <Form>
      <Notification message={error} type="error" />
      <Notification message={success} type="success" />

      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Form.Field required>
              <label>User Type</label>
              <Form.Group inline>
                {['sender', 'driver', 'agent'].map(type => (
                  <Form.Radio
                    key={type}
                    label={type.charAt(0).toUpperCase() + type.slice(1)}
                    value={type}
                    checked={formData.userType === type} // Ensure radio is selected if state matches
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        userType: type // Update user type only
                      });
                    }}
                    name="userType"
                  />
                ))}
              </Form.Group>
            </Form.Field>
          </Grid.Column>
        </Grid.Row>

        {/* Other fields remain unchanged */}
        <Grid.Row>
          <Grid.Column width={8}>
            <Form.Field required>
              <label>First Name</label>
              <input name="firstName" value={formData.firstName} onChange={handleChange} />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={8}>
            <Form.Field required>
              <label>Last Name</label>
              <input name="lastName" value={formData.lastName} onChange={handleChange} />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <Form.Field required>
              <label>Username</label>
              <input name="username" value={formData.username} onChange={handleChange} />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={8}>
            <Form.Field required>
              <label>Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <Form.Field required>
              <label>Phone Number</label>
              <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={8}>
            <Form.Field required>
              <label>Timezone</label>
              <select name="timezone" value={formData.timezone} onChange={handleChange}>
                <option value="">-- Select a Timezone --</option>
                <option value="PST">PST</option>
                <option value="EST">EST</option>
                <option value="CST">CST</option>
                <option value="MST">MST</option>
              </select>
            </Form.Field>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <Form.Field required>
              <label>Password</label>
              <input name="password" type="password" value={formData.password} onChange={handleChange} />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={8}>
            <Form.Field required>
              <label>Confirm Password</label>
              <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Button type="button" primary onClick={handleRegister}>Continue</Button>
    </Form>
  );
};

export default Register;

