import { useState, useEffect } from 'react';
import { createProduto, updateProduto } from '../lib/api';
import { ArrowLeft, Save, Package, DollarSign, Tag, FileText } from 'lucide-react';

/**
 * Componente ProdutoForm
 * Formulário para criar e editar produtos
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Object|null} props.produto - Produto a ser editado (null para novo produto)
 * @param {Function} props.onSave - Callback chamado quando o produto é salvo
 * @param {Function} props.onCancel - Callback chamado quando a operação é cancelada
 */
const ProdutoForm = ({ produto, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    categoria: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isEditing = produto !== null;

  // Preenche o formulário com os dados do produto ao editar
  useEffect(() => {
    if (isEditing && produto) {
      setFormData({
        nome: produto.nome || '',
        descricao: produto.descricao || '',
        preco: produto.preco.toString(),
        categoria: produto.categoria || '',
      });
    }
  }, [produto, isEditing]);

  /**
   * Atualiza os dados do formulário
   * @param {Event} e - Evento de mudança do input
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Para o campo preço, permite apenas números e vírgula/ponto
    if (name === 'preco') {
      const numericValue = value.replace(/[^0-9.,]/g, '').replace(',', '.');
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Remove o erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Valida os dados do formulário
   * @returns {boolean} True se válido, false caso contrário
   */
  const validateForm = () => {
    const newErrors = {};

    // Validação do nome (obrigatório)
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    // Validação da categoria (obrigatória)
    if (!formData.categoria.trim()) {
      newErrors.categoria = 'Categoria é obrigatória';
    }

    // Validação do preço (obrigatório e maior que zero)
    if (!formData.preco.trim()) {
      newErrors.preco = 'Preço é obrigatório';
    } else {
      const preco = parseFloat(formData.preco);
      if (isNaN(preco) || preco <= 0) {
        newErrors.preco = 'Preço deve ser maior que zero';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Submete o formulário
   * @param {Event} e - Evento de submit do formulário
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Prepara os dados para envio
      const produtoData = {
        nome: formData.nome.trim(),
        descricao: formData.descricao.trim() || null,
        preco: parseFloat(formData.preco),
        categoria: formData.categoria.trim(),
      };

      if (isEditing) {
        // Atualiza produto existente
        await updateProduto(produto.id, produtoData);
      } else {
        // Cria novo produto
        await createProduto(produtoData);
      }

      // Chama o callback de sucesso
      onSave();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      
      // Trata diferentes tipos de erro
      if (error.response?.status === 400) {
        const errorData = error.response.data;
        
        // Se a resposta contém erros específicos de validação
        if (typeof errorData === 'object' && errorData.errors) {
          const newErrors = {};
          Object.keys(errorData.errors).forEach(key => {
            const field = key.toLowerCase();
            newErrors[field] = errorData.errors[key][0];
          });
          setErrors(newErrors);
        } else {
          setErrors({ general: 'Dados inválidos. Verifique as informações.' });
        }
      } else if (error.response?.status === 500) {
        setErrors({ general: 'Erro interno do servidor. Tente novamente.' });
      } else {
        setErrors({ general: 'Erro de conexão. Verifique sua internet.' });
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Formata o preço para exibição
   * @param {string} value - Valor do preço
   * @returns {string} Preço formatado
   */
  const formatPriceDisplay = (value) => {
    if (!value) return '';
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return value;
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numericValue);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <button
              onClick={onCancel}
              className="mr-4 inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditing ? 'Editar Produto' : 'Novo Produto'}
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              {/* Erro geral */}
              {errors.general && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-700">{errors.general}</div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Campo Nome */}
                <div className="sm:col-span-2">
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                    Nome do Produto *
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Package className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="nome"
                      id="nome"
                      required
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.nome ? 'border-red-300' : 'border-gray-300'
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      placeholder="Digite o nome do produto"
                      value={formData.nome}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.nome && (
                    <p className="mt-1 text-sm text-red-600">{errors.nome}</p>
                  )}
                </div>

                {/* Campo Categoria */}
                <div>
                  <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                    Categoria *
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="categoria"
                      id="categoria"
                      required
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.categoria ? 'border-red-300' : 'border-gray-300'
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      placeholder="Digite a categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.categoria && (
                    <p className="mt-1 text-sm text-red-600">{errors.categoria}</p>
                  )}
                </div>

                {/* Campo Preço */}
                <div>
                  <label htmlFor="preco" className="block text-sm font-medium text-gray-700">
                    Preço *
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="preco"
                      id="preco"
                      required
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.preco ? 'border-red-300' : 'border-gray-300'
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      placeholder="0,00"
                      value={formData.preco}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.preco && (
                    <p className="mt-1 text-sm text-red-600">{errors.preco}</p>
                  )}
                  {formData.preco && !errors.preco && (
                    <p className="mt-1 text-sm text-gray-500">
                      Valor: {formatPriceDisplay(formData.preco)}
                    </p>
                  )}
                </div>

                {/* Campo Descrição */}
                <div className="sm:col-span-2">
                  <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                    Descrição
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      name="descricao"
                      id="descricao"
                      rows={4}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.descricao ? 'border-red-300' : 'border-gray-300'
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      placeholder="Digite uma descrição para o produto (opcional)"
                      value={formData.descricao}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.descricao && (
                    <p className="mt-1 text-sm text-red-600">{errors.descricao}</p>
                  )}
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onCancel}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {isEditing ? 'Salvando...' : 'Criando...'}
                    </div>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {isEditing ? 'Salvar Alterações' : 'Criar Produto'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProdutoForm;

