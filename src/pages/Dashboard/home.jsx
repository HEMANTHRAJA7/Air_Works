import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ArrowRight, FileText, CheckCircle, XCircle, Clock } from 'react-feather';

function Dashboard() {
  // NRC data
  const nrcData = {
    total: 100,
    accepted: 30,
    rejected: 10,
    pending: 60
  };

  // Data for pie chart
  const pieData = [
    { name: 'Accepted', value: nrcData.accepted, color: '#10B981' }, // green
    { name: 'Rejected', value: nrcData.rejected, color: '#EF4444' }, // red
    { name: 'Pending', value: nrcData.pending, color: '#3B82F6' }    // blue
  ];

  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-md rounded-md border border-gray-200">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
       {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">NRC Dashboard</h1>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
              <button className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Export Report
              </button>
              <button className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Total NRC */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total NRC</dt>
                    <dd>
                      <div className="text-3xl font-semibold text-gray-900">{nrcData.total}</div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <a href="#" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                  View all NRC
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Accepted NRC */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Accepted NRC</dt>
                    <dd>
                      <div className="text-3xl font-semibold text-gray-900">{nrcData.accepted}</div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <a href="#" className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800">
                  View accepted NRC
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Rejected NRC */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Rejected NRC</dt>
                    <dd>
                      <div className="text-3xl font-semibold text-gray-900">{nrcData.rejected}</div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <a href="#" className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800">
                  View rejected NRC
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Pending NRC */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending NRC</dt>
                    <dd>
                      <div className="text-3xl font-semibold text-gray-900">{nrcData.pending}</div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <a href="#" className="inline-flex items-center text-sm font-medium text-yellow-600 hover:text-yellow-800">
                  View pending NRC
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">NRC Status Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((item) => (
                <li key={item} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full ${
                        item % 3 === 0 ? 'bg-green-500' : 
                        item % 3 === 1 ? 'bg-red-500' : 'bg-blue-500'
                      } mr-3`}></div>
                      <p className="text-sm font-medium text-gray-900">NRC-{1000 + item}</p>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${item % 3 === 0 ? 'bg-green-100 text-green-800' : 
                        item % 3 === 1 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}">
                        {item % 3 === 0 ? 'Accepted' : item % 3 === 1 ? 'Rejected' : 'Pending'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {item % 3 === 0 ? 'Approved by John Doe' : 
                         item % 3 === 1 ? 'Rejected by Jane Smith' : 'Awaiting review'}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-gray-500 sm:mt-0">
                      <p className='text-sm '>
                        Updated {item} day{item !== 1 ? 's' : ''} ago
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all activity <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;