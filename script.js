Inputmask({ mask: "(99) 99999-9999" }).mask(document.getElementById("fone"));
Inputmask({ mask: "999.999.999-99" }).mask(document.getElementById("cpf"));

let funcionarios = [];
let instanciaModal;

const tabela = document.getElementById("corpo-tabela")

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

  tabela.innerHTML = `
    <tr>
      <td>${nome}</td>
      <td>${idade}</td>
      <td>${cidade}</td>
      <td>${fone}</td>
      <td>${cpf}</td>
      <td>
        <button class="btn btn-success" id="btn-olhar" data-bs-toggle="modal" data-bs-target="#modalOlhar">
          <i class="bi bi-eye"></i>
        </button>
        <button class="btn btn-primary">
          <i class="bi bi-pencil-square"></i>
        </button>
        <button class="btn btn-danger">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  `

  document.getElementById("btn-olhar").addEventListener("click", ()=>{
    
  })

  document.querySelector("#nome").value = "";
  document.querySelector("#idade").value = "";
  document.querySelector("#cidade").value = "";
  document.querySelector("#fone").value = "";
  document.querySelector("#cpf").value = "";

  instanciaModal.hide();

  console.log(funcionarios);
});
