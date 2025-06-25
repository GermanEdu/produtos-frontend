import { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated, logout as apiLogout } from '../lib/api';

// Contexto de autenticação
const AuthContext = createContext();

/**
 * Provider de autenticação que envolve a aplicação
 * Gerencia o estado global de autenticação
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verifica se o usuário está autenticado ao carregar a aplicação
  useEffect(() => {
    const checkAuth = () => {
      if (isAuthenticated()) {
        // Se autenticado, define um usuário básico (pode ser expandido para buscar dados do usuário)
        const token = localStorage.getItem('token');
        setUser({ token });
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  /**
   * Realiza o login do usuário
   * @param {string} token - Token JWT recebido da API
   * @param {string} expiration - Data de expiração do token
   */
  const login = (token, expiration) => {
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', expiration);
    setUser({ token });
  };

  /**
   * Realiza o logout do usuário
   */
  const logout = () => {
    apiLogout();
    setUser(null);
  };

  /**
   * Verifica se o usuário está autenticado
   * @returns {boolean} True se autenticado, false caso contrário
   */
  const isLoggedIn = () => {
    return user !== null && isAuthenticated();
  };

  const value = {
    user,
    login,
    logout,
    isLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook para usar o contexto de autenticação
 * @returns {Object} Objeto com funções e estado de autenticação
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};

