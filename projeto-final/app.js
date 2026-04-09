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

if (typeof module !== "undefined") {
  module.exports = {
    criarCliente,
    adicionarCliente,
    atualizarCliente,
    removerCliente
  };
}