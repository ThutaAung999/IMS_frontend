import React from "react";
import Products from "../components/Products";
import Cart from "../components/Cart";
import {useSelector} from "react-redux";

export default function Home(){
    const isAuth = useSelector(state=>state.auth.isAuthenticated);

    return(

        <div className="container my-4">  <h2>Welcome to our IMS website</h2>
            {isAuth && <Products/>}
            <Cart/>
        </div>
    )
}