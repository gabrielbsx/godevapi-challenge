# Go Dev API Desafio de Integração

Este documento explica como executar o projeto que contém os seguintes comandos para rodar o servidor e realizar outras tarefas relacionadas. Certifique-se de seguir as etapas abaixo:

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter as seguintes dependências instaladas em seu sistema:

- Node.JS (18.x)
- npm
- HUBSPOT_API_KEY (chave de API do HubSpot)
- GOOGLE_PRIVATE_KEY_FILE do Google Cloud

## Configuração

1. Clone o repositório do projeto em sua máquina local.

  ```bash
  git clone <https://github.com/gabrielbsx/godevapi-challenge.git>
  cd godevapi-challenge/apps/hubspot-sheets-app
  ```

2. Instale as dependências do projeto usando npm.

  ```bash
  npm install
  ```

3. Configure as variáveis de ambiente necessárias.

   Certifique-se de adicionar as credenciais HUBSPOT_API_KEY do Hubspot e GOOGLE_PRIVATE_KEY_FILE do Google Cloud ao seu ambiente. Essas informações serão necessárias para executar certas funcionalidades do projeto.
   Importante que as credenciais do Google Cloud deve ser salva como credentials.json

## Executando o servidor localmente com Serverless

Para rodar o servidorless localmente, execute o seguinte comando:

```bash
npm run deploy:local
```

## Executando o servidor com Express

Existem duas opções para executar o servidor com Express: ambiente de desenvolvimento (dev) e ambiente de produção (prod).

### Ambiente de Desenvolvimento (dev)

Para rodar o servidor em ambiente de desenvolvimento usando TypeScript, utilize o seguinte comando:

```bash
npm run start:ts:dev:http
```

Para rodar o servidor em ambiente de desenvolvimento usando o pacote Commander, utilize o seguinte comando (exemplo):

```bash
npm run start:ts:dev:cli transfer-contacts-list transfer-list --sheet-id="1FVlfOM3pAxCuqzuPep8_vFidQ8FSH2jODecAD7ieNXc"
```

### Ambiente de Produção (prod)

Para rodar o servidor em ambiente de produção usando JavaScript, utilize o seguinte comando:

```bash
npm run start:js:prod:http
```

Para rodar o servidor em ambiente de produção usando o pacote Commander, utilize o seguinte comando (exemplo):

```bash
npm run start:js:prod:cli transfer-contacts-list transfer-list --sheet-id="1FVlfOM3pAxCuqzuPep8_vFidQ8FSH2jODecAD7ieNXc"
```

Lembre-se de substituir o valor de `sheet-id` pelo ID da planilha que você deseja utilizar.

## Build da Aplicação

Caso seja necessário realizar um build da aplicação TypeScript, utilize o seguinte comando:

```bash
npm run build
```

Após a execução bem-sucedida de qualquer um desses comandos, o servidor estará em execução e pronto para responder a solicitações no endpoint `GET /transfer-contacts-list/:sheetId`, onde `:sheetId` representa o ID da planilha desejada.

## Exemplo de Planilha

Para fins de exemplo, você pode seguir a planilha fornecida no seguinte URL: [Exemplo de Planilha](https://docs.google.com/spreadsheets/d/1FVlfOM3pAxCuqzuPep8_vFidQ8FSH2jODecAD7ieNXc).

Lembre-se de que é importante configurar todas as variáveis de ambiente necessárias antes de iniciar o servidor e a planilha deve conter os dados com os cabeçalhos mostrados no exemplo.
Além disos, o servidor rodará na porta 3000 por padrão, portanto, certifique-se de que a porta 3000 esteja disponível

