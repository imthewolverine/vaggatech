'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import { Save, Eye, Copy, Trash2, Plus, X, ArrowLeft } from 'lucide-react';
import SectionsList from './components/SectionsList';
import SectionEditor from './components/SectionEditor';
import PagePreview from './components/PagePreview';

interface Section {
  id: string;
  type: 'hero' | 'text' | 'features' | 'cta' | 'custom';
  data: Record<string, any>;
}

interface PageContent {
  sections: Section[];
}

interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  content: PageContent;
}

export default function EditPage() {
  const params = useParams();
  const router = useRouter();
  const pageId = params.pageId as string;

  const [page, setPage] = useState<Page | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [previewWidth, setPreviewWidth] = useState(384);
  const resizeState = useRef({ active: false, startX: 0, startWidth: 384 });

  // Load page data (mock)
  useEffect(() => {
    const mockPage: Page = {
      id: pageId,
      title: 'Home',
      slug: '/',
      status: 'published',
      content: {
        sections: [
          {
            id: 's1',
            type: 'hero',
            data: {
              heading: 'Welcome to Our Company',
              subheading: 'We build modern software solutions',
              buttonText: 'Get Started',
              backgroundColor: '#0F172A',
              headingColor: '#FFFFFF',
              subheadingColor: '#CBD5E1',
              buttonColor: '#2563EB',
              buttonTextColor: '#FFFFFF',
            },
          },
          {
            id: 's2',
            type: 'text',
            data: {
              text: 'Our mission is to help businesses transform digitally with cutting-edge technology and innovative solutions.',
              textColor: '#374151',
            },
          },
          {
            id: 's3',
            type: 'features',
            data: {
              title: 'Our Services',
              features: [
                { title: 'Web Development', description: 'Custom web applications' },
                { title: 'Mobile Apps', description: 'iOS and Android development' },
                { title: 'Consulting', description: 'Technology strategy and planning' },
              ],
            },
          },
        ],
      },
    };

    setPage(mockPage);
    setSections(mockPage.content.sections);
    setActiveId(mockPage.content.sections[0]?.id || null);
  }, [pageId]);

  const handleUpdateSection = (id: string, data: Record<string, any>) => {
    setSections(sections.map(s => (s.id === id ? { ...s, data } : s)));
    setIsDirty(true);
  };

  const handleDeleteSection = (id: string) => {
    const newSections = sections.filter(s => s.id !== id);
    setSections(newSections);
    if (activeId === id) {
      setActiveId(newSections[0]?.id || null);
    }
    setIsDirty(true);
  };

  const handleAddSection = (type: Section['type']) => {
    const newSection: Section = {
      id: `s${Date.now()}`,
      type,
      data:
        type === 'hero'
          ? {
              heading: 'New Section',
              subheading: '',
              buttonText: 'Click me',
              backgroundColor: '#0F172A',
              headingColor: '#FFFFFF',
              subheadingColor: '#CBD5E1',
              buttonColor: '#2563EB',
              buttonTextColor: '#FFFFFF',
            }
          : type === 'text'
          ? { text: 'Edit this text', textColor: '#374151' }
          : type === 'features'
          ? { title: 'Features', features: [{ title: 'Feature 1', description: 'Description' }] }
          : type === 'cta'
          ? {
              title: 'Call to Action',
              text: 'Take action now',
              buttonText: 'Join Us',
              buttonColor: '#FFFFFF',
              buttonTextColor: '#1D4ED8',
            }
          : { name: 'Custom Section', description: 'Your custom block', code: '// write code here' },
    };
    setSections([...sections, newSection]);
    setActiveId(newSection.id);
    setIsDirty(true);
  };

  const handleAddCustomSection = (payload: { name: string; description?: string; code?: string }) => {
    const newSection: Section = {
      id: `s${Date.now()}`,
      type: 'custom',
      data: {
        name: payload.name,
        description: payload.description || '',
        code: payload.code || '// custom section code',
      },
    };
    setSections([...sections, newSection]);
    setActiveId(newSection.id);
    setIsDirty(true);
  };

  const handleDuplicateSection = (id: string) => {
    const section = sections.find(s => s.id === id);
    if (section) {
      const newSection: Section = {
        ...section,
        id: `s${Date.now()}`,
      };
      setSections([...sections, newSection]);
      setIsDirty(true);
    }
  };

  const handleReorderSections = (sourceId: string, targetIndex: number) => {
    const updated = [...sections];
    const fromIndex = updated.findIndex(s => s.id === sourceId);
    if (fromIndex === -1 || targetIndex < 0 || targetIndex > updated.length) return;
    const [moved] = updated.splice(fromIndex, 1);
    const safeTarget = fromIndex < targetIndex ? targetIndex - 1 : targetIndex;
    updated.splice(safeTarget, 0, moved);
    setSections(updated);
    setActiveId(moved.id);
    setIsDirty(true);
  };

  const handleResizeStart = (clientX: number) => {
    resizeState.current = { active: true, startX: clientX, startWidth: previewWidth };
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  const handleResizeMove = (event: MouseEvent) => {
    if (!resizeState.current.active) return;
    const delta = event.clientX - resizeState.current.startX;
    const nextWidth = Math.min(1000, Math.max(280, resizeState.current.startWidth - delta));
    setPreviewWidth(nextWidth);
  };

  const handleResizeEnd = () => {
    resizeState.current = { ...resizeState.current, active: false };
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsDirty(false);
      alert('Page saved successfully!');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      alert('Page published successfully!');
      setIsDirty(false);
    } finally {
      setIsPublishing(false);
    }
  };

  if (!page) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  const activeSection = sections.find(s => s.id === activeId);

  return (
    <AdminLayout>
      <div className="h-[calc(100vh-100px)] flex flex-col -mx-6 -my-6">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{page.title}</h1>
              <p className="text-sm text-gray-500">
                Status: {page.status === 'published' ? '✓ Published' : 'Draft'}{' '}
                {isDirty && <span className="text-orange-600">• Unsaved changes</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={!isDirty || isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save size={18} />
              {isSaving ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Eye size={18} />
              {isPublishing ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>

        {/* 3-Pane Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Sections List */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col overflow-hidden">
            <SectionsList
              sections={sections}
              activeId={activeId}
              onSelect={setActiveId}
              onAdd={handleAddSection}
              onAddCustom={handleAddCustomSection}
              onDuplicate={handleDuplicateSection}
              onDelete={handleDeleteSection}
              onReorder={handleReorderSections}
            />
          </div>

          {/* Center: Editor */}
          <div className="flex-1 overflow-y-auto bg-white p-6">
            {activeSection ? (
              <SectionEditor section={activeSection} onChange={data => handleUpdateSection(activeId!, data)} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <p>No section selected</p>
              </div>
            )}
          </div>

          {/* Resize Handle */}
          <div
            onMouseDown={e => handleResizeStart(e.clientX)}
            className="w-2 cursor-col-resize bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Resize preview"
          />

          {/* Right: Preview */}
          <div
            className="bg-gray-100 border-l border-gray-200 flex flex-col overflow-hidden"
            style={{ width: `${previewWidth}px`, minWidth: '280px', maxWidth: '1000px' }}
          >
            <div className="bg-white border-b border-gray-200 px-4 py-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-gray-900">Live Preview</h3>
                <span className="text-xs text-gray-500">Drag edge to resize</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <PagePreview sections={sections} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
