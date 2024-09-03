// "use client";
// import {createContext, useEffect, useState} from "react";
// export const CartContext = createContext({});
// export function CartContextProvider({children}) {
//     // const ls = typeof window !== "undefined" ? window.localStorage : null;
//     const [cartProducts,setCartProducts] = useState([]);
//     useEffect(()=>{
//         if(cartProducts?.length>0){
//             // ls?.setItem('cart',JSON.stringify(cartProducts));
//             localStorage.setItem('cart',JSON.stringify(cartProducts));
//         }
//     },[cartProducts])

//     useEffect(()=>{
//         // if(ls && ls.getItem('cart')){
//         //     setCartProducts(JSON.parse(ls.getItem('cart')))
//         // }
//         setCartProducts(JSON.parse(localStorage.getItem('cart')))
//     },[])
//     return (
//         <CartContext.Provider value={{cartProducts,setCartProducts}}>
//             {children}
//         </CartContext.Provider>
//     )
// }




"use client";
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);
    
    useEffect(() => {
        console.log('cartProduc555ts',cartProducts)
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

