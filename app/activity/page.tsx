'use client';

import AdminLayout from '@/components/AdminLayout';
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Globe, 
  FileText, 
  Users, 
  Settings,
  Filter,
  Calendar,
  X
} from 'lucide-react';
import { useState } from 'react';

export default function Activity() {
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isRangeOpen, setIsRangeOpen] = useState(false);
  const [draftRange, setDraftRange] = useState({ start: '', end: '' });
  type PresetKey = 'today' | 'last24h' | 'last7d' | 'last30d' | 'all';
  const presetOptions: { id: PresetKey; label: string }[] = [
    { id: 'today', label: 'Today' },
    { id: 'last24h', label: 'Last 24h' },
    { id: 'last7d', label: 'Last 7d' },
    { id: 'last30d', label: 'Last 30d' },
    { id: 'all', label: 'All time' },
  ];

  const activities = [
    {
      id: 1,
      type: 'success',
      category: 'website',
      icon: Globe,
      title: 'Website Published',
      description: 'Company Main Site was successfully published',
      user: 'John Doe',
      timestamp: '2 hours ago',
      timestampIso: '2026-01-11T08:30:00Z',
      details: 'Domain: www.acmecorp.com',
    },
    {
      id: 2,
      type: 'info',
      category: 'page',
      icon: FileText,
      title: 'Page Created',
      description: 'New page "Services" was created',
      user: 'Jane Smith',
      timestamp: '5 hours ago',
      timestampIso: '2026-01-11T05:30:00Z',
      details: 'Added to Company Main Site',
    },
    {
      id: 3,
      type: 'success',
      category: 'user',
      icon: Users,
      title: 'User Invited',
      description: 'Mike Johnson was invited to the team',
      user: 'John Doe',
      timestamp: '1 day ago',
      timestampIso: '2026-01-10T10:00:00Z',
      details: 'Role: Editor',
    },
    {
      id: 4,
      type: 'warning',
      category: 'settings',
      icon: Settings,
      title: 'Domain Configuration',
      description: 'Custom domain DNS needs attention',
      user: 'System',
      timestamp: '1 day ago',
      timestampIso: '2026-01-10T12:00:00Z',
      details: 'products.acmecorp.com - DNS propagation pending',
    },
    {
      id: 5,
      type: 'success',
      category: 'page',
      icon: FileText,
      title: 'Page Updated',
      description: 'About Us page content was modified',
      user: 'Jane Smith',
      timestamp: '2 days ago',
      timestampIso: '2026-01-09T15:00:00Z',
      details: 'Changed hero section text',
    },
    {
      id: 6,
      type: 'info',
      category: 'website',
      icon: Globe,
      title: 'Template Applied',
      description: 'Modern Business template was applied',
      user: 'Sarah Wilson',
      timestamp: '2 days ago',
      timestampIso: '2026-01-09T11:00:00Z',
      details: 'To Product Landing Page',
    },
    {
      id: 7,
      type: 'error',
      category: 'settings',
      icon: AlertCircle,
      title: 'Payment Failed',
      description: 'Monthly subscription payment failed',
      user: 'System',
      timestamp: '3 days ago',
      timestampIso: '2026-01-08T09:00:00Z',
      details: 'Please update payment method',
    },
    {
      id: 8,
      type: 'success',
      category: 'user',
      icon: Users,
      title: 'Role Changed',
      description: 'Mike Johnson role updated to Editor',
      user: 'John Doe',
      timestamp: '3 days ago',
      timestampIso: '2026-01-08T16:00:00Z',
      details: 'Previously: Viewer',
    },
    {
      id: 9,
      type: 'info',
      category: 'website',
      icon: Globe,
      title: 'Website Created',
      description: 'New website "Marketing Campaign" created',
      user: 'John Doe',
      timestamp: '1 week ago',
      timestampIso: '2026-01-04T10:00:00Z',
      details: 'Status: Draft',
    },
    {
      id: 10,
      type: 'success',
      category: 'page',
      icon: FileText,
      title: 'Page Published',
      description: 'Contact page was published',
      user: 'Sarah Wilson',
      timestamp: '1 week ago',
      timestampIso: '2026-01-04T14:00:00Z',
      details: 'On Company Main Site',
    },
  ];

  const getTypeConfig = (type: string) => {
    const configs = {
      success: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, iconColor: 'text-green-600' },
      error: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle, iconColor: 'text-red-600' },
      warning: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: AlertCircle, iconColor: 'text-yellow-600' },
      info: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Info, iconColor: 'text-blue-600' },
    };
    return configs[type as keyof typeof configs] || configs.info;
  };

  const toMs = (value: string | undefined) => {
    if (!value) return undefined;
    const ms = new Date(value).getTime();
    return Number.isNaN(ms) ? undefined : ms;
  };

  const startMs = toMs(dateRange.start);
  const endMs = toMs(dateRange.end);

  const isWithinRange = (iso: string | undefined) => {
    if (!iso) return true;
    const ts = toMs(iso);
    if (ts === undefined) return true;
    const afterStart = startMs !== undefined ? ts >= startMs : true;
    const beforeEnd = endMs !== undefined ? ts <= endMs : true;
    return afterStart && beforeEnd;
  };

  const filteredActivities = activities.filter((activity) => {
    const matchesCategory = filter === 'all' ? true : activity.category === filter;
    const matchesDate = isWithinRange(activity.timestampIso);
    return matchesCategory && matchesDate;
  });

  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  const stats = {
    total: activities.length,
    today: activities.filter((a) => {
      const ms = toMs(a.timestampIso);
      return ms !== undefined && ms >= startOfDay.getTime();
    }).length,
    thisWeek: activities.filter((a) => {
      const ms = toMs(a.timestampIso);
      return ms !== undefined && ms >= sevenDaysAgo.getTime();
    }).length,
    unread: 3,
  };

  const toLocalInput = (date: Date) => {
    const offsetMs = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
  };

  const applyPreset = (preset: PresetKey) => {
    const nowLocal = new Date();
    const nextRange = { start: '', end: '' };

    if (preset === 'today') {
      const start = new Date(nowLocal);
      start.setHours(0, 0, 0, 0);
      nextRange.start = toLocalInput(start);
      nextRange.end = toLocalInput(nowLocal);
    } else if (preset === 'last24h') {
      const start = new Date(nowLocal.getTime() - 24 * 60 * 60 * 1000);
      nextRange.start = toLocalInput(start);
      nextRange.end = toLocalInput(nowLocal);
    } else if (preset === 'last7d') {
      const start = new Date(nowLocal.getTime() - 7 * 24 * 60 * 60 * 1000);
      nextRange.start = toLocalInput(start);
      nextRange.end = toLocalInput(nowLocal);
    } else if (preset === 'last30d') {
      const start = new Date(nowLocal.getTime() - 30 * 24 * 60 * 60 * 1000);
      nextRange.start = toLocalInput(start);
      nextRange.end = toLocalInput(nowLocal);
    }

    setDateRange(nextRange);
    setDraftRange(nextRange);
    setIsRangeOpen(false);
  };

  const handleApplyCustom = () => {
    setDateRange(draftRange);
    setIsRangeOpen(false);
  };

  const handleClearRange = () => {
    const cleared = { start: '', end: '' };
    setDateRange(cleared);
    setDraftRange(cleared);
    setIsRangeOpen(false);
  };

  const formatDateLabel = (value: string) => {
    if (!value) return '';
    const ms = toMs(value);
    if (ms === undefined) return '';
    return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(ms));
  };

  const rangeLabel = (() => {
    if (!dateRange.start && !dateRange.end) return 'All time';
    if (dateRange.start && dateRange.end) return `${formatDateLabel(dateRange.start)} → ${formatDateLabel(dateRange.end)}`;
    if (dateRange.start) return `From ${formatDateLabel(dateRange.start)}`;
    if (dateRange.end) return `Until ${formatDateLabel(dateRange.end)}`;
    return 'All time';
  })();

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Activity Log</h1>
            <p className="text-gray-600 mt-1">Track all changes and system events.</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <Bell size={20} />
            Mark All as Read
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total Activity</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Today</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">{stats.today}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">This Week</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{stats.thisWeek}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Unread</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">{stats.unread}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
            <div className="flex items-center gap-3">
              <Filter size={20} className="text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Activity' },
                  { id: 'website', label: 'Websites' },
                  { id: 'page', label: 'Pages' },
                  { id: 'user', label: 'Users' },
                  { id: 'settings', label: 'Settings' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFilter(item.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === item.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              {filter !== 'all' && (
                <button
                  onClick={() => setFilter('all')}
                  className="ml-auto p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setDraftRange(dateRange);
                  setIsRangeOpen((open) => !open);
                }}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Calendar size={16} className="text-gray-500" />
                <span>{rangeLabel}</span>
              </button>

              {isRangeOpen && (
                <div className="absolute z-20 mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-lg">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Presets</p>
                    <div className="flex flex-wrap gap-2">
                      {presetOptions.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => applyPreset(preset.id)}
                          className="px-3 py-1.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 space-y-3">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-gray-500">From</label>
                      <input
                        type="datetime-local"
                        value={draftRange.start}
                        onChange={(e) => setDraftRange((prev) => ({ ...prev, start: e.target.value }))}
                        className="w-full border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-700"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-gray-500">To</label>
                      <input
                        type="datetime-local"
                        value={draftRange.end}
                        onChange={(e) => setDraftRange((prev) => ({ ...prev, end: e.target.value }))}
                        className="w-full border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-700"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={handleClearRange}
                        className="text-xs font-medium text-gray-600 hover:text-gray-800"
                      >
                        Clear
                      </button>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setIsRangeOpen(false)}
                          className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-gray-900"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleApplyCustom}
                          className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {filter === 'all' ? 'All Activity' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Activity`}
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredActivities.length === 0 ? (
              <div className="p-12 text-center">
                <Bell size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600">No activity found for this filter</p>
              </div>
            ) : (
              filteredActivities.map((activity) => {
                const typeConfig = getTypeConfig(activity.type);
                const CategoryIcon = activity.icon;
                const StatusIcon = typeConfig.icon;

                return (
                  <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 ${typeConfig.bg} rounded-lg flex items-center justify-center shrink-0`}>
                        <CategoryIcon size={24} className={typeConfig.iconColor} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                              <StatusIcon size={16} className={typeConfig.iconColor} />
                            </div>
                            <p className="text-sm text-gray-700 mb-1">{activity.description}</p>
                            <p className="text-xs text-gray-500">{activity.details}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm text-gray-900 font-medium">{activity.user}</p>
                            <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {filteredActivities.length > 0 && (
            <div className="p-4 border-t border-gray-200 text-center">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Load More Activity
              </button>
            </div>
          )}
        </div>

        {/* System Alerts */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
            <AlertCircle size={20} />
            System Alerts
          </h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm text-yellow-800">
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-1.5"></span>
              <p>DNS propagation pending for products.acmecorp.com - usually completes within 24-48 hours</p>
            </div>
            <div className="flex items-start gap-2 text-sm text-yellow-800">
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-1.5"></span>
              <p>Storage usage at 42% - consider upgrading if you need more space</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
