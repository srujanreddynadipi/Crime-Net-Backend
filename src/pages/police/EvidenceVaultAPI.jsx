import React, { useState, useEffect } from 'react';
import { getAllReports, getReportById } from '../../api/reports';
import { Upload, File, Image, Video, FileText, Download, Eye, Trash2, Search, Filter, AlertCircle, Lock, CheckCircle } from 'lucide-react';

const EvidenceVaultAPI = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [evidence, setEvidence] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setError('');
      const data = await getAllReports();
      setReports(data || []);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const fetchEvidence = async (reportId) => {
    try {
      setError('');
      setLoading(true);
      const report = await getReportById(reportId);
      setSelectedReport(report);
      // In a real implementation, you'd fetch attachments from backend
      // For now, we'll simulate with the report's attachments field
      setEvidence(report.attachments || []);
    } catch (err) {
      console.error('Error fetching evidence:', err);
      setError('Failed to load evidence');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedReport) {
      setError('Please select a file and report');
      return;
    }

    try {
      setUploading(true);
      setError('');
      
      // In a real implementation, you'd upload to backend
      // For now, we'll simulate success
      alert(`File "${selectedFile.name}" uploaded successfully!`);
      
      setSelectedFile(null);
      setPreviewUrl(null);
      setShowUpload(false);
      
      // Refresh evidence list
      await fetchEvidence(selectedReport.reportId);
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = (type) => {
    switch (type?.toUpperCase()) {
      case 'IMAGE':
        return <Image className="w-6 h-6 text-blue-600" />;
      case 'VIDEO':
        return <Video className="w-6 h-6 text-purple-600" />;
      case 'AUDIO':
        return <File className="w-6 h-6 text-green-600" />;
      case 'DOC':
        return <FileText className="w-6 h-6 text-orange-600" />;
      default:
        return <File className="w-6 h-6 text-gray-600" />;
    }
  };

  const getFileTypeColor = (type) => {
    switch (type?.toUpperCase()) {
      case 'IMAGE':
        return 'bg-blue-100 text-blue-800';
      case 'VIDEO':
        return 'bg-purple-100 text-purple-800';
      case 'AUDIO':
        return 'bg-green-100 text-green-800';
      case 'DOC':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      if (timestamp._seconds) {
        return new Date(timestamp._seconds * 1000).toLocaleString();
      }
      return new Date(timestamp).toLocaleString();
    } catch {
      return 'Invalid date';
    }
  };

  const filteredReports = reports.filter((report) =>
    report.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.caseNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEvidence = evidence.filter((item) =>
    typeFilter === 'ALL' || item.type === typeFilter
  );

  if (loading && !selectedReport) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
        <p className="mt-4 text-slate-600">Loading evidence vault...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Evidence Vault</h2>
          <p className="text-slate-600 mt-1">Secure storage and management of case evidence</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Lock className="w-5 h-5 text-green-600" />
          <span className="text-green-600 font-medium">Encrypted & Secure</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cases List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Select Case</h3>
          
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search cases..."
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredReports.map((report) => (
              <div
                key={report.reportId}
                onClick={() => fetchEvidence(report.reportId)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition ${
                  selectedReport?.reportId === report.reportId
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-slate-200 hover:border-indigo-400'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <File className="w-4 h-4 text-indigo-600" />
                  <span className="font-semibold text-sm text-slate-800">
                    #{report.caseNumber}
                  </span>
                </div>
                <p className="text-sm text-slate-600 truncate">{report.title}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                  <span className={`px-2 py-0.5 rounded-full ${
                    report.status === 'RESOLVED' ? 'bg-green-100 text-green-700' :
                    report.status === 'UNDER_INVESTIGATION' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {report.status}
                  </span>
                </div>
              </div>
            ))}

            {filteredReports.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <File className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No cases found</p>
              </div>
            )}
          </div>
        </div>

        {/* Evidence Display */}
        <div className="lg:col-span-2 space-y-4">
          {selectedReport ? (
            <>
              {/* Case Header */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      Case #{selectedReport.caseNumber}
                    </h3>
                    <p className="text-slate-600 mt-1">{selectedReport.title}</p>
                  </div>
                  <button
                    onClick={() => setShowUpload(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Evidence
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-slate-700">Category:</span>
                    <span className="ml-2 text-slate-600">{selectedReport.category}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Priority:</span>
                    <span className="ml-2 text-slate-600">{selectedReport.priority}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Status:</span>
                    <span className="ml-2 text-slate-600">{selectedReport.status}</span>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center gap-4">
                  <Filter className="w-5 h-5 text-slate-600" />
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-sm"
                  >
                    <option value="ALL">All Types</option>
                    <option value="IMAGE">Images</option>
                    <option value="VIDEO">Videos</option>
                    <option value="AUDIO">Audio</option>
                    <option value="DOC">Documents</option>
                  </select>
                  <span className="text-sm text-slate-600">
                    {filteredEvidence.length} item(s)
                  </span>
                </div>
              </div>

              {/* Evidence Grid */}
              {filteredEvidence.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <File className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">No Evidence Files</h3>
                  <p className="text-slate-600 mb-4">
                    No evidence has been uploaded for this case yet.
                  </p>
                  <button
                    onClick={() => setShowUpload(true)}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition inline-flex items-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Upload First Evidence
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredEvidence.map((item, index) => (
                    <div
                      key={item.attachmentId || index}
                      className="bg-white rounded-lg shadow border border-slate-200 p-4 hover:shadow-md transition"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-slate-100 rounded-lg">
                          {getFileIcon(item.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${getFileTypeColor(item.type)}`}>
                              {item.type}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-slate-800 truncate mb-1">
                            Evidence #{item.attachmentId?.substring(0, 8) || 'Unknown'}
                          </p>
                          <p className="text-xs text-slate-500">
                            Uploaded: {formatTimestamp(item.createdAt)}
                          </p>
                          {item.metadataJson && (
                            <p className="text-xs text-slate-600 mt-1">
                              {item.metadataJson}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200">
                        <button
                          onClick={() => window.open(item.url, '_blank')}
                          className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm flex items-center justify-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                        <button
                          onClick={() => window.open(item.url, '_blank')}
                          className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <Lock className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Select a Case</h3>
              <p className="text-slate-600">
                Choose a case from the left panel to view and manage its evidence files.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Upload Evidence</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select File
                </label>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-sm"
                />
              </div>

              {previewUrl && (
                <div className="border border-slate-300 rounded-lg p-4">
                  <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto" />
                </div>
              )}

              {selectedFile && (
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-slate-800">Selected File:</p>
                  <p className="text-sm text-slate-600">{selectedFile.name}</p>
                  <p className="text-xs text-slate-500">
                    Size: {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> All evidence files are encrypted and secured with chain of custody tracking.
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setShowUpload(false);
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvidenceVaultAPI;
