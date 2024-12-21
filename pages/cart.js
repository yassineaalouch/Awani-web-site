'use client'; // Utiliser le mode client pour l'accès au localStorage

import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/cartContext";
import Image from "next/image";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoAddSharp, IoRemove } from "react-icons/io5";
import Link from "next/link";
import Footer from "@/components/interfaceComponents/Footer";
import NavBarInterface from "@/components/interfaceComponents/Nav-bar-interface";


export default function CartPage() {
    const { cartProducts, setCartProducts } = useContext(CartContext);

    const handleQuantityChange = (id, delta) => {
        setCartProducts((prevItems) =>
            prevItems.map((item) => {
                if (item.id === id) {
                    const newQuantity = Math.max(1, item.quantity + delta);
                    const discount = item.discountPercentage > 0 && newQuantity > item.discountQuantity ? item.discountPercentage / 100 : 0;
                    const discountedPrice = item.price - item.price * discount;
                    const totalPrice = (newQuantity * discountedPrice);

                    return {
                        ...item,
                        quantity: newQuantity,
                        totalPrice: totalPrice // Mise à jour du prix total
                    };
                }
                return item;
            })
        );
    };
    const [deletePermission, setDeletePermission] = useState(false)
    useEffect(() => {
        if (cartProducts.length > 0 || deletePermission) {
            localStorage.setItem('cart', JSON.stringify(cartProducts));
            setDeletePermission(false)

        }

    }, [cartProducts]);


    const handleRemoveItem = (id) => {
        setCartProducts((prevItems) => {
            const updatedCart = prevItems.filter((item) => item.id !== id);
            return updatedCart;
        });
        setDeletePermission(true)
    };

    const totalPrice = cartProducts.reduce((acc, item) => acc + item.totalPrice, 0);

    return (
        <>
            <NavBarInterface />
            <div className="min-h-screen pt-14 bg-gray-100 p-6">
                <div>
                    <div className="max-w-4xl mx-auto bg-white p-4 shadow-md rounded-lg">
                        <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
                        {cartProducts.length > 0 ? (
                            <div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {cartProducts.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center bg-gray-200 p-4 rounded-lg shadow-sm"
                                        >
                                            <div className="w-28 h-28 mr-4">
                                                <Image
                                                    src={item.image || "/No_Image_Available.jpg"}
                                                    alt={item.title}
                                                    width={100}
                                                    height={100}
                                                    className="border rounded-md"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h2 className="text-lg line-clamp-2 font-medium">{item.title}</h2>
                                                <p className="text-sm text-gray-600">MAD {item.totalPrice.toFixed(2)}</p>
                                                <div className="flex items-center mt-2">
                                                    <button
                                                        onClick={() => handleQuantityChange(item.id, -1)}
                                                        className="px-2 py-1 font-bold bg-gray-200 rounded-md hover:bg-gray-300"
                                                        disabled={item.quantity === 1}
                                                    >
                                                        <IoRemove size={20} />
                                                    </button>
                                                    <span className="px-4">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleQuantityChange(item.id, 1)}
                                                        className="px-2 py-1 font-bold bg-gray-200 rounded-md hover:bg-gray-300"
                                                    >
                                                        <IoAddSharp size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="ml-4 text-sm text-red-500 hover:text-red-700"
                                            >
                                                <RiDeleteBin6Fill size={25} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center mt-6">
                                    <Link href="/Checkout" className="bg-yellow-300 p-2 rounded-lg hover:bg-yellow-500">
                                        Continue to checkout
                                    </Link>
                                    <div className="flex text-lg font-semibold">
                                        <p>
                                            MAD {totalPrice.toFixed(2)}
                                        </p>
                                        <p>
                                            : السعر الإجمالي
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p className="text-gray-600 mb-4">Your cart is empty.</p>
                                <Link href="/shope" className="bg-yellow-300 p-2 rounded-lg hover:bg-yellow-500">
                                    Visit Our Store
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}
