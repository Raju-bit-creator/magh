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
  const allProduct = async (searchQuery = "") => {
    const response = await fetch(
      `http://localhost:5000/api/product/getallproduct?searchQuery=${searchQuery}`,
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

  // edit product
  const editProduct = async (selectedProduct, updateData) => {
    const { title, description, price, instock } = updateData;
    try {
      const response = await fetch(
        `http://localhost:5000/api/product/updateproduct/${selectedProduct}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ title, description, price, instock }),
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      allProduct();
      console.log(data);
    } catch (error) {
      console.error("internal server error", error);
      throw new Error("failed to update item");
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
      allProduct();
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
