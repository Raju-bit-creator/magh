import React, { useReducer, useState } from "react";
import ProductContext from "./ProductContext";
import { cartReducer } from "./Reducer";

const ProductState = (props) => {
  const [product, setProduct] = useState("");
  const [state, dispatch] = useReducer(cartReducer, {
    products: product,
    cart: [],
  });

  //get all product
  const allProduct = async () => {
    const response = await fetch(
      "http://localhost:5000/api/product/getproduct",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const parseData = await response.json();
    setProduct(parseData);
    console.log(parseData);
  };

  //edit product
  const editProduct = async (selectedProduct_id, updateData) => {
    const { title, description, price, instock } = updateData; //destructuring
    try {
      const response = await fetch(
        `http://localhost:5000/api/product/updateproduct/${selectedProduct_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
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

  //delete product
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/product/deleteproduct/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (!response.ok) {
        console.log("Error");
        throw new Error(response.statusText);
      }
      console.log("product deleted successfully");
    } catch (error) {
      console.log("internal server error", error);
      throw new Error("failed to delete product");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        dispatch,
        allProduct,
        editProduct,
        deleteProduct,
        state,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
