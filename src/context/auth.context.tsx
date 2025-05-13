import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { ILoginFields, ISignupFields, IUser } from "../interfaces/user";

interface IAuthContext {
  isLoading: boolean;
  isLoggedin: boolean;
  user: IUser | null;
  errorAuth: string | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  login: (data: ILoginFields) => Promise<{ success: boolean; error?: string }>;
  signup: (
    data: ISignupFields
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

interface IAuthProviderProps {
  children: ReactNode;
}

// Helper: Extract expiration from JWT
const getTokenExpiry = (accessToken: string): number => {
  try {
    const tokenPayload = JSON.parse(atob(accessToken.split(".")[1]));
    return tokenPayload.exp - Math.floor(Date.now() / 1000);
  } catch (e) {
    console.warn("Failed to parse JWT:", e);
    return 3600; // fallback to 1 hour
  }
};

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [errorAuth, setErrorAuth] = useState<string | null>(null);

  const authService = new AuthService();
  const userService = new UserService();

  // useRef to store the interval ID for token refresh
  const refreshTokenInterval = useRef<NodeJS.Timeout | null>(null);

  //Handles token refresh and updates the user state.
  const refreshToken = useCallback(async () => {
    try {
      const { user } = await authService.refresh();
      setIsLoggedin(true);
      setUser(user);
    } catch (error) {
      setErrorAuth((error as Error).message);
      setIsLoggedin(false);
      setUser(null);
      stopAutoRefresh();
    }
  }, []);

  // Starts the auto-refresh mechanism based on the token expiration time.
  // param expiresIn - Time in seconds until the token expires.
  const startAutoRefresh = useCallback(
    (expiresIn: number) => {
      if (refreshTokenInterval.current) {
        clearInterval(refreshTokenInterval.current);
      }

      // Refresh the token 1 minute before it expires
      const refreshInterval = (expiresIn - 60) * 1000;

      refreshTokenInterval.current = setInterval(() => {
        refreshToken();
      }, refreshInterval);
    },
    [refreshToken]
  );

  // Stops the auto-refresh mechanism.
  const stopAutoRefresh = useCallback(() => {
    if (refreshTokenInterval.current) {
      clearInterval(refreshTokenInterval.current);
      refreshTokenInterval.current = null;
    }
  }, []);

  //Checks the login status on app initialization.
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { user, accessToken } = await authService.refresh();
        setIsLoggedin(true);
        setUser(user);

        const expiresIn = getTokenExpiry(accessToken);
        startAutoRefresh(expiresIn);
      } catch (error) {
        setErrorAuth((error as Error).message);
        setIsLoggedin(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      stopAutoRefresh(); // Cleanup on unmount
    };
  }, [startAutoRefresh, stopAutoRefresh]);

  // Handles user login.
  const login = useCallback(
    async (
      data: ILoginFields
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        const { user, accessToken } = await authService.login(data);
        setIsLoggedin(true);
        setUser(user);

        const expiresIn = getTokenExpiry(accessToken);
        startAutoRefresh(expiresIn);

        return { success: true };
      } catch (error) {
        const message = (error as Error).message || "Login failed";
        console.error("Login error:", message);
        setIsLoggedin(false);
        setUser(null);
        return { success: false, error: message };
      }
    },
    [startAutoRefresh]
  );

  //Handles user signup.
  const signup = useCallback(
    async (
      data: ISignupFields
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        const { user, accessToken } = await userService.signup(data);
        setIsLoggedin(true);
        setUser(user);

        const expiresIn = getTokenExpiry(accessToken);
        startAutoRefresh(expiresIn);

        return { success: true };
      } catch (error) {
        const message = (error as Error).message || "Signup failed";
        console.error("Signup error:", message);
        setIsLoggedin(false);
        setUser(null);
        return { success: false, error: message };
      }
    },
    [startAutoRefresh]
  );

  // Handles user logout.
  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setIsLoggedin(false);
      setUser(null);
      stopAutoRefresh();
    } catch (error) {
      const message = (error as Error).message;
      console.error("Logout error:", message);
    }
  }, [stopAutoRefresh]);

  const value: IAuthContext = {
    isLoading,
    isLoggedin,
    user,
    setUser, // Expose setUser
    errorAuth,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
