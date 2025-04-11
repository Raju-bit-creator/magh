import React, { useContext } from "react";
import productContext from "../context/ProductContext";
import card from "../assets/card.jpg";
import { MdDelete } from "react-icons/md";

const CartItems = () => {
  const context = useContext(productContext);
  let {
    state: { cart },
    dispatch,
  } = context;
  let Total = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  return (
    <div className="container">
      <div className="productcontainer-cart">
        <ul className="product-list">
          {cart.map((item, index) => (
            <li key={index} className="mt-2">
              <div className="row cart-list">
                <div className="col-md-2">
                  <img
                    src={item.image || card}
                    width={60}
                    height={60}
                    alt={item.name}
                  />
                </div>
                <div className="col-md-2">
                  <h4>{item.title}</h4>
                </div>
                <div className="col-md-2">
                  <h4> Rs.{item.price}</h4>
                </div>
                <div className="col-md-2">
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_CART_ITEM",
                        payload: { _id: item._id, qty: e.target.value },
                      })
                    }
                    className="form-control"
                  >
                    {[...Array(item.instock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                {/* remove from cart  */}
                <div className="col-md-2">
                  <button
                    className="btn btn-light"
                    onClick={() => {
                      dispatch({ type: "REMOVE_FROM_CART", payload: item });
                    }}
                  >
                    <MdDelete />
                  </button>
                </div>
                <div></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="summary">
        <div className="title"> Total Items: {cart.length}</div>
        <h4>Sub Total: {Total}</h4>
        <button className="btn btn-primary"> Proceed to checkout</button>
      </div>
    </div>
  );
};

export default CartItems;
