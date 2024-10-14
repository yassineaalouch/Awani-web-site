import Link from 'next/link';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function ContactCard({ email, phone, address }) {
  return (
    <div className="mx-auto flex bg-white flex-col items-end rounded-xl h-full text-right shadow-lg overflow-hidden w-full">
      <div className="md:flex ">
        <div className="p-8">
          <h3 className="text-xl md:text-2xl font-bold mb-10 text-gray-900">معلومات الاتصال</h3>

          <div className="mt-4 flex md:text-md text-sm flex-col gap-7 w-full ">
            <p className="text-gray-700 flex gap-3 justify-end items-center">
              <strong className="ml-2">البريد الإلكتروني:</strong> {email || "غير متوفر"}
              <FaEnvelope className="text-black mr-2" />
            </p>

            <p className="text-gray-700 mt-2 flex gap-3 justify-end items-center">
              <strong className="ml-2">رقم الهاتف:</strong> {phone || "غير متوفر"}
              <FaPhoneAlt className="text-black mr-2" />
            </p>

            <p className="text-gray-700 mt-2 flex gap-3 justify-end items-center">
              <strong className="ml-2">العنوان:</strong> {address || "غير متوفر"}
              <FaMapMarkerAlt className="text-black mr-2" />
            </p>
          </div>
        </div>
      </div>
      
      {/* Social Media Section */}
      <div className="md:flex">
        <div className="p-8">
          <h3 className="text-xl md:text-2xl font-bold mb-10 text-gray-900">تابعنا على وسائل التواصل الاجتماعي</h3>

          <div className="w-full flex flex-col items-end gap-7">
            <Link href="https://facebook.com" className="text-gray-700 text-md">
              <FaFacebook className="text-blue-600 mr-2 text-xl" />
            </Link>
            <Link href="https://twitter.com" className="text-gray-700 text-md">
              <FaTwitter className="text-blue-400 mr-2 text-xl" />
            </Link>
            <Link href="https://instagram.com" className="text-gray-700 text-md">
              <FaInstagram className="text-pink-600 mr-2 text-xl" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
