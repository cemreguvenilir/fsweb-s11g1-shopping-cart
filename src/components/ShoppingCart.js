import React from "react";
import { ScCartCheckout } from "./scParts";
import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";

// Components
import Item from "./ShoppingCartItem";

const ShoppingCart = () => {
  const { cart } = useContext(CartContext);

  const getCartTotal = () => {
    return cart
      .reduce((acc, value) => {
        return acc + value.price;
      }, 0)
      .toFixed(2);
  };

  return (
    <div>
      {cart.map((item) => (
        <Item key={item.id} id={item.id} {...item} />
      ))}

      <ScCartCheckout>
        <p>Total: ${getCartTotal()}</p>
        <button>Checkout</button>
      </ScCartCheckout>
    </div>
  );
};

export default ShoppingCart;
