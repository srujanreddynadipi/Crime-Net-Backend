import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import RoleGuard from './guards/RoleGuard';
import Home from './pages/Home';
import PoliceDashboard from './pages/PoliceDashboard';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Routes - Protected */}
          <Route
            path="/admin/*"
            element={
              <RoleGuard allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </RoleGuard>
            }
          />
          
          {/* Police Routes - Protected */}
          <Route
            path="/police/*"
            element={
              <RoleGuard allowedRoles={['POLICE', 'ADMIN']}>
                <PoliceDashboard />
              </RoleGuard>
            }
          />
          
          {/* Citizen/User Routes - Protected */}
          <Route
            path="/citizen/*"
            element={
              <RoleGuard allowedRoles={['CITIZEN']}>
                <UserDashboard />
              </RoleGuard>
            }
          />
          
          {/* Legacy route - redirect to /citizen */}
          <Route
            path="/user/*"
            element={
              <RoleGuard allowedRoles={['CITIZEN']}>
                <UserDashboard />
              </RoleGuard>
            }
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
