import { currencyFormatter } from "../util/formatting";
import { useContext } from 'react';
import CartContext from '../store/CartContext.jsx';
import Button from './UI/Button.jsx';

export default function ProductItem({ product }) {
    const cartCtx = useContext(CartContext);

    function handleAddProductToCart() {
        cartCtx.addItem(product);
        console.log(cartCtx);
    }

    return (
        <li className="product-item list-unstyled mb-4">
            <div className="card bg-dark text-center shadow-sm rounded-3 overflow-hidden">
                <img
                    src={`http://localhost:9999/images/${product.imageFileName}`}
                    className="card-img-top w-100 h-100"
                    alt={product.name}
                    style={{ height: '10rem', objectFit: 'cover' }}
                />
                <div className="card-body">
                    <h3 className="card-title">{product.name}</h3>
                    <p className="product-item-price bg-dark text-warning fw-bold rounded-pill d-inline-block py-2 px-4 mb-3">
                        {currencyFormatter.format(product.price)}
                    </p>
                    <p className="card-text mb-3">{product.description}</p>
                    <button className="btn btn-primary" onClick={handleAddProductToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </li>
    );
}
