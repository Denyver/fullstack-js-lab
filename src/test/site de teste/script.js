function mostrarMensagem() {
    let textarea = document.querySelector('#testInput').value
    alert('você digitou ' + textarea);
}

function inserirMensagem() {
    let contentSection = document.querySelector('.content-section').innerHTML = "<p>Expedita et necessitatibus exercitationem fugiat earum. Impedit vero earum molestias molestiae vel itaque pariatur animi dolor quas exercitationem dolore, ab tempora? Nihil!</p>"
}

function adicionarItem() {
    const novoItem = document.createElement("li");
    novoItem.textContent = "Item adicionado com JavaScript";
    document.getElementById("lista").appendChild(novoItem);
}

const contentSection = document.querySelector('.content-section');
let ps = document.querySelectorAll('p');

let styleBody = getComputedStyle(document.body);
let backgroundColorStyle = styleBody.backgroundColor;
console.log(backgroundColorStyle);


for (let p of ps) {
    p.style.backgroundColor = backgroundColorStyle;
    p.style.color = '#000'
}