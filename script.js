Inputmask({ mask: "(99) 99999-9999" }).mask(document.querySelector("#fone"));
Inputmask({ mask: "999.999.999-99" }).mask(document.querySelector("#cpf"));

let funcionarios = [];
let instanciaModal;

const tabela = document.querySelector("#corpo-tabela")

document.querySelector("#btn-adicionar").addEventListener("click", () => {
  instanciaModal = bootstrap.Modal.getInstance(
    document.getElementById("modalCadastro")
  );
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
  `

  document.querySelectorAll(".btn-olhar").forEach((botao, index) => {
    botao.addEventListener("click", () => {
      document.querySelector("#nomeOlhar").value = funcionarios[index].nome
      document.querySelector("#idadeOlhar").value = funcionarios[index].idade
      document.querySelector("#cidadeOlhar").value = funcionarios[index].cidade
      document.querySelector("#foneOlhar").value = funcionarios[index].fone
      document.querySelector("#cpfOlhar").value = funcionarios[index].cpf
    })
  });

  //Entender por que isso está funcionando

  document.querySelectorAll(".btn-excluir").forEach((botao, index) =>{
    botao.addEventListener("click", ()=>{
      let linhasTabela = tabela.querySelectorAll("tr")
      linhasTabela[index].innerHTML = ""
    })
  })

  document.querySelector("#nome").value = "";
  document.querySelector("#idade").value = "";
  document.querySelector("#cidade").value = "";
  document.querySelector("#fone").value = "";
  document.querySelector("#cpf").value = "";

  instanciaModal.hide();
});
