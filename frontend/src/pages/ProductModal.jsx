import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const fields = [
  { name: 'ProductId', label: 'Product ID', required: true },
  { name: 'Name', label: 'Name', required: true },
  { name: 'Category', label: 'Category' },
  { name: 'BuyingPrice', label: 'Buying Price' },
  { name: 'SellingPrice', label: 'Selling Price' },
  { name: 'Total', label: 'Total' },
  { name: 'Sold', label: 'Sold' }
];

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
    if (!form.ProductId || !form.Name) {
      alert('Please fill required fields');
      return;
    }
    onSave(product ? { ...product, ...form } : form);
  };

  return (
    <Modal show onHide={onClose} backdrop="static" centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>{product ? 'Edit Product' : 'Add Product'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            {fields.map(({ name, label, required }) => (
              <Col xs={12} md={6} key={name} className="mb-3">
                <Form.Group>
                  <Form.Label>
                    {label}
                    {required && <span style={{ color: 'red' }}> *</span>}
                  </Form.Label>
                  <Form.Control
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    required={required}
                    autoComplete="off"
                  />
                </Form.Group>
              </Col>
            ))}
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;