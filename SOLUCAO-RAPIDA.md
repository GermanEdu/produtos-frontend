# 🔧 SOLUÇÃO RÁPIDA - Problemas Windows

## ⚡ Comandos para Resolver IMEDIATAMENTE

### 1. Problema: "pnpm não é reconhecido"
```cmd
# Use npm em vez de pnpm
npm install --legacy-peer-deps
```

### 2. Problema: "ERESOLVE unable to resolve dependency tree"
```cmd
# Execute EXATAMENTE estes comandos na ordem:
npm install --legacy-peer-deps
```

### 3. Problema: "vite não é reconhecido"
```cmd
# Primeiro instale as dependências corretamente:
npm install --legacy-peer-deps

# Depois execute:
npm run dev
```

## 🚀 SEQUÊNCIA COMPLETA DE COMANDOS

**Copie e cole estes comandos um por vez:**

```cmd
# 1. Navegar para a pasta (substitua pelo seu caminho)
cd C:\Users\Edu\Documents\Entrevistas\DevPartner\Projetos\frontend\produtos-frontend

# 2. Limpar instalação anterior (se houver)
rmdir /s /q node_modules
del package-lock.json

# 3. Instalar dependências (ESTE É O COMANDO CORRETO)
npm install --legacy-peer-deps

# 4. Executar o projeto
npm run dev
```

## ✅ O que deve acontecer:

1. **Após `npm install --legacy-peer-deps`:**
   - Deve instalar sem erros de ERESOLVE
   - Pode mostrar alguns warnings (normal)
   - Deve criar a pasta `node_modules`

2. **Após `npm run dev`:**
   - Deve mostrar: "VITE v6.3.5 ready in XXXms"
   - Deve mostrar: "Local: http://localhost:5173/"
   - Abra essa URL no navegador

## 🆘 Se AINDA não funcionar:

### Opção 1: Forçar instalação
```cmd
npm install --force
npm run dev
```

### Opção 2: Usar Yarn
```cmd
npm install -g yarn
yarn install
yarn dev
```

### Opção 3: Executar como Administrador
1. Clique com botão direito no "Prompt de Comando"
2. Selecione "Executar como administrador"
3. Execute os comandos novamente

## 📞 Verificação Final

Execute estes comandos para verificar se está tudo OK:

```cmd
# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar se as dependências foram instaladas
dir node_modules
```

**Se todos os comandos funcionarem, o projeto deve rodar perfeitamente!**

