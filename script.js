Inputmask({"mask": "(99) 99999-9999"}).mask(document.getElementById("fone"));
Inputmask({"mask": "999.999.999-99"}).mask(document.getElementById("cpf"))

let funcionarios = []

document.querySelector("#btn-cadastrar").addEventListener("click", ()=> {
    let nome = document.querySelector("#nome").value
    let idade = document.querySelector("#idade").value
    let cidade = document.querySelector("#cidade").value
    let fone = document.querySelector("#fone").value
    let cpf = document.querySelector("#cpf").value

    if (nome == "" || idade == "" || cidade == "" || fone == "" || cpf == ""){
        return
    }

    let pessoa = {
        "nome": nome,
        "idade": idade,
        "cidade": cidade,
        "fone": fone,
        "cpf": cpf
    }

    funcionarios.push(pessoa)

    console.log(funcionarios)
})