import React from "react";
import ProductContext from "./ProductContext";

const ProductState = (props) => {
  let fruit = {
    name: "apple",
    price: 100,
  };
  let name = "tshering";

  const product = [
    {
      _id: 1,
      title: "Apple",
      description: "apple is good for health",
      price: 10,
      instock: 4,
    },
    {
      _id: 2,
      title: "Grapes",
      description: "Grapes is good for health",
      price: 20,
      instock: 4,
    },
    ,
    {
      _id: 3,
      title: "Banana",
      description: "Banana is good for health",
      price: 30,
      instock: 5,
    },
  ];

  return (
    <ProductContext.Provider value={{ fruit, name, product }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
