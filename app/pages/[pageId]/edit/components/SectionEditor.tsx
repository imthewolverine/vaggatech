'use client';

import React, { useRef, useState } from 'react';
import { Play, AlertCircle, CheckCircle } from 'lucide-react';
import HeroEditor from './editors/HeroEditor';
import TextEditor from './editors/TextEditor';
import FeaturesEditor from './editors/FeaturesEditor';
import CTAEditor from './editors/CTAEditor';

interface Section {
  id: string;
  type: 'hero' | 'text' | 'features' | 'cta' | 'custom';
  data: Record<string, any>;
}

interface SectionEditorProps {
  section: Section;
  onChange: (data: Record<string, any>) => void;
}

declare global {
  interface Window {
    Babel?: any;
  }
}

export default function SectionEditor({ section, onChange }: SectionEditorProps) {
  const [customOutput, setCustomOutput] = useState<{ success: boolean; message?: string; error?: string } | null>(null);
  const babelRef = useRef<any>(null);

  const loadBabel = async () => {
    if (typeof window === 'undefined') throw new Error('Babel can only load in the browser');
    if (babelRef.current) return babelRef.current;
    if (window.Babel) {
      babelRef.current = window.Babel;
      return babelRef.current;
    }

    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@babel/standalone@7.24.9/babel.min.js';
      script.async = true;
      script.onload = () => {
        babelRef.current = window.Babel;
        resolve();
      };
      script.onerror = () => reject(new Error('Failed to load Babel')); 
      document.head.appendChild(script);
    });

    return babelRef.current;
  };
  const renderEditor = () => {
    switch (section.type) {
      case 'hero':
        return <HeroEditor data={section.data as any} onChange={onChange} />;
      case 'text':
        return <TextEditor data={section.data as any} onChange={onChange} />;
      case 'features':
        return <FeaturesEditor data={section.data as any} onChange={onChange} />;
      case 'cta':
        return <CTAEditor data={section.data as any} onChange={onChange} />;
      case 'custom':
        const executeCode = async () => {
          try {
            const code = section.data.code || '';
            if (!code.trim()) {
              setCustomOutput({ success: false, error: 'Code is empty. Write some code and try again.' });
              return;
            }
            
            // Load Babel and transpile JSX -> JS
            const Babel = await loadBabel();
            const transformed = Babel.transform(code, {
              presets: ['react'],
            }).code as string;

            // Execute transpiled code
            const result = new Function('React', 'createElement', 'return ' + transformed);
            let output = result(React, React.createElement);

            // If code executed but returned nothing, fallback to rendering the raw HTML/string
            if (output === undefined || output === null) {
              if (code.includes('<')) {
                output = { __html: code };
              } else {
                output = code;
              }
            }
            
            onChange({ 
              ...section.data, 
              code: code,
              output: output,
              lastRun: new Date().toISOString()
            });
            
            setCustomOutput({ success: true, message: 'Code executed successfully!' });
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            onChange({ ...section.data, code: section.data.code });
            
            // Provide helpful error message
            let helpText = errorMessage;
            if (errorMessage.includes('Unexpected token')) {
              helpText = `${errorMessage} - Try using createElement() instead of JSX, or check your syntax.`;
            }
            
            setCustomOutput({ success: false, error: helpText });
          }
        };
        
        return (
          <div className="space-y-4">
            {/* Compiler Interface */}
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
              {/* Compiler Header */}
              <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-400 text-xs ml-2">Compiler</span>
                </div>
                <button
                  onClick={executeCode}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors font-medium"
                >
                  <Play size={14} />
                  Run
                </button>
              </div>
              
              {/* Code Editor */}
              <textarea
                value={section.data.code || ''}
                onChange={e => onChange({ ...section.data, code: e.target.value })}
                rows={12}
                placeholder="Write JSX or JavaScript code here...&#10;&#10;Examples:&#10;&#10;// Option 1: JSX (auto-converted)&#10;<div><h1>Hello</h1><p>World</p></div>&#10;&#10;// Option 2: Using createElement&#10;createElement('div', null, createElement('h1', null, 'Hello'))"
                className="w-full px-4 py-3 bg-gray-950 text-green-100 font-mono text-sm resize-none focus:outline-none border-0"
              />
            </div>
            
            {/* Output/Status Box */}
            {customOutput && (
              <div className={`rounded-lg p-4 border flex gap-3 items-start ${
                customOutput.success 
                  ? 'bg-green-50 border-green-300' 
                  : 'bg-red-50 border-red-300'
              }`}>
                {customOutput.success ? (
                  <CheckCircle size={18} className="text-green-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className={`text-sm font-medium ${
                    customOutput.success ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {customOutput.success ? 'Success' : 'Compilation Error'}
                  </p>
                  <p className={`text-xs mt-1 ${
                    customOutput.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {customOutput.success ? customOutput.message : customOutput.error}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return <div className="text-gray-500">Unknown section type</div>;
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Edit Section</h2>
        <p className="text-gray-600 text-sm">
          Type: <span className="font-medium">{section.type}</span>
        </p>
      </div>
      <div className="bg-gray-50 rounded-lg p-6">{renderEditor()}</div>
    </div>
  );
}
