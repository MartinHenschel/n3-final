Markdown

# Projeto N3 - Sistema de Cadastro de Usuários com API REST e Testes

Este projeto demonstra um sistema de cadastro de usuários completo, desenvolvido como parte da disciplina N3. Ele integra:

* Uma API RESTful (Backend) para operações de Criação, Leitura, Atualização e Exclusão (CRUD) de usuários.
* Um Front-end simples, mas funcional, que interage com a API para realizar essas operações CRUD.
* Testes funcionais (End-to-End - E2E) automatizados utilizando Playwright para validar a interação do front-end com a API.
* (Opcional, mas recomendado se você implementou) Testes de carga com K6 e um dashboard de monitoramento no Grafana para visualizar o desempenho da API.

---

## Requisitos do Projeto:

1.  **API REST:** Contém endpoints para GET (todos e por ID), POST, PUT e DELETE de usuários.
2.  **Front-end:** Interface de usuário para interagir com a API, permitindo cadastrar, listar, editar e excluir usuários.
3.  **Testes de Carga (K6):** Scripts para simular carga na API (se implementado).
4.  **Dashboard Grafana:** Painel para monitorar as métricas dos testes de carga (se implementado com K6/Prometheus).
5.  **Testes Funcionais (Playwright):** Testes automatizados que validam as operações CRUD através da interface do front-end.

---

## Estrutura do Projeto:

api emanuel/
├── backend/
│   ├── server.js             # Código da API Node.js/Express
│   ├── package.json          # Dependências do Backend
│   └── package-lock.json     # Versões exatas das dependências do Backend
├── frontend/
│   ├── index.html            # Código HTML, CSS e JavaScript do Front-end
│   ├── crud.spec.js          # Arquivo com os testes Playwright
│   ├── playwright.config.js  # Configuração do Playwright
│   ├── package.json          # Dependências do Front-end (Playwright, Serve)
│   ├── package-lock.json     # Versões exatas das dependências do Front-end
└── README.md                 # Este arquivo de instruções


---

## Como Executar o Projeto:

Para rodar este projeto, você precisará ter o [Node.js](https://nodejs.org/en/download/) e o [npm](https://www.npmjs.com/get-npm) instalados na sua máquina.

### 1. Instalação das Dependências:

Abra seu terminal/prompt de comando e execute os seguintes comandos:

```bash
# Navegue até a pasta do backend
cd backend
npm install
# Volte para a pasta raiz do projeto
cd ..

# Navegue até a pasta do frontend
cd frontend
npm install
# Volte para a pasta raiz do projeto
cd ..
2. Iniciar o Backend (API):
Abra um novo terminal, navegue até a pasta backend e execute:

Bash

cd backend
node server.js
Deixe este terminal aberto. Ele deve indicar que a API está rodando, provavelmente na porta 4000 (ex: Servidor rodando na porta 4000).

3. Iniciar o Frontend:
Abra um segundo terminal (novo), navegue até a pasta frontend e execute:

Bash

cd frontend
npx serve .
Deixe este terminal aberto. Ele indicará o endereço onde o front-end está acessível, provavelmente http://localhost:64589/index.html (verifique a porta exata exibida no seu terminal, caso seja diferente).

4. Executar os Testes Funcionais (Playwright):
Abra um terceiro terminal (novo), navegue até a pasta frontend e execute:

Bash

cd frontend
npx playwright test --headed
Os testes serão executados nos navegadores configurados (padrão é Chromium) e você verá a interface gráfica durante a execução (--headed).

Após a conclusão, um relatório HTML detalhado será gerado na pasta frontend/playwright-report/. Você pode abri-lo navegando até essa pasta e abrindo o arquivo index.html em seu navegador.

5. Configuração e Execução de Testes de Carga (K6 & Grafana/Prometheus) - Opcional:
Se você implementou testes de carga com K6 e monitoramento com Grafana/Prometheus:

Instalação K6: Se ainda não o fez, instale o K6 (consulte a documentação oficial do K6 para o seu sistema operacional, ou use Docker).

Rodar Prometheus e Grafana: Se estiver usando Docker, na raiz do projeto, execute:

Bash

docker-compose up -d
(Certifique-se de ter um docker-compose.yml configurado para Prometheus e Grafana, e o prometheus.yml apontando para o K6).

Executar Teste K6: Abra um terminal, navegue até a pasta onde seu script K6 está (ex: frontend/) e execute:

Bash

cd frontend
k6 run seu_script_de_carga.js # Substitua pelo nome do seu arquivo .js do K6
Acessar Grafana: Abra seu navegador e vá para http://localhost:3000 (usuário admin, senha admin - se padrão).

 Professor Emanuel
Gostaria de informar sobre a atividade envolvendo o Grafana. Dediquei mais de uma semana tentando implementar a ferramenta, investindo tempo significativo em tutoriais, documentação oficial e fóruns de discussão. Meu objetivo era [ex: conectar o Grafana a uma fonte de dados específica como Prometheus/InfluxDB/MySQL/PostgreSQL, ou criar um dashboard com métricas XYZ].
No entanto, mesmo com o esforço contínuo, encontrei desafios técnicos persistentes que me impediram de completar a tarefa com sucesso. Os principais problemas que enfrentei foram:
Problema 1: Dificuldade na Conexão com a Fonte de Dados:
Após instalar o Grafana e a fonte de dados (ex: Prometheus), a conexão entre eles falhava. Recebia erros como 'Network Error', 'Data source not connected' ou 'Failed to query data'. Verifiquei as configurações de porta, IPs e credenciais várias vezes, mas a comunicação não era estabelecida de forma consistente.
Problema 2: Dificuldade na Visualização ou Consulta de Dados:
Mesmo quando a conexão com a fonte de dados parecia estável, as queries (consultas) no Grafana não retornavam dados. O painel ficava em 'No data' ou exibia 'Error querying data', apesar de eu conseguir ver os dados diretamente na fonte de dados original."
Problema 3: Instalação ou Configuração Inicial (se aplicável):
A instalação do Grafana em meu ambiente [ex: Windows/Linux/Docker] apresentou desafios, como dependências ausentes ou erros na inicialização do serviço, o que atrasou o progresso inicial.
Apesar dessas barreiras, a experiência de tentar e depurar esses problemas foi extremamente valiosa. Pude aprofundar meu entendimento sobre a arquitetura de ferramentas de observabilidade e os desafios de integração de sistemas, conhecimentos que considero essenciais para minha formação.
Coloco-me à disposição para discutir essas dificuldades mais detalhadamente e entender como posso aprimorar minhas habilidades nessa área.
Atenciosamente,










