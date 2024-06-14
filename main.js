let formulario = document.getElementById('form-submit');
let nome = document.getElementById('nome-input');
let numero = document.getElementById('numero-input'); 
let linhas = '';
let containerErroNumero = document.querySelector('.error-numero');
let nomesCadastrados = [];

function containsNumber(str) {
    const regex = /\d/;
    return regex.test(str);
}

function containsLetterInNumberString(str) {
    const regex = /[a-zA-Z]/;
    return regex.test(str);
}

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    document.querySelector('.numero-invalido').style.display = '';
    document.querySelector('.nome-invalido').innerHTML = '';
    document.querySelector('.nome-invalido').style.display = 'none';
    document.querySelector('.numero-invalido').style.display = 'none';  

    adicionaLinhas();

    nome.value = '';
    numero.value = '';
})

numero.addEventListener('keyup',function(e){
    e.preventDefault();
    console.log(e.target.value)
    if(!NumeroEValido(e.target.value) || containsLetterInNumberString(numero.value)){
        numero.classList.add('error');
    }
    else{
        numero.classList.remove('error');

        document.querySelector('.numero-invalido').style.display = 'none'; 
        document.querySelector('.numero-invalido').style.display = '';
    }
})

function NumeroEValido(numero){
    if (numero.length != 9)
    {
        return false;
    }
    else{
        return true;
    }
}

function NomeEValido(nome){
    if (nomesCadastrados.includes(nome)){
        return false;
    }
    else{
        return true;
    }
}

function adicionaLinhas(){
    if(!NumeroEValido(numero.value)){
        document.querySelector('.numero-invalido').innerHTML = 'O número de telefone deve ter 9 dígitos';
        document.querySelector('.numero-invalido').style.display = 'block';
    }   

    if(!NomeEValido(nome.value)){
        document.querySelector('.nome-invalido').innerHTML = `O nome ${nome.value} já foi adicionado. Escolha outro!`;
        document.querySelector('.nome-invalido').style.display = 'block';
    }
    if(containsLetterInNumberString(numero.value)){
        document.querySelector('.numero-invalido').innerHTML = `O campo número de telefone só pode ter números!`;
        document.querySelector('.numero-invalido').style.display = 'block';
    }
    if(containsNumber(nome.value)){
        document.querySelector('.nome-invalido').innerHTML = `O campo nome não pode ter números!`;
        document.querySelector('.nome-invalido').style.display = 'block';
    }
    if(NumeroEValido(numero.value) && NomeEValido(nome.value) && !containsLetterInNumberString(numero.value) && !containsNumber(nome.value)){
        let conteudoTabela = document.getElementById('conteudo-tabela');
        linha = '<tr>';
        linha += `<td>${nome.value}</td>`;
        linha += `<td>${numero.value}</td>`;
        linha += '</tr>';

        linhas += linha;

        conteudoTabela.innerHTML = linhas;
        nomesCadastrados.push(nome.value);
    }
}

nome.addEventListener('keyup',function(e){
    if(nomesCadastrados.includes(e.target.value) || containsNumber(e.target.value)){
        document.querySelector('#nome-input').classList.add('error');
    }
    else{
        document.querySelector('#nome-input').classList.remove('error');
        
        document.querySelector('.nome-invalido').innerHTML = '';
        document.querySelector('.nome-invalido').style.display = 'none';
    }
})
