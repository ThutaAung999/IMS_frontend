import React from 'react'

import ReactDOM from 'react-dom/client'
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import ProductList from "./pages/admin/products/ProductList";
import CreateProduct from "./pages/admin/products/CreateProduct";
import UpdateProduct from "./pages/admin/products/UpdateProduct";
import './index.css'
//React Query
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {Footer} from "./components/footer";
import Header from "./components/Header";
import {CartContextProvider} from './store/CartContext.jsx';
import {UserProgressContextProvider} from "./store/UserProgressContext";
import Auth from "./components/auth/auth";

const queryClient = new QueryClient();

import {Provider, useSelector} from 'react-redux';
import  store from './store/auth_stoure/index'


function App() {
    const isAuth = useSelector(state=>state.auth.isAuthenticated);
    return (

        <BrowserRouter>
            <Header/>
            {!isAuth && <Auth />}

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/contact" element={<Contact/>}/>

                <Route path="/admin/products" element={<ProductList/>}/>
                <Route path="/admin/products/create" element={<CreateProduct/>}/>
                <Route path="/admin/products/update/:id" element={<UpdateProduct/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>

            <Footer/>
        </BrowserRouter>

    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>

        <UserProgressContextProvider>
            <CartContextProvider>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <App/>
                    </Provider>
                </QueryClientProvider>
            </CartContextProvider>
        </UserProgressContextProvider>

    </React.StrictMode>,
)
