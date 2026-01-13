'use client';

import AdminLayout from '@/components/AdminLayout';
import { Building2, Edit, Palette, Save, Search as SearchIcon } from 'lucide-react';
import { useTheme, type ThemeId } from '@/components/ThemeProvider';
import { ChangeEvent, useRef, useState } from 'react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('company');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const { theme, setTheme } = useTheme();

  const tabs = [
    { id: 'company', label: 'Company Profile', icon: Building2 },
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'seo', label: 'SEO Settings', icon: SearchIcon },
  ];
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>(theme);

  const themeOptions = [
    {
      id: 'light',
      name: 'Light',
      swatches: ['bg-white', 'bg-gray-900', 'bg-blue-600'],
      previewClass: 'bg-white text-gray-900',
      buttonClass: 'bg-blue-600',
    },
    {
      id: 'dark',
      name: 'Dark',
      swatches: ['bg-gray-900', 'bg-white', 'bg-violet-500'],
      previewClass: 'bg-gray-900 text-white',
      buttonClass: 'bg-violet-500',
    },
    {
      id: 'ocean',
      name: 'Ocean',
      swatches: ['bg-sky-50', 'bg-slate-900', 'bg-sky-600'],
      previewClass: 'bg-sky-50 text-slate-900',
      buttonClass: 'bg-sky-600',
    },
    {
      id: 'emerald',
      name: 'Emerald',
      swatches: ['bg-emerald-50', 'bg-slate-900', 'bg-emerald-600'],
      previewClass: 'bg-emerald-50 text-slate-900',
      buttonClass: 'bg-emerald-600',
    },
    {
      id: 'plum',
      name: 'Plum',
      swatches: ['bg-fuchsia-50', 'bg-slate-900', 'bg-fuchsia-600'],
      previewClass: 'bg-fuchsia-50 text-slate-900',
      buttonClass: 'bg-fuchsia-600',
    },
    {
      id: 'sunset',
      name: 'Sunset',
      swatches: ['bg-rose-50', 'bg-slate-900', 'bg-orange-500'],
      previewClass: 'bg-rose-50 text-slate-900',
      buttonClass: 'bg-orange-500',
    },
  ];

  const handleLogoClick = () => logoInputRef.current?.click();

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setLogoPreview(url);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your company settings and preferences.</p>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? 'border-blue-600 text-blue-700 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {activeTab === 'company' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              <div className="flex items-start gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-3">Company Identity</p>
                  <button
                    type="button"
                    onClick={handleLogoClick}
                    className="group relative w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden"
                  >
                    {logoPreview ? (
                      <img src={logoPreview} alt="Company logo" className="absolute inset-0 h-full w-full object-cover" />
                    ) : (
                      <span className="text-sm text-gray-500">Upload Logo</span>
                    )}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                      <Edit size={18} />
                    </div>
                  </button>
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                  <p className="text-xs text-gray-500 mt-2">PNG or JPG, max 2MB</p>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      defaultValue="Acme Corporation"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Registry Number</label>
                    <input
                      type="text"
                      defaultValue="REG-4839201"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <input
                      type="text"
                      defaultValue="acmecorp.com"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Contact & Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                  <input
                    type="text"
                    defaultValue="135 Market Street"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    defaultValue="San Francisco"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                  <input
                    type="text"
                    defaultValue="CA"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                  <input
                    type="text"
                    defaultValue="94102"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="contact@acmecorp.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                <Save size={20} />
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'theme' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose a Theme</h2>
              <p className="text-sm text-gray-600 mb-4">Switch between light, dark, and color themes. This affects the look and feel of your site.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {themeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => { setSelectedTheme(opt.id as ThemeId); setTheme(opt.id as ThemeId); }}
                    className={`text-left rounded-lg border ${selectedTheme === opt.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'} p-4 hover:border-blue-400 transition`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{opt.name}</span>
                      <div className="flex items-center gap-1">
                        {opt.swatches.map((sw, i) => (
                          <span key={i} className={`w-5 h-5 rounded ${sw}`} />
                        ))}
                      </div>
                    </div>
                    <div className={`mt-3 rounded-lg p-3 border border-gray-200 ${opt.previewClass}`}>
                      <div className="text-sm font-semibold">Sample Header</div>
                      <div className={`mt-2 inline-block px-3 py-1 rounded text-white ${opt.buttonClass}`}>Primary Button</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                <Save size={20} />
                Save Theme
              </button>
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Default SEO Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                  <input
                    type="text"
                    defaultValue="Acme Corporation - Leading Technology Solutions"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                  <textarea
                    rows={3}
                    defaultValue="Discover innovative technology solutions from Acme Corporation. We help businesses transform digitally with cutting-edge products and services."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Social Sharing Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <p className="text-sm text-gray-600 mb-2">Upload an image for social media previews</p>
                    <p className="text-xs text-gray-500">Recommended: 1200 x 630 pixels</p>
                    <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Upload Image</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
