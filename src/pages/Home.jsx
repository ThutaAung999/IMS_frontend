import React from "react";
import Products from "../components/Products";
import Cart from "../components/Cart";

export default function Home(){
    return(
        <div className="container my-4">  <h2>Welcome to our IMS website</h2>
            <Products/>
            <Cart/>
        </div>
    )
}