import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    user_id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  message?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (code: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
  loginError: string | null;
  user: { user_id: string; name: string; email: string } | null;
  validating: boolean; // 👈 added
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [user, setUser] = useState<{
    user_id: string;
    name: string;
    email: string;
  } | null>(null);
  const [validating, setValidating] = useState(true); // 👈 start as validating
  const hasValidated = useRef(false);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const login = async (code: string): Promise<boolean> => {
    setLoading(true);
    setLoginError(null);

    try {
      const response = await fetch(`${apiUrl}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data: AuthResponse = await response.json();

      if (!response.ok || !data.success || !data.token || !data.user) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      setIsAuthenticated(true);

      navigate("/dashboard");
      return true;
    } catch (err: any) {
      setLoginError(err.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch(`${apiUrl}/auth/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      navigate("/");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(!!token);
    }

    if (!token || hasValidated.current) {
      setValidating(false); // ✅ finish validation if no token
      return;
    }

    const validateToken = async () => {
      hasValidated.current = true;
      try {
        const res = await fetch(`${apiUrl}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data: AuthResponse = await res.json();
        if (res.ok && data.success && data.user) {
          setUser(data.user);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          throw new Error(data.message || "Invalid token");
        }
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setValidating(false); // ✅ always finish validation
      }
    };

    validateToken();
  }, [apiUrl]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        loading,
        loginError,
        user,
        validating, // 👈 expose
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
