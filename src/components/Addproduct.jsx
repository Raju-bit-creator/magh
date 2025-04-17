import React, { useState } from "react";

const Addproduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    instock: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Product Added");
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setProduct({
        ...product,
        [e.target.name]: e.target.files[0],
      });
      console.log(e.target.files[0]);
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };
  return (
    <>
      <div className="container">
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="form-control"
              id="exampleFormControlInput1"
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
              className="form-control"
              id="exampleFormControlInput1"
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="form-control"
              id="exampleFormControlInput1"
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Instock
            </label>
            <input
              type="number"
              name="instock"
              value={product.instock}
              onChange={handleChange}
              className="form-control"
              id="exampleFormControlInput1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Upload your image here !
            </label>
            <input
              className="form-control"
              type="file"
              name="image"
              multiple
              onChange={handleChange}
              id="formFile"
            />
          </div>
          <div className="btn btn-primary">Submit</div>
        </form>
      </div>
    </>
  );
};

export default Addproduct;
