import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { deleteProduct, fetchProducts } from '../../../services/productService';

export default function ProductList() {
    const queryClient = useQueryClient();

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data: productsData, error, isLoading } = useQuery({
        queryKey: ['products', { page: currentPage, limit: itemsPerPage }],
        queryFn: fetchProducts,
        keepPreviousData: true,
    });

    const mutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        },
    });

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this product?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => mutation.mutate(id),
                },
                {
                    label: 'No',
                },
            ],
        });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    const products = productsData?.products || [];
    const totalPages = productsData?.totalPages || 0;

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Products</h2>

            <div className="row mb-3">
                <div className="col">
                    <Link to="/admin/products/create" className="btn btn-primary me-1" role="button">Create Product</Link>
                    <button type="button" onClick={() => queryClient.invalidateQueries(['products'])} className="btn btn-outline-primary">Refresh</button>
                </div>
            </div>

            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Created</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product, index) => (
                    <tr key={index}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.brand}</td>
                        <td>{product.category}</td>
                        <td>{product.price}$</td>
                        <td>
                            <img src={`http://localhost:9999/images/${product.imageFileName}`} alt="..." width="100" />
                        </td>
                        <td>{product.createdAt.slice(0, 10)}</td>
                        <td style={{ width: "10px", whiteSpace: "noWrap" }}>
                            <Link className="btn btn-primary btn-sm me-1" to={`/admin/products/update/${product._id}`}>Update</Link>
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(product._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <nav>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link mx-3" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link mx-3" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
