import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id == productToAdd.id
    );

    //if found ,increment quantity
    if (existingCartItem) {
        return cartItems.map(
            (cartItem) => cartItem.id == productToAdd.id
                ? { ...existingCartItem, quantity: cartItem.quantity + 1 }
                : cartItem)
    }

    // return new array with modified cartitems/ new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

//decrement function

const removeItemFromCart = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id == productToRemove.id
    );

    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
    }

    return cartItems.map(
        (cartItem) => cartItem.id == productToRemove.id
            ? { ...existingCartItem, quantity: cartItem.quantity - 1 }
            : cartItem)
}

const deleteProduct = (cartItems, productToDelete) => {

    return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id)
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItem: () => { },
    deleteProductFromArray: () => { },
    cartCount: 0,
    cartTotal: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    const removeItem = (productToRemove) => {
        setCartItems(removeItemFromCart(cartItems, productToRemove)) // Aquí se pasa productToRemove como argumento
    }

    const deleteProductFromArray = (productToDelete) => {
        setCartItems(deleteProduct(cartItems, productToDelete))
    }

    useEffect(() => {
        const newCartCount = cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)
        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, currentValue) => total + currentValue.quantity * currentValue.price, 0)
        setCartTotal(newCartTotal)
    }, [cartItems])

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItem, deleteProductFromArray, cartTotal }
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}