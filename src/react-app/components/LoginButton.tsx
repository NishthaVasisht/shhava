import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';

interface LoginButtonProps {
  variant?: 'default' | 'small';
  onLoginSuccess?: (data: any) => void;
}

export default function LoginButton({
  variant = 'default',
  onLoginSuccess,
}: LoginButtonProps) {
  const { isAuthenticated, loading, loginError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [emailSent, setEmailSent] = useState(false);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    redirect_uri: 'postmessage',
    onSuccess: async (response) => {
      console.log('✅ Google auth code received:', response.code);
  
      try {
        const res = await fetch(`${apiUrl}/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: response.code }),
        });
  
        const data = await res.json();
        console.log('📦 Auth response:', data);
  
        if (data.success) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          setEmailSent(true);
  
          if (onLoginSuccess) onLoginSuccess(data);
  
          setTimeout(() => {
            navigate('/');
            setEmailSent(false);
          }, 1500);
        } else {
          console.error('❌ Auth failed response:', data);
          alert(data.message || 'Google login failed');
        }
      } catch (err) {
        console.error('🔥 Google login fetch error:', err);
        alert('Something went wrong while logging in.');
      }
    },
    onError: (err) => {
      console.error('❌ Google login popup error:', err);
      alert('Login popup closed or failed');
    },
  });
  

  const handleClick = () => {
    if (loading) return;

    if (isAuthenticated) {
      if (location.pathname !== '/') {
        navigate('/');
      } else {
        alert('You’re already on the home page! 🏠');
      }
    } else {
      googleLogin();
    }
  };

  const buttonText = isAuthenticated
    ? 'Already In Line'
    : emailSent
    ? 'Confirmation Sent ✅'
    : 'Join Waitlist 🏠';

  const baseStyles = {
    fontFamily: 'Fredoka, sans-serif',
    pointerEvents: 'auto' as const,
    zIndex: 9999,
    position: 'relative' as const,
  };

  if (variant === 'small') {
    return (
      <button
        onClick={handleClick}
        disabled={loading || (isAuthenticated && location.pathname === '/')}
        style={baseStyles}
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg transition-all duration-300 font-medium hover-lift animate-shimmer"
      >
        {loading ? 'Loading...' : loginError ? 'Auth Error' : buttonText}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading || (isAuthenticated && location.pathname === '/')}
      style={baseStyles}
      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 hover-glow animate-neon-glow"
    >
      <span>{loading ? 'Loading...' : loginError ? 'Auth Error' : buttonText}</span>
      {!loading && !loginError && !emailSent && !isAuthenticated && (
        <ArrowRight className="w-5 h-5 animate-bounce-gentle" />
      )}
    </button>
  );
}
