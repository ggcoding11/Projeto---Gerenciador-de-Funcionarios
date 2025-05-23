Inputmask({ mask: "(99) 99999-9999" }).mask(document.getElementById("fone"));
Inputmask({ mask: "999.999.999-99" }).mask(document.getElementById("cpf"));

let funcionarios = [];
let instanciaModal;

const tabela = document.getElementById("corpo-tabela")

document.querySelector("#btn-adicionar").addEventListener("click", () => {
  instanciaModal = bootstrap.Modal.getInstance(
    document.getElementById("exampleModal")
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

  let linhaNova = document.createElement("tr")

  let dadoNome = document.createElement("td")
  dadoNome.innerHTML = nome
  let dadoIdade = document.createElement("td")
  dadoIdade.innerHTML = idade
  let dadoCidade = document.createElement("td")
  dadoCidade.innerHTML = cidade
  let dadoFone = document.createElement("td")
  dadoFone.innerHTML = fone
  let dadoCPF = document.createElement("td")
  dadoCPF.innerHTML = cpf

  let acoes = document.createElement("td")

  let botaoOlhar = document.createElement("button")
  botaoOlhar.className = "btn btn-success"
  botaoOlhar.innerHTML = `<i class="bi bi-eye"></i>`
  
  let botaoEditar = document.createElement("button")
  botaoEditar.className = "btn btn-primary"
  botaoEditar.innerHTML = `<i class="bi bi-pencil-square"></i>`

  let botaoExcluir = document.createElement("button")
  botaoExcluir.className = "btn btn-danger"
  botaoExcluir.innerHTML = `<i class="bi bi-trash"></i>` 

  acoes.append(botaoOlhar ,botaoEditar, botaoExcluir)

  linhaNova.append(dadoNome, dadoIdade, dadoCidade, dadoFone, dadoCPF, acoes)

  tabela.append(linhaNova)

  document.querySelector("#nome").value = "";
  document.querySelector("#idade").value = "";
  document.querySelector("#cidade").value = "";
  document.querySelector("#fone").value = "";
  document.querySelector("#cpf").value = "";

  instanciaModal.hide();

  console.log(funcionarios);
});
