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


/*

export const fetchProduct = async (id) => {
    const response = await fetch(`http://localhost:9999/api/products/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
*/

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