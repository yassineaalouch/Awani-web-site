import { FaFacebook } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import MapLocation from "@/components/MapLocation";
import Link from "next/link";

export default function Footer(props) {
    return (
        <>
        <footer className={`bg-gray-900 mt-0 text-white py-8 ${props.className}`} >
            <div className="container mx-auto px-4">
                <div className="flex justify-center flex-wrap">

                    {/* قسم الروابط السريعة */}
                    <div className="w-fit  px-4 mb-8 sm:mb-0 text-right">
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
                    <div className="w-2/12  px-4 mb-8 sm:mb-0 text-right">
                        <h2 className="font-bold text-xl mb-4">اتصل بنا</h2>
                        <p className="text-gray-400">
                            المحل بتط مليل، بالقرب من مقهى إولي
                            <br />
                            +212 620 397 592
                        </p>
                    </div>

                    {/* قسم مواقع التواصل الاجتماعي */}
                    <div className="w-fit  px-4 mb-8 sm:mb-0 text-right">
                        <h2 className="font-bold text-xl mb-4">تابعونا</h2>
                        <div className="flex justify-end ">
                            <ul className="flex-col gap-5 flex">
                                <li>
                                    <a href="https://www.dadant.com/">
                                        <FaFacebook className="text-white hover:text-blue-500 transition-colors duration-200" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <TiSocialInstagram className="text-white hover:text-pink-500 transition-colors duration-200" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <FaXTwitter className="text-white hover:text-blue-400 transition-colors duration-200" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* قسم عن المحل */}
                    <div className="w-5/12  px-4 mb-8 sm:mb-0 text-right ">
                        <h2 className="font-bold text-xl mb-4"> من نحن</h2>
                        <p className="text-gray-400">
                            مرحبًا بكم في محل عبدو للأواني، حيث ستجدون جميع أنواع الأواني وديكورات المطبخ، سواء العصرية أو التقليدية، بجودة عالية وتشكيلة متنوعة. يمكنكم اليوم الطلب مباشرة عبر الموقع، مع توصيل مجاني ابتداءً من 250 درهم. طلبكم سيصل في غضون 3 أيام كحد أقصى. لا تفوتوا الفرصة، شرفونا بزيارتكم في المحل بتط مليل، بالقرب من مقهى إولي، واستمتعوا بتجربة تسوق مميزة!
                        </p>
                    </div>

                </div>
            </div>
            <div className="px-5 mt-10">
                <MapLocation />
            </div>
        </footer>
        </>
    );
}
