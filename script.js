Inputmask({ mask: "(99) 99999-9999" }).mask(document.querySelector("#fone"));
Inputmask({ mask: "999.999.999-99" }).mask(document.querySelector("#cpf"));

let funcionarios = [];
let instanciaModal;

console.log(document.getElementsByClassName("container")[0]);

const tabela = document.querySelector("#corpo-tabela");

document.querySelector("#btn-adicionar").addEventListener("click", () => {
  instanciaModal = bootstrap.Modal.getInstance(
    document.getElementById("modalCadastro")
  );
});

tabela.addEventListener("click", (elemClicado) => {
  let botaoOlhar = elemClicado.target.closest(".btn-olhar");
  let botaoExcluir = elemClicado.target.closest(".btn-excluir");
  let botaoEditar = elemClicado.target.closest(".btn-editar");

  if (botaoOlhar) {
    //A cada vez que eu clico, ele refaz a contagem dos botões e linhas disponíveis, o que me ajuda a pegar o index para o array FUNCIONÁRIOS

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
    linhaBotao.remove(); // Eu removi dai completamente do DOM lá
  }

  if (botaoEditar) {
    instanciaModal = bootstrap.Modal.getInstance(
      document.getElementById("modalEditar")
    );

    let index = Array.from(tabela.querySelectorAll(".btn-editar")).indexOf(
      botaoEditar
    );

    console.log(funcionarios[index])

    document.querySelector("#nomeEditar").value = funcionarios[index].nome;
    document.querySelector("#idadeEditar").value = funcionarios[index].idade;
    document.querySelector("#cidadeEditar").value = funcionarios[index].cidade;
    document.querySelector("#foneEditar").value = funcionarios[index].fone;
    document.querySelector("#cpfEditar").value = funcionarios[index].cpf;

    let indexEditado = index

    document.querySelector("#btn-confirmarEdicao").addEventListener("click", () => {
      let nome = document.querySelector("#nomeEditar").value;
      let idade = document.querySelector("#idadeEditar").value;
      let cidade = document.querySelector("#cidadeEditar").value;
      let fone = document.querySelector("#foneEditar").value;
      let cpf = document.querySelector("#cpfEditar").value;
    
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
    
      funcionarios[indexEditado] = pessoa;

      console.log(funcionarios[index])

      let linhaAtual = botaoEditar.closest("tr")

      linhaAtual.innerHTML = `
        <td>${funcionarios[index].nome}</td>
        <td>${funcionarios[index].idade}</td>
        <td>${funcionarios[index].cidade}</td>
        <td>${funcionarios[index].fone}</td>
        <td>${funcionarios[index].cpf}</td>
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
      `
      instanciaModal.hide();
    });
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


