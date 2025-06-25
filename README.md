# 🛒 Sistema de Produtos - CRUD (Frontend React)

Este é o frontend de um sistema CRUD de produtos, desenvolvido com **React + Vite + Tailwind CSS**, integrado a uma **API ASP.NET Core com autenticação JWT**.

---

## 🚀 Funcionalidades

- ✅ Login e Registro de Usuário com token JWT
- ✅ Listagem de Produtos
- ✅ Criação, edição e exclusão de produtos
- ✅ Filtro de produtos por nome
- ✅ Interface responsiva com TailwindCSS
- ✅ Persistência de autenticação com localStorage
- ✅ Comunicação segura com backend ASP.NET

---

## 🛠️ Tecnologias

- React + Vite
- Axios
- Tailwind CSS
- JWT
- ESLint / Prettier (opcional)
- React Router

---

## ⚙️ Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/seu-repo-frontend.git

# 2. Acesse a pasta
cd seu-repo-frontend

# 3. Instale as dependências
npm install

# 4. Inicie a aplicação
npm run dev

Conexão com API
Certifique-se de que o backend ASP.NET esteja rodando em:

arduino
Copiar
Editar
http://localhost:5240
E que o proxy esteja configurado corretamente no vite.config.js:

js
Copiar
Editar
server: {
  proxy: {
    '/api': 'http://localhost:5240'
  }
}
🔐 Autenticação
JWT Token é salvo no localStorage

Token é incluído automaticamente em cada requisição via axios

🧪 Scripts úteis
bash
Copiar
Editar
npm run dev       # inicia servidor de desenvolvimento
npm run build     # build de produção
npm run preview   # preview da build
📂 Estrutura de pastas (exemplo)
graphql
Copiar
Editar
src/
├── api/           # comunicação com a API (axios)
├── pages/         # páginas (login, home, etc)
├── components/    # componentes reutilizáveis
├── hooks/         # hooks customizados
├── assets/        # imagens, ícones
└── App.jsx
📌 Requisitos
Node.js 18+

Backend ASP.NET rodando localmente na porta 5240

👨‍💻 Desenvolvedor
Nome: Eduardo

GitHub: [@seu-usuario](https://github.com/GermanEdu)
