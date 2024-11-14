const pessoa = {
    nome: 'Denyver',
    sobrenome: 'Francisco',
    idade: 22,
    endereco: {
        rua: 'Rua Glauber Rocha',
        numero: 175,
        apartamento: 103
    }
};

//Atribuição via desestruturação
// Desse jeito vc ta pegando uma variavel de pessoa e jogando em outra com o mesmo nome da variável
// const {nome,idade,sobrenome} =  pessoa;
// console.log(nome, sobrenome)


// Seria mais adequado se pegasse essa variavel e ja alterar pra outro nome de variável, exemplo desse jeito

const { nome: testeNome = '', 
    sobrenome: testeSobrenome = '', 
    ...resto} = pessoa;
    
console.log(testeNome,testeSobrenome, resto); 