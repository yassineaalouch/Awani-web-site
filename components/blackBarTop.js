import Link from "next/link";
import { FaFacebook, FaWhatsappSquare } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";
import { FaPhoneSquareAlt } from "react-icons/fa";

function BlackBarTop() {
  return (
    <div className=" fixed z-50 top-0 left-0 right-0">
      <div className="grid grid-cols-3 px-5 py-2 items-center text-white bg-black text-sm sm:text-base md:text-lg">
        <div className="w-fit place-self-start h-full flex items-center ">
          <Link href="tel:+212 620 397 592" className="justify-start gap-2 items-center flex">
            <FaPhoneSquareAlt className="md:flex hidden text-xs sm:text-sm md:text-[23.69px]" />
            <p className="">06 20 39 75 92</p>
          </Link>
        </div>
        <p className="text-xs sm:text-sm text-center md:text-[23.69px] w-fit place-self-center h-full flex items-center">التوصيل بالمجان ابتداءا من 120 درهم</p>
        <div className="w-fit place-self-end flex justify-end h-full items-center">
          <div className="flex gap-3">
            <Link target='_blank' href={'https://www.facebook.com/profile.php?id=100069789726333'}><FaFacebook /></Link>
            <Link target='_blank' href={'https://wa.me/+212 620 397 592'}><FaWhatsappSquare /></Link>
            <Link target='_blank' href={'https://www.instagram.com/awani_abdo_tacharok/'}><TiSocialInstagram /></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlackBarTop
