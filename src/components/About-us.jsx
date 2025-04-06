import React, { useContext } from "react";
import SmallHero from "./constant/SmallHero";
import productContext from "../context/ProductContext";

const Aboutus = () => {
  const context = useContext(productContext);
  let { fruit, name, product } = context;
  console.log("this is fruit from context", fruit);
  console.log("hello this is me tshering", name);
  console.log("this is product from context", product);

  return (
    <div>
      <SmallHero />
      <div className="container">
        <h4>Our Products</h4>
        <div className="row">
          {product.map((item, index) => {
            return (
              <div key={index} className="col-md-4">
                <div className="card">
                  <img src={item.image} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">{item.price}</p>
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
