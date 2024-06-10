import React, {useContext} from 'react';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import {Navbar} from "./layout";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export default function Header() {
    const isAuth = useSelector(state=>state.auth.isAuthenticated);

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
        <header id="main-header">
            <div id="title">
                <Link className="navbar-brand" to="/">

                    <img src="/basket.png" alt="..." width="50" className="me-2"/>

                </Link>
                <h1>Palace</h1>
            </div>

            {isAuth && <Navbar/>}

            {isAuth &&(
            <nav>
                <Button textOnly onClick={handleShowCart}>
                    Cart ({totalCartItems})
                </Button>
            </nav>
                )}
        </header>
    );
}
