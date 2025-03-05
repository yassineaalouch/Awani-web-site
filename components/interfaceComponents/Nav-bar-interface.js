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
    const [isScrolled, setIsScrolled] = useState(false)
    const router = useRouter();
    const { data: session } = useSession()

    const navigation = [
        { name: 'الرئيسية', href: '/' },
        { name: 'المتجر', href: '/Shop', onClick: () => setFilterLocal({ category: '', price: null, rating: null, order: null }) },
        { name: 'من نحن', href: '/About' },
        { name: 'اتصل بنا', href: '/contact' }
    ]
    const pathname = router.pathname;
    // Calculate total price
    const totalPrice = cartProducts.reduce((total, product) => {
        return total + (product.price * product.quantity)
    }, 0)

    // Calculate progress percentage
    const progressPercentage = Math.min((totalPrice / 120) * 100, 100)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="w-full top-0 z-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-12">
                    <div className="flex justify-between items-center h-16">
                        {/* Cart & User Menu */}


                        <div className="flex items-center space-x-4 flex-1 justify-start">
                            <div className={`fixed ${isScrolled && (pathname == '/Shop' || pathname == '/') ? 'bottom-1 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 bg-slate-100 rounded-lg text-center z-[9999]' : ''} transition-all duration-300 `}>
                                <button
                                    onClick={() => setShowSideCart(!showSideCart)}
                                    className={`${isScrolled && (pathname == '/Shop' || pathname == '/') ? 'hidden' : 'relative p-2 hover:bg-[#6bb41e]/10 rounded-full transition-all text-[#6bb41e] flex items-center gap-2'}`}
                                >
                                    <FaCartShopping className="w-6 h-6" />
                                    <div className="flex flex-col items-start">
                                        <span className="text-sm font-semibold">{totalPrice.toFixed(2)} DH</span>
                                        {totalPrice >= 120 && (
                                            <span className="text-xs text-green-500 font-medium">توصيل مجاني!</span>
                                        )}
                                    </div>
                                    {cartProducts.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                            {cartProducts.length}
                                        </span>
                                    )}
                                </button>

                                {/* Progress bar */}
                                <div className={`w-full h-2 bg-gray-200 rounded-full mt-2 ${isScrolled && (pathname == '/Shop' || pathname == '/') ? 'bg-white shadow-lg' : 'hidden'}`}>
                                    <div
                                        className={`h-full rounded-full transition-all duration-300 ${totalPrice >= 120 ? 'bg-green-500' : 'bg-[#6bb41e]'}`}
                                        style={{ width: `${progressPercentage}%` }}
                                    />
                                </div>
                                {totalPrice < 120 && (
                                    <span className={`text-xs ${isScrolled && (pathname == '/Shop' || pathname == '/') ? 'text-black' : 'text-gray-500 hidden'} mt-1`}>
                                        درهم للتوصيل المجاني {(120 - totalPrice).toFixed(2)}
                                    </span>
                                )}
                                {totalPrice >= 120 && isScrolled && (pathname == '/Shop' || pathname == '/') && (
                                    <span className="text-xs text-green-500 font-medium">توصيل مجاني!</span>
                                )}
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex lg:items-center lg:justify-center flex-1">
                            <div className="flex items-center space-x-8">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={item.onClick}
                                        className="relative text-gray-700 hover:text-[#6bb41e] transition-colors px-3 py-2 text-sm font-medium group"
                                    >
                                        {item.name}
                                        <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[#6bb41e] transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Logo & Mobile Menu Button */}
                        <div className="flex items-center flex-1 justify-end">
                            <Link href="/" className="flex gap-1 items-center ml-4">
                                <span className={isScrolled?' hidden':"font-bold text-green-950 text-lg"}>إفطار-ديليفري</span>
                                <Image width={40} height={40} src="/favicon.ico" className="h-10 w-auto" alt="logo" />
                            </Link>

                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-[#6bb41e] lg:hidden hover:bg-[#6bb41e]/10"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? (
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => {
                                        setMobileMenuOpen(false)
                                        item.onClick?.()
                                    }}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#6bb41e] hover:bg-[#6bb41e]/10"
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
