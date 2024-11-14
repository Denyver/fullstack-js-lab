let valorAtual = '';
let valorAnterior = '';
let operador = '';

function inserir(num) {
    valorAtual += num; 
    document.getElementById('resultado').value = valorAtual; 
}

function limpar() { 
    valorAtual = '';
    valorAnterior = '';
    operador = '';
    document.getElementById('resultado').value = "";
}

function soma() {
    if (valorAtual !== '') {
        valorAnterior = valorAtual;
        operador = '+';
        valorAtual = '';
    }
}

function divisao() {
    if (valorAtual !== '') {
        valorAnterior = valorAtual;
        operador = '÷';
        valorAtual = '';
    }
}

function subtracao() {
    if (valorAtual !== '') {
        valorAnterior = valorAtual;
        operador = '-';
        valorAtual = '';
    }
}

function multiplicacao() {
    if (valorAtual !== '') {
        valorAnterior = valorAtual;
        operador = 'x';
        valorAtual = '';
    }
}

function calcular() {
    let resultado = 0;

    let num1 = parseFloat(valorAnterior);
    let num2 = parseFloat(valorAtual);

    if (operador == '÷') {
        resultado = num1 / num2;
    }
    else if (operador == '-') {
        resultado = num1 - num2;
    }
    else if (operador == '+') {
        resultado = num1 + num2;
    }
    else if (operador == 'x') {
        resultado = num1 * num2;
    }

    document.getElementById('resultado').value = resultado;

    valorAtual = resultado.toString();
    valorAnterior = '';
    operador = '';
}
