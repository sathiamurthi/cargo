import React from 'react';
import { Message } from 'semantic-ui-react';

const Notification = ({ message, type }) => {
  if (!message) return null;

  return (
    <Message negative={type === 'error'} positive={type === 'success'}>
      {message}
    </Message>
  );
};

export default Notification;
