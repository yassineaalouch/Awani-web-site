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
    axios.get('/api/purchaseRequest')
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
    axios.put('/api/purchaseRequest',{status:e.target.value,_id}).then(()=>{
      fetchPurchaseRequest()
    })
    if(e.target.value==='Validate'){
      axios.get('/api/UserHandler',{params:{_id:userId}}).then((response)=>{
        let productsIds = cart.map((ele)=>(ele.id))
        console.log('response.data.timerRating',response.data.timerRating)
        const listRatingProduct =response.data.timerRating.map((ele)=>(ele.productId))
        console.log('listRatingProduct',listRatingProduct)
        const existingTest= productsIds.every(element =>listRatingProduct.includes(element))
        console.log('existingTest',existingTest)
        if(!existingTest){
          axios.put('/api/UserHandler',{productsIds,_id:userId})
        }

      }
     ) 
    }
  }

  return (
    <Layout>
      <div className="overflow-x-auto w-screen lg:max-w-[58rem]">
        <div className="w-[100%]">
          <OrderFilterBar ImportFilterValues={ImportFilterValues} className={" !bg-green-500"} />
        </div>
        <div className="overflow-x-auto ">

        <table className="bg-white w-full max-w-[100rem] border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Order ID</th>
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
                  className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {purchaseRequest._id}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {purchaseRequest.firstName + ' ' + purchaseRequest.lastName}
                  </td>
                  <td
                    className={`py-3 px-6 text-left ${
                      purchaseRequest.status === 'Validate'
                        ? 'text-green-500'
                        : purchaseRequest.status === 'Under Review'
                        ? 'text-yellow-600'
                        : purchaseRequest.status === 'Rejected'
                        ?'text-red-600'
                        :'text-gray-400'
                    }`}
                  >
                    <select className="text-center" value={purchaseRequest.status} onClick={(e)=>{e.stopPropagation();let _id = purchaseRequest._id;let cart = purchaseRequest.cart;let userId = purchaseRequest.userId  ;ChangeStatus(cart,_id,e,userId)}} >
                        <option className="text-green-500">Validate</option>
                        <option className="text-yellow-500">Under Review</option>
                        <option className="text-red-500">Rejected</option>
                    </select>
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
                            <th className="py-2 px-4 text-nowrap text-left">Unit Price ($)</th>
                            <th className="py-2 px-4 text-left">Quantity</th>
                            <th title="the total price of etch product (Quantity * Unit Price)"  className="py-2 text-nowrap px-4 text-left">Total Price ($)</th>
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
