import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Loader2, AlertCircle } from 'lucide-react';

export default function AuthCallback() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    if (!code) {
      setError('Missing authorization code from Google.');
      setIsLoading(false);
      setTimeout(() => navigate('/'), 3000);
      return;
    }

    login(code)
      .then(success => {
        if (success) {
          navigate('/');
        } else {
          setError('Login failed. Redirecting...');
          setTimeout(() => navigate('/'), 3000);
        }
      })
      .catch(err => {
        console.error('Auth callback error:', err);
        setError('Unexpected error. Redirecting...');
        setTimeout(() => navigate('/'), 3000);
      })
      .finally(() => setIsLoading(false));
  }, [login, location, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg mb-8 mx-auto">
          <Heart className="w-10 h-10 text-white" fill="currentColor" />
        </div>

        {isLoading && (
          <>
            <div className="flex items-center justify-center space-x-2 text-gray-600 mb-4">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-lg">Signing you in...</span>
            </div>
            <p className="text-gray-500">Welcome to Itera! We're setting up your love story...</p>
          </>
        )}

        {error && (
          <>
            <div className="flex items-center justify-center space-x-2 text-red-600 mb-4">
              <AlertCircle className="w-6 h-6" />
              <span className="text-lg">Sign In Failed</span>
            </div>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-gray-500">Redirecting you back to home...</p>
          </>
        )}
      </div>
    </div>
  );
}
