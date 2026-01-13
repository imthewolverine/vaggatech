'use client';

interface HeroEditorProps {
  data: {
    heading: string;
    subheading: string;
    buttonText: string;
    backgroundColor?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    headingColor?: string;
    subheadingColor?: string;
  };
  onChange: (data: any) => void;
}

export default function HeroEditor({ data, onChange }: HeroEditorProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Heading
        </label>
        <input
          type="text"
          value={data.heading}
          onChange={e => onChange({ ...data, heading: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Heading Color</label>
          <div className="flex gap-3">
            <input
              type="color"
              value={data.headingColor || '#FFFFFF'}
              onChange={e => onChange({ ...data, headingColor: e.target.value })}
              className="w-16 h-10 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={data.headingColor || '#FFFFFF'}
              onChange={e => onChange({ ...data, headingColor: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subheading Color</label>
          <div className="flex gap-3">
            <input
              type="color"
              value={data.subheadingColor || '#CBD5E1'}
              onChange={e => onChange({ ...data, subheadingColor: e.target.value })}
              className="w-16 h-10 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={data.subheadingColor || '#CBD5E1'}
              onChange={e => onChange({ ...data, subheadingColor: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subheading
        </label>
        <input
          type="text"
          value={data.subheading}
          onChange={e => onChange({ ...data, subheading: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Button Text
        </label>
        <input
          type="text"
          value={data.buttonText}
          onChange={e => onChange({ ...data, buttonText: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Button Color</label>
          <div className="flex gap-3">
            <input
              type="color"
              value={data.buttonColor || '#2563EB'}
              onChange={e => onChange({ ...data, buttonColor: e.target.value })}
              className="w-16 h-10 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={data.buttonColor || '#2563EB'}
              onChange={e => onChange({ ...data, buttonColor: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Button Text Color</label>
          <div className="flex gap-3">
            <input
              type="color"
              value={data.buttonTextColor || '#FFFFFF'}
              onChange={e => onChange({ ...data, buttonTextColor: e.target.value })}
              className="w-16 h-10 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={data.buttonTextColor || '#FFFFFF'}
              onChange={e => onChange({ ...data, buttonTextColor: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Background Color
        </label>
        <div className="flex gap-3">
          <input
            type="color"
            value={data.backgroundColor || '#0F172A'}
            onChange={e => onChange({ ...data, backgroundColor: e.target.value })}
            className="w-16 h-10 rounded-lg cursor-pointer"
          />
          <input
            type="text"
            value={data.backgroundColor || '#0F172A'}
            onChange={e => onChange({ ...data, backgroundColor: e.target.value })}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> This hero section is displayed prominently at the top of the page.
        </p>
      </div>
    </div>
  );
}
