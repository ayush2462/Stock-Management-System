import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ProductModal = ({ product, onSave, onClose }) => {
  const [form, setForm] = useState({
    ProductId: '', Name: '', Category: '', BuyingPrice: '', SellingPrice: '', Total: '', Sold: ''
  });

  useEffect(() => {
    if (product) {
      const { Available, ...rest } = product;
      setForm(rest);
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.ProductId || !form.Name) return alert('Please fill required fields');
    onSave(product ? { ...product, ...form } : form);
  };

  return (
    <Modal show onHide={onClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>{product ? 'Edit Product' : 'Add Product'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {Object.entries(form).map(([key, val]) => (
            <Form.Group key={key} className='mb-2'>
              <Form.Label>{key}</Form.Label>
              <Form.Control name={key} value={val} onChange={handleChange} />
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onClose}>Cancel</Button>
        <Button variant='primary' onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;