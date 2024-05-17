import React from 'react'
import ReactDOM from 'react-dom/client'
import {Navbar, Footer} from './components/layout'
import Home from "./pages/Home";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

//React Query
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import ProductList from "./pages/admin/products/ProductList";
import CreateProduct from "./pages/admin/products/CreateProduct";

const queryClient = new QueryClient();




function App(){
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/admin/products" element={<ProductList/>}/>
                <Route path="/admin/products/create" element={<CreateProduct/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
        );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
    <App />
      </QueryClientProvider>
  </React.StrictMode>,
)
