import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { signIn, userRole, currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      
      // Wait a bit for userRole to be set by AuthContext
      setTimeout(() => {
        const userStr = localStorage.getItem('user');
        const userData = userStr ? JSON.parse(userStr) : null;
        
        // Navigate to dashboard based on role
        if (userData?.role === 'CITIZEN') {
          navigate('/user');
        } else if (userData?.role === 'POLICE') {
          navigate('/police');
        } else if (userData?.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      }, 500);
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

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50 to-sky-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur border border-slate-200 rounded-2xl shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-2xl font-semibold text-slate-800">Welcome back</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to continue</p>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          {error ? (
            <div className="bg-rose-50 text-rose-700 border border-rose-200 px-3 py-2 rounded-md text-sm">
              {error}
            </div>
          ) : null}
          <div className="space-y-1.5">
            <label className="block text-sm text-slate-700">Email</label>
            <input
              type="email"
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm text-slate-700">Password</label>
            <input
              type="password"
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center rounded-md bg-linear-to-r from-indigo-400 to-sky-400 hover:from-indigo-500 hover:to-sky-500 text-white px-4 py-2.5 text-sm font-medium transition disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <p className="text-center text-sm text-slate-500">
            No account?{' '}
            <Link to="/register" className="text-indigo-600 hover:underline">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
