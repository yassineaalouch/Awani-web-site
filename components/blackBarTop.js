import Link from "next/link";
import { FaFacebook, FaWhatsappSquare } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti"; 
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";

function BlackBarTop() {
  return (
    <div className="fixed z-50 top-0 left-0 right-0">
      <div className="bg-gradient-to-r from-black via-gray-900 to-black px-5 py-3 shadow-lg">
        <div className="flex items-center justify-center gap-3 animate-pulse">
          <FaTruck className="text-[#6bb41e] text-2xl md:text-3xl"/>
          <p className="text-sm sm:text-base md:text-xl font-bold text-white text-center">
            <span className="text-[#6bb41e]">توصيل مجاني</span>
            {" "}للطلبات التي تزيد عن{" "}
            <span className="text-[#6bb41e]">120 درهم</span>
          </p>
          <FaTruck className="text-[#6bb41e] text-2xl md:text-3xl transform scale-x-[-1]"/>
        </div>
      </div>
    </div>
  )
}

export default BlackBarTop
