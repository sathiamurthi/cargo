import React, { useState, useEffect } from 'react';
import { Card, Checkbox, Input, Button, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import mockProducts from '../mockData/products'; // Ensure this is a list of products
import { useSelector, useDispatch } from 'react-redux';
import { deselectAllProducts, selectAllProducts, selectProduct } from '../actions/productActions'
const InventoryLookup = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const selectedProductIds = useSelector(state => state.selectedProductIds || []); // Ensure it defaults to an empty array
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'SELECT_ALL_PRODUCTS',
      payload: mockProducts,
    });
  }, [dispatch]);

  // Filter mockProducts based on the searchTerm
  const filteredProducts = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = () => {
    if (filteredProducts.length === 0) return;

    if (selectedProductIds.length >= filteredProducts.length) {
      dispatch(deselectAllProducts());
    } else {
      dispatch(selectAllProducts(filteredProducts)); // Pass product IDs
    }
  };

  const handleSelectProduct = (id) => {
    dispatch(selectProduct(id));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <Input
        icon={<Icon name='search' circular link />}
        placeholder='Product Name or SKU'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        fluid
      />
      <Button onClick={handleSelectAll} style={{ margin: '1rem 0' }}>
        {selectedProductIds.length >= filteredProducts.length ? 'Deselect All' : 'Select All'}
      </Button>
      <Card.Group>
        {filteredProducts.map(product => (
          <Card fluid key={product.id}>
            <Card.Content>
              <Card.Header>
                {product.name}
                <Checkbox 
                  checked={selectedProductIds.includes(product.id)} // Correctly check if selected
                  onChange={() => handleSelectProduct(product.id)} 
                  style={{ float: 'right' }}
                />
              </Card.Header>
              <Card.Meta>${product.price}</Card.Meta>
              <Card.Description>{product.description}</Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
      <Button color='yellow' fluid style={{ marginTop: '1rem' }}>
        View in Branches
      </Button>
    </div>
  );
};

export default InventoryLookup;
