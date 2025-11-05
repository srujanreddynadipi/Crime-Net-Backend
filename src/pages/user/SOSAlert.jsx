import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  Phone, 
  Shield, 
  Clock, 
  CheckCircle, 
  XCircle,
  Navigation,
  Loader
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { triggerSOS, getMyActiveAlerts, cancelSOS } from '../../api/sos';

const SOSAlert = () => {
  const { user } = useAuth();
  const [isTriggering, setIsTriggering] = useState(false);
  const [activeAlert, setActiveAlert] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [alertHistory, setAlertHistory] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);

  // Load active alerts and history on mount
  useEffect(() => {
    loadActiveAlerts();
    // Poll for updates every 10 seconds if there's an active alert
    const interval = setInterval(() => {
      if (activeAlert) {
        loadActiveAlerts();
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [activeAlert]);

  // Get current location
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      setGettingLocation(true);
      setLocationError('');

      if (!navigator.geolocation) {
        setGettingLocation(false);
        reject('Geolocation is not supported by your browser');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          setLocation(loc);
          setGettingLocation(false);
          resolve(loc);
        },
        (error) => {
          setGettingLocation(false);
          let errorMessage = 'Unable to get your location';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location permission denied. Please enable location access.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
            default:
              errorMessage = 'An unknown error occurred.';
          }
          setLocationError(errorMessage);
          reject(errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  };

  const loadActiveAlerts = async () => {
    try {
      const response = await getMyActiveAlerts();
      if (response.data && response.data.length > 0) {
        // Get the most recent active alert
        const active = response.data.find(alert => alert.status === 'ACTIVE');
        setActiveAlert(active || null);
        setAlertHistory(response.data);
      }
    } catch (error) {
      console.error('Error loading alerts:', error);
    }
  };

  const handleTriggerSOS = async () => {
    setShowConfirmDialog(false);
    setIsTriggering(true);
    setLocationError('');

    try {
      // Get current location first
      const currentLocation = await getCurrentLocation();

      // Trigger SOS with location
      const response = await triggerSOS({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        description: 'Emergency SOS triggered by user'
      });

      setActiveAlert(response.data);
      setIsTriggering(false);
    } catch (error) {
      console.error('Error triggering SOS:', error);
      setLocationError(error.response?.data?.message || error.message || 'Failed to trigger SOS alert');
      setIsTriggering(false);
    }
  };

  const handleCancelSOS = async () => {
    if (!activeAlert) return;

    try {
      await cancelSOS(activeAlert.id);
      setActiveAlert(null);
      loadActiveAlerts();
    } catch (error) {
      console.error('Error canceling SOS:', error);
      alert('Failed to cancel SOS alert. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'RESPONDED':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'RESOLVED':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ACTIVE':
        return <AlertTriangle className="w-5 h-5" />;
      case 'RESPONDED':
        return <Shield className="w-5 h-5" />;
      case 'RESOLVED':
        return <CheckCircle className="w-5 h-5" />;
      case 'CANCELLED':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds

    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border-l-4 border-red-500">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Emergency SOS</h1>
              <p className="text-gray-600">Quick access to emergency assistance</p>
            </div>
          </div>
        </div>

        {/* Active Alert Section */}
        {activeAlert ? (
          <div className="bg-red-50 border-2 border-red-500 rounded-2xl shadow-xl p-6 mb-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8 text-red-600" />
                <div>
                  <h2 className="text-xl font-bold text-red-800">Active Emergency Alert</h2>
                  <p className="text-red-600">Help is on the way!</p>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-full border-2 font-semibold ${getStatusColor(activeAlert.status)}`}>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(activeAlert.status)}
                  <span>{activeAlert.status}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Triggered</span>
                </div>
                <p className="text-gray-800 font-semibold">{formatTime(activeAlert.createdAt)}</p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">Location</span>
                </div>
                <p className="text-gray-800 font-semibold">
                  {activeAlert.latitude?.toFixed(6)}, {activeAlert.longitude?.toFixed(6)}
                </p>
              </div>
            </div>

            {activeAlert.respondedAt && (
              <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 text-blue-700 mb-2">
                  <Shield className="w-5 h-5" />
                  <span className="font-semibold">Police Response</span>
                </div>
                <p className="text-blue-800">
                  Officers responded {formatTime(activeAlert.respondedAt)}
                </p>
              </div>
            )}

            {activeAlert.description && (
              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-1">Additional Information:</p>
                <p className="text-gray-800">{activeAlert.description}</p>
              </div>
            )}

            {activeAlert.status === 'ACTIVE' && (
              <button
                onClick={handleCancelSOS}
                className="w-full bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center space-x-2"
              >
                <XCircle className="w-5 h-5" />
                <span>Cancel Emergency Alert</span>
              </button>
            )}
          </div>
        ) : (
          /* Emergency Button Section */
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Emergency Assistance</h2>
              <p className="text-gray-600">
                Press the button below if you need immediate help. Your location will be sent to nearby police.
              </p>
            </div>

            {/* Big Red SOS Button */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setShowConfirmDialog(true)}
                disabled={isTriggering || gettingLocation}
                className={`w-64 h-64 rounded-full bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center space-y-4 ${
                  (isTriggering || gettingLocation) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isTriggering || gettingLocation ? (
                  <>
                    <Loader className="w-16 h-16 animate-spin" />
                    <span className="text-xl font-bold">
                      {gettingLocation ? 'Getting Location...' : 'Sending Alert...'}
                    </span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-20 h-20" />
                    <span className="text-4xl font-bold">SOS</span>
                    <span className="text-sm">Emergency Alert</span>
                  </>
                )}
              </button>
            </div>

            {locationError && (
              <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-red-800 font-semibold">Location Error</p>
                    <p className="text-red-700 text-sm">{locationError}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-red-50 to-white border border-red-200 rounded-xl p-4 text-center">
                <MapPin className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">GPS Location</h3>
                <p className="text-sm text-gray-600">Automatically sent</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-4 text-center">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Police Notified</h3>
                <p className="text-sm text-gray-600">Instant alert</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-4 text-center">
                <Phone className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">24/7 Response</h3>
                <p className="text-sm text-gray-600">Always available</p>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-300 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Phone className="w-5 h-5 text-yellow-600" />
                <h3 className="font-bold text-gray-800">Emergency Contacts</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center justify-between bg-white rounded-lg p-3">
                  <span className="text-gray-700">Police Emergency</span>
                  <a href="tel:100" className="text-blue-600 font-bold hover:underline">100</a>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg p-3">
                  <span className="text-gray-700">Fire Emergency</span>
                  <a href="tel:101" className="text-red-600 font-bold hover:underline">101</a>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg p-3">
                  <span className="text-gray-700">Ambulance</span>
                  <a href="tel:102" className="text-green-600 font-bold hover:underline">102</a>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg p-3">
                  <span className="text-gray-700">Women Helpline</span>
                  <a href="tel:1091" className="text-purple-600 font-bold hover:underline">1091</a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alert History */}
        {alertHistory.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Alert History</h2>
            <div className="space-y-3">
              {alertHistory.slice(0, 5).map((alert) => (
                <div
                  key={alert.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`px-3 py-1 rounded-full border font-semibold text-sm ${getStatusColor(alert.status)}`}>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(alert.status)}
                        <span>{alert.status}</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{formatTime(alert.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{alert.latitude?.toFixed(4)}, {alert.longitude?.toFixed(4)}</span>
                    </div>
                    {alert.respondedAt && (
                      <div className="flex items-center space-x-1 text-blue-600">
                        <Shield className="w-4 h-4" />
                        <span>Responded</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Confirm Emergency Alert</h3>
                <p className="text-gray-600">
                  This will send an emergency alert with your current location to nearby police. 
                  Only use this in case of real emergencies.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleTriggerSOS}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all"
                >
                  Yes, Send Emergency Alert
                </button>
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-bold transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SOSAlert;
