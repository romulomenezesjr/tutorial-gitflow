Siga este tutorial configurando um repositório e copiando passo a passo os códigos do diretório **projeto-final** para **projeto-inicial** de acordo com as etapas a seguir.

O código do projeto é um **CRUD simples** com:

* **HTML**
* **CSS**
* **JavaScript vanilla**

Em todas as etapas você deve usar:
* **Git**
* Branches e fluxo de trabalho com **Git flow**

Ao final você deverá fazer uso do github para procedimentos como pull request e testes automáticos no github actions:

* Etapa de **Pull Request no GitHub**
* Etapa de **testes automáticos com GitHub Actions**

---

# Tutorial prático: Git + modelo Gitflow + CRUD simples em HTML, CSS e JavaScript

## 1. Objetivo

Neste tutorial, o aluno irá aprender a:

* iniciar um repositório Git
* organizar branches no modelo Gitflow
* desenvolver um CRUD simples
* abrir Pull Request no GitHub
* executar testes automáticos com GitHub Actions
* aplicar um **hotfix** em produção

> Neste material, **não será usado o comando `git flow`**.
> Todo o processo será feito com **comandos nativos do Git**, apenas seguindo o **modelo Gitflow**.

---

# 2. Visão geral do fluxo

Vamos usar estas branches:

* `main` → produção
* `develop` → integração das funcionalidades
* `feature/*` → novas funcionalidades
* `release/*` → preparação de versão
* `hotfix/*` → correções urgentes em produção

---

# 3. Projeto que será construído

Nome do projeto:

**crud-clientes**

Funcionalidades do CRUD:

* **Create** → cadastrar cliente
* **Read** → listar clientes
* **Update** → editar cliente
* **Delete** → remover cliente

Também haverá:

* uma etapa de **release**
* uma etapa de **Pull Request**
* uma etapa de **GitHub Actions**
* uma etapa de **hotfix**

---

# 4. Estrutura final esperada

```text
crud-clientes/
├─ index.html
├─ style.css
├─ app.js
├─ app.test.js
├─ package.json
└─ .github/
   └─ workflows/
      └─ ci.yml
```

---

# 5. Criando o projeto

## Passo 1 — criar pasta

```bash
mkdir crud-clientes
cd crud-clientes
```

## Passo 2 — iniciar o Git

```bash
git init
```

## Passo 3 — garantir o nome da branch principal

```bash
git branch -M main
```

---

# 6. Criando os arquivos iniciais

## 6.1 `index.html`



## 6.2 `style.css`


## 6.3 `app.js`


# 7. Primeiro commit

```bash
git add .
git commit -m "chore: estrutura inicial do projeto CRUD"
```

---

# 8. Criando a branch `develop`

No Gitflow, o desenvolvimento diário ocorre em `develop`.

```bash
git checkout -b develop
```

---

# 9. Criando a feature de cadastro e listagem

Embora o projeto inicial já tenha estrutura, vamos supor um fluxo didático em que cada parte é evoluída em branches separadas.

## 9.1 Criar branch de feature

```bash
git checkout develop
git checkout -b feature/create-read-clientes
```

## 9.2 Ajuste didático

Nessa etapa, o aluno pode implementar ou revisar:

* criação de cliente
* listagem de cliente

Depois:

```bash
git add .
git commit -m "feat: implementa create e read de clientes"
```

## 9.3 Voltar para `develop` e fazer merge

```bash
git checkout develop
git merge feature/create-read-clientes
git branch -d feature/create-read-clientes
```

---

# 10. Criando a feature de edição e exclusão

## 10.1 Nova branch

```bash
git checkout develop
git checkout -b feature/update-delete-clientes
```

## 10.2 Implementar ou revisar:

* edição
* exclusão

Depois:

```bash
git add .
git commit -m "feat: implementa update e delete de clientes"
```

## 10.3 Merge em `develop`

```bash
git checkout develop
git merge feature/update-delete-clientes
git branch -d feature/update-delete-clientes
```

---

# 11. Enviando o projeto para o GitHub

Crie um repositório no GitHub chamado `crud-clientes`.

Depois associe o remoto:

```bash
git remote add origin https://github.com/SEU-USUARIO/crud-clientes.git
git push -u origin main
git push -u origin develop
```

---

# 12. Etapa obrigatória: Pull Request no GitHub

No GitHub, Pull Requests são o recurso central para propor mudanças, revisar código e discutir antes do merge. O GitHub também permite criar PR normal ou rascunho, e solicitar revisão de outras pessoas. ([GitHub Docs][1])

## Cenário didático

Agora vamos criar uma nova melhoria pequena via feature branch e integrar por **Pull Request**, e não por merge local direto.

## 12.1 Criar uma feature

```bash
git checkout develop
git checkout -b feature/melhorar-layout
```

Faça uma pequena alteração no `style.css`, por exemplo:

```css
h1 {
  text-align: center;
}
```

Depois:

```bash
git add .
git commit -m "style: centraliza titulo principal"
git push -u origin feature/melhorar-layout
```

## 12.2 Abrir o Pull Request no GitHub

No GitHub:

* acesse o repositório
* escolha a branch `feature/melhorar-layout`
* clique em **Compare & pull request**
* defina:

  * **base** = `develop`
  * **compare** = `feature/melhorar-layout`
* escreva o título e descrição
* clique em **Create pull request**

## 12.3 Revisão

Peça aos alunos que analisem:

* objetivo da alteração
* arquivos modificados
* clareza dos commits
* impacto da mudança

## 12.4 Merge do PR

Após a revisão:

* clique em **Merge pull request**
* depois **Confirm merge**

Então atualize localmente:

```bash
git checkout develop
git pull origin develop
```

---

# 13. Adicionando testes automatizados

Agora vamos criar testes simples para a lógica do CRUD.

## 13.1 Criar `package.json`

```json
{
  "name": "crud-clientes",
  "version": "1.0.0",
  "description": "CRUD simples com HTML, CSS e JavaScript",
  "main": "app.js",
  "scripts": {
    "test": "node app.test.js"
  }
}
```

## 13.2 Criar `app.test.js`

```javascript
const {
  criarCliente,
  adicionarCliente,
  atualizarCliente,
  removerCliente
} = require("./app.js");

function assert(condicao, mensagem) {
  if (!condicao) {
    throw new Error(mensagem);
  }
}

function testCriarCliente() {
  const cliente = criarCliente("Ana", "ana@email.com");
  assert(cliente.nome === "Ana", "Nome deve ser Ana");
  assert(cliente.email === "ana@email.com", "Email deve ser ana@email.com");
  assert(!!cliente.id, "Cliente deve possuir id");
}

function testAdicionarCliente() {
  const lista = [];
  const cliente = criarCliente("Bruno", "bruno@email.com");
  adicionarCliente(lista, cliente);
  assert(lista.length === 1, "Lista deve conter 1 cliente");
}

function testAtualizarCliente() {
  const cliente = { id: "1", nome: "Carlos", email: "c@email.com" };
  const lista = [cliente];
  atualizarCliente(lista, "1", { nome: "Carlos Silva" });
  assert(lista[0].nome === "Carlos Silva", "Nome deve ser atualizado");
}

function testRemoverCliente() {
  const lista = [
    { id: "1", nome: "A", email: "a@email.com" },
    { id: "2", nome: "B", email: "b@email.com" }
  ];
  const novaLista = removerCliente(lista, "1");
  assert(novaLista.length === 1, "Lista deve ficar com 1 cliente");
  assert(novaLista[0].id === "2", "Cliente restante deve ser o id 2");
}

function runTests() {
  testCriarCliente();
  testAdicionarCliente();
  testAtualizarCliente();
  testRemoverCliente();
  console.log("Todos os testes passaram.");
}

runTests();
```

---

# 14. Ajuste importante no `app.js` para testes no Node

Como o arquivo também roda no navegador, precisamos impedir que o Node execute código de DOM ao importar o módulo nos testes.

Substitua a parte final de `app.js` por esta versão:

```javascript
const clientes = [];

function criarCliente(nome, email) {
  return {
    id: Date.now().toString(),
    nome,
    email
  };
}

function adicionarCliente(lista, cliente) {
  lista.push(cliente);
  return lista;
}

function atualizarCliente(lista, id, novosDados) {
  const indice = lista.findIndex(c => c.id === id);
  if (indice !== -1) {
    lista[indice] = { ...lista[indice], ...novosDados };
  }
  return lista;
}

function removerCliente(lista, id) {
  return lista.filter(c => c.id !== id);
}

function renderizarClientes() {
  const ul = document.getElementById("lista-clientes");
  ul.innerHTML = "";

  clientes.forEach(cliente => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${cliente.nome} - ${cliente.email}</span>
      <div class="acoes">
        <button onclick="prepararEdicao('${cliente.id}')">Editar</button>
        <button onclick="excluirCliente('${cliente.id}')">Excluir</button>
      </div>
    `;
    ul.appendChild(li);
  });
}

function prepararEdicao(id) {
  const cliente = clientes.find(c => c.id === id);
  if (!cliente) return;

  document.getElementById("cliente-id").value = cliente.id;
  document.getElementById("nome").value = cliente.nome;
  document.getElementById("email").value = cliente.email;
}

function excluirCliente(id) {
  const novaLista = removerCliente(clientes, id);
  clientes.length = 0;
  clientes.push(...novaLista);
  renderizarClientes();
}

if (typeof document !== "undefined") {
  document.getElementById("cliente-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("cliente-id").value;
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    if (id) {
      atualizarCliente(clientes, id, { nome, email });
    } else {
      const cliente = criarCliente(nome, email);
      adicionarCliente(clientes, cliente);
    }

    this.reset();
    document.getElementById("cliente-id").value = "";
    renderizarClientes();
  });
}

if (typeof module !== "undefined") {
  module.exports = {
    criarCliente,
    adicionarCliente,
    atualizarCliente,
    removerCliente
  };
}
```

Agora faça commit:

```bash
git add .
git commit -m "test: adiciona testes unitarios simples do CRUD"
```

---

# 15. Executando testes localmente

```bash
npm test
```

Se tudo estiver correto, a saída será:

```bash
Todos os testes passaram.
```

---

# 16. Etapa obrigatória: GitHub Actions

O GitHub Actions usa arquivos YAML dentro de `.github/workflows/` para definir workflows automatizados. Esses workflows podem ser disparados por eventos como `push` e `pull_request`. O quickstart oficial do GitHub mostra justamente esse padrão de criar um workflow que roda quando você faz commit ou abre PR. ([GitHub Docs][2])

## 16.1 Criar a branch da CI

```bash
git checkout develop
git checkout -b feature/github-actions-ci
```

## 16.2 Criar a pasta e o workflow

Crie `.github/workflows/ci.yml` com o conteúdo:

```yaml
name: CI

on:
  push:
    branches:
      - main
      - develop
      - 'feature/**'
      - 'release/**'
      - 'hotfix/**'
  pull_request:
    branches:
      - main
      - develop

jobs:
  testes:
    runs-on: ubuntu-latest

    steps:
      - name: Baixar codigo
        uses: actions/checkout@v4

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Instalar dependencias
        run: npm install

      - name: Executar testes
        run: npm test
```

## 16.3 Commitar e enviar

```bash
git add .
git commit -m "ci: adiciona pipeline de testes com GitHub Actions"
git push -u origin feature/github-actions-ci
```

## 16.4 Criar Pull Request

No GitHub, abra um PR de:

* `feature/github-actions-ci` → `develop`

Quando o PR for criado, o workflow será executado automaticamente, porque workflows podem ser configurados para rodar tanto em `push` quanto em `pull_request`. ([GitHub Docs][2])

## 16.5 Verificar execução

No GitHub:

* abra a aba **Actions**
* confira se o job executou
* verifique se os testes passaram

Depois faça o merge do PR em `develop`.

---

# 17. Criando a release

No modelo Gitflow, quando `develop` já contém o conjunto de funcionalidades pronto para entrega, cria-se uma branch `release/*`.

```bash
git checkout develop
git pull origin develop
git checkout -b release/1.0.0
```

Faça pequenos ajustes finais, por exemplo no `README.md`:

## Criar `README.md`

```md
# CRUD de Clientes

Projeto simples em HTML, CSS e JavaScript vanilla para demonstrar:

- Git
- modelo Gitflow
- Pull Request
- GitHub Actions
- hotfix
```

Commit:

```bash
git add .
git commit -m "docs: prepara release 1.0.0"
```

Envie:

```bash
git push -u origin release/1.0.0
```

---

# 18. Pull Request da release

Abra um Pull Request no GitHub:

* **base** = `main`
* **compare** = `release/1.0.0`

Revise e faça o merge.

Depois atualize localmente:

```bash
git checkout main
git pull origin main
```

Crie a tag da versão:

```bash
git tag -a v1.0.0 -m "Versao 1.0.0"
git push origin v1.0.0
```

Agora devolva a release para `develop`, para manter o histórico alinhado:

```bash
git checkout develop
git pull origin develop
git merge release/1.0.0
git push origin develop
git branch -d release/1.0.0
```

---

# 19. Simulando um problema em produção

Suponha que, após a publicação da versão `1.0.0`, foi encontrado um bug:

> o sistema permite cadastrar nome vazio se o HTML for burlado ou o valor vier só com espaços.

Esse é um caso clássico de **hotfix**, porque afeta produção.

---

# 20. Etapa de hotfix

No Gitflow, o hotfix nasce de `main`.

## 20.1 Criar branch de hotfix

```bash
git checkout main
git pull origin main
git checkout -b hotfix/validacao-nome
```

## 20.2 Corrigir o problema

Altere `criarCliente` em `app.js` para validar nome e email:

```javascript
function criarCliente(nome, email) {
  const nomeLimpo = nome.trim();
  const emailLimpo = email.trim();

  if (!nomeLimpo) {
    throw new Error("Nome é obrigatório");
  }

  if (!emailLimpo) {
    throw new Error("E-mail é obrigatório");
  }

  return {
    id: Date.now().toString(),
    nome: nomeLimpo,
    email: emailLimpo
  };
}
```

## 20.3 Adicionar teste do bug corrigido

Acrescente ao `app.test.js`:

```javascript
function testNomeObrigatorio() {
  let erroCapturado = false;

  try {
    criarCliente("   ", "teste@email.com");
  } catch (error) {
    erroCapturado = true;
  }

  assert(erroCapturado, "Deve lançar erro para nome vazio");
}
```

E no `runTests()`:

```javascript
function runTests() {
  testCriarCliente();
  testAdicionarCliente();
  testAtualizarCliente();
  testRemoverCliente();
  testNomeObrigatorio();
  console.log("Todos os testes passaram.");
}
```

## 20.4 Commit do hotfix

```bash
git add .
git commit -m "fix: valida nome obrigatorio no cadastro"
git push -u origin hotfix/validacao-nome
```

---

# 21. Pull Request do hotfix

Abra um Pull Request no GitHub:

* **base** = `main`
* **compare** = `hotfix/validacao-nome`

Como o workflow também roda em PR, os testes serão executados automaticamente nessa correção. ([GitHub Docs][2])

Após aprovação, faça merge.

Depois atualize localmente:

```bash
git checkout main
git pull origin main
```

Crie a nova tag:

```bash
git tag -a v1.0.1 -m "Versao 1.0.1"
git push origin v1.0.1
```

---

# 22. Propagando o hotfix para `develop`

Para não perder a correção no fluxo de desenvolvimento:

```bash
git checkout develop
git pull origin develop
git merge main
git push origin develop
```

Ou, alternativamente, poderia fazer merge direto da branch de hotfix antes de apagá-la. O importante é que a correção chegue também à `develop`.

Remova a branch:

```bash
git branch -d hotfix/validacao-nome
git push origin --delete hotfix/validacao-nome
```

---

# 23. Comandos Git usados no tutorial

## Inicialização

```bash
git init
git branch -M main
```

## Criação de branches

```bash
git checkout -b develop
git checkout -b feature/nome-da-feature
git checkout -b release/1.0.0
git checkout -b hotfix/nome-do-hotfix
```

## Versionamento

```bash
git add .
git commit -m "mensagem"
git push -u origin nome-da-branch
git pull origin nome-da-branch
```

## Integração

```bash
git merge nome-da-branch
```

## Limpeza

```bash
git branch -d nome-da-branch
git push origin --delete nome-da-branch
```

## Tags

```bash
git tag -a v1.0.0 -m "Versao 1.0.0"
git push origin v1.0.0
```

---

# 24. Sequência didática resumida

## Fluxo completo aplicado

1. criar projeto
2. commit inicial em `main`
3. criar `develop`
4. criar `feature/create-read-clientes`
5. merge em `develop`
6. criar `feature/update-delete-clientes`
7. merge em `develop`
8. criar `feature/melhorar-layout`
9. abrir PR para `develop`
10. criar `feature/github-actions-ci`
11. abrir PR para `develop`
12. criar `release/1.0.0`
13. abrir PR para `main`
14. criar tag `v1.0.0`
15. detectar bug em produção
16. criar `hotfix/validacao-nome` a partir de `main`
17. abrir PR para `main`
18. criar tag `v1.0.1`
19. sincronizar correção com `develop`

---

# 25. O que o aluno aprende com esse projeto

Ao final, o aluno compreende que:

* **Gitflow é um modelo de organização**, não um programa obrigatório
* é perfeitamente possível aplicar Gitflow usando apenas:

  * `checkout`
  * `branch`
  * `merge`
  * `commit`
  * `push`
  * `pull`
  * `tag`
* Pull Request melhora revisão e colaboração no GitHub ([GitHub Docs][3])
* GitHub Actions automatiza a validação do código antes do merge, via workflows em YAML e eventos como `push` e `pull_request` ([GitHub Docs][2])

---

# 26. Sugestão de exercício avaliativo

Peça ao aluno para repetir o processo em um projeto parecido, por exemplo:

**CRUD de tarefas**

Com:

* `titulo`
* `descricao`
* `status`

E exigir:

* branch `develop`
* pelo menos 2 `feature/*`
* 1 PR no GitHub
* 1 workflow no GitHub Actions
* 1 `release/*`
* 1 `hotfix/*`

---


[1]: https://docs.github.com/articles/creating-a-pull-request?utm_source=chatgpt.com "Creating a pull request"
[2]: https://docs.github.com/en/actions/get-started/quickstart?utm_source=chatgpt.com "Quickstart for GitHub Actions"
[3]: https://docs.github.com/en/pull-requests?utm_source=chatgpt.com "Pull requests documentation"
