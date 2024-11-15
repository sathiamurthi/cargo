import React, { useState, useEffect } from 'react';
import { Card, Tab, Form, Button, Input, Dropdown, Checkbox } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { setQuoteData } from '../actions/quoteActions';
import { fetchQuoteData } from '../api/mockApi';

const CreateQuote = () => {
  const dispatch = useDispatch();
  const quoteData = useSelector(state => state.quoteData) || { header: {}, items: [] };
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchQuoteData();
      console.log('squote' ,data); // Add this line after fetching data

      dispatch(setQuoteData(data));
      console.log('squote' ,quoteData); // Add this line after fetching data
    };
    loadData();
  }, [dispatch]);

  const handleCheckboxChange = (itemId) => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(itemId)
        ? prevSelected.filter(id => id !== itemId)
        : [...prevSelected, itemId]
    );
  };
  const handleInputChange = (e, field) => {
    setQuoteData(prevState => ({
      ...prevState,
      header: {
        ...prevState.header,
        [field]: e.target.value
      }
    }));
  };
  const panes = [
    {
        menuItem: 'Header',
        render: () => (
          <Tab.Pane>
            <Form>
              <Form.Field
                label='Quote Name'
                control={Input}
                placeholder='Quote Name'
                value={quoteData.header?.quoteName || ''} // Use optional chaining with a fallback                onChange={(e) => handleInputChange(e, 'quoteName')} // Handle change
              />
              <Form.Field
                label='Bill Contact'
                control={Input}
                placeholder='Bill Contact'
                value={quoteData.header?.billContact || ''} // Bind value to state
                onChange={(e) => handleInputChange(e, 'billContact')} // Handle change
              />
              <Form.Field
                label='Ship Contact'
                control={Input}
                placeholder='Ship Contact'
                value={quoteData.header?.shipContact || ''} // Bind value to state
                onChange={(e) => handleInputChange(e, 'shipContact')} // Handle change
              />
              <Form.Field
                label='Shipping Method'
                control={Input}
                placeholder='Shipping Method'
                value={quoteData.header?.shippingMethod||''} // Bind value to state
                onChange={(e) => handleInputChange(e, 'shippingMethod')} // Handle change
              />
              <Form.Field
                label='Customer PO'
                control={Input}
                placeholder='Customer PO'
                value={quoteData.header?.customerPO || ''} // Bind value to state
                onChange={(e) => handleInputChange(e, 'customerPO')} // Handle change
              />
              <Form.Field
                label='Expiration Date'
                control={Input}
                type='date' // Use date input for the expiration date
                value={quoteData.header?.expirationDate || ''} // Bind value to state
                onChange={(e) => handleInputChange(e, 'expirationDate')} // Handle change
              />
            </Form>
          </Tab.Pane>
        )
      },
    {
        menuItem: `Items (${selectedItems.length})`,
        render: () => (
          <Tab.Pane>
            {quoteData && quoteData.items ? (
              quoteData.items.length > 0 ? (
                quoteData.items.map(item => (
                  <div key={item.id}>
                    <Checkbox
                      label={`${item.name} - ${item.description}`}
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </div>
                ))
              ) : (
                <div>No items available</div>
              )
            ) : (
              <div>Loading items...</div>
            )}
          </Tab.Pane>
        )
      }
  ];

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>Create a Quote</Card.Header>
        <Tab panes={panes} />
        <Button primary>Submit</Button>
      </Card.Content>
    </Card>
  );
};

export default CreateQuote;
