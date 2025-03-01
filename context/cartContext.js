
"use client";
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                setCartProducts(JSON.parse(storedCart));
            }
        }
    }, []);

    useEffect(() => {
        if (cartProducts.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cartProducts));
        }
    }, [cartProducts]);

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts }}>
            {children}
        </CartContext.Provider>
    );
}

