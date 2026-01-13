'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Globe,
  FileText,
  Users,
  Palette,
  Image,
  Settings,
  CreditCard,
  Bell,
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Websites', href: '/websites', icon: Globe },
  { name: 'Pages', href: '/pages', icon: FileText },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Templates', href: '/templates', icon: Palette },
  { name: 'Media Library', href: '/media', icon: Image },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Activity', href: '/activity', icon: Bell },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          WebBuilder
        </h1>
        <p className="text-gray-400 text-sm mt-1">Company Admin</p>
      </div>

      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">AC</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Acme Corp</p>
            <p className="text-xs text-gray-400">Premium Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
