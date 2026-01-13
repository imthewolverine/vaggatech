'use client';

import { Plus, Trash2 } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
}

interface FeaturesEditorProps {
  data: {
    title: string;
    features: Feature[];
  };
  onChange: (data: any) => void;
}

export default function FeaturesEditor({ data, onChange }: FeaturesEditorProps) {
  const addFeature = () => {
    onChange({
      ...data,
      features: [...data.features, { title: 'New Feature', description: '' }],
    });
  };

  const updateFeature = (index: number, feature: Feature) => {
    const newFeatures = [...data.features];
    newFeatures[index] = feature;
    onChange({ ...data, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    onChange({
      ...data,
      features: data.features.filter((_: Feature, i: number) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Section Title
        </label>
        <input
          type="text"
          value={data.title}
          onChange={e => onChange({ ...data, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Features
          </label>
          <button
            onClick={addFeature}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            Add Feature
          </button>
        </div>

        <div className="space-y-4">
          {data.features.map((feature: Feature, index: number) => (
            <div key={index} className="bg-white border border-gray-300 rounded-lg p-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={feature.title}
                    onChange={e =>
                      updateFeature(index, { ...feature, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={feature.description}
                    onChange={e =>
                      updateFeature(index, { ...feature, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => removeFeature(index)}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          ✨ <strong>Tip:</strong> Features are displayed in a grid layout.
        </p>
      </div>
    </div>
  );
}
