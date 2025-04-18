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

  //get all product
  const allProduct = async () => {
    const response = await fetch(
      "http://localhost:5000/api/product/getallproduct",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6I",
        },
      }
    );
    const parseData = await response.json();
    console.log(parseData);
  };

  //edit product
  const editProduct = async (updateData) => {
    const { title, description, price, instock } = updateData; //destructuring
    try {
      const response = await fetch(
        "http://localhost:5000/api/product/addproduct",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR",
          },
          body: JSON.stringify({ title, description, price, instock }),
        }
      );
      if ((!response, ok)) {
        console.log("Error");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
      throw new Error("failed to update product");
    }
  };

  return (
    <ProductContext.Provider value={{ product, dispatch, allProduct, state }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
