import React from 'react';
import { Modal, Button, Form, Checkbox, Divider } from 'semantic-ui-react';

const FilterComponent = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} size='small'>
      <Modal.Header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Filter Customer Orders</span>
          <Button icon='close' onClick={onClose} />
        </div>
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Filter Orders by</label>
            </Form.Field>
          </Form.Group>

          <Form.Group inline>
            <Form.Field>
              <Button.Group>
                <Button>Historical Data</Button>
                <Button>Date Range</Button>
              </Button.Group>
            </Form.Field>
          </Form.Group>

          <Form.Field>
            <label>Time Period</label>
            <select>
              <option value='30'>30 days</option>
              <option value='60'>60 days</option>
              <option value='90'>90 days</option>
            </select>
          </Form.Field>

          <Divider />

          <Form.Field>
            <label>Status</label>
          </Form.Field>
          <Form.Group grouped>
            <Form.Field>
              <Checkbox label='In Progress' />
            </Form.Field>
            <Form.Field>
              <Checkbox label='Shipped' />
            </Form.Field>
            <Form.Field>
              <Checkbox label='Out for Delivery / Ready for Pickup' />
            </Form.Field>
            <Form.Field>
              <Checkbox label='Delivered / Picked Up' />
            </Form.Field>
          </Form.Group>

          <Divider />

          <Form.Field>
            <label>Fulfillment Method</label>
          </Form.Field>
          <Form.Group grouped>
            <Form.Field>
              <Checkbox label='White Cap Truck' />
            </Form.Field>
            <Form.Field>
              <Checkbox label='Will Call' />
            </Form.Field>
            <Form.Field>
              <Checkbox label='Third Party Carrier' />
            </Form.Field>
            <Form.Field>
              <Checkbox label='Walk In' />
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Cancel</Button>
        <Button primary>Apply</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default FilterComponent;
