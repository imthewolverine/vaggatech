'use client';

import AdminLayout from '@/components/AdminLayout';
import { Globe, Plus, Eye, Edit, Trash2, Power, Calendar, ExternalLink, X } from 'lucide-react';
import { useState } from 'react';

export default function Websites() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [websiteName, setWebsiteName] = useState('');
  const [websiteDomain, setWebsiteDomain] = useState('');
  const [websiteDescription, setWebsiteDescription] = useState('');

  const handleCreateWebsite = () => {
    if (!websiteName || !websiteDomain) return;
    // TODO: Add website creation logic
    console.log('Creating website:', { websiteName, websiteDomain, websiteDescription });
    setIsCreateModalOpen(false);
    setWebsiteName('');
    setWebsiteDomain('');
    setWebsiteDescription('');
  };

  const websites = [
    {
      id: 1,
      name: 'Company Main Site',
      domain: 'www.acmecorp.com',
      status: 'published',
      lastEdited: '2 hours ago',
      pages: 12,
      visitors: '15.2K'
    },
    {
      id: 2,
      name: 'Product Landing Page',
      domain: 'products.acmecorp.com',
      status: 'published',
      lastEdited: '1 day ago',
      pages: 5,
      visitors: '8.4K'
    },
    {
      id: 3,
      name: 'Blog',
      domain: 'blog.acmecorp.com',
      status: 'draft',
      lastEdited: '3 days ago',
      pages: 24,
      visitors: '0'
    },
    {
      id: 4,
      name: 'Support Center',
      domain: 'support.acmecorp.com',
      status: 'published',
      lastEdited: '5 days ago',
      pages: 18,
      visitors: '5.1K'
    },
    {
      id: 5,
      name: 'Marketing Campaign',
      domain: 'promo.acmecorp.com',
      status: 'offline',
      lastEdited: '1 week ago',
      pages: 3,
      visitors: '0'
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-green-100 text-green-700 border-green-200',
      draft: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      offline: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return styles[status as keyof typeof styles] || styles.draft;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Websites</h1>
            <p className="text-gray-600 mt-1">Manage all your company websites in one place.</p>
          </div>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus size={20} />
            Create New Website
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total Websites</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">5</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Published</p>
            <p className="text-2xl font-bold text-green-600 mt-1">3</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Draft</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">1</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Offline</p>
            <p className="text-2xl font-bold text-gray-600 mt-1">1</p>
          </div>
        </div>

        {/* Websites Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Website
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Domain
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Pages
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Visitors
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Last Edited
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {websites.map((website) => (
                  <tr key={website.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Globe size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{website.name}</p>
                          <p className="text-sm text-gray-500">{website.pages} pages</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a 
                        href={`https://${website.domain}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
                      >
                        {website.domain}
                        <ExternalLink size={14} />
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(website.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          website.status === 'published' ? 'bg-green-500' : 
                          website.status === 'draft' ? 'bg-yellow-500' : 
                          'bg-gray-500'
                        }`}></span>
                        {website.status.charAt(0).toUpperCase() + website.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {website.pages}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {website.visitors}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={14} />
                        {website.lastEdited}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Preview"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title={website.status === 'published' ? 'Unpublish' : 'Publish'}
                        >
                          <Power size={18} />
                        </button>
                        <button 
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Website Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-6">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg border border-gray-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Create New Website</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={websiteName}
                  onChange={(e) => setWebsiteName(e.target.value)}
                  placeholder="e.g., Company Main Site"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Domain <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={websiteDomain}
                  onChange={(e) => setWebsiteDomain(e.target.value)}
                  placeholder="e.g., www.mysite.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={websiteDescription}
                  onChange={(e) => setWebsiteDescription(e.target.value)}
                  placeholder="Brief description of this website"
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">DNS Configuration Required</h4>
                <p className="text-xs text-blue-800 mb-3">
                  To connect your domain, add these DNS records at your domain registrar:
                </p>
                <div className="space-y-2 text-xs font-mono">
                  <div className="bg-white rounded px-3 py-2 border border-blue-200">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Type:</span>
                      <span className="text-gray-900 font-semibold">A Record</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Name:</span>
                      <span className="text-gray-900">@ (or your subdomain)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Value:</span>
                      <span className="text-gray-900 font-semibold">76.45.33.21</span>
                    </div>
                  </div>
                  <div className="bg-white rounded px-3 py-2 border border-blue-200">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Type:</span>
                      <span className="text-gray-900 font-semibold">CNAME Record</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Name:</span>
                      <span className="text-gray-900">www</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Value:</span>
                      <span className="text-gray-900 font-semibold">hosting.yourplatform.com</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-blue-700 mt-3">
                  💡 DNS changes may take 24-48 hours to propagate globally.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateWebsite}
                disabled={!websiteName || !websiteDomain}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Website
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
