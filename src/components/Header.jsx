import React, {useContext} from 'react';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
/*import {Navbar} from "./layout";*/
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export default function Header() {
    const isAuth = useSelector(state => state.auth.isAuthenticated);

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleShowCart() {
        console.log("Cart is clicked");
        userProgressCtx.showCart();
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-white border-bottom box-shadow">
                <div className="container">
                    <Link className="navbar-brand" to="/">

                        <img src="/basket.png" alt="..." width="50" className="me-2"/>

                    </Link>
                    <h1>Palace</h1>


                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                            style={{'--bs-scroll-height': '100px'}}>
                            <li className="nav-item">
                                <Link className="nav-link text-dark" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/contact">Contact</Link>
                            </li>


                        </ul>
                        {isAuth && (

                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button"
                                       data-bs-toggle="dropdown"
                                       aria-expanded="false">
                                        Admin
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="admin/products">Products</Link></li>
                                        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        <li><Link className="dropdown-item" to="Logout">Logout</Link></li>
                                    </ul>
                                </li>

                            </ul>)}
                    </div>
                </div>
                {isAuth && (

                    <Button textOnly onClick={handleShowCart}>
                        Cart ({totalCartItems})
                    </Button>
                )}

            </nav>
            )
        </>
    );
}
