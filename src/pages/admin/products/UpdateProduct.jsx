import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from 'react';

export default function UpdateProduct() {

    const params = useParams();
    const [initialData,setInitialData]=useState()

    const [validationErrors, setValidationErrors]=useState({})

    const navigate = useNavigate();


    function  getProduct(){
        console.log('params :',params)
        console.log("params.id :", params.id);
        //fetch("http://localhost:3004/products/"+params.id)
        //fetch("http://localhost:9999/api/products"+params.id)
        fetch(`http://localhost:9999/api/products/${params.id}`)
            .then(response=>{
                if(response.ok){
                    return response.json()
                }
                throw new Error()
            })
            .then(data=>{
            setInitialData(data)
        })
            .catch(error=>{
            alert("Unable to read product  details")
        })
    }


    //useEffect(getProduct,[])

    useEffect(() => {
        getProduct();
    }, [params._id]);

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const product = Object.fromEntries(formData.entries());

        if (!product.name || !product.brand || !product.category || !product.price ||
            !product.description ) {
            alert("Please fill all the fields");
            return;
        }

        try {
            //const response = await fetch("http://localhost:3004/products/"+params.id , {
            const response = await fetch("http://localhost:9999/api/products/"+params.id , {

                method: "PUT",
                body: formData,
                headers: {
                    // Assuming your server can handle form data correctly without needing Content-Type for multipart form-data
                }
            });

            const data = await response.json();
            if (response.ok) {
                navigate("/admin/products");
            } else {
                if (response.status === 400) {
                    setValidationErrors(data);
                } else {
                    alert("Unable to update the product: " + data.message);
                }
            }
        } catch (error) {
            alert("Unable to connect to the server: " + error.message);
        }
    }


    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded-border p-4">
                    <h2 className="text-center mb-5">Update Product</h2>


                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">ID</label>
                        <div className="col-sm-8">
                            <input readOnly className="form-control-plaintext"
                                   defaultValue={params.id}  />

                        </div>
                    </div>

                    {
                        (initialData) &&
                    <form onSubmit={handleSubmit}>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Name</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="name" defaultValue={initialData.name} />
                                <span className="text-danger">{validationErrors.name}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Brand</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="brand" defaultValue={initialData.brand}  />
                                <span className="text-danger">{validationErrors.brand}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Category</label>
                            <div className="col-sm-8">
                                <select className="form-select" name="category" defaultValue={initialData.category} >
                                    <option value="Other...">Other...</option>
                                    <option value="Phones">Phones</option>
                                    <option value="Computers">Computers</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Printers">Printers</option>
                                    <option value="Cameras">Cameras</option>
                                </select>
                                <span className="text-danger">{validationErrors.category}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Price</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" name="price" defaultValue={initialData.price}  step="0.01" min="1" />
                                <span className="text-danger">{validationErrors.price}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Description</label>
                            <div className="col-sm-8">
                                <textarea className="form-control" rows="4" name="description" defaultValue={initialData.description} ></textarea>
                                <span className="text-danger">{validationErrors.description}</span>
                            </div>
                        </div>


                        <div className="row mb-3">
                            <div className="offset-sm-4 col-sm-8">
                                <img src={"http://localhost:9999/images/"+ initialData.imageFileName}  width="160" alt="..."/>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Image</label>
                            <div className="col-sm-8">
                                <input type="file" className="form-control" name="image" />
                                <span className="text-danger">{validationErrors.image}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Created At</label>
                            <div className="col-sm-8">
                                <input readOnly className="form-control-plaintext" defaultValue={initialData.createdAt.slice(0,10)}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <Link to="/admin/products" className="btn btn-primary" role="button">Cancel</Link>
                            </div>
                        </div>
                    </form>
                    }
                </div>
            </div>
        </div>
    );
}
