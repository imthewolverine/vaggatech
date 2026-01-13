import AdminLayout from '@/components/AdminLayout';
import { Palette, Eye, Check, Star } from 'lucide-react';

export default function Templates() {
  const templates = [
    {
      id: 1,
      name: 'Modern Business',
      category: 'Business',
      description: 'Clean and professional design for corporate websites',
      preview: 'gradient-to-br from-blue-400 to-blue-600',
      popular: true,
      features: ['Responsive', 'SEO Optimized', 'Fast Loading'],
    },
    {
      id: 2,
      name: 'Creative Portfolio',
      category: 'Portfolio',
      description: 'Showcase your work with style and elegance',
      preview: 'gradient-to-br from-purple-400 to-pink-600',
      popular: true,
      features: ['Image Gallery', 'Animations', 'Mobile First'],
    },
    {
      id: 3,
      name: 'E-Commerce Store',
      category: 'E-Commerce',
      description: 'Perfect for online stores and product catalogs',
      preview: 'gradient-to-br from-green-400 to-emerald-600',
      popular: false,
      features: ['Product Grid', 'Cart System', 'Checkout'],
    },
    {
      id: 4,
      name: 'Minimalist Blog',
      category: 'Blog',
      description: 'Simple and elegant blog template',
      preview: 'gradient-to-br from-gray-400 to-gray-600',
      popular: false,
      features: ['Article Layout', 'Comments', 'Categories'],
    },
    {
      id: 5,
      name: 'Landing Page Pro',
      category: 'Marketing',
      description: 'High-converting landing page template',
      preview: 'gradient-to-br from-orange-400 to-red-600',
      popular: true,
      features: ['Hero Section', 'CTA Buttons', 'Testimonials'],
    },
    {
      id: 6,
      name: 'SaaS Platform',
      category: 'SaaS',
      description: 'Modern template for SaaS products',
      preview: 'gradient-to-br from-indigo-400 to-purple-600',
      popular: false,
      features: ['Pricing Tables', 'Feature Showcase', 'FAQ'],
    },
  ];

  const categories = ['All', 'Business', 'Portfolio', 'E-Commerce', 'Blog', 'Marketing', 'SaaS'];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Templates & Themes</h1>
          <p className="text-gray-600 mt-1">Choose a template and customize it to match your brand.</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                category === 'All'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Customization Panel */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Palette size={20} className="text-blue-600" />
            Customize Your Template
          </h3>
          <p className="text-gray-700 text-sm mb-4">
            After applying a template, you can customize colors, fonts, logo, and branding to match your company identity.
          </p>
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600"></div>
              <span className="text-sm text-gray-600">Primary Color</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-900"></div>
              <span className="text-sm text-gray-600">Text Color</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-gray-300 bg-white"></div>
              <span className="text-sm text-gray-600">Background</span>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden group"
            >
              {/* Preview */}
              <div className={`h-48 bg-${template.preview} relative`}>
                <div className={`h-full bg-${template.preview} flex items-center justify-center relative`}>
                  <div className="absolute top-3 left-3 flex gap-2">
                    {template.popular && (
                      <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Star size={12} fill="currentColor" />
                        Popular
                      </span>
                    )}
                    <span className="bg-white bg-opacity-90 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                      {template.category}
                    </span>
                  </div>
                  
                  {/* Preview Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-white text-gray-900 px-6 py-3 rounded-lg flex items-center gap-2 font-medium transform scale-90 group-hover:scale-100 transition-transform">
                      <Eye size={18} />
                      Preview Template
                    </button>
                  </div>

                  {/* Mock Browser Window */}
                  <div className="w-4/5 h-3/4 bg-white rounded-lg shadow-2xl">
                    <div className="bg-gray-200 h-6 rounded-t-lg flex items-center px-2 gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-400"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{template.description}</p>

                {/* Features */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {template.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      <Check size={12} className="text-green-600" />
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-5">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Apply Template
                  </button>
                  <button className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Eye size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Template Option */}
        <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Palette size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Need a Custom Template?</h3>
            <p className="text-gray-600 mb-4">
              Contact our design team to create a unique template tailored to your specific needs.
            </p>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">
              Request Custom Design
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
