import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Componente que protege rotas que requerem autenticação
 * Redireciona para a página de login se o usuário não estiver autenticado
 * 
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Componentes filhos a serem renderizados se autenticado
 * @returns {React.ReactElement} Componente filho ou redirecionamento para login
 */
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  // Mostra loading enquanto verifica a autenticação
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para login
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  // Se autenticado, renderiza os componentes filhos
  return children;
};

export default ProtectedRoute;

