'use client';

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
    const [currentTime] = useState(new Date().getHours());
    const shippingCost = currentTime < 14 ? 10 : 15;
    const FREE_SHIPPING_THRESHOLD = 120;

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
                        totalPrice: totalPrice
                    };
                }
                return item;
            })
        );
    };

    const [deletePermission, setDeletePermission] = useState(false);

    useEffect(() => {
        if (cartProducts.length > 0 || deletePermission) {
            localStorage.setItem('cart', JSON.stringify(cartProducts));
            setDeletePermission(false);
        }
    }, [cartProducts]);

    const handleRemoveItem = (id) => {
        setCartProducts((prevItems) => {
            const updatedCart = prevItems.filter((item) => item.id !== id);
            return updatedCart;
        });
        setDeletePermission(true);
    };

    const subtotal = cartProducts.reduce((acc, item) => acc + item.totalPrice, 0);
    const needsShipping = subtotal < FREE_SHIPPING_THRESHOLD;
    const total = needsShipping ? subtotal + shippingCost : subtotal;
    const progressPercentage = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

    return (
        <>
            <NavBarInterface />
            <div className="min-h-screen pt-14 bg-gray-100">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white p-6 shadow-md rounded-lg">
                        <h1 className="text-2xl font-semibold text-center mb-6">سلة التسوق</h1>
                        {cartProducts.length > 0 ? (
                            <div>
                                <div className="space-y-4">
                                    {cartProducts.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                                        >
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <RiDeleteBin6Fill size={22} />
                                            </button>
                                            <div className="flex-1 mx-4">
                                                <h2 className="text-lg font-medium line-clamp-2">{item.title}</h2>
                                                <p className="text-sm text-gray-600">MAD {item.price.toFixed(2)}</p>
                                                <div className="flex items-center mt-2">
                                                    <button
                                                        onClick={() => handleQuantityChange(item.id, -1)}
                                                        className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                                                        disabled={item.quantity === 1}
                                                    >
                                                        <IoRemove size={18} />
                                                    </button>
                                                    <span className="px-4">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleQuantityChange(item.id, 1)}
                                                        className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                                                    >
                                                        <IoAddSharp size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="w-24 h-24">
                                                <Image
                                                    src={item.image || "/No_Image_Available.jpg"}
                                                    alt={item.title}
                                                    width={96}
                                                    height={96}
                                                    className="rounded-md object-cover"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 space-y-4">
                                    {needsShipping && (
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <div className="flex justify-between text-sm mb-2">
                                                <span>MAD {(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} للتوصيل المجاني</span>
                                                <span>{progressPercentage.toFixed(0)}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-[#6bb41e] h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${progressPercentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="border-t pt-4 space-y-2">
                                        <div className="flex justify-between">
                                            <span>المجموع الفرعي:</span>
                                            <span>MAD {subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>التوصيل:</span>
                                            <span>{needsShipping ? `MAD ${shippingCost.toFixed(2)}` : 'مجاني'}</span>
                                        </div>
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>المجموع:</span>
                                            <span>MAD {total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <Link 
                                        href="/Checkout" 
                                        className="block w-full text-center bg-[#6bb41e] text-white py-3 rounded-lg hover:bg-[#5a9619] transition duration-200"
                                    >
                                        متابعة الدفع
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-600 mb-4">سلة التسوق فارغة</p>
                                <Link 
                                    href="/shope" 
                                    className="inline-block bg-[#6bb41e] text-white px-6 py-2 rounded-lg hover:bg-[#5a9619] transition duration-200"
                                >
                                    تصفح منتجاتنا
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
