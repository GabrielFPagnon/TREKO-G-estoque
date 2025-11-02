
# TREKO - Sistema para Gestão de Estoque

Um sistema de gestão de estoque simples para pequena e médias empresas.

## Como rodar o servidor Back-end (desenvolvimento)

1. Instale dependências:

	npm install

2. Defina (opcional) origens permitidas para CORS via variável de ambiente `CORS_ORIGINS`. Exemplo:

	# permite o Vite dev server e outras origens separadas por vírgula
	$env:CORS_ORIGINS = 'http://localhost:5173'

3. Inicie o servidor:

	node src/index.js

O servidor por padrão escuta na porta 8080. O endpoint de login está em `/api/login`.

Observações:
- Em produção, armazene senhas hasheadas e compare usando bcrypt. Gere JWTs ao invés de tokens estáticos.
- Se usar outro domínio para o front-end, ajuste `CORS_ORIGINS` ou a configuração de CORS em `src/index.js`.
