import Footer from '@/interfaceComponents/Footer'
import Nav_bar_interface from '@/interfaceComponents/Nav-bar-interface'
import React from 'react'

function Offer() {
  return (
    <>
        <Nav_bar_interface/>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            {/* <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                <h1 className="text-2xl font-bold text-yellow-500 mb-4">Buy Our Special Pack!</h1>
                <p className="text-gray-700 mb-6">
                    Get access to exclusive features and content by purchasing our special pack.
                    Enjoy all the premium benefits designed to enhance your experience.
                </p>

                <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What is included:</h2>
                <ul className="list-disc list-inside text-gray-600">
                    <li>Access to all premium content</li>
                    <li>Priority customer support</li>
                    <li>Exclusive discounts on future purchases</li>
                    <li>Free updates for 1 year</li>
                </ul>
                </div>

                <div className="mb-6">
                <p className="text-lg font-bold text-gray-800">Price: <span className="text-yellow-500">$49.99</span></p>
                </div>

                <button
                className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-yellow-600 transition duration-200"
                onClick={() => alert('Thank you for your purchase!')}
                >
                    Buy Now
                </button>
            </div> */}

        </div>
        <Footer/>
    </>
  )
}

export default Offer
