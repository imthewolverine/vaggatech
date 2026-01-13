import AdminLayout from '@/components/AdminLayout';
import { Upload, Folder, Image as ImageIcon, File, Video, Search, Grid, List, Download, Trash2 } from 'lucide-react';

export default function Media() {
  const folders = [
    { id: 1, name: 'Product Images', files: 45, size: '23.4 MB' },
    { id: 2, name: 'Logos & Branding', files: 12, size: '5.2 MB' },
    { id: 3, name: 'Blog Posts', files: 68, size: '42.1 MB' },
    { id: 4, name: 'Marketing Materials', files: 31, size: '18.7 MB' },
  ];

  const recentFiles = [
    { id: 1, name: 'hero-banner.jpg', type: 'image', size: '2.4 MB', uploaded: '2 hours ago', thumbnail: true },
    { id: 2, name: 'company-logo.svg', type: 'image', size: '156 KB', uploaded: '5 hours ago', thumbnail: true },
    { id: 3, name: 'product-demo.mp4', type: 'video', size: '45.2 MB', uploaded: '1 day ago', thumbnail: false },
    { id: 4, name: 'presentation.pdf', type: 'document', size: '3.8 MB', uploaded: '2 days ago', thumbnail: false },
    { id: 5, name: 'team-photo.jpg', type: 'image', size: '1.9 MB', uploaded: '3 days ago', thumbnail: true },
    { id: 6, name: 'infographic.png', type: 'image', size: '876 KB', uploaded: '1 week ago', thumbnail: true },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon size={24} className="text-blue-500" />;
      case 'video':
        return <Video size={24} className="text-purple-500" />;
      case 'document':
        return <File size={24} className="text-orange-500" />;
      default:
        return <File size={24} className="text-gray-500" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
            <p className="text-gray-600 mt-1">Upload and manage your images, videos, and documents.</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <Upload size={20} />
            Upload Files
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total Files</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">156</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Images</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">89</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Videos</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">12</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Storage Used</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">89.4 MB</p>
          </div>
        </div>

        {/* Search and View Toggle */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search files..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 bg-white border border-gray-300 rounded-lg p-1">
            <button className="p-2 bg-blue-600 text-white rounded">
              <Grid size={18} />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors p-12 text-center cursor-pointer group">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
              <Upload size={32} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Drop files to upload</h3>
            <p className="text-gray-600 text-sm mb-4">
              or click to browse from your computer
            </p>
            <p className="text-xs text-gray-500">
              Supports: JPG, PNG, SVG, MP4, PDF (Max 50MB per file)
            </p>
          </div>
        </div>

        {/* Folders */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Folders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {folders.map((folder) => (
              <div
                key={folder.id}
                className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors">
                    <Folder size={24} className="text-blue-600" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{folder.name}</h3>
                <p className="text-sm text-gray-500">{folder.files} files • {folder.size}</p>
              </div>
            ))}
            
            {/* Create Folder */}
            <button className="bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 p-5 transition-all group">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 group-hover:bg-blue-100 rounded-lg mb-3 transition-colors">
                <Folder size={24} className="text-gray-400 group-hover:text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-600 group-hover:text-blue-600">Create Folder</h3>
            </button>
          </div>
        </div>

        {/* Recent Files */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Files</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentFiles.map((file) => (
              <div
                key={file.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
              >
                {/* Thumbnail */}
                <div className={`h-40 ${file.thumbnail ? 'bg-gradient-to-br from-gray-100 to-gray-200' : 'bg-gray-100'} flex items-center justify-center relative`}>
                  {file.thumbnail ? (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <ImageIcon size={48} className="text-gray-400" />
                    </div>
                  ) : (
                    getFileIcon(file.type)
                  )}
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button className="p-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100">
                      <Download size={18} />
                    </button>
                    <button className="p-2 bg-white text-red-600 rounded-lg hover:bg-red-50">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 text-sm truncate mb-1">{file.name}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{file.size}</span>
                    <span>{file.uploaded}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
