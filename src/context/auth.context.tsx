import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import AuthService from "../services/auth.service";
import { ILoginFields, IUser } from "../interfaces/user";

interface AuthContextType {
  isLoading: boolean;
  isLoggedin: boolean;
  user: IUser | null;
  login: (data: ILoginFields) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  const authService = new AuthService();

  useEffect(() => {
    let refreshTokenInterval: NodeJS.Timeout;

    const setupRefreshToken = () => {
      refreshTokenInterval = setInterval(async () => {
        try {
          const loggedInUser = await authService.isLoggedIn();
          if (loggedInUser) {
            setIsLoggedin(true);
            setUser(loggedInUser);
          } else {
            setIsLoggedin(false);
            setUser(null);
          }
        } catch (error) {
          console.error("Error refreshing token:", error);
          setIsLoggedin(false);
          setUser(null);
        }
      }, 12 * 60 * 1000); // Refresh every 12 minutes
    };

    if (!isLoading && isLoggedin) {
      setupRefreshToken();
    }

    return () => {
      if (refreshTokenInterval) {
        clearInterval(refreshTokenInterval);
      }
    };
  }, [isLoading, isLoggedin]);

  // Check login status on component mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedInUser = await authService.isLoggedIn();
        if (loggedInUser) {
          setIsLoggedin(true);
          setUser(loggedInUser);
        } else {
          setIsLoggedin(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedin(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Login function
  const login = useCallback(async (data: ILoginFields) => {
    try {
      const response = await authService.login(data);
      const token = response.data.accessToken;
      if (token) {
        localStorage.setItem("jwt", token);
        const user = authService.decodeUser(token);
        setIsLoggedin(true);
        setUser(user);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setIsLoggedin(false);
      setUser(null);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setIsLoggedin(false);
      setUser(null);
    }
  }, []);

  const value: AuthContextType = {
    isLoading,
    isLoggedin,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
