import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, User, Lock, Mail, Eye, EyeOff, UserCheck, ShieldCheck } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { signIn, userRole, currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('CITIZEN');

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser && userRole) {
      if (userRole === 'CITIZEN') {
        navigate('/user');
      } else if (userRole === 'POLICE') {
        navigate('/police');
      } else if (userRole === 'ADMIN') {
        navigate('/admin');
      }
    }
  }, [currentUser, userRole, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);

      // After signIn, AuthContext refreshes token and role.
      // Read the freshly stored user payload and route immediately.
      const userStr = localStorage.getItem('user');
      const userData = userStr ? JSON.parse(userStr) : null;

      console.log('Login - User data from localStorage:', userData);
      console.log('Login - User role:', userData?.role);

      if (userData?.role === 'POLICE') {
        console.log('Navigating to /police');
        navigate('/police');
      } else if (userData?.role === 'ADMIN') {
        console.log('Navigating to /admin');
        navigate('/admin');
      } else {
        console.log('Navigating to /user');
        navigate('/user');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password');
      } else if (err.code === 'auth/user-not-found') {
        setError('No account found with this email');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else if (err.code === 'auth/invalid-login-credentials') {
        setError('Invalid email or password');
      } else {
        setError(err.message || 'Failed to sign in. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getRoleConfig = (role) => {
    switch(role) {
      case 'CITIZEN':
        return {
          icon: User,
          gradient: 'from-blue-400 via-cyan-400 to-teal-400',
          hoverGradient: 'hover:from-blue-500 hover:via-cyan-500 hover:to-teal-500',
          bgGradient: 'from-blue-50 via-cyan-50 to-teal-50',
          iconBg: 'bg-gradient-to-br from-blue-400 to-cyan-500',
          label: 'Citizen',
          description: 'Report crimes and track cases'
        };
      case 'POLICE':
        return {
          icon: ShieldCheck,
          gradient: 'from-indigo-400 via-purple-400 to-pink-400',
          hoverGradient: 'hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500',
          bgGradient: 'from-indigo-50 via-purple-50 to-pink-50',
          iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
          label: 'Police Officer',
          description: 'Manage cases and investigations'
        };
      case 'ADMIN':
        return {
          icon: Shield,
          gradient: 'from-orange-400 via-red-400 to-rose-400',
          hoverGradient: 'hover:from-orange-500 hover:via-red-500 hover:to-rose-500',
          bgGradient: 'from-orange-50 via-red-50 to-rose-50',
          iconBg: 'bg-gradient-to-br from-orange-500 to-red-600',
          label: 'Administrator',
          description: 'System administration'
        };
    }
  };

  const currentConfig = getRoleConfig(selectedRole);
  const RoleIcon = currentConfig.icon;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentConfig.bgGradient} flex items-center justify-center p-4 transition-all duration-500`}>
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${currentConfig.iconBg} shadow-lg mb-4`}>
            <RoleIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your {currentConfig.label} account</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {['CITIZEN', 'POLICE', 'ADMIN'].map((role) => {
            const config = getRoleConfig(role);
            const Icon = config.icon;
            return (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedRole === role
                    ? `bg-gradient-to-br ${config.gradient} border-white shadow-lg scale-105`
                    : 'bg-white/60 border-gray-200 hover:border-gray-300 hover:scale-102'
                }`}
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 ${selectedRole === role ? 'text-white' : 'text-gray-600'}`} />
                <p className={`text-xs font-medium ${selectedRole === role ? 'text-white' : 'text-gray-700'}`}>
                  {config.label}
                </p>
              </button>
            );
          })}
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-8">
          <form onSubmit={onSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-xl text-sm flex items-start space-x-2">
                <Shield className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Input */}
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

            {/* Password Input */}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl bg-gradient-to-r ${currentConfig.gradient} ${currentConfig.hoverGradient} text-white font-medium shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
            >
              <RoleIcon className="w-5 h-5" />
              <span>{loading ? 'Signing in...' : `Sign in as ${currentConfig.label}`}</span>
            </button>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-600 pt-2">
              Don't have an account?{' '}
              <Link to="/register" className={`font-medium bg-gradient-to-r ${currentConfig.gradient} bg-clip-text text-transparent hover:underline`}>
                Create one now
              </Link>
            </p>
          </form>
        </div>

        {/* Role Description */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 bg-white/40 backdrop-blur-sm rounded-full px-4 py-2 inline-block">
            {currentConfig.description}
          </p>
        </div>
      </div>
    </div>
  );
}
