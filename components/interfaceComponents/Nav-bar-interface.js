// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useSession } from "next-auth/react";
// import { FaUserAlt } from "react-icons/fa";
// import { signOut } from "next-auth/react";
// import { RiDashboardHorizontalLine } from "react-icons/ri";
// import { MdOutlineAccountBox } from "react-icons/md";
// import LanguageCurrencySettings from "@/components/SettingsLangCurr";
// import { useContext } from "react";
// import { converterCurrency } from "@/components/currencyConverter";
// import axios from "axios";
// import { MdOutlineCurrencyExchange } from "react-icons/md";
// import Image from "next/image";
// import { FilterLocalContext } from "@/context/FilterLocalContext";
// import { FaCartShopping } from "react-icons/fa6";
// import { CartContext } from "@/context/cartContext";
// import SideDropDownCart from "@/components/SideDropDownCart";


// export default function Nav_bar_interface({ classNameGlobal, classNameMenuUserIcon }) {
//     const { setConversionRate } = useContext(converterCurrency)
//     const { setFilterLocal } = useContext(FilterLocalContext)
//     const { cartProducts, setCartProducts } = useContext(CartContext)
//     const [showSideCart, setShowSideCart] = useState(false)
//     const router = useRouter();
//     const { data: session } = useSession()

//     useEffect(() => {
//         const dateOfLastUpdate = new Date(localStorage.getItem("DateOfLastConversionRate"));
//         const newDate = new Date();

//         if (dateOfLastUpdate) {
//             const lastUpdateDate = new Date(dateOfLastUpdate);
//             const dateDifference = (newDate - lastUpdateDate) / (1000 * 60 * 60 * 24);
//             if (dateDifference > 1) {
//                 axios.get('https://api.exchangerate-api.com/v4/latest/MAD').then((response) => {
//                     const rates = response.data.rates;
//                     setConversionRate(rates);
//                     localStorage.setItem('DateOfLastConversionRate', newDate.toISOString());
//                     localStorage.setItem('conversionRate', JSON.stringify(rates));
//                 }).catch(error => {
//                     console.error('Error fetching conversion rates:', error);
//                 });
//             } else {
//                 const storedRates = localStorage.getItem('conversionRate');
//                 if (storedRates) {
//                     setConversionRate(JSON.parse(storedRates));
//                 }
//             }
//         } else {
//             axios.get('https://api.exchangerate-api.com/v4/latest/MAD').then((response) => {
//                 const rates = response.data.rates;
//                 setConversionRate(rates);
//                 localStorage.setItem('DateOfLastConversionRate', newDate.toISOString());
//                 localStorage.setItem('conversionRate', JSON.stringify(rates));
//             }).catch(error => {
//                 console.error('Error fetching conversion rates:', error);
//             });
//         }
//     }, []);


//     const [menuIsShow, setMenuIsShow] = useState(false)
//     const [showUserMenu, setShowUserMenu] = useState(false)
//     const [showConverterCurrency, setShowConverterCurrency] = useState(false)

//     function goToLoginPage() {
//         router.push('/Login');
//     }
//     function showMenu() {
//         setMenuIsShow(!menuIsShow)
//     }

//     function ShowTheSideMenu() {
//         setShowSideCart(!showSideCart)
//     }

//     return (
//         <div >
//             <div className={"w-screen  bg-white border-b border" + classNameGlobal}>
//                 <div className="flex justify-between items-center px-2 md:px-4 lg:px-10">
//                     <div className="block px-3 pr-5 md:hidden lg:hidden">
//                         {/* <svg onClick={showMenu} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-black font-bold cursor-pointer size-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//                         </svg>
//                         {menuIsShow &&
//                             <div onClick={showMenu} className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[2.4px] bg-black/70">
//                                 <div className=" absolute left-5 z-30 top-3">
//                                     <svg onClick={showMenu} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white cursor-pointer hover:size-[1.6rem] transition-all font-bold">
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
//                                     </svg>
//                                 </div>
//                                 <ul onClick={(e) => { e.stopPropagation() }} className="grid gap-1 w-full py-6 bg-white/15 backdrop-blur-[2px]">
//                                     <Link href='/' className="text-white text-opacity-75 hover:text-opacity-100 hover:border-y-[2.5px] font-semibold hover:tracking-[0.2em] transition-all cursor-pointer text-center w-full py-4">الرئيسية</Link>
//                                     <Link href="/About" className="text-white text-opacity-75 hover:text-opacity-100 hover:border-y-[2.5px] font-semibold hover:tracking-[0.2em] transition-all cursor-pointer text-center w-full py-4">من نحن</Link>
//                                     <Link onClick={() => { setFilterLocal({ category: '', price: null, rating: null, order: null }) }} href="/Shop" className="text-white text-opacity-75 hover:text-opacity-100 hover:border-y-[2.5px] font-semibold hover:tracking-[0.2em] transition-all cursor-pointer text-center w-full py-4">المتجر</Link>
//                                     <Link href="/contact" className="text-white text-opacity-75 hover:text-opacity-100 hover:border-y-[2.5px] font-semibold hover:tracking-[0.2em] transition-all pb-1 cursor-pointer text-center w-full py-4">اتصل بنا</Link>
//                                 </ul>
//                             </div>

//                         } */}


//                     </div>
//                     <div className="p-0 rounded-full font-bold">
//                         <Link href="/"><Image width={80} height={80} src="/logo.webp" loading="lazy" className="size-12 !p-0" alt="logo" /></Link>
//                     </div>
//                     <ul className="hidden md:flex ml-3 md:gap-4 lg:gap-9 text-sm">
//                         <li><Link href="/" className="text-black text-opacity-75 hover:text-opacity-100 hover:border-b-[2.5px] hover:border-black/80 font-semibold transition-all pb-0 cursor-pointer">الرئيسية</Link></li>
//                         <li><Link href="/About" className="text-black text-opacity-75 hover:text-opacity-100 hover:border-b-[2.5px] hover:border-black/80 font-semibold transition-all pb-0 cursor-pointer">من نحن</Link></li>
//                         <li><Link onClick={() => { setFilterLocal({ category: '', price: null, rating: null, order: null }) }} href="/Shop" className="text-black text-opacity-75 hover:text-opacity-100 hover:border-b-[2.5px] hover:border-black/80 font-semibold transition-all pb-0 cursor-pointer">المتجر</Link></li>
//                         <li><Link href="/contact" className="text-black text-opacity-75 hover:text-opacity-100 hover:border-b-[2.5px] hover:border-black/80 font-semibold transition-all pb-0 cursor-pointer">اتصل بنا</Link></li>

//                     </ul>
//                     <div className="flex items-center gap-2 md:gap-4">
//                         <button onClick={() => ShowTheSideMenu()} className="relative pt-3 mx-2 ">
//                             <FaCartShopping size={25} className="z-40" />
//                             <div className="text-sm bg-red-500 px-[3px] text-[18px] text-white font-light rounded-full absolute bottom-3 left-4">
//                                 {cartProducts.length}
//                             </div>
//                         </button>
//                         {/* {!session ?
//                             <button onClick={goToLoginPage} className={"bg-black rounded-xl px-3 py-1  border-black border-[1.2px] text-white font-semibold hover:bg-white hover:text-black"}>
//                                 تسجيل الدخول
//                             </button>
//                             :
//                             <div>
//                                 <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex justify-center bg-black gap-1 text-white  rounded-full overflow-hidden">
//                                     <span className=" text-sm p-2 relative"><FaUserAlt /></span>
//                                 </button>

//                                 {showUserMenu &&
//                                     <div onClick={() => setShowUserMenu(!showUserMenu)} className={showUserMenu ? 'block absolute inset-0  w-screen h-screen ' : "hidden"}>
//                                         <div className={"absolute top-9 right-3 md:right-14 lg:right-20 text-black flex flex-col rounded-lg  justify-start bg-white border-x-2 border-slate-300 border-t-2 z-40" + classNameMenuUserIcon}>
//                                             <h1 className="text-center border-b-2 border-slate-300 p-1">مرحباً،{session?.user?.image}<span className="font-semibold">{session?.user?.name}</span></h1>
//                                             <button className="border-b-2 border-slate-300 p-2 hover:bg-zinc-200 " onClick={() => signOut({ callbackUrl: '/' })}>
//                                                 <span className="flex gap-3 items-center justify-between">
//                                                     تسجيل الخروج
//                                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
//                                                     </svg>
//                                                 </span>
//                                             </button>
//                                             {session.user.role === 'admin' &&
//                                                 <Link className="border-b-2 border-slate-300 p-2 hover:bg-zinc-200 " href={'/dashbordAdmine'}>
//                                                     <span className="flex gap-3 items-center justify-between">
//                                                         لوحة التحكم
//                                                         <RiDashboardHorizontalLine size={25} />
//                                                     </span>
//                                                 </Link>}
//                                             <Link className="border-b-2 rounded-b-lg border-slate-300 p-2 hover:bg-zinc-200 " href={'/account'}>
//                                                 <span className="flex gap-3 items-center justify-between">
//                                                     الحساب
//                                                     <MdOutlineAccountBox size={25} />
//                                                 </span>
//                                             </Link>
//                                         </div>
//                                     </div>
//                                 }
//                             </div>
//                         } */}

//                     </div>
//                 </div>
//             </div>
//             <div className="">
//                 <SideDropDownCart ShowTheSideMenu={ShowTheSideMenu} ShowCart={showSideCart} />
//             </div>
//         </div>
//     );
// }
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useContext } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaUserAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { MdOutlineAccountBox } from "react-icons/md";
import Image from "next/image";
import { FilterLocalContext } from "@/context/FilterLocalContext";
import { FaCartShopping } from "react-icons/fa6";
import { CartContext } from "@/context/cartContext";
import SideDropDownCart from "@/components/SideDropDownCart";

export default function Nav_bar_interface({ classNameGlobal }) {
    const { setFilterLocal } = useContext(FilterLocalContext)
    const { cartProducts } = useContext(CartContext)
    const [showSideCart, setShowSideCart] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const router = useRouter();
    const { data: session } = useSession()

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/Shop', onClick: () => setFilterLocal({ category: '', price: null, rating: null, order: null }) },
        { name: 'About', href: '/About' },
        { name: 'Contact', href: '/contact' }
    ]

    return (
        <div className=" w-full top-0 z-50">
            <nav className="bg-white/80 backdrop-blur-md shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-12">
                    <div className="flex justify-between items-center h-12">
                        {/* Logo & Mobile Menu Button */}
                        <div className="flex items-center flex-1 ml-2 sm:ml-4">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-1 rounded-md text-gray-700 lg:hidden"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? (
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>

                            <Link href="/" className="flex gap-2 items-center">
                                <Image width={32} height={32} src="/logo.webp" className="h-6 w-auto" alt="logo" />
                                <span className="font-semibold text-gray-900 text-sm">iftar-Delivery</span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex lg:items-center lg:justify-center flex-1">
                            <div className="flex items-center space-x-8">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={item.onClick}
                                        className="relative text-gray-700 hover:text-black transition-colors px-2 py-1 rounded-md text-xs font-medium group"
                                    >
                                        {item.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Cart & User Menu */}
                        <div className="flex items-center space-x-3 flex-1 justify-end mr-2 sm:mr-4">
                            <button
                                onClick={() => setShowSideCart(!showSideCart)}
                                className="relative p-1 hover:bg-gray-100 rounded-lg transition-all"
                            >
                                <FaCartShopping className="w-5 h-5" />
                                {cartProducts.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                        {cartProducts.length}
                                    </span>
                                )}
                            </button>

                            {!session ? (
                                <button
                                    onClick={() => router.push('/Login')}
                                    className="bg-black text-white px-3 py-1 rounded-lg text-xs relative overflow-hidden transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:w-full before:h-0 before:bg-white before:transition-all before:duration-300 hover:before:h-full hover:text-black before:-z-10 z-10 hover:shadow-lg"
                                >
                                    Login
                                </button>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="p-1 hover:bg-gray-100 rounded-lg transition-all"
                                    >
                                        <FaUserAlt className="w-4 h-4" />
                                    </button>

                                    {userMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                                            <div className="px-4 py-2 border-b text-xs">
                                                Hi, <span className="font-semibold">{session?.user?.name}</span>
                                            </div>
                                            {session.user.role === 'admin' && (
                                                <Link href="/dashbordAdmine" className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 flex items-center">
                                                    <RiDashboardHorizontalLine className="w-4 h-4 mr-2" />
                                                    Dashboard
                                                </Link>
                                            )}
                                            <Link href="/account" className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 flex items-center">
                                                <MdOutlineAccountBox className="w-4 h-4 mr-2" />
                                                Account
                                            </Link>
                                            <button
                                                onClick={() => signOut({ callbackUrl: '/' })}
                                                className="w-full px-4 py-2 text-xs text-red-600 hover:bg-gray-100 flex items-center"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="lg:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => {
                                        setMobileMenuOpen(false)
                                        item.onClick?.()
                                    }}
                                    className="block px-3 py-1 rounded-md text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            <SideDropDownCart ShowTheSideMenu={() => setShowSideCart(!showSideCart)} ShowCart={showSideCart} />
        </div>
    );
}
