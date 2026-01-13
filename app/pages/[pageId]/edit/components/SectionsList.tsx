'use client';

import { Fragment, useMemo, useState } from 'react';
import { Trash2, Copy, Plus, X, Search, Eye } from 'lucide-react';

interface Section {
  id: string;
  type: 'hero' | 'text' | 'features' | 'cta' | 'custom';
  data: Record<string, any>;
}

interface SectionsListProps {
  sections: Section[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onAdd: (type: Section['type']) => void;
  onAddCustom: (payload: { name: string; description?: string; code?: string }) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onReorder: (sourceId: string, targetIndex: number) => void;
}

export default function SectionsList({
  sections,
  activeId,
  onSelect,
  onAdd,
  onAddCustom,
  onDuplicate,
  onDelete,
  onReorder,
}: SectionsListProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | string>('All');
  const [previewType, setPreviewType] = useState<Section['type'] | null>(null);

  const sectionCatalog: Array<{
    type: Section['type'];
    label: string;
    category: string;
    description: string;
  }> = [
    {
      type: 'hero',
      label: 'Hero Banner',
      category: 'Layout',
      description: 'Large header with headline, subtext, and primary call-to-action.',
    },
    {
      type: 'text',
      label: 'Text Block',
      category: 'Content',
      description: 'Single-column rich text for intros, paragraphs, or announcements.',
    },
    {
      type: 'features',
      label: 'Features Grid',
      category: 'Content',
      description: 'Grid of features with titles and short descriptions.',
    },
    {
      type: 'cta',
      label: 'Call to Action',
      category: 'Conversion',
      description: 'Prominent CTA with headline, supporting text, and button.',
    },
  ];

  const categories = useMemo(() => ['All', ...new Set(sectionCatalog.map(item => item.category))], []);

  const filteredCatalog = useMemo(() => {
    return sectionCatalog.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [sectionCatalog, searchTerm, selectedCategory]);
  const sectionTypes: Section['type'][] = ['hero', 'text', 'features', 'cta'];
  const sectionLabels: Record<Section['type'], string> = {
    hero: '🎯 Hero',
    text: '📝 Text',
    features: '✨ Features',
    cta: '🔔 Call to Action',
    custom: '🧩 Custom',
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {sections.map((section, index) => {
            const isDragging = draggingId === section.id;

            return (
              <div
                key={section.id}
                className={`group transition-all duration-300 ${isDragging ? 'opacity-40 scale-95' : ''}`}
                draggable
                onDragStart={event => {
                  setDraggingId(section.id);
                  event.dataTransfer.effectAllowed = 'move';
                }}
                onDragOver={event => {
                  event.preventDefault();
                  if (draggingId && draggingId !== section.id) {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const y = event.clientY - rect.top;
                    const height = rect.height;

                    // If dragging over 50% of the section, swap positions
                    if (y > height * 0.5) {
                      const fromIndex = sections.findIndex(s => s.id === draggingId);
                      const toIndex = index;
                      if (fromIndex !== toIndex && fromIndex !== toIndex + 1) {
                        onReorder(draggingId, toIndex + 1);
                      }
                    } else {
                      const fromIndex = sections.findIndex(s => s.id === draggingId);
                      const toIndex = index;
                      if (fromIndex !== toIndex && fromIndex !== toIndex - 1) {
                        onReorder(draggingId, toIndex);
                      }
                    }
                  }
                }}
                onDragEnd={() => {
                  setDraggingId(null);
                }}
              >
                <button
                  onClick={() => onSelect(section.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-all ${
                    activeId === section.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">
                        {section.type === 'custom'
                          ? `${section.data.name || 'Custom'} + custom`
                          : sectionLabels[section.type]}
                      </p>
                      <p className="text-xs opacity-75">
                        {section.data.description || section.data.heading || section.data.title || section.data.text || 'Section'}
                      </p>
                    </div>
                    <span className="text-xs opacity-50">#{index + 1}</span>
                  </div>
                </button>

                {activeId === section.id && (
                  <div className="flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onDuplicate(section.id)}
                      className="flex-1 px-2 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded text-xs transition-colors flex items-center justify-center gap-1"
                    >
                      <Copy size={12} />
                      Duplicate
                    </button>
                    <button
                      onClick={() => onDelete(section.id)}
                      className="flex-1 px-2 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded text-xs transition-colors flex items-center justify-center gap-1"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-gray-200 p-4 space-y-2">
        <p className="text-xs font-semibold text-gray-600 uppercase">Add Section</p>
        <button
          onClick={() => setIsCustomModalOpen(true)}
          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={14} />
          Create Section
        </button>
        <button
          onClick={() => setIsPickerOpen(true)}
          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Plus size={14} />
          Choose Section Type
        </button>
      </div>

      {isCustomModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-6">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-gray-200">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h4 className="text-sm font-semibold text-gray-900">Create custom section</h4>
              <button
                onClick={() => setIsCustomModalOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                aria-label="Close custom section modal"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-6 pt-5 pb-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section Name</label>
                <input
                  value={customName}
                  onChange={e => setCustomName(e.target.value)}
                  placeholder="e.g. Pricing Table"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  value={customDescription}
                  onChange={e => setCustomDescription(e.target.value)}
                  placeholder="Brief description"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsCustomModalOpen(false)}
                className="px-3 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!customName.trim()) return;
                  onAddCustom({ name: customName.trim(), description: customDescription });
                  setCustomName('');
                  setCustomDescription('');
                  setIsCustomModalOpen(false);
                }}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create & Add
              </button>
            </div>
          </div>
        </div>
      )}

      {isPickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-6">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full border border-gray-200">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h4 className="text-sm font-semibold text-gray-900">Add a new section</h4>
              <button
                onClick={() => setIsPickerOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                aria-label="Close section picker"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-6 pt-5 pb-4 space-y-3">
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search sections..."
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                        selectedCategory === cat
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-110 overflow-y-auto pr-1">
                {filteredCatalog.map(item => (
                  <div
                    key={item.type}
                    className="flex flex-col gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                        <p className="text-[11px] text-gray-500">{item.category}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 leading-snug line-clamp-3">{item.description}</p>
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => setPreviewType(item.type)}
                        className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                        type="button"
                      >
                        <Eye size={12} />
                        Preview
                      </button>
                      <button
                        onClick={() => {
                          onAdd(item.type);
                          setIsPickerOpen(false);
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        type="button"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}

                {filteredCatalog.length === 0 && (
                  <div className="col-span-full text-center text-xs text-gray-500 py-6">No sections match your search.</div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => setIsPickerOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {previewType && (
        <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center px-6">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h4 className="text-sm font-semibold text-gray-900">Section preview</h4>
              <button
                onClick={() => setPreviewType(null)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                aria-label="Close preview"
              >
                <X size={16} />
              </button>
            </div>

            <div className="bg-gray-50 px-8 py-6 max-h-[72vh] overflow-y-auto">
              {previewType === 'hero' && (
                <div className="bg-slate-900 text-white rounded-lg p-8 flex flex-col gap-3">
                  <p className="text-xs uppercase tracking-wide text-slate-300">Hero Banner</p>
                  <h3 className="text-2xl font-bold">Launch with confidence</h3>
                  <p className="text-sm text-slate-200 max-w-xl">Bold headline, supporting text, and a primary call-to-action to drive engagement.</p>
                  <div className="flex gap-3 mt-2">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">Primary CTA</button>
                    <button className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm border border-white/20">Secondary</button>
                  </div>
                </div>
              )}

              {previewType === 'text' && (
                <div className="bg-white rounded-lg p-6 border border-gray-200 space-y-3">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Text Block</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Use this block for introductions, overviews, or announcements. Simple, readable typography keeps focus on the message.
                  </p>
                </div>
              )}

              {previewType === 'features' && (
                <div className="bg-white rounded-lg p-6 border border-gray-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-wide text-gray-500">Features Grid</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['Speed', 'Security', 'Support', 'Scalability'].map(item => (
                      <div key={item} className="border border-gray-200 rounded-lg p-3">
                        <p className="font-semibold text-sm text-gray-900">{item}</p>
                        <p className="text-xs text-gray-600 mt-1">Short descriptor explaining why this feature matters.</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {previewType === 'cta' && (
                <div className="bg-blue-600 text-white rounded-lg p-7 space-y-3">
                  <p className="text-xs uppercase tracking-wide text-blue-100">Call to Action</p>
                  <h3 className="text-xl font-semibold">Ready to get started?</h3>
                  <p className="text-sm text-blue-50">Highlight the next step with a bold button and concise supporting copy.</p>
                  <button className="px-4 py-2 bg-white text-blue-700 font-medium rounded-lg text-sm">Take action</button>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between gap-3">
              <div className="text-xs text-gray-500">If you like this layout, add it directly to the page.</div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewType(null)}
                  className="px-3 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    if (previewType) {
                      onAdd(previewType);
                    }
                    setPreviewType(null);
                    setIsPickerOpen(false);
                  }}
                  className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add this section
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
