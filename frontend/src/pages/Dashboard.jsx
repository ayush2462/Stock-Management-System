import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ProductModal from './ProductModal'

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [modal, setModal] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const fetchProducts = () => {
        axios.get('/api/products').then(res => setProducts(res.data))
    }

    useEffect(() => {
        fetchProducts()
    }, []);

    const handleDelete = (product) => {
        if (window.confirm(`Are you sure you want to delete ${product.Name}?`)) {
            axios.delete(`/api/products/${product._id}`).then(() => {
                fetchProducts();
            });
        }
    }

    const openModal = (product = null) => {
        setIsEditing(!!product);
        setModal(product);
        setShowModal(true);
    }

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
        <>
            <button className="btn btn-success mb-3" onClick={() => openModal()}>Add Product</button>
            <table className="table table-bordered text-center">
                <thead className="align-middle">
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
                                <button className='btn btn-warning btn-sm me-2' onClick={() => openModal(p)}>Edit</button>
                                <button className='btn btn-danger btn-sm' onClick={() => handleDelete(p)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && <ProductModal product={modal} onSave={handleSave} onClose={() => setShowModal(false)} />}
        </>
    )
}

export default Dashboard;
