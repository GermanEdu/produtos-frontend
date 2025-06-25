# 🚀 Sistema de Produtos - Frontend React (Windows)

**Versão corrigida para Windows com dependências compatíveis**

## ⚠️ Problemas Resolvidos

Esta versão corrige os seguintes problemas encontrados no Windows:

1. ✅ **Conflito de dependências** - `date-fns` incompatível com `react-day-picker`
2. ✅ **Versões do React** - Downgrade para React 18 (mais estável)
3. ✅ **Compatibilidade npm** - Configurações para npm e yarn
4. ✅ **PNPM não encontrado** - Instruções alternativas com npm

## 🛠️ Pré-requisitos para Windows

### 1. Node.js
- **Versão recomendada:** Node.js 18.x ou 20.x
- **Download:** https://nodejs.org/
- **Verificar instalação:**
  ```cmd
  node --version
  npm --version
  ```

### 2. Git (opcional)
- **Download:** https://git-scm.com/download/win

## 📦 Instalação - Método 1 (Recomendado)

### Usando npm com --legacy-peer-deps

```cmd
# Navegar para a pasta do projeto
cd produtos-frontend

# Instalar dependências (resolve conflitos automaticamente)
npm install --legacy-peer-deps

# Executar o projeto
npm run dev
```

## 📦 Instalação - Método 2 (Alternativo)

### Usando npm com --force

```cmd
# Navegar para a pasta do projeto
cd produtos-frontend

# Limpar cache do npm (se necessário)
npm cache clean --force

# Instalar dependências forçando resolução
npm install --force

# Executar o projeto
npm run dev
```

## 📦 Instalação - Método 3 (Yarn)

### Se preferir usar Yarn

```cmd
# Instalar Yarn globalmente (se não tiver)
npm install -g yarn

# Navegar para a pasta do projeto
cd produtos-frontend

# Instalar dependências
yarn install

# Executar o projeto
yarn dev
```

## 🔧 Configuração da API

Antes de executar, verifique se o backend está rodando:

1. **Inicie o backend** na porta 5031
2. **Verifique a configuração** em `src/lib/api.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:5031/api';
   ```

## 🚀 Executando o Projeto

### Passo a Passo Completo

1. **Abrir Prompt de Comando como Administrador** (recomendado)

2. **Navegar para a pasta do projeto:**
   ```cmd
   cd C:\caminho\para\produtos-frontend
   ```

3. **Instalar dependências:**
   ```cmd
   npm install --legacy-peer-deps
   ```

4. **Executar em modo desenvolvimento:**
   ```cmd
   npm run dev
   ```

5. **Acessar no navegador:**
   - URL: `http://localhost:5173`
   - Ou a URL que aparecer no terminal

### Scripts Disponíveis

```cmd
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Visualizar build
npm run preview

# Linting
npm run lint
```

## 🐛 Soluções para Problemas Comuns

### Problema 1: "pnpm não é reconhecido"
**Solução:** Use npm em vez de pnpm
```cmd
npm install --legacy-peer-deps
npm run dev
```

### Problema 2: "ERESOLVE unable to resolve dependency tree"
**Solução:** Use uma das seguintes opções:
```cmd
# Opção 1 (Recomendada)
npm install --legacy-peer-deps

# Opção 2
npm install --force

# Opção 3
npm install --no-optional
```

### Problema 3: "vite não é reconhecido"
**Causa:** Dependências não foram instaladas corretamente
**Solução:**
```cmd
# Limpar node_modules e reinstalar
rmdir /s node_modules
del package-lock.json
npm install --legacy-peer-deps
```

### Problema 4: Erro de permissão
**Solução:** Execute o Prompt de Comando como Administrador

### Problema 5: Porta 5173 ocupada
**Solução:** O Vite escolherá automaticamente outra porta
- Verifique a URL no terminal após executar `npm run dev`

## 🔍 Verificação de Funcionamento

Após executar `npm run dev`, você deve ver algo como:

```
> produtos-frontend@0.0.0 dev
> vite

  VITE v6.3.5  ready in 500ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/
  ➜  press h + enter to show help
```

## 📱 Testando a Aplicação

1. **Acesse:** `http://localhost:5173`
2. **Tela inicial:** Deve aparecer a tela de login
3. **Registro:** Clique em "crie uma nova conta"
4. **Login:** Use as credenciais criadas
5. **Dashboard:** Gerencie produtos após o login

## 🔧 Configurações Específicas do Windows

### package.json Otimizado
- React 18.3.1 (mais estável que 19.x)
- date-fns 3.6.0 (compatível com react-day-picker)
- Overrides para forçar versões compatíveis

### Scripts Windows-Friendly
- Comandos compatíveis com cmd e PowerShell
- Sem dependência de ferramentas Unix

## 📞 Suporte Técnico

### Se ainda houver problemas:

1. **Verifique versões:**
   ```cmd
   node --version
   npm --version
   ```

2. **Limpe completamente:**
   ```cmd
   rmdir /s node_modules
   del package-lock.json
   npm cache clean --force
   npm install --legacy-peer-deps
   ```

3. **Verifique antivírus:** Alguns antivírus bloqueiam node_modules

4. **Tente em modo administrador:** Execute cmd como administrador

## 🎯 Funcionalidades Testadas

- ✅ Instalação com npm
- ✅ Execução em Windows 10/11
- ✅ Build de produção
- ✅ Todas as funcionalidades do CRUD
- ✅ Autenticação JWT
- ✅ Interface responsiva

## 📋 Estrutura do Projeto

```
produtos-frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/              # Componentes shadcn/ui
│   │   ├── Dashboard.jsx    # Tela principal
│   │   ├── Login.jsx        # Tela de login
│   │   ├── Register.jsx     # Tela de registro
│   │   ├── ProdutoForm.jsx  # Formulário de produto
│   │   └── ProtectedRoute.jsx
│   ├── hooks/
│   │   └── useAuth.jsx      # Hook de autenticação
│   ├── lib/
│   │   ├── api.js           # Configuração da API
│   │   └── utils.js         # Utilitários
│   ├── App.jsx              # Componente principal
│   ├── App.css              # Estilos globais
│   ├── main.jsx             # Ponto de entrada
│   └── index.css            # CSS base
├── index.html               # HTML principal
├── package.json             # Dependências (corrigido)
├── vite.config.js           # Configuração Vite
└── README-WINDOWS.md        # Este arquivo
```

---

**✅ Versão testada e funcionando no Windows 10/11**

