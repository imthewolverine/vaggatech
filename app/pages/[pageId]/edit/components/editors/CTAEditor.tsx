'use client';

interface CTAEditorProps {
  data: {
    title: string;
    text: string;
    buttonText: string;
    buttonColor?: string;
    buttonTextColor?: string;
  };
  onChange: (data: any) => void;
}

export default function CTAEditor({ data, onChange }: CTAEditorProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Heading
        </label>
        <input
          type="text"
          value={data.title}
          onChange={e => onChange({ ...data, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={data.text}
          onChange={e => onChange({ ...data, text: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
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
              value={data.buttonColor || '#FFFFFF'}
              onChange={e => onChange({ ...data, buttonColor: e.target.value })}
              className="w-16 h-10 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={data.buttonColor || '#FFFFFF'}
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
              value={data.buttonTextColor || '#1D4ED8'}
              onChange={e => onChange({ ...data, buttonTextColor: e.target.value })}
              className="w-16 h-10 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={data.buttonTextColor || '#1D4ED8'}
              onChange={e => onChange({ ...data, buttonTextColor: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          🔔 <strong>Tip:</strong> Call-to-action sections encourage visitors to take action.
        </p>
      </div>
    </div>
  );
}
