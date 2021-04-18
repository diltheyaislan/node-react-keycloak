/* eslint-disable @typescript-eslint/no-explicit-any */
import Keycloak from 'keycloak-js';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../services/api';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): Promise<void>;
  updateUser(user: User): void;
  isAuthenticated(): Promise<boolean>;
  userInfo(): Promise<User>;
  hasRole(role: string): boolean;
}

const AuthkContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthkProvider: React.FC = ({ children }) => {
  const keycloak = Keycloak('/keycloak.json');

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@ReactApp:token');
    const user = localStorage.getItem('@ReactApp:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@ReactApp:token', token);
    localStorage.setItem('@ReactApp:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await keycloak.logout();
  }, [keycloak]);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@ReactApp:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  function storeToken(token: string | undefined) {
    if (token) {
      localStorage.setItem('@ReactApp:token', token);
      api.defaults.headers.authorization = `Bearer ${token}`;
    } else {
      localStorage.removeItem('@ReactApp:token');
      api.defaults.headers.authorization = `Bearer dummy_token`;
    }
  }

  function hasRole(role: string): boolean {
    return keycloak.hasRealmRole(role);
  }

  const userInfo = useCallback(async () => {
    try {
      const info: any = await keycloak.loadUserInfo();
      return {
        id: info.id,
        name: info.name,
        email: info.email,
      } as User;
    } catch (e) {
      return {} as User;
    }
  }, [keycloak]);

  const isAuthenticated = useCallback(async () => {
    const authenticated = await keycloak.init({
      onLoad: 'login-required',
    });

    if (authenticated) {
      storeToken(keycloak.token);
    }

    return authenticated;
  }, [keycloak]);

  return (
    <AuthkContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        updateUser,
        isAuthenticated,
        userInfo,
        hasRole,
      }}
    >
      {children}
    </AuthkContext.Provider>
  );
};

export function useAuthk(): AuthContextData {
  const context = useContext(AuthkContext);

  if (!context) {
    throw new Error('useAuthk must be used within an AuthkProvider');
  }

  return context;
}
