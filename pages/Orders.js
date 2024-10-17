import Layout from "@/components/Layout";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import OrderFilterBar from "@/components/FilterOrders";
import React from "react";

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session || session.user.role !== 'admin') {
      return {
        redirect: {
          destination: '/Login',
          permanent: false,
        },
      };
    }
  
    return {
      props: { session },
    };
}

export default function Orders(){

  const [purchaseRequest, setPurchaseRequest] = useState([]);
  const [purchaseRequestFilter, setPurchaseRequestFilter] = useState([]);

  const [id, setId] = useState(0);
  useEffect(() => {
    fetchPurchaseRequest();
  },[]);

  async function fetchPurchaseRequest() {
    axios.get('/api/purchaseRequest',{ headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
    }})
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
    if(id===_id){
      setId(0)
    }else{
      setId(_id);
    }
  }

  async function ChangeStatus(cart,_id,e,userId) {
    axios.put('/api/purchaseRequest',{status:e.target.value,_id},{ headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
    }}).then(()=>{
      fetchPurchaseRequest()
    })
    if(e.target.value==='Validated'){
      axios.get('/api/UserHandler',{params:{_id:userId}, headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
      }}).then((response)=>{
        let productsIds = cart.map((ele)=>(ele.id))
        const listRatingProduct =response.data?.timerRating.map((ele)=>(ele.productId))
        const existingTest= productsIds.every(element =>listRatingProduct.includes(element))
        if(!existingTest){
          axios.put('/api/UserHandler',{productsIds,_id:userId},{ headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
          }})
        }

      }
     ) 
    }
  }

  return (
    <Layout>
      <div className="overflow-x-auto ">
        <div className="w-[100%]">
          <OrderFilterBar ImportFilterValues={ImportFilterValues} className={" !bg-green-500"} />
        </div>
        <div className="overflow-x-auto ">
        <table className="bg-white w-full max-w-[100rem] border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-nowrap text-left">Order ID</th>
              <th className="py-3 px-6 text-nowrap text-left">Customer Name</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-nowrap text-right">Total (MAD)</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {purchaseRequestFilter.map((purchaseRequest) => (
              <React.Fragment key={purchaseRequest._id}>
                <tr
                  key={purchaseRequest._id}
                  onClick={() => changeId(purchaseRequest._id)}
                  className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <td title={purchaseRequest._id} className="py-3 truncate max-w-10 px-6 text-left whitespace-nowrap">
                    {purchaseRequest._id}
                  </td>
                  <td className="py-3 px-6 text-nowrap text-left">
                    {purchaseRequest.firstName + ' ' + purchaseRequest.lastName}
                  </td>
                  <td className="py-3 px-6 text-left text-nowrap ">{purchaseRequest.address}</td>
                  <td className="py-3 px-6 text-left">{purchaseRequest.phone}</td>
                  <td
                    className={`py-3 px-6 text-left ${
                      purchaseRequest.status === 'New Order'
                        ? 'text-blue-500'
                        : purchaseRequest.status === 'Try 1'
                        ? 'text-yellow-400'
                        : purchaseRequest.status === 'Try 2'
                        ?'text-yellow-600'
                        : purchaseRequest.status === 'Try 3'
                        ? 'text-yellow-700'
                        : purchaseRequest.status === 'Rejected'
                        ? 'text-red-500 border'
                        : purchaseRequest.status === 'Validated'
                        ?'text-green-600'
                        :'text-gray-400'
                    }`}
                  >
                    <select className="text-center" value={purchaseRequest.status} onClick={(e)=>{e.stopPropagation();let _id = purchaseRequest._id;let cart = purchaseRequest.cart;let userId = purchaseRequest.userId  ;ChangeStatus(cart,_id,e,userId)}} >
                        <option className="text-blue-500">New Order</option>
                        <option className="text-yellow-300">Try 1</option>
                        <option className="text-yellow-500">Try 2</option>
                        <option className="text-yellow-600">Try 3</option>
                        <option className="text-green-600">Validated</option>
                        <option className="text-red-500">Rejected</option>
                    </select>
                  </td>
                  <td className="py-3 px-6 text-left">
                    {purchaseRequest?.createdAt?.split('T')[0]}
                  </td>
                  <td className="py-3 px-6 text-right">{purchaseRequest.finalePrice}</td>
                </tr>

                {purchaseRequest._id === id && (
                  <tr key={`${purchaseRequest._id}-details`} className="border-b bg-gray-50">
                    <td colSpan="7" className="p-3">
                      <table className="bg-white w-full rounded-lg border-gray-400 shadow-lg border-[2px]">
                        <caption className="font-bold bg-gray-200 border-gray-400 border-b-0 border-[2px] p-1">Order content</caption>
                        <thead>
                          <tr className="bg-yellow-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-2 px-4 text-left">Product ID</th>
                            <th className="py-2 px-4 text-nowrap text-left">Product Name</th>
                            <th className="py-2 px-4 text-nowrap text-left">Unit Price (MAD)</th>
                            <th className="py-2 px-4 text-left">Quantity</th>
                            <th title="the total price of etch product (Quantity * Unit Price)"  className="py-2 text-nowrap px-4 text-left">Total Price (MAD)</th>
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
    </Layout>
  );
}
