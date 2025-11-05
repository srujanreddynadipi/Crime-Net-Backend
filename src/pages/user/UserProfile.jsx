import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Edit, Save, X, Camera } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserById, updateUser } from '../../api/users';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });
  
  const [editedProfile, setEditedProfile] = useState(profile);
  
  useEffect(() => {
    loadUserProfile();
  }, [currentUser]);
  
  const loadUserProfile = async () => {
    if (!currentUser?.uid) return;
    
    try {
      setLoading(true);
      const userData = await getUserById(currentUser.uid);
      setProfile(userData);
      setEditedProfile(userData);
    } catch (err) {
      console.error('Error loading profile:', err);
      setError('Failed to load profile data');
      // Set default values from Firebase currentUser
      const defaultData = {
        fullName: currentUser.displayName || '',
        email: currentUser.email || '',
        phone: '',
        address: '',
      };
      setProfile(defaultData);
      setEditedProfile(defaultData);
    } finally {
      setLoading(false);
    }
  };
  
  const handleEdit = () => {
    setIsEditing(true);
    setError('');
    setSuccess('');
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
    setError('');
  };
  
  const handleSave = async () => {
    if (!currentUser?.uid) return;
    
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      
      await updateUser(currentUser.uid, editedProfile);
      
      setProfile(editedProfile);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Alert Messages */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
          {success}
        </div>
      )}
      
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              {currentUser?.photoURL ? (
                <img 
                  src={currentUser.photoURL} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-white" />
              )}
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-all">
                <Camera className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h2 className="text-3xl font-bold text-gray-800">
                {profile.fullName || 'User Profile'}
              </h2>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="mt-4 md:mt-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2 justify-center"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="mt-4 md:mt-0 flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-medium transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-xl font-medium transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <p className="text-gray-600 mb-4">{profile.email}</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Citizen
              </span>
              <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Details */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={editedProfile.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                placeholder="Enter your full name"
              />
            ) : (
              <p className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800">
                {profile.fullName || 'Not provided'}
              </p>
            )}
          </div>
          
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-500" />
              Email Address
            </label>
            <p className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-600">
              {profile.email}
              <span className="text-xs text-gray-500 block mt-1">(Cannot be changed)</span>
            </p>
          </div>
          
          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-500" />
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={editedProfile.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                placeholder="Enter phone number"
              />
            ) : (
              <p className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800">
                {profile.phone || 'Not provided'}
              </p>
            )}
          </div>
          
          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              Address
            </label>
            {isEditing ? (
              <textarea
                name="address"
                value={editedProfile.address}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 resize-none"
                placeholder="Enter your address"
              />
            ) : (
              <p className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 min-h-[80px]">
                {profile.address || 'Not provided'}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Account Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-gray-600 text-sm mb-1">Total Reports</p>
          <p className="text-2xl font-bold text-gray-800">7</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-gray-600 text-sm mb-1">Active Cases</p>
          <p className="text-2xl font-bold text-blue-600">2</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-gray-600 text-sm mb-1">Resolved</p>
          <p className="text-2xl font-bold text-green-600">5</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-gray-600 text-sm mb-1">Community Points</p>
          <p className="text-2xl font-bold text-purple-600">245</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
