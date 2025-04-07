import React, { useContext } from "react";
import SmallHero from "./constant/SmallHero";
import productContext from "../context/ProductContext";
import Card from "../assets/card.jpg";

const Aboutus = () => {
  const context = useContext(productContext);
  let {
    state: { cart, products },
    dispatch,
  } = context;
  console.log("this is state", products);
  console.log("this is cart", cart);

  return (
    <div>
      <SmallHero />
      <div className="container">
        <h4>Our Products</h4>
        <div className="row">
          {products.map((item, index) => {
            return (
              <div key={index} className="col-md-4">
                <div className="card">
                  <img src={Card} className="card-img-top" alt="coding image" />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">{item.price}</p>

                    <button
                      onClick={() =>
                        dispatch({ type: "ADD_TO_CART", payload: item })
                      }
                      className="btn btn-primary"
                    >
                      Add to cart
                    </button>
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
