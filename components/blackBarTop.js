import Link from "next/link";
import { FaFacebook ,FaWhatsappSquare } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";

function BlackBarTop() {
  return (
    <div className=" fixed z-50 top-0 left-0 right-0">
      <div className="flex justify-between px-5 py-2 items-center text-white bg-black">
        <div className="w-40 ">
          <Link href="tel:+212 620 397 592" className="justify-between items-center flex">
              <FaWhatsappSquare className="md:flex hidden text-[23.69px]"/>
              <p className="">+212 620 397 592</p>
          </Link>
        </div>
        <p className="text-[23.69px]">التوصيل بالمجان ابتداءا من 249 درهم</p>
        <div className="w-40 flex justify-end">
          <div className="flex text-[23.69px] w-24 justify-between">
              <Link target='_blank' href={'https://www.facebook.com/profile.php?id=100069789726333'}><FaFacebook/></Link>
              <Link target='_blank' href={'https://wa.me/+212 620 397 592'}><FaWhatsappSquare/></Link>
              <Link target='_blank' href={'https://www.instagram.com/awani_abdo_tacharok/'}></Link><TiSocialInstagram/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlackBarTop
