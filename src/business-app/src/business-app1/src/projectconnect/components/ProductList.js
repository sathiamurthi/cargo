// ../components/ProductList.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAsync, removeProductAsync, addProductAsync, updateProductAsync } from '../actions/productActions';
import { Table, Button, Icon, Label, Modal } from 'semantic-ui-react';
import ProductForm from './ProductForm'; // Import the ProductForm component

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
  
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [activeProduct, setActiveProduct] = useState(null);
    const [isViewMode, setIsViewMode] = useState(false); // State to determine view mode

    useEffect(() => {
        dispatch(fetchProductsAsync());
    }, [dispatch]);

    const handleRemoveProduct = (id) => {
        dispatch(removeProductAsync(id));
    };

    const handleSelectProduct = (product) => {
        setActiveProduct(product);
        setIsViewMode(true); // Set to view mode
        setIsFormOpen(true); // Open the ProductForm
    };

    const openAddForm = () => {
        setActiveProduct(null); // Clear product for adding a new one
        setIsViewMode(false); // Set to add mode
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setActiveProduct(null); // Clear the active product on close
        setIsViewMode(false); // Reset view mode
    };

    return (
        <div>
            <Button primary onClick={openAddForm} style={{ marginBottom: '1em' }}>
                Add Product
            </Button>
            
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {products.map((product) => (
                        <Table.Row key={product.id}>
                            <Table.Cell>
                                <Label>{product.id}</Label>
                            </Table.Cell>
                            <Table.Cell>{product.name}</Table.Cell>
                            <Table.Cell>{product.description}</Table.Cell>
                            <Table.Cell>${typeof product.price === 'number' ? product.price.toFixed(2) : 'Invalid Price'}</Table.Cell>
                            <Table.Cell>
                                <Button icon onClick={() => handleSelectProduct(product)}>
                                    <Icon name='eye' title='View' />
                                </Button>
                                <Button icon onClick={() => {
                                    setActiveProduct(product);
                                    setIsViewMode(false); // Set to edit mode
                                    setIsFormOpen(true);
                                }}>
                                    <Icon name='edit' title='Edit' />
                                </Button>
                                <Button icon color='red' onClick={() => handleRemoveProduct(product.id)}>
                                    <Icon name='trash' title='Delete' />
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            {/* Modal for Product Form */}
            <Modal open={isFormOpen} onClose={closeForm}>
                <Modal.Header>{isViewMode ? 'View Product' : (activeProduct ? 'Edit Product' : 'Add Product')}</Modal.Header>
                <Modal.Content>
                    <ProductForm
                        product={activeProduct}
                        onClose={closeForm}
                        isView={isViewMode} // Pass isView prop to the form
                        onSubmit={(productData) => {
                            if (activeProduct) {
                                dispatch(updateProductAsync({ ...productData, id: activeProduct.id })); // Update existing product
                            } else {
                                dispatch(addProductAsync(productData)); // Add new product
                            }
                            closeForm();
                        }}
                    />
                </Modal.Content>
            </Modal>
        </div>
    );
};

export default ProductList;
