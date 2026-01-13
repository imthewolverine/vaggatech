'use client';

import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { 
  Globe, 
  Users, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  HardDrive,
} from 'lucide-react';
import CreatePageModal from '@/components/CreatePageModal';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stats = [
    { label: 'Total Websites', value: '12', change: '+2 this month', icon: Globe, color: 'bg-blue-500' },
    { label: 'Total Visitors', value: '45.2K', change: '+12% vs last month', icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Active Users', value: '8', change: '2 online now', icon: Users, color: 'bg-purple-500' },
    { label: 'Storage Used', value: '87.5 GB', change: 'of 500 GB available', icon: HardDrive, color: 'bg-orange-500' },
  ];

  const recentActivity = [
    { action: 'Website "Company Site" published', user: 'John Doe', time: '2 hours ago', status: 'success' },
    { action: 'New page "Services" created', user: 'Jane Smith', time: '5 hours ago', status: 'success' },
    { action: 'User "Mike Johnson" invited', user: 'John Doe', time: '1 day ago', status: 'success' },
    { action: 'Template "Modern" applied', user: 'Sarah Wilson', time: '2 days ago', status: 'success' },
  ];

  const userRequests = [
    { request: 'User requested "Premium Template" purchase', requester: 'John Doe', date: 'Today', status: 'pending', canDelete: true },
    { request: 'User requested "E-commerce" template access', requester: 'Jane Smith', date: 'Yesterday', status: 'approved', canDelete: true },
    { request: 'User requested "Marketing Template" purchase', requester: 'Mike Johnson', date: '2 days ago', status: 'pending', canDelete: true },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here&apos;s what&apos;s happening with your websites.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-2">{stat.change}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActivity.map((activity, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{activity.user}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all activity →
              </button>
            </div>
          </div>

          {/* User Requests */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Requests</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {userRequests.map((item, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <AlertCircle 
                        size={20} 
                        className={`mt-0.5 ${
                          item.status === 'pending' ? 'text-yellow-500' : 
                          'text-green-500'
                        }`} 
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.request}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{item.requester}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{item.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-green-100 text-green-700'
                      }`}>
                        {item.status}
                      </span>
                      {item.canDelete && (
                        <button className="text-xs text-red-600 hover:text-red-700 font-medium ml-2">
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all requests →
              </button>
            </div>
          </div>
        </div>

        {/* Create Page Modal */}
        <CreatePageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </AdminLayout>
  );
}