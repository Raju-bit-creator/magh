import React, { useContext, useState } from "react";
import SmallHero from "./constant/SmallHero";
import productContext from "../context/ProductContext";
import Card from "../assets/card.jpg";
import { BsThreeDots } from "react-icons/bs";

const Aboutus = () => {
  const context = useContext(productContext);
  let {
    product,
    state: { cart, products, message },
    dispatch,
  } = context;
  // console.log("this is state", products);
  // console.log("this is cart", cart);
  // console.log("this is product", product);
  // console.log("this is message", message);
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(false);

  const toggleMenu = (id) => {
    setMenuVisible((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const openEditModal = () => {
    console.log("editing the product");
  };
  const handleDelete = () => {
    console.log("deleting the product");
  };

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
          {products.map((item, index) => {
            return (
              <div key={index} className="col-md-4">
                <div className="card">
                  <img src={Card} className="card-img-top" alt="coding image" />
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title">{item.title}</h5>
                      <BsThreeDots onClick={() => toggleMenu(item_id)} />
                      {menuVisible[item._id] && (
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <button onClick={() => openEditModal(item)}>
                            Edit
                          </button>
                          <button onClick={() => handleDelete(item._id)}>
                            Delete
                          </button>
                        </div>
                      )}
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
