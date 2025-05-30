Inputmask({ mask: "(99) 99999-9999" }).mask(document.querySelector("#fone"));
Inputmask({ mask: "999.999.999-99" }).mask(document.querySelector("#cpf"));

let funcionarios = [];
let instanciaModal;

let indexEditado;
let linhaEditada;

const tabela = document.querySelector("#corpo-tabela");

document.querySelector("#btn-adicionar").addEventListener("click", () => {
  instanciaModal = bootstrap.Modal.getInstance(
    document.getElementById("modalCadastro")
  );
});

document.querySelector("#btn-cadastrar").addEventListener("click", () => {
  let result = coletaDados("nome", "idade", "cidade", "fone", "cpf");

  if (result == -1) {
    alert("Algum dado ainda está faltando!");
    return;
  }

  let pessoa = result;

  funcionarios.push(pessoa);

  tabela.innerHTML += `
    <tr>
      <td>${pessoa.nome}</td>
      <td>${pessoa.idade}</td>
      <td>${pessoa.cidade}</td>
      <td>${pessoa.fone}</td>
      <td>${pessoa.cpf}</td>
      <td>
        <button class="btn btn-success btn-olhar" data-bs-toggle="modal" data-bs-target="#modalOlhar">
          <i class="bi bi-eye"></i>
        </button>
        <button class="btn btn-primary btn-editar" data-bs-toggle="modal" data-bs-target="#modalEditar">
          <i class="bi bi-pencil-square"></i>
        </button>
        <button class="btn btn-danger btn-excluir">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  `;

  document.querySelector("#nome").value = "";
  document.querySelector("#idade").value = "";
  document.querySelector("#cidade").value = "";
  document.querySelector("#fone").value = "";
  document.querySelector("#cpf").value = "";

  instanciaModal.hide();
});

tabela.addEventListener("click", (elemClicado) => {
  let botaoOlhar = elemClicado.target.closest(".btn-olhar");
  let botaoExcluir = elemClicado.target.closest(".btn-excluir");
  let botaoEditar = elemClicado.target.closest(".btn-editar");

  if (botaoOlhar) {
    let index = Array.from(document.querySelectorAll(".btn-olhar")).indexOf(
      botaoOlhar
    );

    let pessoa = funcionarios[index];

    document.querySelector("#nomeOlhar").value = pessoa.nome;
    document.querySelector("#idadeOlhar").value = pessoa.idade;
    document.querySelector("#cidadeOlhar").value = pessoa.cidade;
    document.querySelector("#foneOlhar").value = pessoa.fone;
    document.querySelector("#cpfOlhar").value = pessoa.cpf;
  }

  if (botaoExcluir) {
    let linhaBotao = botaoExcluir.closest("tr");
    let listaLinhas = Array.from(tabela.querySelectorAll("tr"));
    let index = listaLinhas.indexOf(linhaBotao);

    funcionarios.splice(index, 1);
    linhaBotao.remove();
  }

  if (botaoEditar) {
    instanciaModal = bootstrap.Modal.getInstance(
      document.getElementById("modalEditar")
    );

    indexEditado = Array.from(tabela.querySelectorAll(".btn-editar")).indexOf(
      botaoEditar
    );

    document.querySelector("#nomeEditar").value =
      funcionarios[indexEditado].nome;
    document.querySelector("#idadeEditar").value =
      funcionarios[indexEditado].idade;
    document.querySelector("#cidadeEditar").value =
      funcionarios[indexEditado].cidade;
    document.querySelector("#foneEditar").value =
      funcionarios[indexEditado].fone;
    document.querySelector("#cpfEditar").value = funcionarios[indexEditado].cpf;

    linhaEditada = botaoEditar.closest("tr");
  }
});

document.querySelector("#btn-alterar").addEventListener("click", () => {
  let result = coletaDados(
    "nomeEditar",
    "idadeEditar",
    "cidadeEditar",
    "foneEditar",
    "cpfEditar"
  );

  if (result == -1) {
    alert("Algum dado ainda está faltando!");
    return;
  }

  funcionarios[indexEditado] = result;

  linhaEditada.innerHTML = `
    <td>${funcionarios[indexEditado].nome}</td>
    <td>${funcionarios[indexEditado].idade}</td>
    <td>${funcionarios[indexEditado].cidade}</td>
    <td>${funcionarios[indexEditado].fone}</td>
    <td>${funcionarios[indexEditado].cpf}</td>
    <td>
      <button class="btn btn-success btn-olhar" data-bs-toggle="modal" data-bs-target="#modalOlhar">
        <i class="bi bi-eye"></i>
      </button>
      <button class="btn btn-primary btn-editar" data-bs-toggle="modal" data-bs-target="#modalEditar">
        <i class="bi bi-pencil-square"></i>
      </button>
      <button class="btn btn-danger btn-excluir">
        <i class="bi bi-trash"></i>
      </button>
    </td>
  `;

  instanciaModal.hide();
});

function coletaDados(nomeID, idadeID, cidadeID, foneID, cpfID) {
  let nome = document.querySelector(`#${nomeID}`).value;
  let idade = document.querySelector(`#${idadeID}`).value;
  let cidade = document.querySelector(`#${cidadeID}`).value;
  let fone = document.querySelector(`#${foneID}`).value;
  let cpf = document.querySelector(`#${cpfID}`).value;

  if (nome == "" || idade == "" || cidade == "" || fone == "" || cpf == "") {
    return -1;
  }

  let pessoa = {
    nome: nome,
    idade: idade,
    cidade: cidade,
    fone: fone,
    cpf: cpf,
  };

  return pessoa;
}
