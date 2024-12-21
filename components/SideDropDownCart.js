// import { useContext, useEffect, useState } from "react";
// import { CartContext } from "@/components/cartContext";
// import Link from "next/link";
// import { RiDeleteBin6Fill } from "react-icons/ri";
// import { IoAddSharp, IoRemove } from "react-icons/io5";
// import Image from "next/image";
// import { BsCartX } from "react-icons/bs";


// export default function SideDropDownCart({ ShowCart }) {
//     const { cartProducts, setCartProducts } = useContext(CartContext);

//     const handleQuantityChange = (id, delta) => {
//         setCartProducts((prevItems) =>
//             prevItems.map((item) => {
//                 if (item.id === id) {
//                     const newQuantity = Math.max(1, item.quantity + delta);
//                     const discount = item.discountPercentage > 0 && newQuantity > item.discountQuantity ? item.discountPercentage / 100 : 0;
//                     const discountedPrice = item.price - item.price * discount;
//                     const totalPrice = (newQuantity * discountedPrice);

//                     return {
//                         ...item,
//                         quantity: newQuantity,
//                         totalPrice: totalPrice // Mise à jour du prix total
//                     };
//                 }
//                 return item;
//             })
//         );
//     };
//     const [deletePermission, setDeletePermission] = useState(false)
//     useEffect(() => {
//         if (cartProducts.length > 0 || deletePermission) {
//             localStorage.setItem('cart', JSON.stringify(cartProducts));
//             setDeletePermission(false)

//         }

//     }, [cartProducts]);


//     const handleRemoveItem = (id) => {
//         setCartProducts((prevItems) => {
//             const updatedCart = prevItems.filter((item) => item.id !== id);
//             return updatedCart;
//         });
//         setDeletePermission(true)
//     };

//     const totalPrice = cartProducts.reduce((acc, item) => acc + item.totalPrice, 0);
//     const [translateX, setTranslateX] = useState("-100%");

//     useEffect(() => {
//         if (ShowCart) {
//             setTranslateX("0");
//         } else {
//             setTranslateX("-100%");
//         }
//     }, [ShowCart]);

//     return (
//         <div
//             className={`h-screen py-4 overflow-y-scroll px-2 md:w-1/3 w-2/3 bg-white fixed top-0 left-0 z-[100] transition-transform duration-300`}
//             style={{ transform: `translateX(${translateX})` }}
//         >
//             <h1 className="md:text-2xl text-xl font-semibold mb-6">Your Cart</h1>
//             {cartProducts.length > 0 ? (
//                 <div className="h-[90%] ">
//                     <div className="flex overflow-y-scroll h-[85%] flex-col">
//                         <div className="grid grid-cols-1 gap-1">
//                             {cartProducts.map((item) => (
//                                 <div
//                                     key={item.id}
//                                     className="flex items-center bg-gray-200 p-1 rounded-lg shadow-sm"
//                                 >
//                                     <div className="mr-4">
//                                         <Image
//                                             src={item.image || "/No_Image_Available.jpg"}
//                                             alt={item.title}
//                                             width={100}
//                                             height={100}
//                                             className="border rounded-md"
//                                         />
//                                     </div>
//                                     <div className="flex-1">
//                                         <h2 className="md:text-lg text-base line-clamp-2 font-medium">{item.title}</h2>
//                                         <p className="text-sm text-gray-600">${item.totalPrice.toFixed(2)}</p>
//                                         <div className="flex items-center mt-2">
//                                             <button
//                                                 onClick={() => handleQuantityChange(item.id, -1)}
//                                                 className="px-2 py-1 font-bold bg-gray-200 rounded-md hover:bg-gray-300"
//                                                 disabled={item.quantity === 1}
//                                             >
//                                                 <IoRemove size={20} />
//                                             </button>
//                                             <span className="px-4">{item.quantity}</span>
//                                             <button
//                                                 onClick={() => handleQuantityChange(item.id, 1)}
//                                                 className="px-2 py-1 font-bold bg-gray-200 rounded-md hover:bg-gray-300"
//                                             >
//                                                 <IoAddSharp size={20} />
//                                             </button>
//                                         </div>
//                                     </div>
//                                     <button
//                                         onClick={() => handleRemoveItem(item.id)}
//                                         className="ml-4 text-sm text-red-500 hover:text-red-700"
//                                     >
//                                         <RiDeleteBin6Fill size={25} />
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <div className="flex justify-between items-center mt-6">
//                         <Link href="/Checkout" className="bg-black text-white border-2 border-black hover:bg-white hover:text-white p-2 rounded-lg">
//                             Continue to checkout
//                         </Link>
//                         <div className="text-lg font-semibold">
//                             Total Price: ${totalPrice.toFixed(2)}
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <div className=" h-screen">
//                     <p className="px-2 mb-4">Your cart is empty.</p>
//                     <div className="w-full h-1/2 items-center flex justify-center">
//                         <BsCartX size={80} className="text-gray-400" />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }



import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/cartContext";
import Link from "next/link";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoAddSharp, IoRemove } from "react-icons/io5";
import Image from "next/image";
import { BsCartX } from "react-icons/bs";
import { TbXboxX } from "react-icons/tb";

export default function SideDropDownCart({ ShowCart, ShowTheSideMenu }) {
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
                        totalPrice: totalPrice // تحديث السعر الإجمالي
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
    const [translateX, setTranslateX] = useState("-100%");

    useEffect(() => {
        if (ShowCart) {
            setTranslateX("0");
        } else {
            setTranslateX("-100%");
        }
    }, [ShowCart]);

    return (
        <div
            className={`h-screen border-r-2 border-r-gray-300 py-4 px-2 md:w-1/3 w-2/3 bg-white fixed top-0 left-0 z-[100] transition-transform duration-300`}
            style={{ transform: `translateX(${translateX})` }}
        >
            <h1 className="md:text-2xl relative text-xl font-semibold text-center border-b-2 mb-1">
                سلة التسوق الخاصة بك
                <div onClick={() => ShowTheSideMenu()} className=" absolute -top-2 right-1">
                    <TbXboxX />
                </div>
            </h1>
            {cartProducts.length > 0 ? (
                <div className="h-[90%] ">
                    <div className="flex overflow-y-scroll h-[90%] border-2 rounded-lg flex-col">
                        <div className="grid grid-cols-1 gap-1">
                            {cartProducts.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center bg-gray-200 p-1 rounded-lg shadow-sm"
                                >
                                    <div className="mr-4">
                                        <Image
                                            src={item.image || "/No_Image_Available.jpg"}
                                            alt={item.title}
                                            width={100}
                                            height={100}
                                            className="border rounded-md"
                                        />
                                    </div>
                                    <div className="flex-1 text-right">
                                        <h2 className="md:text-lg text-base line-clamp-2 font-medium">{item.title}</h2>
                                        <p className="text-sm text-gray-600">MAD {item.totalPrice.toFixed(2)} </p>
                                        <div className="flex justify-center items-center mt-2">
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
                    </div>
                    <div className="flex justify-between items-center mt-6">
                        <Link href="/cart" className="bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-all duration-200 p-2 rounded-lg">
                            تأكيد الطلب
                        </Link>
                        <div className="md:text-lg text-base flex gap-1 font-semibold">
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
                <div className=" h-screen">
                    <p className="px-2 mb-4 text-right">. سلة التسوق فارغة  </p>
                    <div className="w-full h-1/2 items-center flex justify-center">
                        <BsCartX size={80} className="text-gray-400" />
                    </div>
                </div>
            )}
        </div>
    );
}
