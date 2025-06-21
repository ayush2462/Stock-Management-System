import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductModal from './ProductModal';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [modal, setModal] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const fetchProducts = () => {
        axios.get('/api/products').then(res => setProducts(res.data));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = (product) => {
        if (window.confirm(`Are you sure you want to delete ${product.Name}?`)) {
            axios.delete(`/api/products/${product._id}`).then(() => {
                fetchProducts();
            });
        }
    };

    const openModal = (product = null) => {
        setIsEditing(!!product);
        setModal(product);
        setShowModal(true);
    };

    const handleSave = (data) => {
        const available = parseInt(data.Total) - parseInt(data.Sold);
        const payload = { ...data, available };
        if (isEditing) {
            axios.put(`/api/products/${data._id}`, payload).then(() => fetchProducts());
        } else {
            axios.post('/api/products', payload).then(() => fetchProducts());
        }
        setShowModal(false);
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Product Dashboard</h2>
                <button className="add-btn" onClick={() => openModal()}>+ Add Product</button>
            </div>
            <div className="table-responsive">
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th rowSpan="2">Sr No.</th>
                            <th rowSpan="2">Product ID</th>
                            <th rowSpan="2">Name</th>
                            <th rowSpan="2">Category</th>
                            <th colSpan="2">Price</th>
                            <th colSpan="3">Quantity</th>
                            <th rowSpan="2">Actions</th>
                        </tr>
                        <tr>
                            <th>Buying</th>
                            <th>Selling</th>
                            <th>Total</th>
                            <th>Sold</th>
                            <th>Available</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p, i) => (
                            <tr key={p._id}>
                                <td>{i + 1}</td>
                                <td>{p.ProductId}</td>
                                <td>{p.Name}</td>
                                <td>{p.Category}</td>
                                <td>{p.BuyingPrice}</td>
                                <td>{p.SellingPrice}</td>
                                <td>{p.Total}</td>
                                <td>{p.Sold}</td>
                                <td>{p.Available}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => openModal(p)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(p)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan="10" style={{ textAlign: 'center', padding: '2rem' }}>No products found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <ProductModal
                    product={modal}
                    onSave={handleSave}
                    onClose={() => setShowModal(false)}
                />
            )}
            <style>{`
                .dashboard-container {
                    max-width: 1000px;
                    margin: 2rem auto;
                    padding: 1rem;
                    background: #fff;
                    border-radius: 12px;
                    box-shadow: 0 2px 16px rgba(0,0,0,0.07);
                }
                .dashboard-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                    flex-wrap: wrap;
                }
                .dashboard-header h2 {
                    margin: 0;
                    font-size: 2rem;
                    color: #333;
                }
                .add-btn {
                    background: #28a745;
                    color: #fff;
                    border: none;
                    padding: 0.6rem 1.2rem;
                    border-radius: 6px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .add-btn:hover {
                    background: #218838;
                }
                .table-responsive {
                    overflow-x: auto;
                }
                .dashboard-table {
                    width: 100%;
                    border-collapse: collapse;
                    min-width: 800px;
                }
                .dashboard-table th, .dashboard-table td {
                    padding: 0.75rem 0.5rem;
                    border: 1px solid #e0e0e0;
                    text-align: center;
                }
                .dashboard-table th {
                    background: #f8f9fa;
                    font-weight: 600;
                }
                .edit-btn, .delete-btn {
                    padding: 0.3rem 0.8rem;
                    border: none;
                    border-radius: 4px;
                    font-size: 0.95rem;
                    margin-right: 0.5rem;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .edit-btn {
                    background: #ffc107;
                    color: #212529;
                }
                .edit-btn:hover {
                    background: #e0a800;
                }
                .delete-btn {
                    background: #dc3545;
                    color: #fff;
                    margin-right: 0;
                }
                .delete-btn:hover {
                    background: #b52a37;
                }
                @media (max-width: 900px) {
                    .dashboard-container {
                        padding: 0.5rem;
                    }
                    .dashboard-header h2 {
                        font-size: 1.3rem;
                    }
                    .dashboard-table th, .dashboard-table td {
                        padding: 0.5rem 0.2rem;
                        font-size: 0.95rem;
                    }
                }
                @media (max-width: 600px) {
                    .dashboard-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.5rem;
                    }
                    .dashboard-table {
                        min-width: 600px;
                        font-size: 0.9rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;