"use client";

import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from './ThemeProvider';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  const themeClasses: Record<string, string> = {
    light: 'bg-gray-50 text-gray-900',
    dark: 'bg-gray-900 text-white',
    ocean: 'bg-sky-50 text-slate-900',
    emerald: 'bg-emerald-50 text-slate-900',
    plum: 'bg-fuchsia-50 text-slate-900',
    sunset: 'bg-rose-50 text-slate-900',
  };
  return (
    <div className={`min-h-screen ${themeClasses[theme] || themeClasses.light}`}>
      <Sidebar />
      <Header />
      <main className="ml-64 pt-16">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
