'use client';

import AdminLayout from '@/components/AdminLayout';
import { UserPlus, Mail, Shield, Eye, EyeOff, Edit, Trash2, MoreVertical, X } from 'lucide-react';
import { useState } from 'react';

export default function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [openDropdown, setOpenDropdown] = useState<{ userId: number; type: 'role' | 'status' } | null>(null);
  const [passwordModalUser, setPasswordModalUser] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [websitePermissionUser, setWebsitePermissionUser] = useState<number | null>(null);
  const [selectedWebsites, setSelectedWebsites] = useState<string[]>([]);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [usersList, setUsersList] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@acmecorp.com',
      role: 'Admin',
      status: 'active',
      websitePermission: 'Full Access',
      avatar: 'JD',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@acmecorp.com',
      role: 'Editor',
      status: 'active',
      websitePermission: 'Edit Only',
      avatar: 'JS',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@acmecorp.com',
      role: 'Editor',
      status: 'active',
      websitePermission: 'Edit Only',
      avatar: 'MJ',
    },
  ]);

  const availableWebsites = [
    { id: 'website1', name: 'Company Main Site', domain: 'www.acmecorp.com' },
    { id: 'website2', name: 'Product Landing Page', domain: 'products.acmecorp.com' },
    { id: 'website3', name: 'Marketing Campaign', domain: 'marketing.acmecorp.com' },
    { id: 'website4', name: 'Blog Site', domain: 'blog.acmecorp.com' },
  ];

  const getRoleBadge = (role: string) => {
    const styles = {
      Admin: 'bg-purple-100 text-purple-700 border-purple-200',
      Editor: 'bg-blue-100 text-blue-700 border-blue-200',
      Viewer: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return styles[role as keyof typeof styles] || styles.Viewer;
  };

  const handleCreateUser = () => {
    // Create user logic here
    setIsModalOpen(false);
    setAlertMessage('User created successfully!');
    setShowAlert(true);
    setUsername('');
    setPassword('');
    
    // Hide alert after 3 seconds
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleRoleToggle = (userId: number, newRole: string) => {
    setUsersList(usersList.map(user => {
      if (user.id === userId) {
        return { ...user, role: newRole };
      }
      return user;
    }));
    setOpenDropdown(null);
    setAlertMessage('Role updated successfully!');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleStatusToggle = (userId: number, newStatus: string) => {
    setUsersList(usersList.map(user => {
      if (user.id === userId) {
        return { ...user, status: newStatus };
      }
      return user;
    }));
    setOpenDropdown(null);
    setAlertMessage('Status updated successfully!');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleChangePassword = (userName: string) => {
    setPasswordModalUser(userName);
    setNewPassword('');
  };

  const handleSavePassword = () => {
    setPasswordModalUser(null);
    setNewPassword('');
    setAlertMessage(`Password updated for ${passwordModalUser}`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleOpenWebsitePermission = (userId: number) => {
    setWebsitePermissionUser(userId);
    setSelectedWebsites([]);
  };

  const handleToggleWebsite = (websiteId: string) => {
    setSelectedWebsites(prev => 
      prev.includes(websiteId) 
        ? prev.filter(id => id !== websiteId)
        : [...prev, websiteId]
    );
  };

  const handleSaveWebsitePermission = () => {
    setWebsitePermissionUser(null);
    setAlertMessage('Website permissions updated successfully!');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-700 border-green-200'
      : 'bg-gray-100 text-gray-600 border-gray-200';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Users</h1>
            <p className="text-gray-600 mt-1">Manage your team members and their permissions.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <UserPlus size={20} />
            Add User
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Admins</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">1</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Editors</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">2</p>
          </div>
        </div>

        {/* Role Descriptions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <Shield size={20} />
            User Roles & Permissions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-purple-700">Admin</p>
              <p className="text-blue-800 mt-1">Full control over company website, users, and settings</p>
            </div>
            <div>
              <p className="font-medium text-blue-700">Editor</p>
              <p className="text-blue-800 mt-1">Can edit content, create pages, and manage media</p>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Password
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Website Permission
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {usersList.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">{user.avatar}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleChangePassword(user.name)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
                      >
                        Change Password
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          onClick={() => setOpenDropdown(openDropdown?.userId === user.id && openDropdown?.type === 'role' ? null : { userId: user.id, type: 'role' })}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border cursor-pointer hover:opacity-80 transition-opacity ${getRoleBadge(user.role)}`}
                        >
                          {user.role}
                        </button>
                        {openDropdown?.userId === user.id && openDropdown?.type === 'role' && (
                          <div className="absolute z-10 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg">
                            <button
                              onClick={() => handleRoleToggle(user.id, 'Admin')}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded-t-lg"
                            >
                              Admin
                            </button>
                            <button
                              onClick={() => handleRoleToggle(user.id, 'Editor')}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded-b-lg"
                            >
                              Editor
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          onClick={() => setOpenDropdown(openDropdown?.userId === user.id && openDropdown?.type === 'status' ? null : { userId: user.id, type: 'status' })}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border cursor-pointer hover:opacity-80 transition-opacity ${getStatusBadge(user.status)}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </button>
                        {openDropdown?.userId === user.id && openDropdown?.type === 'status' && (
                          <div className="absolute z-10 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg">
                            <button
                              onClick={() => handleStatusToggle(user.id, 'active')}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded-t-lg flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                              Active
                            </button>
                            <button
                              onClick={() => handleStatusToggle(user.id, 'inactive')}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded-b-lg flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                              Inactive
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleOpenWebsitePermission(user.id)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
                      >
                        Change Website Permission
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          className="flex items-center gap-2 p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove User"
                        >
                          <Trash2 size={18} />
                          <span className="text-sm font-medium">Remove User</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add User Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Add User</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCreatePassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCreatePassword(!showCreatePassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showCreatePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateUser}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Create User
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {passwordModalUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
                <button
                  onClick={() => setPasswordModalUser(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User: {passwordModalUser}
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setPasswordModalUser(null)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePassword}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Save Password
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Website Permission Modal */}
        {websitePermissionUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Website Permissions</h2>
                <button
                  onClick={() => setWebsitePermissionUser(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-3">
                {availableWebsites.map((website) => (
                  <div key={website.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      id={website.id}
                      checked={selectedWebsites.includes(website.id)}
                      onChange={() => handleToggleWebsite(website.id)}
                      className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={website.id} className="flex-1 cursor-pointer">
                      <p className="text-sm font-medium text-gray-900">{website.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{website.domain}</p>
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setWebsitePermissionUser(null)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveWebsitePermission}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Save Permissions
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Alert */}
        {showAlert && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
            <UserPlus size={20} />
            <span>{alertMessage}</span>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
