import Link from 'next/link';
import React from 'react';

export default function ThankYouCard({ role }) {
    if (role === 'address') {
        return (
            <div className="max-w-md mx-auto my-10 text-right bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
                <div className="p-6 bg-black text-white">
                    <h2 className="text-2xl font-semibold mb-2">تم تحديث عنوانك بنجاح</h2>
                </div>
                <div className="p-6 pb-1">
                    <p className="text-black mb-3">العميل العزيز،</p>
                    <p className="mb-4">
                        نحن نقدر ثقتك بنا. تم تحديث عنوانك بنجاح في نظامنا. كن مطمئنًا أن طلباتك المستقبلية والتواصل سيتم باستخدام العنوان المحدث.
                    </p>
                </div>
            </div>
        );
    } else if (role === 'password') {
        return (
            <div className="max-w-md mx-auto my-10 text-right shadow-lg rounded-lg overflow-hidden border border-gray-300">
                <div className="px-6 py-2 bg-black text-white h-fit">
                    <h2 className="text-center font-semibold mb-2">تم تحديث كلمة المرور بنجاح</h2>
                </div>
            </div>
        );
    } else {
        return (
            <div className="max-w-md mx-auto my-10 bg-white text-right shadow-lg rounded-lg overflow-hidden border border-[#6bb41e]">
                <div className="p-6 bg-[#6bb41e] text-white">
                    <h2 className="text-2xl font-semibold mb-2">شكرًا لثقتك بنا!</h2>
                    <p className="text-white">العميل العزيز،</p>
                </div>
                <div className="p-6">
                    <p className="mb-4 text-gray-700">
                        نحن نقدر ثقتك بنا. تم استلام طلبك بنجاح وهو قيد المعالجة حاليًا. نؤكد لك أننا سنتعامل معه بأسرع وقت ممكن.
                    </p>
                    {/* <p className="mb-4">
                    ستتلقى اتصالًا هاتفيًا خلال الـ 12 ساعة القادمة لتأكيد طلبك          
                              </p> */}
                    <p className="font-semibold text-[#6bb41e]">شكرًا لاختيارك لنا!</p>
                </div>
                {/* <div className="p-4 bg-gray-100 text-right">
                    <Link href="/account" className="text-black hover:underline">الذهاب إلى حسابي</Link>
                </div> */}
            </div>
        );
    }
}
