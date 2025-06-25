import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  getProdutos, 
  getProdutosByNome, 
  deleteProduto 
} from '../lib/api';
import ProdutoForm from './ProdutoForm';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  LogOut, 
  Package, 
  Filter,
  AlertCircle 
} from 'lucide-react';

/**
 * Componente Dashboard
 * Tela principal da aplicação onde o usuário gerencia os produtos
 */
const Dashboard = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduto, setEditingProduto] = useState(null);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);
  
  const { logout } = useAuth();

  /**
   * Carrega todos os produtos da API
   */
  const loadProdutos = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getProdutos();
      setProdutos(data);
      setFilteredProdutos(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setError('Erro ao carregar produtos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Carrega os produtos ao montar o componente
  useEffect(() => {
    loadProdutos();
  }, []);

  /**
   * Filtra produtos com base no termo de busca
   */
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProdutos(produtos);
    } else {
      const filtered = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produto.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produto.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProdutos(filtered);
    }
  }, [searchTerm, produtos]);

  /**
   * Abre o formulário para adicionar um novo produto
   */
  const handleAddProduto = () => {
    setEditingProduto(null);
    setShowForm(true);
  };

  /**
   * Abre o formulário para editar um produto existente
   * @param {Object} produto - Produto a ser editado
   */
  const handleEditProduto = (produto) => {
    setEditingProduto(produto);
    setShowForm(true);
  };

  /**
   * Exclui um produto
   * @param {number} id - ID do produto a ser excluído
   * @param {string} nome - Nome do produto para confirmação
   */
  const handleDeleteProduto = async (id, nome) => {
    if (!window.confirm(`Tem certeza que deseja excluir o produto "${nome}"?`)) {
      return;
    }

    try {
      setDeleteLoading(id);
      await deleteProduto(id);
      
      // Remove o produto da lista local
      setProdutos(prev => prev.filter(p => p.id !== id));
      setFilteredProdutos(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      setError('Erro ao excluir produto. Tente novamente.');
    } finally {
      setDeleteLoading(null);
    }
  };

  /**
   * Callback chamado quando um produto é salvo (criado ou editado)
   */
  const handleProdutoSaved = () => {
    setShowForm(false);
    setEditingProduto(null);
    loadProdutos(); // Recarrega a lista
  };

  /**
   * Cancela a edição/criação de produto
   */
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduto(null);
  };

  /**
   * Formata o preço para exibição
   * @param {number} preco - Preço do produto
   * @returns {string} Preço formatado
   */
  const formatPrice = (preco) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  // Se está mostrando o formulário, renderiza apenas o formulário
  if (showForm) {
    return (
      <ProdutoForm
        produto={editingProduto}
        onSave={handleProdutoSaved}
        onCancel={handleCancelForm}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">
                Gerenciamento de Produtos
              </h1>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Erro geral */}
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Barra de ações */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 min-w-0">
              {/* Campo de busca */}
              <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">
                  Buscar produtos
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Buscar por nome, categoria ou descrição..."
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            {/* Botão adicionar produto */}
            <div className="mt-4 sm:mt-0 sm:ml-4">
              <button
                onClick={handleAddProduto}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Produto
              </button>
            </div>
          </div>

          {/* Lista de produtos */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredProdutos.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {searchTerm ? 'Nenhum produto encontrado' : 'Nenhum produto cadastrado'}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm 
                  ? 'Tente buscar com outros termos.' 
                  : 'Comece criando um novo produto.'
                }
              </p>
              {!searchTerm && (
                <div className="mt-6">
                  <button
                    onClick={handleAddProduto}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Produto
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredProdutos.map((produto) => (
                  <li key={produto.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-medium text-blue-600 truncate">
                              {produto.nome}
                            </p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {produto.categoria}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <p className="flex-1">
                              {produto.descricao || 'Sem descrição'}
                            </p>
                            <p className="ml-4 font-semibold text-lg text-gray-900">
                              {formatPrice(produto.preco)}
                            </p>
                          </div>
                        </div>
                        
                        {/* Ações */}
                        <div className="ml-4 flex-shrink-0 flex space-x-2">
                          <button
                            onClick={() => handleEditProduto(produto)}
                            className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduto(produto.id, produto.nome)}
                            disabled={deleteLoading === produto.id}
                            className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deleteLoading === produto.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Informações de resultados */}
          {!loading && filteredProdutos.length > 0 && (
            <div className="mt-4 text-sm text-gray-500 text-center">
              {searchTerm ? (
                <>
                  Mostrando {filteredProdutos.length} de {produtos.length} produtos
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-2 text-blue-600 hover:text-blue-500"
                    >
                      Limpar busca
                    </button>
                  )}
                </>
              ) : (
                `Total: ${produtos.length} produtos`
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

