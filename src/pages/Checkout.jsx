import { useCart } from "../context/CartContext";
import React from "react";

const Checkout = () => {
  const {
    getCartItemsWithProducts,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    clearCart,
  } = useCart();

  const cartItems = getCartItemsWithProducts();
  const total = getCartTotal();
  function placeOrder() {
    alert("successful Order")
    clearCart();
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>

        <div className="checkout-container">
          {/* LEFT SIDE */}
          <div className="checkout-items">
            <h2 className="checkout-section-title">Order Summary</h2>

            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cartItems.map((item) => {
                // prevent crash if product is missing
                if (!item.product) return null;

                return (
                  <div className="checkout-item" key={item.id}>
                    <img
                      src={item.product.image}
                      className="checkout-item-image"
                      alt={item.product.name}
                    />

                    <div className="checkout-item-details">
                      <h3 className="checkout-item-name">
                        {item.product.name}
                      </h3>

                      <p className="checkout-item-price">
                        ${item.product.price} each
                      </p>
                    </div>

                    <div className="checkout-item-controls">
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateQuantity(item.id, item.quantity - 1);
                            }
                          }}
                        >
                          -
                        </button>

                        <span className="quantity-value">
                          {item.quantity}
                        </span>

                        <button
                          className="quantity-btn"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      <p className="checkout-item-total">
                        $
                        {(
                          item.product.price * item.quantity
                        ).toFixed(2)}
                      </p>

                      <button
                        className="btn btn-secondary btn-small"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="checkout-summary">
            <h2 className="checkout-section-title">Total</h2>

            <div className="checkout-total">
              <p className="checkout-total-label">Subtotal</p>
              <p className="checkout-total-value">
                ${total.toFixed(2)}
              </p>
            </div>

            <div className="checkout-total">
              <p className="checkout-total-label">Total</p>
              <p className="checkout-total-value checkout-total-final">
                ${total.toFixed(2)}
              </p>
            </div>

            <button className="btn btn-primary btn-large btn-block" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;