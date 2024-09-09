import React, { useState } from 'react';

const AddOrderManuel = () => {
  const [order, setOrder] = useState({
    country: '',
    fullName: '',
    email: '',
    phone: '',
    products: [{ name: '', quantity: 1 }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const newProducts = [...order.products];
    newProducts[index][name] = value;
    setOrder({ ...order, products: newProducts });
  };

  const addProductField = () => {
    setOrder({ ...order, products: [...order.products, { name: '', quantity: 1 }] });
  };

  const removeProductField = (index) => {
    const newProducts = order.products.filter((_, i) => i !== index);
    setOrder({ ...order, products: newProducts });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(order);
    // Add logic to handle form submission, like an API call to save the order
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
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
        {order.products.map((product, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center">
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={(e) => handleProductChange(index, e)}
                className="w-full px-3 py-2 mr-2 border rounded-lg shadow-sm focus:outline-none focus:border-yellow-500"
                placeholder="Product name"
              />
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={(e) => handleProductChange(index, e)}
                className="w-24 px-3 py-2 mr-2 border rounded-lg shadow-sm focus:outline-none focus:border-yellow-500"
                placeholder="Quantity"
              />
              {order.products.length > 1 && (
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
