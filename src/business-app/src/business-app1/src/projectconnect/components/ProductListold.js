import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';

const ProductListold = ({ products }) => {
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
  
    const handleMoreInfoClick = (product) => {
      setSelectedProduct(product);
      setOpen(true);
    };
  
    const closeModal = () => {
      setOpen(false);
      setSelectedProduct(null);
    };
  
    return (
      <div>
        <Card.Group>
          {products.map((product) => (
            <Card key={product.id}>
              <Card.Content>
                <Card.Header>{product.name}</Card.Header>
                <Card.Description>{product.description}</Card.Description>
                <Button 
                  onClick={() => handleMoreInfoClick(product)} 
                  icon
                  labelPosition='right'
                >
                  More Info
                  <Icon name='info circle' />
                </Button>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
  
        {/* Modal for showing product details */}
        <Modal open={open} onClose={closeModal}>
          <Modal.Header>{selectedProduct?.name}</Modal.Header>
          <Modal.Content>
            <p>{selectedProduct?.description}</p>
            <p><strong>Price:</strong> ${selectedProduct?.price}</p>
            {/* You can add more detailed attributes of the product here */}
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={closeModal} negative>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  };

const mapStateToProps = (state) => ({ products: state.products.products });

export default connect(mapStateToProps)(ProductList);