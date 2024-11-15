import React, { useState } from 'react';
import { Button, Header, Modal, Menu, Container } from 'semantic-ui-react';
import Login from './Login';
import Register from './Register'; // Import the Register component
import ProtectedLogin from './ProtectedLogin';

const LandingPage = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);

  return (
    <Container>
      <Menu>
        <Menu.Item header>Sample</Menu.Item>
        <Menu.Item name="services" />
        <Menu.Item name="drivers" />
        <Menu.Item name="pricing" />
        <Menu.Item name="contactUs" />
        <Menu.Item position="right">
          <Button primary onClick={handleOpenLogin}>Sign In</Button>
          <Button secondary onClick={handleOpenRegister}>Register</Button>
        </Menu.Item>
      </Menu>
      
      <Header as='h1' style={{ marginTop: '2rem' }}>
        Meet the Industry's Most Competitive Ground Shipping Service.
      </Header>

      {/* Modal for Login */}
      <Modal open={openLogin} onClose={handleCloseLogin} closeIcon>
        <Modal.Header>Login</Modal.Header>
        <Modal.Content>
          <ProtectedLogin />
        </Modal.Content>
      </Modal>

      {/* Modal for Registration */}
      <Modal open={openRegister} onClose={handleCloseRegister} closeIcon>
        <Modal.Header>Register</Modal.Header>
        <Modal.Content>
          <Register />
        </Modal.Content>
      </Modal>
    </Container>
  );
};

export default LandingPage;
