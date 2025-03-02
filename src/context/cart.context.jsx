import { createContext, useEffect, useReducer, useState } from "react";

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, ItemToRemove) => {
  const itemToRemoveIndex = cartItems.findIndex(
    (cartItem) => cartItem.id === ItemToRemove.id
  );
  if (itemToRemoveIndex !== -1) {
    if (cartItems[itemToRemoveIndex].quantity > 1) {
      cartItems[itemToRemoveIndex].quantity--;
    } else {
      cartItems.splice(itemToRemoveIndex, 1);
    }
  }
  return [...cartItems];
};

export const deleteCartItem = (cartItems, ItemToDelete) => {
  const itemToDelete = cartItems.find(
    (cartItem) => cartItem.id === ItemToDelete.id
  );
  if (itemToDelete) {
    return cartItems.filter((ci) => ci.id !== ItemToDelete.id);
  }
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeCartItemFromCart: () => {},
  deleteCartItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_OPEN: "SET_CART_OPEN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    
    case CART_ACTION_TYPES.SET_CART_OPEN:
      return {...state, isCartOpen: payload}

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

const INITIAL_VALUES = {
  cartItems: [],
  isCartOpen: false,
  cartCount: 0,
  cartTotal: 0,
};

export const CartProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);

  const [state, dispatch] = useReducer(cartReducer, INITIAL_VALUES);
  const { cartItems, cartCount, cartTotal, isCartOpen } = state;

  // useEffect(() => {
  // const count = cartItems.reduce((total, cartItem) => {
  //   return total + cartItem.quantity;
  // }, 0);
  // setCartCount(count);
  // const total = cartItems.reduce((total, cartItem) => {
  //   return total + cartItem.quantity * cartItem.price;
  // }, 0);
  // setCartTotal(total);
  // }, [cartItems]);

  const addItemToCart = (product) => {
    var newCartItems = addCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };
  const removeCartItemFromCart = (product) => {
    const newCartItems = removeCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };
  const deleteCartItemFromCart = (product) => {
    const newCartItems = deleteCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = ()=>{
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_OPEN,
      payload: !isCartOpen,
    });
  }

  const updateCartItemsReducer = (newCartItems) => {
    const count = newCartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);

    const total = newCartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price;
    }, 0);

    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: { cartItems: newCartItems, cartTotal: total, cartCount: count },
    });
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    cartTotal,
    removeCartItemFromCart,
    deleteCartItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
