import { FaFacebook } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import MapLocation from "@/components/MapLocation";
import Link from "next/link";

export default function Footer(props) {
    return (
        <>
            <footer className={`bg-gray-950 mt-0 text-white py-12 ${props.className}`}>
                <div className="w-full md:w-10/12 mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Quick Links Section */}
                        <div className="text-center sm:text-right">
                            <h2 className="font-bold text-xl mb-6">روابط سريعة</h2>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">الرئيسية</Link>
                                </li>
                                <li>
                                    <Link href="/About" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">عن المحل</Link>
                                </li>
                                <li>
                                    <Link href="/Shop" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">المتجر</Link>
                                </li>
                                <li>
                                    <Link href="/Contact" className="text-gray-400 hover:text-yellow-500 transition-colors duration-200">اتصل بنا</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Section */}
                        <div className="text-center sm:text-right">
                            <h2 className="font-bold text-xl mb-6">اتصل بنا</h2>
                            <div className="space-y-3">
                                <p className="text-gray-400">+212 620 397 592</p>
                                <p className="text-gray-400">info@example.com</p>
                                <p className="text-gray-400">العنوان، المدينة</p>
                            </div>
                        </div>

                        {/* Business Hours Section */}
                        <div className="text-center sm:text-right">
                            <h2 className="font-bold text-xl mb-6">ساعات العمل</h2>
                            <div className="space-y-3">
                                <p className="text-gray-400">الإثنين - الجمعة: 9:00 - 18:00</p>
                                <p className="text-gray-400">السبت: 9:00 - 14:00</p>
                                <p className="text-gray-400">الأحد: مغلق</p>
                            </div>
                        </div>

                        {/* Social Media Section */}
                        <div className="text-center sm:text-right md:pl-10">
                            <h2 className="font-bold text-xl mb-6">تابعونا</h2>
                            <div className="flex justify-center sm:justify-end space-x-4">
                                <Link href="https://www.facebook.com/profile.php?id=100069789726333" className="hover:transform hover:scale-110 transition-transform duration-200">
                                    <FaFacebook className="text-white hover:text-blue-500 transition-colors duration-200 text-2xl" />
                                </Link>
                                <Link href="https://www.instagram.com/awani_abdo_tacharok/" className="hover:transform hover:scale-110 transition-transform duration-200">
                                    <TiSocialInstagram className="text-white hover:text-pink-500 transition-colors duration-200 text-2xl" />
                                </Link>
                                <Link href="#" className="hover:transform hover:scale-110 transition-transform duration-200">
                                    <FaXTwitter className="text-white hover:text-blue-400 transition-colors duration-200 text-2xl" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
