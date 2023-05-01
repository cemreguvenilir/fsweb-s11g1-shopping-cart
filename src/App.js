import React, { useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";
import { ProductContext } from "./contexts/ProductContext";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import { CartContext } from "./contexts/CartContext";

const writeToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const readFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const LSkey = "g0223";

const initializeCart = () => {
  const cart = readFromLocalStorage(LSkey);
  if (cart) {
    return cart;
  } else {
    return [];
  }
};

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState(initializeCart(LSkey));

  const addItem = (item) => {
    // verilen itemi sepete ekleyin
    const newCart = [...cart, item];
    setCart(newCart);
    writeToLocalStorage(LSkey, newCart);
  };
  const removeItem = (id) => {
    const removeCart = [...cart.filter((i) => i.id !== id)];
    setCart(removeCart);
    writeToLocalStorage(LSkey, removeCart);
  };
  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart, removeItem }}>
          <Navigation />

          {/* Routelar */}
          <main className="content">
            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <ShoppingCart />
            </Route>
          </main>
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
