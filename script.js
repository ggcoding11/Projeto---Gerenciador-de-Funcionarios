Inputmask({ mask: "(99) 99999-9999" }).mask(document.querySelector("#fone"));
Inputmask({ mask: "999.999.999-99" }).mask(document.querySelector("#cpf"));

let funcionarios = [];
let instanciaModal;

let botoesOlhar;
let botoesExcluir;

const tabela = document.querySelector("#corpo-tabela");

document.querySelector("#btn-adicionar").addEventListener("click", () => {
  instanciaModal = bootstrap.Modal.getInstance(
    document.getElementById("modalCadastro")
  );
});

tabela.addEventListener("click", (e) => {
  const btnOlhar = e.target.closest(".btn-olhar");
  const btnExcluir = e.target.closest(".btn-excluir");

  if (btnOlhar) {
    const index = [...tabela.querySelectorAll(".btn-olhar")].indexOf(btnOlhar);
    const pessoa = funcionarios[index];

    document.querySelector("#nomeOlhar").value = pessoa.nome;
    document.querySelector("#idadeOlhar").value = pessoa.idade;
    document.querySelector("#cidadeOlhar").value = pessoa.cidade;
    document.querySelector("#foneOlhar").value = pessoa.fone;
    document.querySelector("#cpfOlhar").value = pessoa.cpf;
  }

  if (btnExcluir) {
    const linhas = [...tabela.querySelectorAll("tr")];
    const linha = btnExcluir.closest("tr");
    const index = linhas.indexOf(linha);

    if (index !== -1) {
      funcionarios.splice(index, 1);
      linha.remove();
    }
  }
});

document.querySelector("#btn-cadastrar").addEventListener("click", () => {
  let nome = document.querySelector("#nome").value;
  let idade = document.querySelector("#idade").value;
  let cidade = document.querySelector("#cidade").value;
  let fone = document.querySelector("#fone").value;
  let cpf = document.querySelector("#cpf").value;

  if (nome == "" || idade == "" || cidade == "" || fone == "" || cpf == "") {
    alert("Algum dado ainda está faltando!");
    return;
  }

  let pessoa = {
    nome: nome,
    idade: idade,
    cidade: cidade,
    fone: fone,
    cpf: cpf,
  };

  funcionarios.push(pessoa);

  tabela.innerHTML += `
    <tr>
      <td>${nome}</td>
      <td>${idade}</td>
      <td>${cidade}</td>
      <td>${fone}</td>
      <td>${cpf}</td>
      <td>
        <button class="btn btn-success btn-olhar" data-bs-toggle="modal" data-bs-target="#modalOlhar">
          <i class="bi bi-eye"></i>
        </button>
        <button class="btn btn-primary">
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
