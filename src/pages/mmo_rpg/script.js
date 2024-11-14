let rodada = 0;
const nome1 = prompt("Digite o nome do Personagem 1");
const nome2 = prompt("Digite o nome do Personagem 2");

const personagem1 = criarPersonagem(nome1);
const personagem2 = criarPersonagem(nome2);

function criarPersonagem(nome) {
  return {
    nome: nome,
    vida: gerarAtributo(250, 800) * 2,
    defesa: gerarAtributo(250, 800),
    dano: gerarAtributo(250, 800),
    velocidade: gerarAtributo(250, 800),
    critico: gerarAtributo(1, 100),
  };
}

function gerarAtributo(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function iniciarBatalha() {
  document.querySelector("#nome1_HTML").innerHTML = personagem1.nome;
  document.querySelector("#nome2_HTML").innerHTML = personagem2.nome;
  document.querySelector("#char1-life").innerHTML = personagem1.vida;
  document.querySelector("#char2-life").innerHTML = personagem2.vida;
  destacarTurno(iniciativa());
}

function iniciativa() {
  if (personagem1.velocidade > personagem2.velocidade) {
    alert(`${personagem1.nome} começa primeiro`);
    return personagem1;
  } else if (personagem1.velocidade < personagem2.velocidade) {
    alert(`${personagem2.nome} começa primeiro`);
    return personagem2;
  } else {
    return Math.random() < 0.5 ? personagem1 : personagem2;
  }
}

function verificar() {
  if (personagem1.vida <= 0) {
    alert(`${personagem2.nome} Ganhou a batalha!`);
    return true;
  } else if (personagem2.vida <= 0) {
    alert(`${personagem1.nome} Ganhou a batalha!`);
    return true;
  }
  return false;
}

function attack(atk) {
  let atacante, defensor;
  if (atk === 'atk1') {
    atacante = personagem1;
    defensor = personagem2;
  } else {
    atacante = personagem2;
    defensor = personagem1;
  }
  
  function defense(def) {
    alert("Defesa não implementada ainda.");
  }
  
  const valorRandomico = gerarAtributo(25, 150);
  const velocidadeAtual = atacante.velocidade + valorRandomico;

  if (Math.random() * 100 <= atacante.critico) {
    const danoCritico = atacante.dano * 2;
    defensor.vida -= Math.max(danoCritico - defensor.defesa, 0);
    alert(`${atacante.nome} realizou um ataque CRÍTICO!`);
  } else {
    defensor.vida -= Math.max(atacante.dano - defensor.defesa, 0);
    alert(`${atacante.nome} atacou causando dano normal!`);
  }

  atualizarVida();
  if (verificar()) {
    return;
  }
  
  rodada++;
  trocarTurno();
}

function atualizarVida() {
  document.querySelector("#char1-life").innerHTML = personagem1.vida;
  document.querySelector("#char2-life").innerHTML = personagem2.vida;
}

function destacarTurno(personagemAtual) {
  if (personagemAtual === personagem1) {
    document.getElementById("char1").classList.add("turno");
    document.getElementById("char2").classList.remove("turno");
  } else {
    document.getElementById("char2").classList.add("turno");
    document.getElementById("char1").classList.remove("turno");
  }
}

function trocarTurno() {
  let proximoTurno = (document.getElementById("char1").classList.contains("turno")) ? personagem2 : personagem1;
  destacarTurno(proximoTurno);
}

iniciarBatalha();
