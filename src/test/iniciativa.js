// Função para gerar um valor aleatório de 1 a 20
function rollDice() {
    return Math.floor(Math.random() * 20) + 1;
}

// Array de personagens
const characters = [
    { name: 'Personagem 1', roll: 0 },
    { name: 'Personagem 2', roll: 0 },
    { name: 'Personagem 3', roll: 0 },
    { name: 'Personagem 4', roll: 0 }
];

// Cada personagem lança o dado
characters.forEach(character => {
    character.roll = rollDice();
});

// Classifica os personagens de acordo com o valor do dado (do maior para o menor)
characters.sort((a, b) => b.roll - a.roll);

// Exibe o ranking dos personagens
console.log("Ranking dos Personagens:");
characters.forEach((character, index) => {
    console.log(`${index + 1}º lugar: ${character.name} - Valor do dado: ${character.roll}`);
});
