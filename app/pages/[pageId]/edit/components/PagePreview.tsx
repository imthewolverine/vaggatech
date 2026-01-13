'use client';

import React from 'react';

// This component renders the page exactly as it would appear on the live site
// Used for both preview in the editor and on the actual published page

interface Section {
  id: string;
  type: 'hero' | 'text' | 'features' | 'cta' | 'custom';
  data: Record<string, any>;
}

interface PagePreviewProps {
  sections: Section[];
}

export default function PagePreview({ sections }: PagePreviewProps) {
  return (
    <div className="bg-white">
      {sections.map(section => {
        switch (section.type) {
          case 'hero':
            return (
              <div
                key={section.id}
                style={{ backgroundColor: section.data.backgroundColor || '#0F172A' }}
                className="px-6 py-20 text-white text-center"
              >
                <h1
                  className="text-5xl font-bold mb-4"
                  style={{ color: section.data.headingColor || '#FFFFFF' }}
                >
                  {section.data.heading}
                </h1>
                <p
                  className="text-xl mb-8"
                  style={{ color: section.data.subheadingColor || '#CBD5E1' }}
                >
                  {section.data.subheading}
                </p>
                <button
                  className="px-8 py-3 rounded-lg font-semibold transition-colors"
                  style={{
                    backgroundColor: section.data.buttonColor || '#2563EB',
                    color: section.data.buttonTextColor || '#FFFFFF',
                  }}
                >
                  {section.data.buttonText}
                </button>
              </div>
            );

          case 'text':
            return (
              <div key={section.id} className="px-6 py-12">
                <p
                  className="text-lg leading-relaxed max-w-2xl mx-auto"
                  style={{ color: section.data.textColor || '#374151' }}
                >
                  {section.data.text}
                </p>
              </div>
            );

          case 'features':
            return (
              <div key={section.id} className="px-6 py-16 bg-gray-50">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                  {section.data.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  {section.data.features.map((feature: any, idx: number) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'cta':
            return (
              <div key={section.id} className="px-6 py-16 bg-blue-600 text-white text-center">
                <h2 className="text-4xl font-bold mb-4">{section.data.title}</h2>
                <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                  {section.data.text}
                </p>
                <button
                  className="px-8 py-3 rounded-lg font-semibold transition-colors"
                  style={{
                    backgroundColor: section.data.buttonColor || '#FFFFFF',
                    color: section.data.buttonTextColor || '#1D4ED8',
                  }}
                >
                  {section.data.buttonText}
                </button>
              </div>
            );

          case 'custom':
            return (
              <div key={section.id}>
                {section.data.output ? (
                  <>
                    {React.isValidElement(section.data.output) ? (
                      section.data.output
                    ) : Array.isArray(section.data.output) ? (
                      <>
                        {section.data.output.map((node: any, idx: number) =>
                          React.isValidElement(node) ? (
                            React.cloneElement(node, { key: idx })
                          ) : typeof node === 'object' && node && '__html' in node ? (
                            <div key={idx} dangerouslySetInnerHTML={{ __html: (node as any).__html }} />
                          ) : (
                            <pre
                              key={idx}
                              className="bg-gray-50 p-4 rounded text-xs overflow-auto"
                            >
                              {JSON.stringify(node, null, 2)}
                            </pre>
                          )
                        )}
                      </>
                    ) : typeof section.data.output === 'object' && '__html' in section.data.output ? (
                      <div dangerouslySetInnerHTML={{ __html: (section.data.output as any).__html }} />
                    ) : typeof section.data.output === 'string' ? (
                      <div dangerouslySetInnerHTML={{ __html: section.data.output }} />
                    ) : (
                      <pre className="bg-gray-50 p-4 rounded text-xs overflow-auto">
                        {JSON.stringify(section.data.output, null, 2)}
                      </pre>
                    )}
                  </>
                ) : (
                  <div className="text-center text-gray-400 py-8 px-6">
                    <p>Click Run in the editor to execute code and see the live section here</p>
                  </div>
                )}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
