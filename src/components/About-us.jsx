import React, { useContext, useEffect, useState } from "react";
import SmallHero from "./constant/SmallHero";
import productContext from "../context/ProductContext";
import Card from "../assets/card.jpg";
import { BsThreeDots } from "react-icons/bs";
import EditProductModal from "./EditProductModal";
import { useParams } from "react-router-dom";

const Aboutus = () => {
  const params = useParams();
  const searchQuery = params;
  const context = useContext(productContext);
  let {
    product,
    state: { cart, products, message },
    dispatch,
    allProduct,
    editProduct,
    deleteProduct,
  } = context;
  console.log("this is backend product", product);

  const [menuVisible, setMenuVisible] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(false);

  const toggleMenu = (id) => {
    setMenuVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const openEditModal = (product) => {
    console.log("editing the product");
    setSelectedProduct(product);
    console.log("editign product", product._id);

    setModalVisible(true);
  };
  const handleDelete = async (id) => {
    console.log("deleting the product");
    await deleteProduct(id);
  };
  const closeEditModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };
  const saveEdit = (updateData) => {
    console.log("edit product", updateData);
    editProduct(selectedProduct._id, updateData);
  };
  useEffect(() => {
    // console.log("use effect");
    allProduct(searchQuery);
  }, [searchQuery]);

  return (
    <div>
      <SmallHero />
      <div className="container">
        <h4
          onClick={() =>
            dispatch({
              type: "PRINT_HELLO_WORLD",
            })
          }
        >
          Our Products
        </h4>

        <div className="row">
          {product &&
            product.map((item) => {
              return (
                <div key={item._id} className="col-md-4">
                  <div className="card">
                    <img
                      src={
                        item.image?.[0]
                          ? `http://localhost:5000/uploads/${item.image[0]}`
                          : Card
                      }
                      className="card-img-top"
                      alt="coding image"
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="card-title">{item.title}</h5>
                        <div className="d-flex">
                          <BsThreeDots onClick={() => toggleMenu(item._id)} />
                          {menuVisible[item._id] && (
                            <div className="menu-options">
                              <button
                                className="btn btn-warning mx-3"
                                onClick={() => openEditModal(item)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="card-text">{item.description}</p>
                      <p className="card-text">{item.price}</p>

                      {cart && cart.some((p) => p._id === item._id) ? (
                        <button
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: item,
                            })
                          }
                          className="btn btn-danger"
                        >
                          Remove form cart
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            dispatch({ type: "ADD_TO_CART", payload: item })
                          }
                          className="btn btn-primary"
                        >
                          Add to cart
                        </button>
                      )}
                    </div>
                  </div>
                  {modalVisible &&
                    selectedProduct &&
                    selectedProduct._id === item._id && (
                      <EditProductModal
                        product={selectedProduct}
                        onClose={closeEditModal}
                        onSave={saveEdit}
                      />
                    )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
