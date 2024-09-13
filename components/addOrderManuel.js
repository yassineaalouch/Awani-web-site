import React, { useEffect, useState } from 'react';
import axios from 'axios';
const AddOrderManuel = () => {
const [productsList , setProductsList] = useState([])
const [product,setProduct] = useState({})
  useEffect(()=>{

    axios.get('/api/products',{headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
    }}).then((response)=>{
      setProductsList(response.data)
    })

  },[])


  let Total
  const [order, setOrder] = useState({
    orderId:'',
    Status:'',
    country: '',
    fullName: '',
    email: '',
    phone: '',
    cart: [{ProductId:'',name: '',unitPrice:'',quantity:'',totalPrice:'' }],
    total:Total
  });
  Total = order.cart.reduce((acc, item) => acc + item.totalPrice, 0)
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const newProducts = [...order.cart];
    newProducts[index][name] = value;
    setOrder({ ...order, products: newProducts });
  };

  const addProductField = () => {
    setOrder({ ...order, products: [...order.cart, { name: '', quantity: 1 }] });
  };

  const removeProductField = (index) => {
    const newProducts = order.cart.filter((_, i) => i !== index);
    setOrder({ ...order, products: newProducts });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(order);
    // Add logic to handle form submission, like an API call to save the order
  };

  return (
    <div className="mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={order.fullName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-yellow-500"
            placeholder="Enter full name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            value={order.country}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-yellow-500"
            placeholder="Enter country"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={order.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-yellow-500"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={order.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-yellow-500"
            placeholder="Enter phone number"
          />
        </div>

        <h3 className="text-lg font-semibold mb-2">Products</h3>
        {order.cart.map((product, index) => (
          <div key={index} className="mb-4">
            <div className="flex flex-col gap-2 md:gap-0  md:flex-row md:items-center">
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={(e) => handleProductChange(index, e)}
                className="w-full px-3 py-2 mr-2 border rounded-lg shadow-sm focus:outline-none focus:border-yellow-500"
                placeholder="Product name"
              />
              <select
                type="text"
                name="name"
                value={product.name}
                onChange={(e) => console.log(e.target.value)}
                className="w-full px-3 py-2 mr-2 border rounded-lg shadow-sm focus:outline-none focus:border-yellow-500"
                placeholder="Product name"
              >
                {productsList.map((ele)=>(
                  <option value={ele} key={ele.id}>
                    {ele.title}
                  </option>
                ))

                }
              </select>
              <input
                type="tel"
                name="unitPrice"
                value={product.unitPrice}
                onChange={(e) => handleProductChange(index, e)}
                className="w-full px-3 py-2 mr-2 border rounded-lg shadow-sm focus:outline-none focus:border-yellow-500"
                placeholder="Unit Price"
              />
              <input
                type="tel"
                name="quantity"
                value={product.quantity}
                onChange={(e) => handleProductChange(index, e)}
                className="w-full px-3 py-2 mr-2 border rounded-lg shadow-sm focus:outline-none focus:border-yellow-500"
                placeholder="Quantity"
              />
              <input
                type="tel"
                name="totalPrice"
                value={product.totalPrice}
                onChange={(e) => handleProductChange(index, e)}
                className="w-full px-3 py-2 mr-2 border rounded-lg shadow-sm focus:outline-none focus:border-yellow-500"
                placeholder="Total Price"
              />
              {order.cart.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProductField(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addProductField}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Add Product
        </button>

        <button type="submit" className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default AddOrderManuel;
