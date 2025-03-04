import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/cartContext";
import Link from "next/link";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoAddSharp, IoRemove } from "react-icons/io5";
import Image from "next/image";
import { BsCartX } from "react-icons/bs";
import { TbXboxX } from "react-icons/tb";
import { FaTruck } from "react-icons/fa";

export default function SideDropDownCart({ ShowCart, ShowTheSideMenu }) {
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
    const [translateX, setTranslateX] = useState("-100%");

    useEffect(() => {
        if (cartProducts.length > 0 || deletePermission) {
            localStorage.setItem('cart', JSON.stringify(cartProducts));
            setDeletePermission(false);
        }
    }, [cartProducts]);

    useEffect(() => {
        setTranslateX(ShowCart ? "0" : "-100%");
    }, [ShowCart]);

    const handleRemoveItem = (id) => {
        setCartProducts(prevItems => prevItems.filter(item => item.id !== id));
        setDeletePermission(true);
    };

    const subtotal = cartProducts.reduce((acc, item) => acc + item.totalPrice, 0);
    const needsShipping = subtotal < FREE_SHIPPING_THRESHOLD;
    const total = needsShipping ? subtotal + shippingCost : subtotal;
    const progressPercentage = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

    return (
        <div
            className={`h-screen flex flex-col justify-between border-r-2 border-r-gray-300 py-4 px-4 md:w-1/3 w-[85%] bg-white fixed top-0 left-0 z-[100] transition-transform duration-300`}
            style={{ transform: `translateX(${translateX})` }}
        >
            <div className="flex justify-between items-center border-b-2 pb-4 mb-4">
                <button onClick={ShowTheSideMenu} className="text-gray-600 hover:text-[#6bb41e]">
                    <TbXboxX size={24} />
                </button>
                <h1 className="text-xl font-semibold">سلة التسوق</h1>
            </div>

            {cartProducts.length > 0 ? (
                <div className="h-[calc(100vh-90px)] flex flex-col">
                    <div className="flex-1 overflow-y-auto mb-4">
                        <div className="space-y-3">
                            {cartProducts.map((item) => (
                                <div key={item.id} className="bg-gray-50 p-3 rounded-lg shadow-sm">
                                    <div className="flex gap-3">
                                        <Image
                                            src={item.image || "/No_Image_Available.jpg"}
                                            alt={item.title}
                                            width={80}
                                            height={80}
                                            className="rounded-md object-cover"
                                        />
                                        <div className="flex-1 text-right">
                                            <h2 className="font-medium line-clamp-1">{item.title}</h2>
                                            <p className="text-[#6bb41e] font-semibold">MAD {item.price.toFixed(2)}</p>
                                            <div className="flex items-center justify-end gap-2 mt-2">
                                                <button
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <RiDeleteBin6Fill size={20} />
                                                </button>
                                                <div className="flex items-center gap-2 bg-white rounded-lg border p-1">
                                                    <button
                                                        onClick={() => handleQuantityChange(item.id, 1)}
                                                        className="text-[#6bb41e] hover:bg-gray-100 p-1 rounded"
                                                    >
                                                        <IoAddSharp size={16} />
                                                    </button>
                                                    <span className="w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleQuantityChange(item.id, -1)}
                                                        className="text-[#6bb41e] hover:bg-gray-100 p-1 rounded"
                                                        disabled={item.quantity === 1}
                                                    >
                                                        <IoRemove size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t pt-4 space-y-4">
                        <div className="space-y-2">
                            <div className="h-2 bg-gray-200 rounded-full">
                                <div 
                                    className="h-full bg-[#6bb41e] rounded-full transition-all duration-500"
                                    style={{width: `${progressPercentage}%`}}
                                />
                            </div>
                            <div className="flex items-center justify-center gap-2 text-sm">
                                <FaTruck className="text-[#6bb41e]" />
                                {needsShipping ? (
                                    <p>أضف {(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} MAD للحصول على توصيل مجاني</p>
                                ) : (
                                    <p className="text-[#6bb41e] font-semibold">تم تفعيل التوصيل المجاني!</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2 text-right">
                            <div className="flex justify-between">
                                <span>MAD {subtotal.toFixed(2)}</span>
                                <span>المجموع الفرعي</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>{needsShipping ? `MAD ${shippingCost.toFixed(2)}` : 'مجاني'}</span>
                                <span>التوصيل</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg">
                                <span>MAD {total.toFixed(2)}</span>
                                <span>المجموع</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button 
                                onClick={ShowTheSideMenu}
                                className="flex-1 py-2 px-4 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                            >
                                مواصلة التسوق
                            </button>
                            <Link 
                                href="/cart"
                                className="flex-1 py-2 px-4 bg-[#6bb41e] text-white rounded-lg text-center hover:bg-[#5a9919] transition-colors"
                            >
                                إتمام الطلب
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-full flex flex-col items-center justify-center gap-4">
                    <BsCartX size={64} className="text-gray-400" />
                    <p className="text-gray-600 text-lg">سلة التسوق فارغة</p>
                    <button
                        onClick={ShowTheSideMenu}
                        className="py-2 px-4 bg-[#6bb41e] text-white rounded-lg hover:bg-[#5a9919] transition-colors"
                    >
                        ابدأ التسوق
                    </button>
                </div>
            )}
        </div>
    );
}
