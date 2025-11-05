import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, User, Lock, Mail, Eye, EyeOff, Phone, MapPin, UserCheck, ShieldCheck, CheckCircle } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('CITIZEN');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!name || !email || !password || !confirm) {
      setError('Please fill in all required fields');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      // Use AuthContext signUp which handles both Firebase and backend registration
      await signUp(email, password, name, phone || '', address || '', role);
      
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.error('Registration error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Email is already registered. Please sign in instead.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else {
        setError(err.message || 'Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getRoleConfig = (selectedRole) => {
    switch(selectedRole) {
      case 'CITIZEN':
        return {
          icon: User,
          gradient: 'from-blue-400 via-cyan-400 to-teal-400',
          hoverGradient: 'hover:from-blue-500 hover:via-cyan-500 hover:to-teal-500',
          bgGradient: 'from-blue-50 via-cyan-50 to-teal-50',
          iconBg: 'bg-gradient-to-br from-blue-400 to-cyan-500',
          label: 'Citizen',
          description: 'Report crimes and track your cases'
        };
      case 'POLICE':
        return {
          icon: ShieldCheck,
          gradient: 'from-indigo-400 via-purple-400 to-pink-400',
          hoverGradient: 'hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500',
          bgGradient: 'from-indigo-50 via-purple-50 to-pink-50',
          iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
          label: 'Police Officer',
          description: 'For testing purposes only'
        };
      case 'ADMIN':
        return {
          icon: Shield,
          gradient: 'from-orange-400 via-red-400 to-rose-400',
          hoverGradient: 'hover:from-orange-500 hover:via-red-500 hover:to-rose-500',
          bgGradient: 'from-orange-50 via-red-50 to-rose-50',
          iconBg: 'bg-gradient-to-br from-orange-500 to-red-600',
          label: 'Administrator',
          description: 'For testing purposes only'
        };
    }
  };

  const currentConfig = getRoleConfig(role);
  const RoleIcon = currentConfig.icon;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentConfig.bgGradient} flex items-center justify-center p-4 transition-all duration-500`}>
      <div className="w-full max-w-2xl">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${currentConfig.iconBg} shadow-lg mb-4`}>
            <RoleIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600">Join as {currentConfig.label}</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {['CITIZEN', 'POLICE', 'ADMIN'].map((r) => {
            const config = getRoleConfig(r);
            const Icon = config.icon;
            return (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`p-5 rounded-xl border-2 transition-all ${
                  role === r
                    ? `bg-gradient-to-br ${config.gradient} border-white shadow-xl scale-105`
                    : 'bg-white/60 border-gray-200 hover:border-gray-300 hover:scale-102'
                }`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${role === r ? 'text-white' : 'text-gray-600'}`} />
                <p className={`text-sm font-semibold mb-1 ${role === r ? 'text-white' : 'text-gray-800'}`}>
                  {config.label}
                </p>
                <p className={`text-xs ${role === r ? 'text-white/90' : 'text-gray-500'}`}>
                  {config.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Registration Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-8">
          <form onSubmit={onSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-xl text-sm flex items-start space-x-2">
                <Shield className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="bg-green-50 text-green-700 border border-green-200 px-4 py-3 rounded-xl text-sm flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{success}</span>
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone (Optional)</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Address (Optional)</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main St, City, State"
                />
              </div>
            </div>

            {/* Password & Confirm */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl bg-gradient-to-r ${currentConfig.gradient} ${currentConfig.hoverGradient} text-white font-medium shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
            >
              <RoleIcon className="w-5 h-5" />
              <span>{loading ? 'Creating account...' : `Create ${currentConfig.label} Account`}</span>
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 pt-2">
              Already have an account?{' '}
              <Link to="/login" className={`font-medium bg-gradient-to-r ${currentConfig.gradient} bg-clip-text text-transparent hover:underline`}>
                Sign in instead
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
