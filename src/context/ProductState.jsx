import React, { useReducer } from "react";
import ProductContext from "./ProductContext";
import { cartReducer } from "./Reducer";

const ProductState = (props) => {
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
      instock: 10,
    },

    {
      _id: 3,
      title: "Banana",
      description: "Banana is good for health",
      price: 30,
      instock: 5,
    },
  ];
  const [state, dispatch] = useReducer(cartReducer, {
    products: product,
    cart: [],
  });

  return (
    <ProductContext.Provider value={{ product, dispatch, state }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
