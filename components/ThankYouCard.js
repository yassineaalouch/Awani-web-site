import Link from 'next/link';
import React from 'react';

export default function ThankYouCard() {
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
