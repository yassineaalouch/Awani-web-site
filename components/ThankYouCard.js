import Link from 'next/link';
import React from 'react';

export default function ThankYouCard({role}) {
    if(role === 'address'){
        return (
            <div className="max-w-md mx-auto my-10 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
                <div className="p-6 bg-green-500 text-white">
                    <h2 className="text-2xl font-semibold mb-2">Your address was updated successfully</h2>
                </div>
                <div className="p-6 pb-1">
                    <p className="text-black mb-3">Dear Customer,</p>
                    <p className="mb-4">
                    We sincerely appreciate your trust in us. Your address has been successfully updated in our system. Rest assured that your future orders and communications will use the updated address.
                    </p>
                </div>
            </div>
        );
        }else if(role  === 'password'){
            return (
                <div className="max-w-md mx-auto my-10 shadow-lg rounded-lg overflow-hidden border border-gray-300">
                    <div className="px-6 py-2 bg-green-500 border-2 text-white h-fit">
                        <h2 className=" text-center font-semibold mb-2">Your password was updated successfully</h2>
                    </div>
                </div>
            );
        }
        else{

        return (
            <div className="max-w-md mx-auto my-10 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
                <div className="p-6 bg-yellow-500 text-white">
                    <h2 className="text-2xl font-semibold mb-2">Thank You for Your Trust!</h2>
                    <p className="text-white">Dear Customer,</p>
                </div>
                <div className="p-6">
                    <p className="mb-4">
                        We sincerely appreciate your trust in us. Your order has been successfully received and is currently being processed. We assure you that we will handle it as quickly as possible.
                    </p>
                    <p className="mb-4">
                        You will be notified via your email and through your account once your order is confirmed and being prepared. Additionally, we will also notify you via your phone number.
                    </p>
                    <p className="font-semibold">Thank you for choosing us!</p>
                </div>
                <div className="p-4 bg-gray-100 text-right">
                    <Link href="/account" className="text-yellow-500 hover:underline">Go to My Account</Link>
                </div>
            </div>
        );
    }
}
