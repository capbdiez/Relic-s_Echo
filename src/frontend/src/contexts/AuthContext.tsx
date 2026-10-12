import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState } from '../shared/types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  email: string;
  password: string;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

function authReducer(state: AuthState, action: any): AuthState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        token: action.payload.accessToken,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        token: null,
      };
    case 'LOGOUT':
      return initialState;
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
}

async function loginUser(credentials: LoginCredentials): Promise<any> {
  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
}

async function registerUser(credentials: RegisterCredentials): Promise<any> {
  const response = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }

  return response.json();
}

export function useAuth() {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for stored auth state on mount
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    
    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user,
            accessToken: storedToken,
          },
        });
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      }
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const result = await loginUser(credentials);
      localStorage.setItem('authToken', result.accessToken);
      localStorage.setItem('authUser', JSON.stringify(result.user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: result });
      return result;
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      const result = await registerUser(credentials);
      localStorage.setItem('authToken', result.accessToken);
      localStorage.setItem('authUser', JSON.stringify(result.user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: result });
      return result;
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    dispatch({ type: 'LOGOUT' });
  };

  return {
    ...state,
    login,
    register,
    logout,
  };
}

export const AuthContext = createContext<ReturnType<typeof useAuth> | null>(null);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}