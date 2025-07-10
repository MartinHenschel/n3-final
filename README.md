# Projeto N3 - Sistema de Cadastro de Usuários com API REST e Testes

Este projeto demonstra um sistema de cadastro de usuários completo, desenvolvido como parte da disciplina N3. Ele integra:

* Uma API RESTful (Backend) para operações de Criação, Leitura, Atualização e Exclusão (CRUD) de usuários.
* Um Front-end simples, mas funcional, que interage com a API para realizar essas operações CRUD.
* Testes funcionais (End-to-End - E2E) automatizados utilizando Playwright para validar a interação do front-end com a API.
* **Testes de carga com K6 para simular uso da API e um dashboard de monitoramento no Grafana/Prometheus para visualizar o desempenho.**

---

## Requisitos do Projeto:

1.  **API REST:** Contém endpoints para GET (todos e por ID), POST, PUT e DELETE de usuários.
2.  **Front-end:** Interface de usuário para interagir com a API, permitindo cadastrar, listar, editar e excluir usuários.
3.  **Testes de Carga (K6):** Scripts para simular carga nas quatro operações da API (GET, POST, PUT, DELETE).
4.  **Dashboard Grafana:** Painel para monitorar as métricas dos testes de carga via Prometheus.
5.  **Testes Funcionais (Playwright):** Testes automatizados que validam as quatro operações CRUD através da interface do front-end.

---

## Estrutura do Projeto:

api emanuel/
├── backend/
│   ├── server.js             # Código da API Node.js/Express
│   ├── package.json          # Dependências do Backend
│   └── package-lock.json     # Versões exatas das dependências do Backend
└── frontend/
├── index.html            # Código HTML, CSS e JavaScript do Front-end
├── crud.spec.js          # Arquivo com os testes Playwright
├── playwright.config.js  # Configuração do Playwright
├── package.json          # Dependências do Front-end (Playwright, Serve)
├── package-lock.json     # Versões exatas das dependências do Front-end
├── load-test.js          # Script de teste de carga com K6
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

5. Configuração e Execução de Testes de Carga (K6 & Grafana/Prometheus):
Para rodar os testes de carga e monitorar as métricas, você precisará do K6 e de uma instância de Prometheus e Grafana. Recomenda-se usar Docker para isso.

Instalação do K6: Baixe e instale o K6 de k6.io ou use Docker.

Docker (Prometheus e Grafana): Certifique-se de ter o Docker Desktop instalado.
Na raiz do seu projeto, crie um arquivo docker-compose.yml com o seguinte conteúdo:

YAML

version: '3.8'
services:
  prometheus:
    image: prom/prometheus
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml # Certifique-se que este arquivo exista na raiz
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
  grafana:
    image: grafana/grafana
    container_name: grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=admin
    depends_on:
      - prometheus
E também na raiz do seu projeto, crie um arquivo prometheus.yml com este conteúdo:

YAML

global:
  scrape_interval: 5s # Set the scrape interval to every 5 seconds. Default is 1m.

scrape_configs:
  - job_name: 'k6'
    static_configs:
      - targets: ['host.docker.internal:6565'] # Para Docker no Windows/Mac. Use '172.17.0.1:6565' para Linux
Importante: Se você estiver usando Linux nativamente (não WSL) para Docker, mude host.docker.internal para 172.17.0.1 no prometheus.yml.

Para iniciar Prometheus e Grafana, na raiz do seu projeto, execute:

Bash

docker-compose up -d
Executar Teste K6: Abra um quarto terminal (novo), navegue até a pasta frontend e execute:

Bash

cd frontend
k6 run --out prometheus.remote_write=[http://host.docker.internal:9090/api/v1/write](http://host.docker.internal:9090/api/v1/write) load-test.js
Atenção: Se você estiver usando Linux nativamente (não WSL), mude host.docker.internal para 172.17.0.1.

Este comando executa o script K6 e envia as métricas para o Prometheus.

Acessar Grafana: Abra seu navegador e vá para http://localhost:3000.

Faça login com admin / admin.

Adicione o Prometheus como uma fonte de dados (Configuration -> Data sources -> Add data source -> Prometheus. URL: http://prometheus:9090).

Importe um dashboard K6 (pode usar o ID 15783 ou 15784 da galeria de dashboards do Grafana, ou criar o seu próprio usando as métricas api_get_requests, api_post_requests, etc.).

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










