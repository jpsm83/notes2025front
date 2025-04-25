import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import AuthService, { ISignupData, ILoginData, IUser } from "../services/auth.service";

interface AuthContextType {
  isLoading: boolean;
  isLoggedin: boolean;
  user: IUser | null;
  signup: (data: ISignupData) => Promise<void>;
  login: (data: ILoginData) => Promise<void>;
  logout: () => Promise<void>;
  edit: (data: Partial<IUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  const authService = new AuthService();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await authService.isLoggedin();
        if (response.data) {
          setIsLoggedin(true);
          setUser(response.data);
        } else {
          setIsLoggedin(false);
          setUser(null);
        }
      } catch (err) {
        console.error("Error checking login status:", err);
        setIsLoggedin(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkLogin();
  }, []);

  const signup = useCallback(async (data: ISignupData) => {
    try {
      const response = await authService.signup(data);
      if (response.data) {
        setIsLoggedin(true);
        setUser(response.data);
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setIsLoggedin(false);
      setUser(null);
    }
  }, []);

  const login = useCallback(async (data: ILoginData) => {
    try {
      const response = await authService.login(data);
      setIsLoggedin(true);
      setUser(response.data);
    } catch (err) {
      console.error("Error during login:", err);
      setIsLoggedin(false);
      setUser(null);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setIsLoggedin(false);
      setUser(null);
    }
  }, []);

  const edit = useCallback(async (data: Partial<IUser>) => {
    try {
      const response = await authService.edit(data);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const value: AuthContextType = {
    isLoading,
    isLoggedin,
    user,
    signup,
    login,
    logout,
    edit,
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
