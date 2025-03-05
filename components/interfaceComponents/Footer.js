import { FaFacebook } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";
import Link from "next/link";

export default function Footer(props) {
    return (
        <>
            <footer className={`bg-[#2d2d2d] mt-0 text-white py-12 ${props.className}`}>
                <div className="w-full md:w-10/12 mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Quick Links Section */}
                        <div className="text-center sm:text-right">
                            <h2 className="font-bold text-xl mb-6 text-[#f5d7b5]">روابط سريعة</h2>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/" className="text-[#e0e0e0] hover:text-[#6bb41e] transition-colors duration-200">الرئيسية</Link>
                                </li>
                                <li>
                                    <Link href="/About" className="text-[#e0e0e0] hover:text-[#6bb41e] transition-colors duration-200">عن المحل</Link>
                                </li>
                                <li>
                                    <Link href="/Shop" className="text-[#e0e0e0] hover:text-[#6bb41e] transition-colors duration-200">المتجر</Link>
                                </li>
                                <li>
                                    <Link href="/Contact" className="text-[#e0e0e0] hover:text-[#6bb41e] transition-colors duration-200">اتصل بنا</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Section */}
                        <div className="text-center sm:text-right">
                            <h2 className="font-bold text-xl mb-6 text-[#f5d7b5]">اتصل بنا</h2>
                            <div className="space-y-3">
                                <p className="text-[#e0e0e0]">+212 642733682</p>
                                <p className="text-[#e0e0e0]">yaalouch77@gmail.com</p>
                            </div>
                        </div>

                        {/* Business Hours Section */}
                        <div className="text-center sm:text-right">
                            <h2 className="font-bold text-xl mb-6 text-[#f5d7b5]">ساعات العمل</h2>
                            <div className="space-y-3">
                                <p className="text-[#e0e0e0]">كل يوم: 8:00 - قبل المغرب بثلاث ساعات ونصف</p>
                            </div>
                        </div>

                        {/* Social Media Section */}
                        <div className="text-center sm:text-right md:pl-10">
                            <h2 className="font-bold text-xl mb-6 text-[#f5d7b5]">تابعونا</h2>
                            <div className="flex justify-center sm:justify-end space-x-4">
                                <Link href="https://www.facebook.com/profile.php?id=61556799719161" className="hover:transform hover:scale-110 transition-transform duration-200">
                                    <FaFacebook className="text-[#e0e0e0] hover:text-[#6bb41e] transition-colors duration-200 text-2xl" />
                                </Link>
                                <Link href="https://www.instagram.com/cuisine.ma_/?hl=fr" className="hover:transform hover:scale-110 transition-transform duration-200">
                                    <TiSocialInstagram className="text-[#e0e0e0] hover:text-[#6bb41e] transition-colors duration-200 text-2xl" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
