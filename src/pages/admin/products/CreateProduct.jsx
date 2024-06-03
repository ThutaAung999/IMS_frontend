import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../../../services/productService';
import productSchema from '../../../schemas/ProductSchema';
import { z } from 'zod';

export default function CreateProduct() {
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        category: '',
        price: '',
        description: '',
        image: null
    });
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            navigate("/admin/products");
        },
        onError: (error) => {
            const errorData = JSON.parse(error.message);
            setValidationErrors(errorData);
        },
    });

    const handleInputChange = (event) => {
        const { name, value, files } = event.target;
        const newValue = files ? files[0] : value;

        // If the field being updated is 'price', convert the value to a number
        const updatedValue = name === 'price' ? parseFloat(newValue) : newValue;

        // Update formData state
        setFormData({
            ...formData,
            [name]: updatedValue
        });

        // Validate the updated field
        const partialData = { ...formData, [name]: updatedValue };
        const result = productSchema.safeParse(partialData);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setValidationErrors(fieldErrors);
        } else {
            setValidationErrors({});
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const result = productSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setValidationErrors(fieldErrors);
            return;
        }

        setValidationErrors({});

        const submitData = new FormData();
        for (const key in formData) {
            submitData.append(key, formData[key]);
        }

        mutation.mutate(submitData);
    };

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded-border p-4">
                    <h2 className="text-center mb-5">Create Product</h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Name</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                                <span className="text-danger">{validationErrors.name}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Brand</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleInputChange}
                                />
                                <span className="text-danger">{validationErrors.brand}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Category</label>
                            <div className="col-sm-8">
                                <select
                                    className="form-select"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select...</option>
                                    <option value="Phones">Phones</option>
                                    <option value="Computers">Computers</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Printers">Printers</option>
                                    <option value="Cameras">Cameras</option>
                                </select>
                                <span className="text-danger">{validationErrors.category}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Price</label>
                            <div className="col-sm-8">
                                <input
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    step="0.01"
                                    min="1"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                />
                                <span className="text-danger">{validationErrors.price}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Description</label>
                            <div className="col-sm-8">
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                ></textarea>
                                <span className="text-danger">{validationErrors.description}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Image</label>
                            <div className="col-sm-8">
                                <input
                                    type="file"
                                    className="form-control"
                                    name="image"
                                    onChange={handleInputChange}
                                />
                                <span className="text-danger">{validationErrors.image}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <Link to="/admin/products" className="btn btn-primary" role="button">Cancel</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
