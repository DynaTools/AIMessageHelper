# AI Message Quick Language Helper

A responsive web application for language translation and grammar exercises using multiple AI engines (OpenAI, Gemini 2.0, DeepSeek V3).

## Features

- **Secure Google Authentication**: Utilizes Firebase for secure login
- **Multiple AI Engines**: Support for OpenAI, Gemini 2.0, and DeepSeek V3
- **Translation & Formality Control**: Translate text with adjustable formality levels
- **Grammar Exercises**: Practice grammar with AI-generated exercises
- **Security & Privacy**: No persistent storage of sensitive data
- **Token Usage Optimization**: Efficient API calls with debouncing and hash comparison

## Alternativas de Hospedagem Gratuita

### 1. Netlify (Recomendado)

1. Acesse [Netlify](https://app.netlify.com/) e faça login (você pode usar sua conta do GitHub)
2. Clique em "New site from Git"
3. Selecione GitHub como o provedor Git
4. Encontre e selecione este repositório
5. Em "Build command", digite: `npm run build`
6. Em "Publish directory", digite: `build`
7. Clique em "Deploy site"

O Netlify detectará automaticamente o arquivo `netlify.toml` na raiz do projeto que já contém todas as configurações necessárias.

### 2. Vercel

1. Acesse [Vercel](https://vercel.com/) e faça login (você pode usar sua conta do GitHub)
2. Clique em "New Project"
3. Importe este repositório do GitHub
4. As configurações já estarão definidas no arquivo `vercel.json`
5. Clique em "Deploy"

### 3. Render

1. Acesse [Render](https://render.com/) e crie uma conta
2. Selecione "Static Site" no dashboard
3. Conecte seu repositório GitHub
4. Configure o build command: `npm run build`
5. Configure o diretório de publicação: `build`
6. Clique em "Create Static Site"

## Estrutura do Projeto

```
/src
 ├── auth/
 │    └── firebase.js       # Configuração do Firebase e métodos de autenticação
 ├── components/
 │    ├── Login.jsx         # Tela de login com autenticação Google
 │    ├── LanguageSelector.jsx  # Componente de seleção de idioma
 │    ├── FormalityControl.jsx  # Controle de formalidade
 │    ├── GrammarExercises.jsx  # Seções de prática gramatical
 │    ├── AISettings.jsx    # Seleção de engine de IA e input de API key
 │    ├── ControlButtons.jsx    # Botões de ação (traduzir, upload, etc.)
 │    └── MessageInput.jsx  # Entrada de texto e display de saída
 ├── utils/
 │    ├── debounce.js       # Utilitário para debounce de API calls
 │    └── hash.js           # Utilitário para hash de texto para comparação
 ├── App.jsx                # Componente principal da aplicação
 └── index.js               # Ponto de entrada
/public
 └── index.html             # Template HTML
```

## Configuração e Instalação Local

### Pré-requisitos

- Node.js e npm instalados
- Conta Firebase para autenticação

### Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/DynaTools/AIMessageHelper.git
   cd AIMessageHelper
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Crie um arquivo `.env` na raiz com sua configuração do Firebase:
   ```
   REACT_APP_FIREBASE_API_KEY=sua-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=seu-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID=seu-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=seu-storage-bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=seu-messaging-sender-id
   REACT_APP_FIREBASE_APP_ID=seu-app-id
   ```

4. Inicie o servidor de desenvolvimento:
   ```
   npm start
   ```

## Considerações de Segurança

- API keys são armazenadas apenas em memória (estado da sessão) e nunca são persistidas
- OAuth do Google é usado para autenticação segura
- Nenhum dado sensível do usuário é armazenado em localStorage ou cookies
- Variáveis de ambiente são usadas para quaisquer segredos da aplicação

## Licença

MIT 