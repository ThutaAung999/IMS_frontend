// api.js
export async function fetchData() {
    const response = await fetch('https://localhost:9999/api/products');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}
