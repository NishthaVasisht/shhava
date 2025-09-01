import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/Home';
import AuthCallbackPage from './pages/AuthCallback';
import OnboardingPage from './pages/Onboarding';
import DashboardPage from './pages/Dashboard';
import DiscoverPage from './pages/Discover';
import MessagesPage from './pages/Messages';
import ProfilePage from './pages/Profile';
import SafetyPage from './pages/Safety';
import JugniBotPage from './pages/JugniBot';
import VoiceShayariPage from './pages/VoiceShayari';
import FatedCrossingsPage from './pages/FatedCrossings';
import FateFlashbacksPage from './pages/FateFlashbacks';

// Blog
import BlogList from './components/BlogList';
import BlogPost from './pages/BlogPost';

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!apiUrl || !googleClientId) {
  throw new Error('❌ Missing VITE_API_BASE_URL or VITE_GOOGLE_CLIENT_ID in .env file.');
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            
            {/* Blog Routes */}
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            {/* Protected Routes */}
            <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/discover" element={<ProtectedRoute><DiscoverPage /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/safety" element={<ProtectedRoute><SafetyPage /></ProtectedRoute>} />
            <Route path="/ai/jugni-bot" element={<ProtectedRoute><JugniBotPage /></ProtectedRoute>} />
            <Route path="/ai/voice-shayari" element={<ProtectedRoute><VoiceShayariPage /></ProtectedRoute>} />
            <Route path="/fated-crossings" element={<ProtectedRoute><FatedCrossingsPage /></ProtectedRoute>} />
            <Route path="/fate-flashbacks" element={<ProtectedRoute><FateFlashbacksPage /></ProtectedRoute>} />
          </Routes>
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}
