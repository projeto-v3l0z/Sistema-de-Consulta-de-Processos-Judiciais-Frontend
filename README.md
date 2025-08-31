📘 SCPJ - Frontend

Interface web do Sistema de Consulta Processual Judicial (SCPJ), desenvolvida em Next.js e integrada à API Django para consulta de processos via DataJud (CNJ), autenticação JWT e visualização responsiva.

🚀 Tecnologias utilizadas

⚛️ Next.js 14

🎨 CSS Modules

📦 Axios

🔐 JWT (Autenticação com token)

📥 Clonando o projeto

git clone https://github.com/seu-usuario/scpj-frontend.git
cd scpj-frontend

📦 Instalando dependências

npm install
# ou
pnpm install

🛠️ Criando o arquivo .env.local

Crie um arquivo .env.local na raiz com o seguinte conteúdo:

NEXT_PUBLIC_API_URL=http://localhost:8000/api

Altere a URL se estiver usando o backend em outro host/porta.

▶️ Rodando em modo desenvolvimento

npm run dev

Acesse em: http://localhost:3000

📂 Estrutura principal

├── pages/             # Rotas do Next.js
├── components/        # Componentes reutilizáveis (cards, formulários, etc.)
├── lib/api.js         # Integração com backend via Axios
├── styles/            # CSS Modules
├── public/            # Assets públicos
├── .env.local         # URL da API
└── README.md

🔐 Fluxo de autenticação

Cadastro: /cadastro

Login: /login

Token JWT: armazenado em localStorage (access) e usado em chamadas autenticadas via header Authorization: Bearer

🔎 Funcionalidades

Busca por número do processo, CPF ou nome da parte

Consulta unificada local + DataJud (CNJ)

Autenticação e proteção de rotas

Integração responsiva com API SCPJ