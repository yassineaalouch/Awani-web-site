import UserAccount from '../account';
import { getSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import OrderFilterBar from '@/components/FilterOrders';
import React from 'react';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/Login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      Session: JSON.parse(JSON.stringify(session)),
    },
  };
}

export default function Commands({ Session }) {
  const [purchaseRequest, setPurchaseRequest] = useState([])
  const [purchaseRequestFilter, setPurchaseRequestFilter] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    fetchPurchaseRequest()
  }, [])

  async function fetchPurchaseRequest() {
    axios.get('/api/purchaseRequest', {
      params: { userId: Session?.user?.id },
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`,
      },
    })
      .then(result => {
        setPurchaseRequest(result.data.reverse());
        setPurchaseRequestFilter(result.data.reverse())
      });
  }


  function ImportFilterValues(number) {
    const { status, priceRange, rating, startDate, endDate } = number;

    const list = purchaseRequest.filter(Request => {
      const requestDate = new Date(Request.createdAt);
      const isWithinDateRange =
        (!startDate || requestDate >= new Date(startDate)) &&
        (!endDate || requestDate <= new Date(endDate));

      return (
        (status === 'All' || status === '' || Request?.status === status) &&
        (!priceRange || Request.finalePrice <= priceRange) &&
        (!rating || Request?.rating >= rating) &&
        isWithinDateRange
      );
    });

    if (number.sortOrder === 'price-desc') {
      const sortedProducts = list.sort((a, b) => b.finalePrice - a.finalePrice);
      setPurchaseRequestFilter(sortedProducts);
    } else if (number.sortOrder === 'price-asc') {
      const sortedProducts = list.sort((a, b) => a.finalePrice - b.finalePrice);
      setPurchaseRequestFilter(sortedProducts);
    } else {
      setPurchaseRequestFilter(list);
    }
  }

  function changeId(_id) {
    if (id === _id) {
      setId(0)
    } else {
      setId(_id);
    }
  }


  return (
    <UserAccount>
      <div className="overflow-x-auto">
        <div className="md:w-[100%] ">
          <OrderFilterBar ImportFilterValues={ImportFilterValues} className={" !bg-yellow-500"} />
        </div>
        <div className="overflow-x-auto">

          <table className="bg-white w-full max-w-6xl border border-green-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-green-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-nowrap text-left">Order ID</th>
                <th className="py-3 px-6 text-nowrap text-left">Customer Name</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Country</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-nowrap text-right">Total ($)</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {purchaseRequestFilter.map((purchaseRequest) => (
                <React.Fragment key={purchaseRequest._id}>
                  <tr
                    key={purchaseRequest._id}
                    onClick={() => changeId(purchaseRequest._id)}
                    className="border-b border-green-200 hover:bg-green-50 cursor-pointer"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {purchaseRequest._id}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {purchaseRequest.firstName + ' ' + purchaseRequest.lastName}
                    </td>
                    <td
                      className={`py-3 px-6 text-left  ${purchaseRequest.status === 'New Order'
                        ? 'text-blue-500'
                        : purchaseRequest.status === 'Try 1'
                          ? 'text-yellow-400'
                          : purchaseRequest.status === 'Try 2'
                            ? 'text-yellow-600'
                            : purchaseRequest.status === 'Try 3'
                              ? 'text-yellow-700'
                              : purchaseRequest.status === 'Rejected'
                                ? 'text-red-500 border'
                                : purchaseRequest.status === 'Validated'
                                  ? 'text-green-600'
                                  : 'text-gray-400'
                        }`}
                    >
                      <span className='flex flex-col gap-2'>
                        <span>
                          {purchaseRequest.status}
                        </span>
                        {purchaseRequest.status === 'Validate' &&
                          <button onClick={(e) => { e.stopPropagation() }} className='bg-yellow-500 text-left text-nowrap rounded-lg px-2 text-black font-semibold py-1'>
                            go to checkout
                          </button>}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">{purchaseRequest.country}</td>
                    <td className="py-3 px-6 text-left">
                      {purchaseRequest?.createdAt?.split('T')[0]}
                    </td>
                    <td className="py-3 px-6 text-right">{purchaseRequest.finalePrice}</td>
                  </tr>

                  {purchaseRequest._id === id && (
                    <tr key={`${purchaseRequest._id}-details`} className="border-b bg-gray-50">
                      <td colSpan="6" className="p-3">
                        <table className="bg-white w-full rounded-lg border-gray-400 shadow-lg border-[2px]">
                          <caption className="font-bold bg-gray-200 border-gray-400 border-b-0 border-[2px] p-1">Order content</caption>
                          <thead>
                            <tr className="bg-yellow-100 text-gray-600 uppercase text-sm leading-normal">
                              <th className="py-2 px-4 text-left">Product ID</th>
                              <th className="py-2 px-4 text-nowrap text-left">Product Name</th>
                              <th className="py-2 px-4 text-nowrap text-left">Unit Price</th>
                              <th className="py-2 px-4 text-left">Quantity</th>
                              <th title="the total price of etch product (Quantity * Unit Price)" className="py-2 text-nowrap px-4 text-left">Total Price ($)</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-600 text-sm font-light">
                            {purchaseRequest.cart.map((cart) => (
                              <tr key={cart.id}>
                                <td className="py-2 px-4 text-left">{cart.id}</td>
                                <td className="py-2 px-4 text-left">{cart.title}</td>
                                <td className="py-2 px-4 text-left">{cart.price}</td>
                                <td className="py-2 px-4 text-left">{cart.quantity}</td>
                                <td className="py-2 px-4 text-left">{cart.totalPrice}</td>
                              </tr>
                            ))}
                            <tr>
                              <td colSpan={6} className="text-center p-1 border-t-2 font-extrabold">
                                Total: {purchaseRequest.finalePrice}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </UserAccount>
  );
}

