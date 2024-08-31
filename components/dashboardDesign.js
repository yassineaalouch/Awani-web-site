import React from 'react';

export default function DashboardDesign() {
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
    </div>
  );
}
