Inputmask({ mask: "(99) 99999-9999" }).mask(document.querySelector("#fone"));
Inputmask({ mask: "999.999.999-99" }).mask(document.querySelector("#cpf"));
Inputmask({ mask: "(99) 99999-9999" }).mask(document.querySelector("#foneEditar"));
Inputmask({ mask: "999.999.999-99" }).mask(document.querySelector("#cpfEditar"));

let funcionarios = [];
let instanciaModal;

let indexEditado;
let linhaEditada;

let imgSrcCadastro = ""
let imgSrcEditar = ""

const tabela = document.querySelector("#corpo-tabela");
const inputImgCadastro = document.querySelector("#input-upload")
const imagemPerfilCadastro = document.querySelector("#perfil-upload")

const inputImgEditar = document.querySelector("#input-editar")
const imagemPerfilEditar = document.querySelector("#perfil-editar")

inputImgCadastro.addEventListener("change", handleImgCadastro);

inputImgEditar.addEventListener("change", handleImgEditar);

document.querySelector("#btn-adicionar").addEventListener("click", abrirModalCadastro);

document.querySelector("#btn-cadastrar").addEventListener("click", cadastrarFuncionario);

document.querySelector("#btn-alterar").addEventListener("click", alterarFuncionario);

function coletaDados(nomeID, idadeID, cidadeID, foneID, cpfID, imgSrc) {
  let nome = document.querySelector(`#${nomeID}`).value;
  let idade = document.querySelector(`#${idadeID}`).value;
  let cidade = document.querySelector(`#${cidadeID}`).value;
  let fone = document.querySelector(`#${foneID}`).value;
  let cpf = document.querySelector(`#${cpfID}`).value;

  if (nome == "" || idade == "" || cidade == "" || fone == "" || cpf == "" || imgSrc == "") {
    return -1;
  }

  let pessoa = {
    nome: nome,
    idade: idade,
    cidade: cidade,
    fone: fone,
    cpf: cpf,
    imgSrc: imgSrc
  };

  return pessoa;
}

function handleImgCadastro() {
  const arquivo = inputImgCadastro.files[0];

  if (arquivo) {
    const leitor = new FileReader();

    leitor.onload = function () {
      imgSrcCadastro = leitor.result;
      imagemPerfilCadastro.src = imgSrcCadastro;
      inputImgCadastro.value = "";
    }

    leitor.readAsDataURL(arquivo);
  }
}

function handleImgEditar() {
  const arquivo = inputImgEditar.files[0];

  if (arquivo) {
    const leitor = new FileReader();

    leitor.onload = function () {
      imgSrcEditar = leitor.result;
      imagemPerfilEditar.src = imgSrcEditar;
      inputImgEditar.value = "";
    }

    leitor.readAsDataURL(arquivo);
  }
}

function abrirModalCadastro() {
  instanciaModal = bootstrap.Modal.getInstance(
    document.getElementById("modalCadastro")
  );
}

function cadastrarFuncionario() {
  let result = coletaDados("nome", "idade", "cidade", "fone", "cpf", imgSrcCadastro);

  if (result == -1) {
    alert("Algum dado ainda está faltando!");
    return;
  }

  let pessoa = result;

  funcionarios.push(pessoa);

  let linha = document.createElement("tr")

  linha.innerHTML += `
    <tr>
      <td>
        <div class="d-flex justify-content-center align-items-center">
          <img src="${pessoa.imgSrc}" alt="foto-perfil" class="foto-tabela"/>
        </div>
      </td>
      <td>
        <div class="d-flex justify-content-center align-items-center">
          ${pessoa.nome}
        </div>
      </td>
      <td>
        <div class="d-flex justify-content-center align-items-center">
          ${pessoa.idade}
        </div>
      </td>
      <td>
        <div class="d-flex justify-content-center align-items-center">
          ${pessoa.cidade}
        </div>
      </td>
      <td>
        <div class="d-flex justify-content-center align-items-center">
          ${pessoa.fone}
        </div>
      </td>
      <td>
        <div class="d-flex justify-content-center align-items-center">
          ${pessoa.cpf}
        </div>
      </td>
      <td>
        <div class="d-flex justify-content-center align-items-center gap-1">
          <button class="btn btn-success btn-olhar" data-bs-toggle="modal" data-bs-target="#modalOlhar">
            <i class="bi bi-eye"></i>
          </button>
          <button class="btn btn-primary btn-editar" data-bs-toggle="modal" data-bs-target="#modalEditar">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="btn btn-danger btn-excluir">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `;

  linha.querySelector(".btn-olhar").addEventListener("click", cliqueBotaoOlhar)
  linha.querySelector(".btn-editar").addEventListener("click", cliqueBotaoEditar);
  linha.querySelector(".btn-excluir").addEventListener("click", cliqueBotaoExcluir);

  document.querySelector("#nome").value = "";
  document.querySelector("#idade").value = "";
  document.querySelector("#cidade").value = "";
  document.querySelector("#fone").value = "";
  document.querySelector("#cpf").value = "";
  imagemPerfilCadastro.src = "/img/profile.png";

  imgSrcCadastro = "";

  instanciaModal.hide();

  tabela.appendChild(linha);
}

function cliqueBotaoOlhar(elemClicado){
  let botaoOlhar = elemClicado.currentTarget
  let index = Array.from(tabela.querySelectorAll(".btn-olhar")).indexOf(
    botaoOlhar
  );

  let pessoa = funcionarios[index];

  document.querySelector("#perfil-olhar").src = pessoa.imgSrc;
  document.querySelector("#nomeOlhar").value = pessoa.nome;
  document.querySelector("#idadeOlhar").value = pessoa.idade;
  document.querySelector("#cidadeOlhar").value = pessoa.cidade;
  document.querySelector("#foneOlhar").value = pessoa.fone;
  document.querySelector("#cpfOlhar").value = pessoa.cpf;
}

function cliqueBotaoEditar(elemClicado){
  let botaoEditar = elemClicado.currentTarget

  instanciaModal = bootstrap.Modal.getInstance(
    document.getElementById("modalEditar")
  );

  indexEditado = Array.from(tabela.querySelectorAll(".btn-editar")).indexOf(botaoEditar);

  document.querySelector("#nomeEditar").value = funcionarios[indexEditado].nome;
  document.querySelector("#idadeEditar").value = funcionarios[indexEditado].idade;
  document.querySelector("#cidadeEditar").value = funcionarios[indexEditado].cidade;
  document.querySelector("#foneEditar").value = funcionarios[indexEditado].fone;
  document.querySelector("#cpfEditar").value = funcionarios[indexEditado].cpf;
  document.querySelector("#perfil-editar").src = funcionarios[indexEditado].imgSrc;

  imgSrcEditar = funcionarios[indexEditado].imgSrc;

  linhaEditada = botaoEditar.closest("tr");
}

function cliqueBotaoExcluir(elemClicado){
  let botaoExcluir = elemClicado.currentTarget
  let linhaBotao = botaoExcluir.closest("tr");
  let index = Array.from(tabela.querySelectorAll("tr")).indexOf(linhaBotao);

  funcionarios.splice(index, 1);
  linhaBotao.remove();
}

function alterarFuncionario() {
  let result = coletaDados(
    "nomeEditar",
    "idadeEditar",
    "cidadeEditar",
    "foneEditar",
    "cpfEditar",
    imgSrcEditar
  );

  if (result == -1) {
    alert("Algum dado ainda está faltando!");
    return;
  }

  funcionarios[indexEditado] = result;

  linhaEditada.innerHTML = `
    <tr>
      <td>
        <div class="d-flex justify-content-center align-items-center">
          <img src="${funcionarios[indexEditado].imgSrc}" alt="foto-perfil" class="foto-tabela"/>
        </div>
      </td>
      <td>
        <div class="d-flex justify-content-center align-items-center">
          ${funcionarios[indexEditado].nome}
        </div>
      </td>
      <td>
        <div class="d-flex justify-content-center align-items-center">
          ${funcionarios[indexEditado].idade}
        </div>
      </td>
      <td>
        <div class="d-flex justify-content-center align-items-center">
          ${funcionarios[indexEditado].cidade}
        </div>
      </td>
      <td>
        <div class="d-flex justify-content-center align-items-center">
          ${funcionarios[indexEditado].fone}
        </div>
      </td>
      <td>
        <div class="d-flex justify-content-center align-items-center">
          ${funcionarios[indexEditado].cpf}
        </div>
      </td>
      <td>
        <div class="d-flex justify-content-center align-items-center gap-1">
          <button class="btn btn-success btn-olhar" data-bs-toggle="modal" data-bs-target="#modalOlhar">
            <i class="bi bi-eye"></i>
          </button>
          <button class="btn btn-primary btn-editar" data-bs-toggle="modal" data-bs-target="#modalEditar">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="btn btn-danger btn-excluir">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `;

  instanciaModal.hide();
}
