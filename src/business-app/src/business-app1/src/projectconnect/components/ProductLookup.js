import React from 'react';
import { Card, Icon, Button, Header } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import productMargins from '../mockData/productMargins';
import { selectProduct } from '../actions/productActions';
import mockProducts from '../mockData/products';

const ProductLookup = () => {
  const dispatch = useDispatch();
  const selectedProduct = useSelector(state => state.selectedProduct);

  const combinedProducts = mockProducts.map(product => {
    const margin = productMargins.find(m => m.product_id === product.id);
    return {
      ...product,
      ...margin
    };
  });

  const handleSelectProduct = (product) => {
    dispatch(selectProduct(product));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <Header as='h2'>Products in Branches</Header>
      {combinedProducts.map((product, index) => (
        <Card fluid key={index} onClick={() => handleSelectProduct(product)}>
          <Card.Content>
            <Card.Header>
              {product.storeInfo} <Icon name='info circle' floated='right' />
            </Card.Header>
            <Card.Meta>{product.sku} | {product.name}</Card.Meta>
            <Card.Description>
              <div><strong>Item:</strong> {product.id}</div>
              <div><strong>Available:</strong> {product.available}</div>
              <div><strong>Price:</strong> ${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}</div>
              <div><strong>STD Cost:</strong> ${typeof product.stdCost === 'number' ? product.stdCost.toFixed(4) : 'N/A'}</div>
              <div><strong>Modifier:</strong> MKT</div>
              <div><strong>Margin:</strong> {product.margin}%</div>
            </Card.Description>
          </Card.Content>
        </Card>
      ))}
      <Button.Group fluid>
        <Button disabled>Prev Item</Button>
        <Button positive>Next Item</Button>
      </Button.Group>
    </div>
  );
};

export default ProductLookup;
