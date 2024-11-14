const pessoa = {
    nome: 'Zory',
    sobrenome: 'Sakurakai',
    idade: 25,
    arma: 'Katanas'
};

for (let detalhes in pessoa) {
    console.log(detalhes,'-', pessoa[detalhes])
}

