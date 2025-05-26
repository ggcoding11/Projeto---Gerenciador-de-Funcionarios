Inputmask({ mask: "(99) 99999-9999" }).mask(document.querySelector("#fone"));
Inputmask({ mask: "999.999.999-99" }).mask(document.querySelector("#cpf"));

let funcionarios = [];
let instanciaModal;

console.log(document.getElementsByClassName("container")[0])

const tabela = document.querySelector("#corpo-tabela");

document.querySelector("#btn-adicionar").addEventListener("click", () => {
  instanciaModal = bootstrap.Modal.getInstance(
    document.getElementById("modalCadastro")
  );
});


tabela.addEventListener("click", (elemClicado) => {
  let botaoOlhar = elemClicado.target.closest(".btn-olhar")
  let botaoExcluir = elemClicado.target.closest(".btn-excluir")

  if (botaoOlhar) {
    //A cada vez que eu clico, ele refaz a contagem dos botões e linhas disponíveis, o que me ajuda a pegar o index para o array FUNCIONÁRIOS

    let index = Array.from(document.querySelectorAll(".btn-olhar")).indexOf(botaoOlhar)

    let pessoa = funcionarios[index]

    document.querySelector("#nomeOlhar").value = pessoa.nome;
    document.querySelector("#idadeOlhar").value = pessoa.idade;
    document.querySelector("#cidadeOlhar").value = pessoa.cidade;
    document.querySelector("#foneOlhar").value = pessoa.fone;
    document.querySelector("#cpfOlhar").value = pessoa.cpf;
  }

  if (botaoExcluir) {
    let linhaBotao = botaoExcluir.closest("tr")
    let listaLinhas = Array.from(tabela.querySelectorAll("tr"))
    let index = listaLinhas.indexOf(linhaBotao)

    funcionarios.splice(index, 1)
    linhaBotao.remove() // Eu removi dai completamente do DOM lá
  }
})

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
