import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export default function ProductList(){
    const [products,setProducts]=useState([]);

    function getProducts(){
        fetch("http://localhost:3004/products")
            .then(response=>{
                    if(response.ok){
                        return response.json();
                    }
                throw new Error();
            })
            .then(data=>{
                setProducts(data);
            })
            .catch(error=>{
                alert("Unable to get the products from your API");
            })
    }

    useEffect(getProducts,[])

    return(

        <div className="container my-4">
            <h2 className="text-center mb-4">Products</h2>

            <div className="row mb-3">
                <div className="col">
                    <Link to="/admin/products/create"
                       className="btn btn-primary me-1"  role="button">Create Product</Link>
                    <button type="button" onClick={getProducts} className="btn btn-outline-primary">Refresh</button>
                </div>
                <div className="col">

                </div>
            </div>

            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Created</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    products.map((product,index)=>{
                                return (
                                    <tr key={index}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.category}</td>
                                        <td>{product.price}$</td>
                                        <td><img src={"http://localhost:3004/images/"+product.imageFileName} alt="..." width="100"/></td>
                                        <td>{product.createdAt.slice(0,10)}</td>

                                        <td style={{width:"10px" , whiteSpace:"noWrap"}}>
                                            <Link className="btn btn-primary btn-sm me-1"
                                               to={"/admin/products/edit/"+product.id}>Edit</Link>
                                            <button type="button" className="btn btn-danger btn-sm">Delete</button>
                                        </td>
                                    </tr>
                                );
                    })
                }

                </tbody>
            </table>
        </div>
    );
}