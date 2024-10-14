import { FaFacebook } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import MapLocation from "@/components/MapLocation";
import Link from "next/link";

export default function Footer(props) {
    return (
        <>
        <footer className={`bg-gray-950 mt-0 text-white py-8 ${props.className}`} >
            <div className="container mx-auto px-0">
                <div className="grid grid-cols-1 md:grid-cols-12 text-center md:text-right">

                    {/* قسم الروابط السريعة */}
                    <div className="w-full md:col-span-2 px-4 mb-8 sm:mb-0">
                        <h2 className="font-bold text-xl mb-4">روابط سريعة</h2>
                        <ul>
                            <li className="mb-2">
                                <Link href="/" className="text-gray-400 hover:text-yellow-500">الرئيسية</Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/About" className="text-gray-400 hover:text-yellow-500">عن المحل</Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/Shop" className="text-gray-400 hover:text-yellow-500">المتجر</Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/Contact" className="text-gray-400 hover:text-yellow-500">اتصل بنا</Link>
                            </li>
                        </ul>
                    </div>

                    {/* قسم الاتصال */}
                    <div className="w-full md:col-span-2 px-4 mb-8 sm:mb-0 ">
                        <h2 className="font-bold text-xl mb-4">اتصل بنا</h2>
                        <p className="text-gray-400">
                            المحل بتط مليل، بالقرب من مقهى إولي
                            <br />
                            +212 620 397 592
                        </p>
                    </div>

                    {/* قسم مواقع التواصل الاجتماعي */}
                    <div className="w-full md:col-span-2 px-4 mb-8 sm:mb-0">
                        <h2 className="font-bold text-xl mb-4">تابعونا</h2>
                        <div className="flex justify-center md:justify-end">
                            <ul className="flex-col gap-5 flex">
                                <li>
                                    <Link href="https://www.facebook.com/profile.php?id=100069789726333">
                                        <FaFacebook className="text-white hover:text-blue-500 transition-colors duration-200" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://www.instagram.com/awani_abdo_tacharok/">
                                        <TiSocialInstagram className="text-white hover:text-pink-500 transition-colors duration-200" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">
                                        <FaXTwitter className="text-white hover:text-blue-400 transition-colors duration-200" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/*  big screen قسم عن المحل */}
                    <div className="w-full hidden md:block md:col-span-6 px-4 mb-8 sm:mb-0 ">
                        <h2 className="font-bold text-xl mb-4"> من نحن</h2>
                        <p className="text-gray-400">
                            مرحبًا بكم في محل عبدو للأواني، حيث ستجدون جميع أنواع الأواني وديكورات المطبخ، سواء العصرية أو التقليدية، بجودة عالية وتشكيلة متنوعة. يمكنكم اليوم الطلب مباشرة عبر الموقع، مع توصيل مجاني ابتداءً من 250 درهم. طلبكم سيصل في غضون 3 أيام كحد أقصى. لا تفوتوا الفرصة، شرفونا بزيارتكم في المحل بتط مليل، بالقرب من مقهى إولي، واستمتعوا بتجربة تسوق مميزة!
                        </p>
                    </div>

                </div>
            </div>
            <div className="px-5 mt-10">
                    <div className="grid md:grid-cols-2 text-center gap-5 px-10 my-10">
                        <div>
                            <h2 className="pb-3 text-[1.1rem] ">
                                المحل الأول   
                            </h2>
                            <div className="border-gray-300 rounded-md border-2">
                                <MapLocation url ={"https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3324.2424337578495!2d-7.527050524303916!3d33.573054173341134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDM0JzIzLjAiTiA3wrAzMScyOC4xIlc!5e0!3m2!1sen!2sma!4v1728853045680!5m2!1sen!2sma"}/>
                            </div>
                        </div>
                        <div>
                            <h2 className="pb-3 text-[1.1rem] ">
                                المحل التاني   
                            </h2>
                            <div className="border-gray-300 rounded-md border-2">
                                <MapLocation url={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251.9952181389887!2d-7.483418606436457!3d33.54892934301149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda634dfc387e70d%3A0x9d353339dee9142e!2sGGX8%2BHP9%2C%20Bd%20Bassatine%2C%20Titt%20Mellilen!5e0!3m2!1sen!2sma!4v1728420838452!5m2!1sen!2sma"}/>
                            </div>
                        </div>
                    </div>
            </div>
        </footer>
        </>
    );
}
