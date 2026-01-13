import AdminLayout from '@/components/AdminLayout';
import { CreditCard, Download, TrendingUp, Check, Zap, Crown, ArrowUpRight } from 'lucide-react';

export default function Billing() {
  const currentPlan = {
    name: 'Premium',
    price: 99,
    period: 'month',
    features: [
      'Unlimited websites',
      'Custom domains',
      'Priority support',
      '100GB storage',
      'Advanced analytics',
      'Team collaboration',
    ],
    nextBilling: 'February 1, 2026',
    status: 'active',
  };

  const plans = [
    {
      name: 'Starter',
      price: 29,
      period: 'month',
      description: 'Perfect for small businesses',
      features: [
        '3 websites',
        '1 custom domain',
        '10GB storage',
        'Basic analytics',
        'Email support',
      ],
      current: false,
    },
    {
      name: 'Premium',
      price: 99,
      period: 'month',
      description: 'Most popular for growing companies',
      features: [
        'Unlimited websites',
        'Custom domains',
        'Priority support',
        '100GB storage',
        'Advanced analytics',
        'Team collaboration',
      ],
      current: true,
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 299,
      period: 'month',
      description: 'For large organizations',
      features: [
        'Everything in Premium',
        'Dedicated account manager',
        'Custom integrations',
        'Unlimited storage',
        'SLA guarantee',
        'White-label options',
      ],
      current: false,
    },
  ];

  const invoices = [
    { id: 'INV-2025-12', date: 'Dec 1, 2025', amount: 99, status: 'paid' },
    { id: 'INV-2025-11', date: 'Nov 1, 2025', amount: 99, status: 'paid' },
    { id: 'INV-2025-10', date: 'Oct 1, 2025', amount: 99, status: 'paid' },
    { id: 'INV-2025-09', date: 'Sep 1, 2025', amount: 99, status: 'paid' },
    { id: 'INV-2025-08', date: 'Aug 1, 2025', amount: 99, status: 'paid' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
          <p className="text-gray-600 mt-1">Manage your subscription and payment information.</p>
        </div>

        {/* Current Plan Overview */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Crown size={32} />
                <h2 className="text-3xl font-bold">{currentPlan.name} Plan</h2>
              </div>
              <p className="text-blue-100 mb-4">Your current subscription</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">${currentPlan.price}</span>
                <span className="text-xl text-blue-100">/{currentPlan.period}</span>
              </div>
              <p className="text-blue-100 mt-4">Next billing date: {currentPlan.nextBilling}</p>
            </div>
            <span className="bg-green-400 text-green-900 px-4 py-2 rounded-full font-semibold">
              Active
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
            {currentPlan.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check size={18} className="text-green-300" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-8">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Manage Subscription
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
              Update Payment Method
            </button>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Websites Used</p>
              <TrendingUp size={20} className="text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-500 mt-1">Unlimited available</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Storage Used</p>
              <TrendingUp size={20} className="text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">42.5 GB</p>
            <p className="text-sm text-gray-500 mt-1">of 100 GB</p>
            <div className="mt-3 bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '42.5%' }}></div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Team Members</p>
              <TrendingUp size={20} className="text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">8</p>
            <p className="text-sm text-gray-500 mt-1">Unlimited available</p>
          </div>
        </div>

        {/* Available Plans */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-lg border-2 p-6 relative ${
                  plan.current
                    ? 'border-blue-600 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Zap size={14} fill="currentColor" />
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    plan.current
                      ? 'bg-gray-100 text-gray-600 cursor-default'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                  disabled={plan.current}
                >
                  {plan.current ? 'Current Plan' : plan.price > currentPlan.price ? 'Upgrade' : 'Downgrade'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
          <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <CreditCard size={24} className="text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-500">Expires 12/2026</p>
              </div>
            </div>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Update
            </button>
          </div>
        </div>

        {/* Invoice History */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Invoice History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Invoice ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {invoice.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{invoice.date}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      ${invoice.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Paid
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <Download size={16} />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
