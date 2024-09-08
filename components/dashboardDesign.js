import React from 'react';
import CustomBarChart,{CustomBarChartCercle,Cercle} from './graph';

export default function DashboardDesign() {
  const data = [

    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400, b: {b:2182 ,color:"#ffbb28"} },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210, b: {b:2285,color:"#ffbb28"}},
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290, b: {b:485,color:"#ffbb28"}},
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000, b: {b:2286,color:"#ffbb28"}},
    { name: 'May', uv: 1890, pv: 4800, amt: 2181, b: {b:2218,color:"#ffbb28"}},
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500, b: {b:2256,color:"#ffbb28"}},
    { name: 'kkk', uv: 2390, pv: 3000, amt: 5050, b: {b:22587,color:"#ffbb28"}},
  
  ];
  
  return (
    <div className="p-6  min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Orders This Year */}
        <div className="bg-white p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Orders This Year</h3>
          <p className="text-2xl font-bold text-blue-600">7890</p>
        </div>
 
        {/* Total Revenue */}
        <div className="bg-white p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Revenue Today</h3>
          <p className="text-2xl font-bold text-yellow-600">$12,345</p>
        </div>

        {/* New Users */}
        <div className="bg-white p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">New Users</h3>
          <p className="text-2xl font-bold text-green-600">89</p>
        </div>

      </div>
      <div className='grid mt-10 gap-2 grid-cols-2 md:grid-cols-3'>
        <div className='col-span-3 md:col-span-2 bg-zinc-100'>
          <Cercle title={'titre 1'} data={data}/>
        </div>
        <div className='bg-zinc-100 col-span-3 md:col-span-1'>
          <Cercle title={'titre 2'} data={data}/>
        </div>
        <div className='bg-slate-100 col-span-3 p-0 rounded-md'>
          <CustomBarChart title={'titre 3'} data={data}/>
        </div>
        <div className='bg-slate-100 col-span-3' >
          <CustomBarChartCercle title={'titre 4'} data={data}/>
        </div>
      </div>
    </div>
  );
}
