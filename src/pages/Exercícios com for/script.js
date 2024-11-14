const elementos = [
{tag: 'p', texto: "Frase que seria escrita com ' p '"},
{tag: 'div', texto: "Frase que seria escrita com ' div '"},
{tag: 'footer', texto: "Frase que seria escrita com ' footer '"},
{tag: 'section', texto: "Frase que seria escrita com ' section '"}
]

const container = document.querySelector('.container');
const div = document.createElement('div');

for (let i = 0; i < elementos.length; i++) {
    let { tag, texto } = elementos[i]
    let tagCriada = document.createElement('p');
    tagCriada.innerText = texto;
    div.appendChild(tagCriada);
}

container.appendChild(div)