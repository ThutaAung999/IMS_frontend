import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchProduct = async ({ queryKey }) => {
    const [, id] = queryKey;
    const response = await fetch(`http://localhost:9999/api/products/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const updateProduct = async ({ id, formData }) => {
    const response = await fetch(`http://localhost:9999/api/products/${id}`, {
        method: "PUT",
        body: formData,
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
    return response.json();
};

export default function UpdateProduct() {
    const { id } = useParams();
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: initialData, error, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: fetchProduct
    });

    const mutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            navigate("/admin/products");
        },
        onError: (error) => {
            const errorData = JSON.parse(error.message);
            setValidationErrors(errorData);
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        mutation.mutate({ id, formData });
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded-border p-4">
                    <h2 className="text-center mb-5">Update Product</h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Name</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="name" defaultValue={initialData.name} />
                                <span className="text-danger">{validationErrors.name}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Brand</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="brand" defaultValue={initialData.brand} />
                                <span className="text-danger">{validationErrors.brand}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Category</label>
                            <div className="col-sm-8">
                                <select className="form-select" name="category" defaultValue={initialData.category}>
                                    <option value="Other...">Other...</option>
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
                                <input type="number" className="form-control" name="price" step="0.01" min="1" defaultValue={initialData.price} />
                                <span className="text-danger">{validationErrors.price}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Description</label>
                            <div className="col-sm-8">
                                <textarea className="form-control" rows="4" name="description" defaultValue={initialData.description}></textarea>
                                <span className="text-danger">{validationErrors.description}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Image</label>
                            <div className="col-sm-8">
                                <input type="file" className="form-control" name="image" />
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
