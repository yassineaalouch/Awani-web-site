import { useState } from 'react';

function OrderFilterBar({ImportFilterValues,className}) {


const [status, setStatus] = useState('');
const [priceRange, setPriceRange] = useState('');
const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
const [sortOrder, setSortOrder] = useState('');


return ( 
<div className=' bg-white border-b-2 w-[100%] border-gray-200 border py-4 px-6 mb-2 flex items-center justify-between shadow-sm '>
<div className="overflow-auto scrollBarNon mr-2 flex lg:w-[95%] ">
    
<div className="flex items-center justify-between gap-7 min-w-max ">

    {/* status Filter */}
    <div className="flex items-center space-x-2">
    <label className="text-gray-600 text-sm">Status:</label>
    <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-800"
    >
            <option value="All">All</option>
            <option value='New Order' className="text-blue-500">New Order</option>
            <option value='Try 1' className="text-yellow-300">Try 1</option>
            <option value='Try 2' className="text-yellow-500">Try 2</option>
            <option value='Try 3' className="text-yellow-600">Try 3</option>
            <option value='Validated' className="text-green-600">Validated</option>
            <option value='Rejected' className="text-red-500">Rejected</option>

    </select>
    </div>

    {/* Price Range Filter */}
    <div className="flex items-center space-x-2">
        <label className="text-gray-600 text-sm">Total: {'<'}</label>
        <input
            value={priceRange}
            type='number'
            onChange={(e) => {setPriceRange(e.target.value)}}
            className='border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-800'
            style={{
                WebkitAppearance: 'none',
                MozAppearance: 'textfield',
            }}
        />
    </div>

    {/* date Filter */}
    <div className="flex items-center space-x-2">
      <div className="flex items-center gap-2">
        <label>Start Date:</label>
        <input
          type="date"
          className='border border-gray-300 mr-2 rounded-lg px-3 py-1.5 text-sm text-gray-800'
          value={dateRange.startDate}
          onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
        />
        <label>End Date:</label>
        <input
          type="date"
          className='border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-800'
          value={dateRange.endDate}
          onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
        />
      </div>
    </div>

    {/* Sort By Filter */}
    <div className="flex items-center space-x-2">
    <label className="text-gray-600 text-sm">Sort By:</label>
    <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-800"
    >
        <option value="">All</option>
        <option value="price-asc">Total: Low to High</option>
        <option value="price-desc">Total: High to Low</option>
        <option value="newest">Newest orders</option>
    </select>
    </div>
</div>

    </div>


    {/* Filter Button */}
    <button
    onClick={() => {ImportFilterValues({priceRange,status,sortOrder,endDate: dateRange.endDate,startDate: dateRange.startDate,})}}
    className={"bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition duration-150"+className}
    >
    Apply 
    </button>
</div>
  );
}

export default OrderFilterBar;
