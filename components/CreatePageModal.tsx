'use client';

import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CreatePageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePageModal({ isOpen, onClose }: CreatePageModalProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    website: 'Company Main Site',
    template: 'blank',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate a new page ID (in a real app, this would come from the backend)
    const newPageId = Date.now();

    // Navigate to edit page
    router.push(`/pages/${newPageId}/edit`);

    // Reset form and close
    setFormData({
      title: '',
      slug: '',
      website: 'Company Main Site',
      template: 'blank',
    });
    setIsCreating(false);
    onClose();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      // Auto-generate slug from title
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Create New Page</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isCreating}
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Page Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Page Title *
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="e.g., About Us"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isCreating}
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
              URL Slug *
            </label>
            <div className="flex items-center">
              <span className="text-gray-500 text-sm mr-1">/</span>
              <input
                id="slug"
                type="text"
                value={formData.slug}
                onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="e.g., about-us"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={isCreating}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Auto-generated from title</p>
          </div>

          {/* Website */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
              Website *
            </label>
            <select
              id="website"
              value={formData.website}
              onChange={e => setFormData(prev => ({ ...prev, website: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isCreating}
            >
              <option>Company Main Site</option>
              <option>Product Landing Page</option>
              <option>Blog</option>
              <option>Support Portal</option>
            </select>
          </div>

          {/* Template */}
          <div>
            <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-1">
              Start with Template
            </label>
            <select
              id="template"
              value={formData.template}
              onChange={e => setFormData(prev => ({ ...prev, template: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isCreating}
            >
              <option value="blank">Blank Page</option>
              <option value="hero">Hero + Features</option>
              <option value="landing">Full Landing Page</option>
              <option value="contact">Contact Page</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={isCreating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={isCreating}
            >
              {isCreating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Page'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
