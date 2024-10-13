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


// export default function NavBarInterface() {
//     const {conversionRate,currencyWanted,setCurrencyWanted,setConversionRate} = useContext(converterCurrency)
//     const router = useRouter();
//     const  {data:session} = useSession()
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


//     const [menuIsShow,setMenuIsShow]=useState(false)
//     const [showUserMenu , setShowUserMenu]=useState(false)
//     const [showConverterCurrency,setShowConverterCurrency]=useState(false)

//     function goToLoginPage() {
//         router.push('/Login');
//     }
//     function showMenu(){
//         setMenuIsShow(!menuIsShow)
//     }

    
//     function ShowConverterCurrencyFunction(){
//         setShowConverterCurrency(!showConverterCurrency)
//     }
//     return (
//         <div className="fixed top-0 left-0 w-screen py-1 bg-yellow-950 bg-opacity-50 z-30 border-b">
//             <div className="flex justify-between items-center px-2 md:px-4 lg:px-10">
//                 <div className="block px-3 pr-5 md:hidden lg:hidden">
//                     <svg onClick={showMenu} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white font-bold cursor-pointer size-6">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//                     </svg>
//                     {menuIsShow &&
//                         <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[2.4px] bg-black/70">
//                             <div className=" absolute left-5 z-30 top-3">
//                                 <svg onClick={showMenu} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white cursor-pointer hover:size-[1.6rem] transition-all font-bold">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
//                                 </svg>
//                             </div>
//                             <ul className="grid gap-1 w-full py-6 bg-white/15 backdrop-blur-[2px]">
//                                 <Link href='/'className="text-white text-opacity-75 hover:text-opacity-100 hover:border-y-[2.5px] font-semibold hover:tracking-[0.2em] transition-all cursor-pointer text-center w-full py-4">Home</Link>
//                                 <Link href="/A&Q" className="text-white text-opacity-75 hover:text-opacity-100 hover:border-y-[2.5px] font-semibold hover:tracking-[0.2em] transition-all cursor-pointer text-center w-full py-4">Q&A</Link>
//                                 <Link href="/shope" className="text-white text-opacity-75 hover:text-opacity-100 hover:border-y-[2.5px] font-semibold hover:tracking-[0.2em] transition-all cursor-pointer text-center w-full py-4">Shop</Link>
//                                 <Link href="/contact" className="text-white text-opacity-75 hover:text-opacity-100 hover:border-y-[2.5px] font-semibold hover:tracking-[0.2em] transition-all pb-1 cursor-pointer text-center w-full py-4">Contact us</Link>
//                             </ul>
//                         </div>
                        
//                     }


//                 </div>
//                 <div className="bg-yellow-50 p-1 rounded-full font-bold">
//                     <Link href="/"><img src="../logo.png" className="h-8 w-8 !p-0" alt="logo" /></Link>
//                 </div>
//                 <ul className="hidden md:flex ml-3 md:gap-4 lg:gap-9">
//                     <li><Link href="/" className="text-white text-opacity-75 hover:text-opacity-100 hover:border-b-[2.5px] font-semibold transition-all pb-1 cursor-pointer">Home</Link></li>
//                     <li><Link href="/A&Q" className="text-white text-opacity-75 hover:text-opacity-100 hover:border-b-[2.5px] font-semibold transition-all pb-1 cursor-pointer">A&Q</Link></li>
//                     <li><Link href="/shope" className="text-white text-opacity-75 hover:text-opacity-100 hover:border-b-[2.5px] font-semibold transition-all pb-1 cursor-pointer">Shop</Link></li>
//                     <li><Link href="/contact" className="text-white text-opacity-75 hover:text-opacity-100 hover:border-b-[2.5px] font-semibold transition-all pb-1 cursor-pointer">Contact us</Link></li>

//                 </ul>
//                 <div className="flex items-center gap-2 md:gap-4">
//                     <button onClick={ShowConverterCurrencyFunction}  className="flex group-[]: px-1 items-center py-1 group relative hover:bg-yellow-600 bg-white   rounded-full">
//                     <MdOutlineCurrencyExchange size={20} className=" text-slate-600 group-hover:text-white" />
//                     <span className="text-xs group-hover:text-white text-slate-600">_{currencyWanted||'MAD'}</span>
//                     </button>
//                     <div onClick={ShowConverterCurrencyFunction} className={showConverterCurrency? 'block absolute inset-0  w-screen h-screen ': "hidden" }>
//                         <div className={`absolute top-12 right-2`} onClick={(e)=>{e.stopPropagation()}}>
//                             <LanguageCurrencySettings/>
//                         </div>
//                     </div>
//                     {!session?
//                         <button onClick={goToLoginPage} className={"bg-yellow-600 rounded-xl px-3 py-1  border-yellow-50 border-[1.2px] text-white font-semibold hover:bg-white hover:text-yellow-900"}>
//                             Login
//                         </button>
//                     :
//                     <div>
//                         <button onClick={()=>setShowUserMenu(!showUserMenu)} className="flex justify-center bg-yellow-600 gap-1 text-white  rounded-full overflow-hidden">
//                             <span className=" text-sm p-2 relative"><FaUserAlt/></span>
//                         </button>
//                         {showUserMenu&&
//                         <div onClick={()=>setShowUserMenu(!showUserMenu)} className={showUserMenu? 'block absolute inset-0  w-screen h-screen ': "hidden" }>
//                             <div className=" absolute top-12 right-3 md:right-14 lg:right-20 text-black flex flex-col rounded-lg  justify-start bg-white border-x-2 border-slate-300 border-t-2">
//                                 <h1 className="text-center border-b-2 border-slate-300 p-1">Hi,{session?.user?.image}<span className="font-semibold">{session?.user?.name}</span></h1>
//                                 <button className="border-b-2 border-slate-300 p-2 hover:bg-zinc-200 "  onClick={() => signOut({ callbackUrl: '/' })}>
//                                     <span className="flex gap-3 items-center justify-between">
//                                         Logout
//                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//                                             <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
//                                         </svg>
//                                     </span>
//                                 </button>
//                           {session.user.role==='admin'&&
//                                <Link className="border-b-2 border-slate-300 p-2 hover:bg-zinc-200 " href={'/dashbordAdmine'}>
//                                     <span className="flex gap-3 items-center justify-between">
//                                         Dashboard
//                                         <RiDashboardHorizontalLine size={25} />
//                                     </span>
//                                 </Link>}
//                                 <Link className="border-b-2 rounded-b-lg border-slate-300 p-2 hover:bg-zinc-200 " href={'/account'}>
//                                     <span className="flex gap-3 items-center justify-between">
//                                         Account
//                                         <MdOutlineAccountBox size={25} />
//                                     </span>
//                                 </Link>
//                             </div>
//                         </div>
//                         }
//                   </div>
//                     }
//                 </div>
//             </div>
//         </div>
//     );
// }
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaUserAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { MdOutlineAccountBox } from "react-icons/md";
import LanguageCurrencySettings from "@/components/SettingsLangCurr";
import { useContext } from "react";
import { converterCurrency } from "@/components/currencyConverter";
import axios from "axios";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import Image from "next/image";


export default function Nav_bar_interface({classNameGlobal , classNameMenuUserIcon}) {
    const {conversionRate,currencyWanted,setCurrencyWanted,setConversionRate} = useContext(converterCurrency)
    const router = useRouter();
    const  {data:session} = useSession()
    useEffect(() => {
        const dateOfLastUpdate = new Date(localStorage.getItem("DateOfLastConversionRate"));
        const newDate = new Date();

        if (dateOfLastUpdate) {
            const lastUpdateDate = new Date(dateOfLastUpdate);
            const dateDifference = (newDate - lastUpdateDate) / (1000 * 60 * 60 * 24); 
            if (dateDifference > 1) {
                axios.get('https://api.exchangerate-api.com/v4/latest/MAD').then((response) => {
                    const rates = response.data.rates;
                    setConversionRate(rates);
                    localStorage.setItem('DateOfLastConversionRate', newDate.toISOString());
                    localStorage.setItem('conversionRate', JSON.stringify(rates));
                }).catch(error => {
                    console.error('Error fetching conversion rates:', error);
                });
            } else {
                const storedRates = localStorage.getItem('conversionRate');
                if (storedRates) {
                    setConversionRate(JSON.parse(storedRates));
                }
            }
        } else {
            axios.get('https://api.exchangerate-api.com/v4/latest/MAD').then((response) => {
                const rates = response.data.rates;
                setConversionRate(rates);
                localStorage.setItem('DateOfLastConversionRate', newDate.toISOString());
                localStorage.setItem('conversionRate', JSON.stringify(rates));
            }).catch(error => {
                console.error('Error fetching conversion rates:', error);
            });
        }
    }, []);


    const [menuIsShow,setMenuIsShow]=useState(false)
    const [showUserMenu , setShowUserMenu]=useState(false)
    const [showConverterCurrency,setShowConverterCurrency]=useState(false)

    function goToLoginPage() {
        router.push('/Login');
    }
    function showMenu(){
        setMenuIsShow(!menuIsShow)
    }

    
    function ShowConverterCurrencyFunction(){
        setShowConverterCurrency(!showConverterCurrency)
    }
    return (
        <div className={"w-screen bg-white border-b border"+classNameGlobal}>
            <div className="flex justify-between items-center px-2 md:px-4 lg:px-10">
                <div className="block px-3 pr-5 md:hidden lg:hidden">
                    <svg onClick={showMenu} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-black font-bold cursor-pointer size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    {menuIsShow &&
                        <div onClick={showMenu} className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[2.4px] bg-black/70">
                            <div className=" absolute left-5 z-30 top-3">
                                <svg onClick={showMenu} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white cursor-pointer hover:size-[1.6rem] transition-all font-bold">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <ul onClick={(e)=>{e.stopPropagation()}} className="grid gap-1 w-full py-6 bg-white/15 backdrop-blur-[2px]">
                                <Link href='/'className="text-white text-opacity-75 hover:text-opacity-100 hover:border-y-[2.5px] font-semibold hover:tracking-[0.2em] transition-all cursor-pointer text-center w-full py-4">Home</Link>
                                <Link href="/About" className="text-white text-opacity-75 hover:text-opacity-100 hover:border-y-[2.5px] font-semibold hover:tracking-[0.2em] transition-all cursor-pointer text-center w-full py-4">About</Link>
                                <Link href="/Shop" className="text-white text-opacity-75 hover:text-opacity-100 hover:border-y-[2.5px] font-semibold hover:tracking-[0.2em] transition-all cursor-pointer text-center w-full py-4">Shop</Link>
                                <Link href="/Contact" className="text-white text-opacity-75 hover:text-opacity-100 hover:border-y-[2.5px] font-semibold hover:tracking-[0.2em] transition-all pb-1 cursor-pointer text-center w-full py-4">Contact us</Link>
                            </ul>
                        </div>
                        
                    }


                </div>
                <div className="p-0 rounded-full font-bold">
                    <Link href="/"><Image width={80} height={80} src="/logo.webp" loading="lazy" className="size-12 !p-0" alt="logo" /></Link>
                </div>
                <ul className="hidden md:flex ml-3 md:gap-4 lg:gap-9 text-sm">
                    <li><Link href="/" className="text-black text-opacity-75 hover:text-opacity-100 hover:border-b-[2.5px] hover:border-black/80 font-semibold transition-all pb-0 cursor-pointer">Home</Link></li>
                    <li><Link href="/About" className="text-black text-opacity-75 hover:text-opacity-100 hover:border-b-[2.5px] hover:border-black/80 font-semibold transition-all pb-0 cursor-pointer">About</Link></li>
                    <li><Link href="/Shop" className="text-black text-opacity-75 hover:text-opacity-100 hover:border-b-[2.5px] hover:border-black/80 font-semibold transition-all pb-0 cursor-pointer">Shop</Link></li>
                    <li><Link href="/Contact" className="text-black text-opacity-75 hover:text-opacity-100 hover:border-b-[2.5px] hover:border-black/80 font-semibold transition-all pb-0 cursor-pointer">Contact us</Link></li>

                </ul>
                <div className="flex items-center gap-2 md:gap-4">
                    {/* <button onClick={ShowConverterCurrencyFunction}  className="flex group-[]: px-1 items-center py-1 group relative hover:bg-yellow-600 bg-white   rounded-full">
                    <MdOutlineCurrencyExchange size={20} className=" text-slate-600 group-hover:text-white" />
                    <span className="text-xs group-hover:text-white text-slate-600">_{currencyWanted||'MAD'}</span>
                    </button>
                    <div onClick={ShowConverterCurrencyFunction} className={showConverterCurrency? 'block absolute inset-0  w-screen h-screen ': "hidden" }>
                        <div className={`absolute top-12 right-2`} onClick={(e)=>{e.stopPropagation()}}>
                            <LanguageCurrencySettings/>
                        </div>
                    </div> */}
                    {!session?
                        <button onClick={goToLoginPage} className={"bg-black rounded-xl px-3 py-1  border-black border-[1.2px] text-white font-semibold hover:bg-white hover:text-black"}>
                            Login
                        </button>
                    :
                    <div>
                        <button onClick={()=>setShowUserMenu(!showUserMenu)} className="flex justify-center bg-black gap-1 text-white  rounded-full overflow-hidden">
                            <span className=" text-sm p-2 relative"><FaUserAlt/></span>
                        </button>
                        {showUserMenu&&
                        <div onClick={()=>setShowUserMenu(!showUserMenu)} className={showUserMenu? 'block absolute inset-0  w-screen h-screen ': "hidden" }>
                            <div className={"absolute top-9 right-3 md:right-14 lg:right-20 text-black flex flex-col rounded-lg  justify-start bg-white border-x-2 border-slate-300 border-t-2 z-50"+classNameMenuUserIcon}>
                                <h1 className="text-center border-b-2 border-slate-300 p-1">Hi,{session?.user?.image}<span className="font-semibold">{session?.user?.name}</span></h1>
                                <button className="border-b-2 border-slate-300 p-2 hover:bg-zinc-200 "  onClick={() => signOut({ callbackUrl: '/' })}>
                                    <span className="flex gap-3 items-center justify-between">
                                        Logout
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                                        </svg>
                                    </span>
                                </button>
                          {session.user.role==='admin'&&
                               <Link className="border-b-2 border-slate-300 p-2 hover:bg-zinc-200 " href={'/dashbordAdmine'}>
                                    <span className="flex gap-3 items-center justify-between">
                                        Dashboard
                                        <RiDashboardHorizontalLine size={25} />
                                    </span>
                                </Link>}
                                <Link className="border-b-2 rounded-b-lg border-slate-300 p-2 hover:bg-zinc-200 " href={'/account'}>
                                    <span className="flex gap-3 items-center justify-between">
                                        Account
                                        <MdOutlineAccountBox size={25} />
                                    </span>
                                </Link>
                            </div>
                        </div>
                        }
                  </div>
                    }
                </div>
            </div>
        </div>
    );
}
