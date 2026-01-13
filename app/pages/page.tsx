'use client';

import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import { FileText, Plus, Edit, Trash2, Eye, Home, Layout } from 'lucide-react';
import CreatePageModal from '@/components/CreatePageModal';

export default function Pages() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pages = [
    {
      id: 1,
      title: 'Home',
      path: '/',
      status: 'published',
      website: 'Company Main Site',
      lastEdited: '2 hours ago',
      icon: Home,
    },
    {
      id: 2,
      title: 'About Us',
      path: '/about',
      status: 'published',
      website: 'Company Main Site',
      lastEdited: '1 day ago',
      icon: FileText,
    },
    {
      id: 3,
      title: 'Services',
      path: '/services',
      status: 'draft',
      website: 'Company Main Site',
      lastEdited: '3 days ago',
      icon: Layout,
    },
    {
      id: 4,
      title: 'Contact',
      path: '/contact',
      status: 'published',
      website: 'Company Main Site',
      lastEdited: '5 days ago',
      icon: FileText,
    },
    {
      id: 5,
      title: 'Products',
      path: '/products',
      status: 'published',
      website: 'Product Landing Page',
      lastEdited: '1 week ago',
      icon: Layout,
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-green-100 text-green-700 border-green-200',
      draft: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    };
    return styles[status as keyof typeof styles] || styles.draft;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pages</h1>
            <p className="text-gray-600 mt-1">Manage and edit all your website pages.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus size={20} />
            Create New Page
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex flex-wrap gap-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Websites</option>
              <option>Company Main Site</option>
              <option>Product Landing Page</option>
              <option>Blog</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Status</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
            <input 
              type="text" 
              placeholder="Search pages..." 
              className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Pages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => {
            const Icon = page.icon;
            return (
              <div key={page.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                {/* Preview */}
                <div className="h-40 bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-lg flex items-center justify-center relative group">
                  <Icon size={48} className="text-gray-300" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all rounded-t-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
                      <Eye size={16} />
                      Preview
                    </button>
                  </div>
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(page.status)}`}>
                    {page.status.charAt(0).toUpperCase() + page.status.slice(1)}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900">{page.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{page.website}</p>
                  <p className="text-xs text-gray-400 mt-1">{page.path}</p>
                  <p className="text-xs text-gray-400 mt-2">Edited {page.lastEdited}</p>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Link
                      href={`/pages/${page.id}/edit`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit size={16} />
                      Edit
                    </Link>
                    <button className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add New Card */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all h-[360px] flex flex-col items-center justify-center gap-3 group"
          >
            <div className="w-16 h-16 bg-gray-100 group-hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors">
              <Plus size={32} className="text-gray-400 group-hover:text-blue-600" />
            </div>
            <p className="font-medium text-gray-600 group-hover:text-blue-600">Create New Page</p>
          </button>
        </div>

        {/* Create Page Modal */}
        <CreatePageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </AdminLayout>
  );
}
