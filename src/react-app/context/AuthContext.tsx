import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthResponse {
  success: boolean;
  token?: string;
  user?: { user_id: string; name: string; email: string; createdAt: string; updatedAt: string };
  message?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (code: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
  loginError: string | null;
  user: { user_id: string; name: string; email: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [user, setUser] = useState<{ user_id: string; name: string; email: string } | null>(null);
  const hasValidated = useRef(false); // Track if validation has occurred

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const login = async (code: string): Promise<boolean> => {
    setLoading(true);
    setLoginError(null);

    try {
      console.log('[AuthProvider] Initiating login with /auth/google');
      const response = await fetch(`${apiUrl}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data: AuthResponse = await response.json();

      if (!response.ok || !data.success || !data.token || !data.user) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      console.log('[AuthProvider] Login successful, user:', data.user);
      return true;
    } catch (err: any) {
      console.error('[AuthProvider] Login error:', err.message);
      setLoginError(err.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (token) {
        console.log('[AuthProvider] Initiating logout with /auth/logout');
        await fetch(`${apiUrl}/auth/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (err) {
      console.error('[AuthProvider] Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      console.log('[AuthProvider] Logout complete, navigating to /');
      navigate('/');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || hasValidated.current) {
      console.log('[AuthProvider] No token or already validated, skipping /me call');
      return;
    }

    const validateToken = async () => {
      hasValidated.current = true; // Mark as validated
      console.log('[AuthProvider] Validating token with /me');
      try {
        const res = await fetch(`${apiUrl}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data: AuthResponse = await res.json();
        if (res.ok && data.success && data.user) {
          setUser(data.user);
          setIsAuthenticated(true);
          console.log('[AuthProvider] Token validation successful, user:', data.user);
        } else {
          throw new Error(data.message || 'Invalid token');
        }
      } catch (err) {
        console.error('[AuthProvider] Token validation error:', err);
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    validateToken();
  }, [apiUrl]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, loginError, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};