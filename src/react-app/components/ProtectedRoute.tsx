import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Loader2, Heart } from 'lucide-react';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full blur-2xl animate-float-reverse delay-300"></div>
        </div>
        
        <div className="text-center relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg mb-4 mx-auto animate-pulse-glow">
            <Heart className="w-8 h-8 text-white animate-heart-beat" fill="currentColor" />
          </div>
          <div className="flex items-center space-x-2 text-gray-600 animate-slide-in-up">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="animate-shimmer">Loading your Itera journey...</span>
          </div>
          <div className="mt-4">
            <div className="loading-skeleton w-48 h-3 rounded mx-auto mb-2"></div>
            <div className="loading-skeleton w-32 h-2 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}