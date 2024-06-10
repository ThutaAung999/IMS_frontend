import { useEffect, useState } from 'react';
import ProductItem from "./ProductItem";

export default function Products() {
    const [loadedProducts, setLoadedProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch("http://localhost:9999/api/products");

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                // Assuming the response contains an object with a products array
                if (!Array.isArray(data.products)) {
                    throw new Error('Fetched data is not an array');
                }

                setLoadedProducts(data.products); // Access products array
            } catch (err) {
                setError(err.message);
            }
        }

        fetchProduct();
    }, []);

    if (error) {
        return <div>An error occurred: {error}</div>;
    }
    /* return (
         <ul id="products">
             {loadedProducts.map((product) => (
                 <li key={product.id}>{product.name}</li>
             ))}
         </ul>
     );*/

    return (
        <div className="container my-4">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                {loadedProducts.map((product) => (
                    <div key={`${product.id}-${product.name}`} className="col">
                        <div className="card h-100 border-0">
                            <div className="card-body d-flex flex-row">
                                <ProductItem product={product} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

