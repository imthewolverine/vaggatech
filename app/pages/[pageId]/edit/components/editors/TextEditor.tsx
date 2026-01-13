'use client';

interface TextEditorProps {
  data: {
    text: string;
    textColor?: string;
  };
  onChange: (data: any) => void;
}

export default function TextEditor({ data, onChange }: TextEditorProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <textarea
          value={data.text}
          onChange={e => onChange({ ...data, text: e.target.value })}
          rows={8}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
        <div className="flex gap-3">
          <input
            type="color"
            value={data.textColor || '#374151'}
            onChange={e => onChange({ ...data, textColor: e.target.value })}
            className="w-16 h-10 rounded-lg cursor-pointer"
          />
          <input
            type="text"
            value={data.textColor || '#374151'}
            onChange={e => onChange({ ...data, textColor: e.target.value })}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          📝 <strong>Note:</strong> Plain text content displayed in paragraph format.
        </p>
      </div>
    </div>
  );
}
