import axios from 'axios';

// Configuração base da API
const API_BASE_URL = 'http://localhost:5240/api';


// Instância do axios com configurações padrão
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token JWT automaticamente nas requisições
api.interceptors.request.use(
  (config) => {
    // Obtém o token do localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros de autenticação
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Se receber erro 401 (Unauthorized), remove o token e redireciona para login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ===== FUNÇÕES DE AUTENTICAÇÃO =====

/**
 * Realiza o login do usuário
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise} Resposta da API com token
 */
export const login = async (email, password) => {
  try {
    const response = await api.post('/Usuario/LogarUsuario', {
      email,
      password,
    });
    
    // Armazena o token e data de expiração no localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('tokenExpiration', response.data.expiration);
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Realiza o registro de um novo usuário
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @param {string} confirmPassword - Confirmação da senha
 * @returns {Promise} Resposta da API
 */
export const register = async (email, password, confirmPassword) => {
  try {
    const response = await api.post('/Usuario/CriarUsuario', {
      email,
      password,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Realiza o logout do usuário
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpiration');
  window.location.href = '/login';
};

/**
 * Verifica se o usuário está autenticado
 * @returns {boolean} True se autenticado, false caso contrário
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const expiration = localStorage.getItem('tokenExpiration');
  
  if (!token || !expiration) {
    return false;
  }
  
  // Verifica se o token não expirou
  const now = new Date();
  const expirationDate = new Date(expiration);
  
  if (now >= expirationDate) {
    // Token expirado, remove do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    return false;
  }
  
  return true;
};

// ===== FUNÇÕES DE PRODUTOS =====

/**
 * Obtém todos os produtos
 * @returns {Promise} Lista de produtos
 */
export const getProdutos = async () => {
  try {
    const response = await api.get('/Produtos');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Obtém um produto por ID
 * @param {number} id - ID do produto
 * @returns {Promise} Dados do produto
 */
export const getProdutoById = async (id) => {
  try {
    const response = await api.get(`/Produtos/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Busca produtos por nome
 * @param {string} nome - Nome do produto para busca
 * @returns {Promise} Lista de produtos encontrados
 */
export const getProdutosByNome = async (nome) => {
  try {
    const response = await api.get(`/Produtos/ProdutosPorNome?nome=${encodeURIComponent(nome)}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Cria um novo produto
 * @param {Object} produto - Dados do produto
 * @param {string} produto.nome - Nome do produto
 * @param {string} produto.descricao - Descrição do produto
 * @param {number} produto.preco - Preço do produto
 * @param {string} produto.categoria - Categoria do produto
 * @returns {Promise} Produto criado
 */
export const createProduto = async (produto) => {
  try {
    const response = await api.post('/Produtos', produto);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Atualiza um produto existente
 * @param {number} id - ID do produto
 * @param {Object} produto - Dados atualizados do produto
 * @returns {Promise} Resposta da API
 */
export const updateProduto = async (id, produto) => {
  try {
    const response = await api.put(`/Produtos/${id}`, { ...produto, id });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Exclui um produto
 * @param {number} id - ID do produto a ser excluído
 * @returns {Promise} Resposta da API
 */
export const deleteProduto = async (id) => {
  try {
    const response = await api.delete(`/Produtos/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;

