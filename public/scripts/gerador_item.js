const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('active');
  }
});

const armas = [
  "Adaga",
  "Arco",
  "Martelo",
  "Espada",
  "Chicote",
  "Espadão",
  "Machado",
  "Machadão",
  "Cajado",
  "Orbe",
  "Besta Pequena",
  "Besta Grande",
  "Bordão",
  "Tridente",
  "Claws",
  "Rapeira",
  "Escudo",
  "Katana",
  "Estilingue",
  "Lança",
  "Soqueira",
  "Foice",
  "Swallow",
  "Haloblade",
  "Maça",
  "Chain Blade",
  "Nunchaku",
  "Blade Fan",
  "Twinblades",
  "Wakizashi",
  "Cetro Mágico",
  "Alabarda",
];
const armaduras = ["Armadura Pesada", "Armadura Leve", "Armadura Média"];
const acessorios = ["Anel", "Brinco", "Colar", "Cinto"];

function atualizarOpcoes() {
  const tipo = document.getElementById("itemType").value;
  const tipoEspecificoDiv = document.getElementById("tipoEspecificoDiv");
  const tipoEspecificoSelect = document.getElementById("tipoEspecifico");

  if (tipo === "arma") {
    tipoEspecificoDiv.style.display = "block";
    tipoEspecificoSelect.innerHTML = armas
      .map((arma) => `<option value="${arma}">${arma}</option>`)
      .join("");
  } else if (tipo === "armadura") {
    tipoEspecificoDiv.style.display = "block";
    tipoEspecificoSelect.innerHTML = armaduras
      .map(
        (armadura) => `<option value="${armadura}">${armadura}</option>`
      )
      .join("");
  } else if (tipo === "acessorio") {
    tipoEspecificoDiv.style.display = "block";
    tipoEspecificoSelect.innerHTML = acessorios
      .map(
        (acessorio) =>
          `<option value="${acessorio}">${acessorio}</option>`
      )
      .join("");
  } else {
    tipoEspecificoDiv.style.display = "none";
  }
}

function gerarItem() {
  const tipo = document.getElementById("itemType").value;
  const nivelInput = document.getElementById("nivel");
  let nivel = parseInt(nivelInput.value);

  if (isNaN(nivel) || nivel < 1 || nivel > 20) {
    alert("O nível deve estar entre 1 e 20 seu arrombado");
    nivelInput.value = 1;
    nivel = 1;
  }

  let item;
  const numAtributos = getRandomInt(1, 3);
  let atributos = [];

  if (tipo === "aleatorio") {
    item = getRandomElement([...armas, ...armaduras, ...acessorios]);
  } else if (tipo === "arma" || tipo === "armadura" || tipo === "acessorio") {
    const tipoEspecifico = document.getElementById("tipoEspecifico").value;
    item = tipoEspecifico;

    if (tipo === "armadura") {
      atributos.push(escalarAtributo({ Defesa: getRandomInt(5, 20) }, nivel));
    }
  }

  for (let i = 0; i < numAtributos; i++) {
    atributos.push(escalarAtributo(getAtributoAleatorio(nivel), nivel));
  }

  const itemHTML = `
    <p><span class="atributo">Tipo:</span> <span class="item-type">${capitalizeFirstLetter(
      tipo
    )}</span></p>
    <p><span class="atributo">Nome:</span> <span class="item-title">${item}</span></p>
    <p><span class="atributo">Atributos:</span></p>
    <ul>
      ${atributos
        .map(
          (attr) =>
            `<li id="iconstar">${Object.keys(attr)[0]} +${Object.values(attr)[0]}</li>`
        )
        .join("")}
    </ul>
  `;

  // Exibindo o item na página
  document.getElementById("output").innerHTML = itemHTML;
}


function escalarTipoDano(valor, nivel) {
  let aumento = Math.floor(nivel) * 0.2;
  if (nivel == 20) {
    aumento = Math.floor(nivel) * 0.4;
  }
  if (nivel == 1) {
    valor = Math.floor(valor * 1);
  } else {
    valor = Math.floor(valor * (1 + aumento));
  }
  return valor;
}

function escalarAtributo(atributo, nivel) {
  const key = Object.keys(atributo)[0];
  let valor = Object.values(atributo)[0];
  let aumento = Math.floor(nivel) * 0.2;
  if (nivel == 20) {
    aumento = Math.floor(nivel) * 0.4;
  }

  if (typeof valor === "string" && valor.includes("%")) {
    valor = Math.floor(parseFloat(valor) * (1 + aumento)) + "%";
  } else if (typeof valor === "number") {
    valor = Math.floor(valor * (1 + aumento));
  }

  return { [key]: valor };
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getAtributoAleatorio(nivel) {
  const atributos = [
    { "Vida Max": `${getRandomInt(3, 9)}%` },
    { "Cura Causada": `${getRandomInt(3, 9)}%` },
    { "Cura Recebida": `${getRandomInt(3, 9)}%` },
    { "Vida Flat": getRandomInt(5, 10) },
    { "Mana Flat": getRandomInt(5, 10) },
    { "Mana Max": `${getRandomInt(10, 12)}%` },
    {
      "Dano Elemental": `${escalarTipoDano(
        getRandomInt(3, 9),
        nivel
      )} (${getRandomElement([
        "Agua",
        "Fogo",
        "Terra",
        "Trovão",
        "Ar",
        "Gelo",
        "Ilusão",
        "Luz",
        "Trevas",
        "Natureza",
        "Espirito",
        "Vazio",
        "Imaterial",
        "Cristal",
        "Ethereal",
        "Espectral",
        "Corrupção/Corrompido",
      ])})`,
    },
    {
      "Dano Físico": `${escalarTipoDano(
        getRandomInt(3, 9),
        nivel
      )} (${getRandomElement(["perfurar", "contusão", "corte"])})`,
    },
    { "Roubo de Vida": `${getRandomInt(2, 4)}%` },
    { Poder: getRandomInt(2, 8) },
    { FOR: 1 },
    { DES: 1 },
    { CON: 1 },
    { INT: 1 },
    { SAB: 1 },
    { CAR: 1 },
    { Letalidade: getRandomInt(1, 5) },
  ];
  return getRandomElement(atributos);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}