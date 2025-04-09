import React, { useContext } from "react";
import productContext from "../context/ProductContext";
import card from "../assets/card.jpg";

const CartItems = () => {
  const context = useContext(productContext);
  let {
    state: { cart },
    dispatch,
  } = context;
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
                  >
                    {[
                      ...Array(item.instock)
                        .keys()
                        .map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        )),
                    ]}
                  </select>
                </div>
                {/* remove from cart  */}
                <div></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CartItems;
