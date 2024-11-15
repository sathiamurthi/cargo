import React, { useState } from 'react';
import { Container, Form, Header, Table, Segment, Button, Modal, Step } from 'semantic-ui-react';

const suppliers = [
  { key: '1', text: 'Imran Traders', value: '1010101029' },
];

const deliveryLocations = [
  { key: '1', text: 'SHE Homes Site 1', value: 'SHE Homes Site 1' },
];

const purchaseOrderDefault = {
  branchCode: '',
  purchaseOrderNo: '',
  supplierAccountNo: '',
  deliveryDate: '',
  purchaseDemandNo: '',
  orderDate: '',
  deliveryLocation: '',
  discountAmount: '',
  remarks: '',
};

const PurchaseOrderForm = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [purchaseOrder, setPurchaseOrder] = useState(purchaseOrderDefault);
  const [mockOrderDetails, setMockOrderDetails] = useState([]);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingModalOpen, setEditingModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    itemCode: '',
    description: '',
    color: '',
    itemNo: '',
    qty: '',
    unitRate: '',
    discount: '',
    agreedPrice: ''
  });
  
  const [editIndex, setEditIndex] = useState(null); // To keep track of the item being edited

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPurchaseOrder({ ...purchaseOrder, [name]: value });
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const addOrderDetail = () => {
    const agreedPrice = newItem.qty * newItem.unitRate; 
    const itemToAdd = { ...newItem, agreedPrice };
    
    setMockOrderDetails([...mockOrderDetails, itemToAdd]);
    setNewItem({ itemCode: '', description: '', color: '', itemNo: '', qty: '', unitRate: '', discount: '', agreedPrice: '' });
    setModalOpen(false); // Close modal after adding
  };

  const openEditModal = (index) => {
    setEditIndex(index);
    const itemToEdit = mockOrderDetails[index];
    setNewItem({ ...itemToEdit }); // Pre-fill the modal with the current item details
    setEditingModalOpen(true); // Open the editing modal
  };

  const updateOrderDetail = () => {
    const updatedDetails = mockOrderDetails.map((item, index) => 
      index === editIndex ? { ...newItem, agreedPrice: newItem.qty * newItem.unitRate } : item
    );
    setMockOrderDetails(updatedDetails);
    setEditingModalOpen(false); // Close the editing modal
    setNewItem({ itemCode: '', description: '', color: '', itemNo: '', qty: '', unitRate: '', discount: '', agreedPrice: '' }); // Reset new item
  };

  const deleteOrderDetail = (index) => {
    const updatedDetails = mockOrderDetails.filter((_, i) => i !== index);
    setMockOrderDetails(updatedDetails);
  };

  const renderStep1 = () => (
    <Segment raised>
      <Form>
        <Form.Group widths="equal">
          <Form.Input fluid label="Branch Code" name="branchCode" value={purchaseOrder.branchCode} onChange={handleInputChange} placeholder="ORBT01" />
          <Form.Input fluid label="Purchase Order No" name="purchaseOrderNo" value={purchaseOrder.purchaseOrderNo} onChange={handleInputChange} placeholder="89" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Select fluid label="Supplier A/C No" name="supplierAccountNo" options={suppliers} placeholder="Select Supplier" />
          <Form.Input fluid label="Agreed Delivery Date" name="deliveryDate" value={purchaseOrder.deliveryDate} onChange={handleInputChange} placeholder="14/01/2013" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input fluid label="Purchase Demand No" name="purchaseDemandNo" value={purchaseOrder.purchaseDemandNo} onChange={handleInputChange} placeholder="64" />
          <Form.Input fluid label="Order Date" name="orderDate" value={purchaseOrder.orderDate} onChange={handleInputChange} placeholder="02/01/2013" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Select fluid label="Delivery Location" name="deliveryLocation" options={deliveryLocations} placeholder="Select Location" />
          <Form.Input fluid label="Discount Amount" name="discountAmount" value={purchaseOrder.discountAmount} onChange={handleInputChange} placeholder="0.00" />
        </Form.Group>
        <Form.TextArea label="Remarks" name="remarks" value={purchaseOrder.remarks} onChange={handleInputChange} placeholder="Purchase Order for SHE Homes Site 1" />
      </Form>
    </Segment>
  );

  const renderStep2 = () => (
    <Segment>
      <Header as="h4">Order Detail</Header>
      <Button primary onClick={() => setModalOpen(true)}>Add Item</Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Sr. No</Table.HeaderCell>
            <Table.HeaderCell>Item Code</Table.HeaderCell>
            <Table.HeaderCell>Item Description</Table.HeaderCell>
            <Table.HeaderCell>Color</Table.HeaderCell>
            <Table.HeaderCell>Item No</Table.HeaderCell>
            <Table.HeaderCell>Order Qty</Table.HeaderCell>
            <Table.HeaderCell>Unit Rate</Table.HeaderCell>
            <Table.HeaderCell>Discount</Table.HeaderCell>
            <Table.HeaderCell>Agreed Price</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {mockOrderDetails.map((item, index) => (
            <Table.Row key={index}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{item.itemCode}</Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>{item.color}</Table.Cell>
              <Table.Cell>{item.itemNo}</Table.Cell>
              <Table.Cell>{item.qty}</Table.Cell>
              <Table.Cell>{item.unitRate}</Table.Cell>
              <Table.Cell>{item.discount}</Table.Cell>
              <Table.Cell>{item.agreedPrice}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => openEditModal(index)}>Edit</Button>
                <Button negative onClick={() => deleteOrderDetail(index)}>Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="8">Total</Table.HeaderCell>
            <Table.HeaderCell>
              {mockOrderDetails.reduce((total, item) => total + parseFloat(item.agreedPrice || 0), 0).toFixed(2)}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Segment>
  );

  const renderStep3 = () => (
    <Segment raised>
      <Header as="h4">Approval Section</Header>
      <Form>
        <Form.TextArea label="Approval Remarks" value={approvalRemarks} onChange={(e) => setApprovalRemarks(e.target.value)} placeholder="Enter remarks for approval" />
        <Button primary onClick={submitForApproval}>Submit for Approval</Button>
      </Form>
    </Segment>
  );

  const submitForApproval = () => {
    console.log('Submitting for approval with remarks:', approvalRemarks);
    setApprovalRemarks('');
    setActiveStep(activeStep + 1); // Move to next step if needed
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Header as="h3" textAlign="center" color="red">
        Purchase Order Finalization
      </Header>
      
      {/* Stepper Navigation */}
      <Step.Group ordered>
        <Step active={activeStep === 1}>
          <Step.Content>
            <Step.Title>Purchase Order Info</Step.Title>
          </Step.Content>
        </Step>
        <Step active={activeStep === 2}>
          <Step.Content>
            <Step.Title>Order Details</Step.Title>
          </Step.Content>
        </Step>
        <Step active={activeStep === 3}>
          <Step.Content>
            <Step.Title>Approval</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>

      {activeStep === 1 && renderStep1()}
      {activeStep === 2 && renderStep2()}
      {activeStep === 3 && renderStep3()}

      <Button
        disabled={activeStep === 1}
        onClick={() => setActiveStep(activeStep - 1)}
      >
        Back
      </Button>
      <Button
        disabled={activeStep === 3} // Disable Next on the last step
        onClick={() => setActiveStep(activeStep + 1)}
        primary
      >
        Next
      </Button>

      {/* Modal for adding order detail */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} size='small'>
        <Modal.Header>Add Order Detail</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Input name="itemCode" value={newItem.itemCode} onChange={handleNewItemChange} label="Item Code" placeholder="Enter Item Code" />
              <Form.Input name="description" value={newItem.description} onChange={handleNewItemChange} label="Description" placeholder="Enter Description" />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input name="color" value={newItem.color} onChange={handleNewItemChange} label="Color" placeholder="Enter Color" />
              <Form.Input name="itemNo" value={newItem.itemNo} onChange={handleNewItemChange} label="Item No" placeholder="Enter Item No" />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input type='number' name="qty" value={newItem.qty} onChange={handleNewItemChange} label="Order Qty" placeholder="Enter Order Quantity" />
              <Form.Input type='number' name="unitRate" value={newItem.unitRate} onChange={handleNewItemChange} label="Unit Rate" placeholder="Enter Unit Rate" />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input type='number' name="discount" value={newItem.discount} onChange={handleNewItemChange} label="Discount" placeholder="Enter Discount" />
              <Form.Input type='number' name="agreedPrice" value={newItem.agreedPrice} onChange={handleNewItemChange} label="Agreed Price" placeholder="Enter Agreed Price" />
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button positive onClick={addOrderDetail}>Add Item</Button>
        </Modal.Actions>
      </Modal>

      {/* Modal for editing order detail */}
      <Modal open={editingModalOpen} onClose={() => setEditingModalOpen(false)} size='small'>
        <Modal.Header>Edit Order Detail</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Input name="itemCode" value={newItem.itemCode} onChange={handleNewItemChange} label="Item Code" placeholder="Enter Item Code" />
              <Form.Input name="description" value={newItem.description} onChange={handleNewItemChange} label="Description" placeholder="Enter Description" />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input name="color" value={newItem.color} onChange={handleNewItemChange} label="Color" placeholder="Enter Color" />
              <Form.Input name="itemNo" value={newItem.itemNo} onChange={handleNewItemChange} label="Item No" placeholder="Enter Item No" />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input type='number' name="qty" value={newItem.qty} onChange={handleNewItemChange} label="Order Qty" placeholder="Enter Order Quantity" />
              <Form.Input type='number' name="unitRate" value={newItem.unitRate} onChange={handleNewItemChange} label="Unit Rate" placeholder="Enter Unit Rate" />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input type='number' name="discount" value={newItem.discount} onChange={handleNewItemChange} label="Discount" placeholder="Enter Discount" />
              <Form.Input type='number' name="agreedPrice" value={newItem.agreedPrice} onChange={handleNewItemChange} label="Agreed Price" placeholder="Enter Agreed Price" />
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setEditingModalOpen(false)}>Cancel</Button>
          <Button positive onClick={updateOrderDetail}>Update Item</Button>
        </Modal.Actions>
      </Modal>
    </Container>
  );
};

export default PurchaseOrderForm;
