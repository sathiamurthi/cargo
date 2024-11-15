// ../components/ProductForm.js

import React, { useState, useEffect } from 'react';
import { Form, Button, Icon, Message } from 'semantic-ui-react';

const ProductForm = ({ product, onSubmit, onClose, isView }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: ''
    });

    const [errors, setErrors] = useState({}); // State for form validation errors

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price
            });
        } else {
            setFormData({ name: '', description: '', price: '' }); // Clear the form when adding a new product
        }
    }, [product]);

    const handleChange = (e, { name, value }) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        // Clear error for the current field
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.description) newErrors.description = "Description is required.";
        if (!formData.price) newErrors.price = "Price is required.";
        if (isNaN(formData.price) || formData.price <= 0) newErrors.price = "Price must be a positive number.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isView && validate()) {
            onSubmit(formData);
            onClose(); // Close the form after submission
        }
    };

    return (
        <Form onSubmit={handleSubmit} error={!!Object.keys(errors).length}>
            <h2 className='ui center aligned header'>{isView ? 'View Product' : 'Create Product'}</h2>
            
            <Form.Input
                fluid
                icon='box'
                iconPosition='left'
                placeholder='Product Name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                error={errors.name ? { content: errors.name } : null}
                disabled={isView} // Disable if in view mode
            />
            
            <Form.Input
                fluid
                icon='info'
                iconPosition='left'
                placeholder='Description'
                name='description'
                value={formData.description}
                onChange={handleChange}
                error={errors.description ? { content: errors.description } : null}
                disabled={isView} // Disable if in view mode
            />
            
            <Form.Input
                fluid
                icon='dollar sign'
                iconPosition='left'
                placeholder='Price'
                name='price'
                type='number'
                value={formData.price}
                onChange={handleChange}
                error={errors.price ? { content: errors.price } : null}
                disabled={isView} // Disable if in view mode
            />

            {/* Button Group for Add/Cancel or Close */}
            <Form.Group style={{ justifyContent: 'flex-end' }}>
                {!isView && (
                    <Button type='submit' primary>
                        {product ? 'Update Product' : 'Add Product'}
                    </Button>
                )}
                <Button type='button' onClick={onClose}>
                    {isView ? 'Close' : 'Cancel'}
                </Button>
            </Form.Group>

            {/* Show error messages */}
            {!!Object.keys(errors).length && (
                <Message
                    error
                    header='There was an error with your submission'
                    list={Object.values(errors)}
                />
            )}
        </Form>
    );
};

export default ProductForm;
