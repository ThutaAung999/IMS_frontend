
/*
//Before pagination code

export const fetchProducts = async () => {
    const response = await fetch("http://localhost:9999/api/products");
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};*/

export const fetchProducts = async ({ queryKey }) => {
    console.log("fetchProducts from frontend ProductService");
    const [key, { page, limit }] = queryKey; // Ensure the second item is an object with page and limit
    const response = await fetch(`http://localhost:9999/api/products?page=${page}&limit=${limit}`);
//    console.log("response :",response.json());
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};



// productService.js (Frontend)
/*
import axios from 'axios';

export const fetchProducts = async ({ queryKey }) => {
    const [, page, limit] = queryKey;
    const response = await axios.get(`http://localhost:9999/api/products?page=${page}&limit=${limit}`);
    return response.data;
};

export const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:9999/api/products/${id}`);
};
*/


export const createProduct = async (formData) => {
    const response = await fetch("http://localhost:9999/api/products", {
        method: "POST",
        body: formData,
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
    return response.json();
};

export const updateProduct = async ({ id, formData }) => {
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


export const deleteProduct = async (id) => {
    const response = await fetch(`http://localhost:9999/api/products/${id}`, { method: 'DELETE' });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
