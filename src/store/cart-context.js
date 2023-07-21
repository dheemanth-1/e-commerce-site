/* eslint-disable no-unused-vars */
import { createContext } from "react";

const CartContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: (_item) => {},
    removeItem: (_id) => {},
    clearAllItems: () => {}
})

export default CartContext;