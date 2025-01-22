var escolas_aprendidas = [];
var limite_escolas = 1;


class Enemy {

    constructor(name, baseVida, nivel, tier, forca, destreza, constituicao, inteligencia, sabedoria, carisma, arma, armadura, aleatorio, tank_type, escolas) {
        this.name = name;
        this.baseVida = baseVida;
        this.nivel = parseInt(nivel);
        this.tier = tier;
        this.proficiencia = this.setProficiencia();
        this.forca = parseInt(forca);
        this.destreza = parseInt(destreza);
        this.constituicao = parseInt(constituicao);
        this.inteligencia = parseInt(inteligencia);
        this.sabedoria = parseInt(sabedoria);
        this.carisma = parseInt(carisma);
        if (aleatorio == true) {
            this.randomAtributes();
        }
        this.tank = tank_type;
        this.difficult = this.updateAtributes(tier);
        this.arma = this.myWeapon(arma);
        this.mods = this.setModificadores();
        this.vidaMaxima = Math.ceil(this.updateVidaMaxima());
        this.manaMaxima = Math.ceil(this.gerarMana());
        this.armadura = armadura;
        this.Ca = this.gerarCA();
        this.dano = this.generalAttack()[1];
        this.ataque = this.generalAttack()[0];
        this.skills = [];
        this.schools = escolas;

    }

    updateVidaMaxima() {
        let vida = (this.baseVida + (this.gerarModificador(this.constituicao) * this.nivel)) * this.getTierLifeBonus() + this.generateDice(8);
        if (this.nivel >= 13) {
            vida = vida * 1.25;
        }
        if (this.nivel >= 17 && this.tank) {
            vida = vida * 1.35;
        }
        if (this.nivel >= 18) {
            vida = vida + 100;
        }
        if (this.nivel == 20) {
            vida = vida * 6;
        }
        return vida;
    }

    generateDice(dado) {
        let dice = 0;
        for (let i = 0; i <= this.nivel - 1; i++) {
            dice += Math.random() * dado + 1;
        }

        return dice;
    }

    generateDiceValue() {
        let atribute = Math.floor(Math.random() * 9 + 10);
        return atribute;

    }

    getTierLifeBonus() {
        if (this.tier == "Normal") {
            return 1;
        } else if (this.tier == "Elite") {
            return 8;
        } else if (this.tier == "Boss") {
            return 16;
        }
    }

    gerarModificador(atributo) {
        let modificador = atributo / 2 - 5;
        return Math.floor(modificador);
    }

    getModificadores() {
        return this.mods;
    }

    gerarMana() {
        let dadoBase = Math.random() * 6 + 1
        let mana = Number((this.gerarModificador(this.inteligencia) + 1) * this.nivel + dadoBase + 6);
        if (this.tier == 'Elite') {
            mana *= 2;
        } else if (this.tier == 'Boss') {
            mana *= 4;
        }
        return mana;
    }

    gerarCA() {
        let armadura = this.armadura + this.gerarModificador(this.destreza) + 10;
        if (this.tier == 'Elite') {
            armadura += 5;
        } else if (this.tier == 'Boss') {
            armadura += 10;
        }
        return Math.floor(armadura);
    }

    setModificadores() {
        let modificadores = [];
        modificadores.push(this.gerarModificador(this.forca));
        modificadores.push(this.gerarModificador(this.destreza));
        modificadores.push(this.gerarModificador(this.constituicao));
        modificadores.push(this.gerarModificador(this.inteligencia));
        modificadores.push(this.gerarModificador(this.sabedoria));
        modificadores.push(this.gerarModificador(this.carisma));

        return modificadores;
    }

    myWeapon(arma) {
        if (arma == 0) {
            this.arma = this.randomWeapon();
        } else {
            this.arma = arma;
        }
        return arma;
    }

    randomWeapon() {
        let armas = ["Adaga", "Arco", "Besta", "Firegun", "Espada", "Espadão", "Machado", "Machadão", "Foice", "Orbe", "Cajado", "Dual", "Lança", "Swallow", "Haloblade", "Katana", "Estilingue", "Soqueira", "Martelo", "Sem Arma", "Bordão","FORÇA","DESTREZA","CONSTITUIÇÃO","INTELIGÊNCIA","SABEDORIA","CARISMA","Alabarda","Chainblade","Maça"];
        let value = Math.random(armas.length - 1);
        let arma = armas[value];
        return arma;
    }

    generateEnemy() {
        let monster =
        {
            "nome": this.name,
            "nivel": this.nivel,
            "tier": this.tier,
            "proficiencia": this.proficiencia,
            "vida": this.vidaMaxima,
            "mana": this.manaMaxima,
            "forca": this.forca,
            "destreza": this.destreza,
            "constituicao": this.constituicao,
            "inteligencia": this.inteligencia,
            "sabedoria": this.sabedoria,
            "carisma": this.carisma,
            "modificadores": this.mods,
            "arma": this.arma,
            "ataque": this.ataque,
            "ca": this.ca,
            "dano": {},
            "habilidades": []
        }

        return monster;
    }

    generalAttack() {
        let weaponType = this.weaponAttackAndDMG();
        let tier = this.tier;
        let result = String(Math.floor(this.nivel / 4)) + weaponType;
        if (tier == 'Elite') {
            weaponType[0] = weaponType[0] + "+5";
            result = weaponType;
        } else if (tier == 'Boss') {
            if (this.nivel >= 20) {
                weaponType[1] = "2x(" + weaponType[1] + ")";
            }
            weaponType[0] = weaponType[0] + "+"+String(this.nivel);
            result = weaponType;
        } else if (tier == 'Normal') {
            result = weaponType;
        }
        return result;
    }

    allWeapons() {
        let armas = ["Adaga", "Arco", "Besta", "Firegun", "Espada", "Espadão", "Machado", "Machadão", "Foice", "Orbe", "Cajado", "Dual", "Lança", "Swallow", "Haloblade", "Katana", "Estilingue", "Soqueira", "Martelo", "Sem Arma", "Bordão","FORÇA","DESTREZA","CONSTITUIÇÃO","INTELIGÊNCIA","SABEDORIA","CARISMA","Alabarda","Chainblade","Maça"]
        return armas;
    }


    weaponAttackAndDMG() {
        let armas = this.allWeapons();
        let myWeapon = String(this.arma);
        let arma = '';
        let attack = '';
        if (myWeapon == armas[0]) {
            arma = String(this.mods[1]) + "d6+" + String(this.mods[1]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[1]) + "+" + String(this.proficiencia);
        } else if (myWeapon == armas[1]) {
            arma = String(this.mods[1]) + "d10+" + String(this.mods[1]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[1]) + "+" + String(this.proficiencia);
        } else if (myWeapon == armas[2]) {
            arma = String(this.mods[0]) + "d12+" + String(this.mods[0]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[0]) + "+" + String(this.proficiencia);
        } else if (myWeapon == armas[3]) {
            arma = String(this.mods[1]) + "d10+" + String(this.mods[1]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[1]) + "+" + String(this.proficiencia);
        } else if (myWeapon == armas[4]) {
            arma = String(this.mods[1]) + "d8+" + String(this.mods[1]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[1]) + "+" + String(this.proficiencia);
        } else if (myWeapon == armas[5]) {
            arma = String(this.mods[0]) + "d12+" + String(this.mods[0]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[0]) + "+" + String(this.proficiencia);
        } else if (myWeapon == armas[6]) {
            arma = String(this.mods[1]) + "d8+" + String(this.mods[1]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[1]) + "+" + String(this.proficiencia);
        } else if (myWeapon == armas[7]) {
            arma = String(this.mods[0]) + "d12+" + String(this.mods[0]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[0]) + "+" + String(this.proficiencia);
        } else if (myWeapon == armas[8]) {
            arma = String(this.mods[1]) + "d12+" + String(this.mods[1]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[1]) + "+" + String(this.proficiencia);
        } else if (myWeapon == armas[9]) {
            arma = String(this.mods[3]) + "d10+" + String(this.mods[3]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[3]) + "+" + String(this.proficiencia);
        } else if (myWeapon == armas[10]) {
            arma = String(this.mods[3]) + "d10+" + String(this.mods[3]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[3]) + "+" + String(this.proficiencia);
        } else if (myWeapon == armas[11]) {
            arma = String(this.mods[1]) + "d16+" + String(this.mods[1]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[1]) + "+" + String(this.proficiencia);
        } else if (myWeapon == armas[12]) {
            arma = String(this.mods[0]) + "d12+" + String(this.mods[0]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[0]) + "+" + String(this.proficiencia);
        } else if (myWeapon == armas[13]) {
            arma = String(this.mods[0]) + "d14+" + String(this.mods[0]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[0]) + "+" + String(this.proficiencia);
        } else if (myWeapon == armas[14]) {
            arma = String(this.mods[1]) + "d10+" + String(this.mods[1]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[1]) + "+" + String(this.proficiencia);
        } else if (myWeapon == armas[15]) {
            arma = String(this.mods[0]) + "d10+" + String(this.mods[0]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[0]) + "+" + String(this.proficiencia);
        } else if (myWeapon == armas[16]) {
            arma = String(this.mods[1]) + "d7+" + String(this.mods[1]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[1]) + "+" + String(this.proficiencia);
        } else if (myWeapon == armas[17]) {
            arma = String(this.mods[0]) + "d8+" + String(this.mods[0]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[0]) + "+" + String(this.proficiencia);
        } else if (myWeapon == armas[18]) {
            arma = String(this.mods[0]) + "d12+" + String(this.mods[0]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[0]) + "+" + String(this.proficiencia);
        } else if (myWeapon == armas[19]) {
            arma = String(Number(this.mods[0]) + Number(this.mods[1])) + "d4+" + String(this.mods[0]) + "+" + String(this.mods[1]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[0]) + "+" + String(this.mods[1]) + "+" + String(this.proficiencia);
        } else if (myWeapon == armas[20]) {
            arma = String(this.mods[0]) + "d10+" + String(this.mods[0]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[0]) + "+" + String(this.proficiencia);
        }else if (myWeapon == armas[21]) {
            arma = String(this.mods[0]) + "d12+" + String(this.mods[0]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[0]) + "+" + String(this.proficiencia);
        }else if (myWeapon == armas[22]) {
            arma = String(this.mods[1]) + "d6+" + String(this.mods[1]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[1]) + "+" + String(this.proficiencia);
        }else if (myWeapon == armas[23]) {
            arma = String(this.mods[2]) + "d8+" + String(this.mods[2]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[2]) + "+" + String(this.proficiencia);
        }else if (myWeapon == armas[24]) {
            arma = String(this.mods[3]) + "d14+" + String(this.mods[3]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[3]) + "+" + String(this.proficiencia);
        }else if (myWeapon == armas[25]) {
            arma = String(this.mods[4]) + "d8+" + String(this.mods[4]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[4]) + "+" + String(this.proficiencia);
        }else if (myWeapon == armas[26]) {
            arma = String(this.mods[5]) + "d10+" + String(this.mods[5]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[5]) + "+" + String(this.proficiencia);
        }else if (myWeapon == armas[27]) {
            arma = String(this.mods[0]) + "d14+" + String(this.mods[0]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[0]) + "+" + String(this.proficiencia);
        }else if (myWeapon == armas[28]) {
            arma = String(this.mods[0]) + "d12+" + String(this.mods[0]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[0]) + "+" + String(this.proficiencia);
        }else if (myWeapon == armas[29]) {
            arma = String(this.mods[0]) + "d10+" + String(this.mods[0]) + "+" + String(this.proficiencia);
            attack = "D20+" + String(this.mods[0]) + "+" + String(this.proficiencia);
        }

        let result = [attack, arma];
        return result;
    }

    updateAtributes(tier) {
        let elite = Math.floor(this.nivel / 2);
        let boss = this.nivel;
        if (tier == 'Elite') {
            this.forca += elite;
            this.destreza += elite;
            this.constituicao += elite;
            this.inteligencia += elite;
            this.sabedoria += elite;
            this.carisma += elite;
            return 'Hard';
        } else if (tier == 'Boss') {
            this.forca += boss;
            this.destreza += boss;
            this.constituicao += boss;
            this.inteligencia += boss;
            this.sabedoria += boss;
            this.carisma += boss;
            return 'Nightmare';
        }
        return 'Normal';
    }

    randomAtributes() {
        this.forca = this.generateDiceValue();
        this.destreza = this.generateDiceValue();
        this.constituicao = this.generateDiceValue();
        this.inteligencia = this.generateDiceValue();
        this.sabedoria = this.generateDiceValue();
        this.carisma = this.generateDiceValue();
    }

    setProficiencia() {
        if (this.nivel < 4) {
            return 1;
        } else {
            return Math.floor(this.nivel / 2);
        }
    }


}


function gerar_inimigo() {
    let nome = document.getElementById('nome').value;
    let baseVida = Number(document.getElementById('vida_base').value);
    let nivel = document.getElementById('nivel').value;


    alert_message = [];

    if (nome == "") {
        alert_message += 'Nome está vazio\n';
    }
    if (baseVida < 10) {
        alert_message += 'Vida Base inferior ao mininmo (10).\n';
    }
    if (nivel < 1 & nivel > 20) {
        alert_message += 'Nível fora do intervalo (1-20).\n';
    }

    if (alert_message.length > 0) {
        window.alert(alert_message);
    } else {
        createEnemy();
    }
}

function createEnemy() {

    let card_char = document.getElementById('card_char');

    let nome = document.getElementById('nome').value;
    let baseVida = Number(document.getElementById('vida_base').value);
    let nivel = document.getElementById('nivel').value;
    let selected_tier = document.getElementById('tier');
    let tier = selected_tier.options[selected_tier.selectedIndex].text;
    let armadura = Number(document.getElementById('armadura').value);
    let selected_arma = document.getElementById('arma');
    let arma = selected_arma.options[selected_arma.selectedIndex].value;
    let forca = Number(document.getElementById('for').value);
    let destreza = Number(document.getElementById('des').value)
    let constituicao = Number(document.getElementById('con').value)
    let inteligencia = Number(document.getElementById('int').value)
    let sabedoria = Number(document.getElementById('sab').value)
    let carisma = Number(document.getElementById('car').value)
    let aleatorio = document.getElementById('aleatorio')
    let tank = document.getElementById('tank_type')

    let enemy;


    if (aleatorio.checked) {
        if (nivel >= 17 && tank.checked) {
            enemy = new Enemy(nome, baseVida, nivel, tier, forca, destreza, constituicao, inteligencia, sabedoria, carisma, arma, armadura, true, true, escolas_aprendidas);
        } else {
            enemy = new Enemy(nome, baseVida, nivel, tier, forca, destreza, constituicao, inteligencia, sabedoria, carisma, arma, armadura, true, false, escolas_aprendidas);
        }

    } else {
        if (nivel >= 17 && tank.checked) {
            enemy = new Enemy(nome, baseVida, nivel, tier, forca, destreza, constituicao, inteligencia, sabedoria, carisma, arma, armadura, false, true, escolas_aprendidas);
        } else {
            enemy = new Enemy(nome, baseVida, nivel, tier, forca, destreza, constituicao, inteligencia, sabedoria, carisma, arma, armadura, false, false, escolas_aprendidas);
        }
    }


    setAtributes(enemy);

    go_to_exibirEnemy();

    make_char_card(card_char)

    console.log(enemy);
}

function go_to_exibirEnemy() {
    let displayScreen = document.getElementById('bloco2');
    let hidScreen = document.getElementById('bloco1');
    displayScreen.style.display = 'contents';
    hidScreen.style.display = 'none';
}

function go_to_create_enemy() {
    let displayScreen = document.getElementById('bloco1');
    let hidScreen = document.getElementById('bloco2');
    displayScreen.style.display = 'content';
    hidScreen.style.display = 'none';
}

function reloadPage() {
    location.reload()
}

function readable_mod(value) {
    if (value >= 0) {
        return String("+" + value);
    }
    return String(value);
}

function setTierTag(enemy) {
   
    var tierTag = document.createElement('boss');
    if (enemy.tier == 'Boss') {
        var tierTag = document.createElement('boss');
        return tierTag;
    } else if (enemy.tier == "Elite") {
        var tierTag = document.createElement('elite');
        return tierTag;
    } else {
        var tierTag = document.createElement('normal');
        return tierTag;
    }
}

function setAtributes(enemy) {
    let forca = document.getElementById('e_forca');
    let destreza = document.getElementById('e_destreza');
    let constituicao = document.getElementById('e_constituicao');
    let inteligencia = document.getElementById('e_inteligencia');
    let sabedoria = document.getElementById('e_sabedoria');
    let carisma = document.getElementById('e_carisma');

    let mod_for = document.getElementById('mod_for');
    let mod_des = document.getElementById('mod_des');
    let mod_con = document.getElementById('mod_con');
    let mod_int = document.getElementById('mod_int');
    let mod_sab = document.getElementById('mod_sab');
    let mod_car = document.getElementById('mod_car');

    let name = document.getElementById('char_name');
    let nivel = document.getElementById('char_lvl');
    let tier = document.getElementById('char_tier');
    let vida = document.getElementById('char_vida');
    let mana = document.getElementById('char_mana');
    let ca = document.getElementById('char_ca');
    let arma = document.getElementById('char_arma');
    let ataque = document.getElementById('char_ataque');
    let dano = document.getElementById('char_dano');
    let armadura = document.getElementById('char_armadura');

    forca.innerHTML = enemy.forca;
    mod_for.innerHTML = readable_mod(enemy.mods[0]);
    destreza.innerHTML = enemy.destreza;
    mod_des.innerHTML = readable_mod(enemy.mods[1]);
    constituicao.innerHTML = enemy.constituicao;
    mod_con.innerHTML = readable_mod(enemy.mods[2]);
    inteligencia.innerHTML = enemy.inteligencia;
    mod_int.innerHTML = readable_mod(enemy.mods[3]);
    sabedoria.innerHTML = enemy.sabedoria;
    mod_sab.innerHTML = readable_mod(enemy.mods[4]);
    carisma.innerHTML = enemy.carisma;
    mod_car.innerHTML = readable_mod(enemy.mods[5]);
    
    name.innerHTML = enemy.name;
    nivel.innerHTML = enemy.nivel;
    tier.appendChild(setTierTag(enemy));
    vida.innerHTML = enemy.vidaMaxima;
    mana.innerHTML = enemy.manaMaxima;
    ca.innerHTML = enemy.Ca;
    arma.innerHTML = enemy.arma;
    ataque.innerHTML = enemy.ataque;
    dano.innerHTML = enemy.dano;
    armadura.innerHTML = enemy.armadura;
    set_schools(enemy.schools);

}

function set_schools(escolas) {
    for (let i = 0; i < escolas.length; i++) {
        let myschools = document.getElementById('myschools');
        let school_element = document.createElement('p');
        school_element.id = escolas.escola;
        school_element.className = 'singleSchool';
        let escolas_elementais = ['Oceano', 'Trovão', 'Natureza', 'Luxuria', 'Festiva', 'Dureza', 'Glacial', 'Solar', 'Lunar', 'Morte', 'Destruição', 'Vazio'];
        let isRank = false;
        for (let f = 0; f < escolas_elementais.length; f++) {
            if (escolas[i].escola == escolas_elementais[f]) {
                isRank = true;
            }
        }
        if (isRank) {
            school_element.innerHTML = escolas[i].escola + " " + numero_romano(escolas[i].rank);
        } else {
            school_element.innerHTML = escolas[i].escola;
        }
        myschools.appendChild(school_element);
    }
}


function checkNivel() {
    let tank_type = document.getElementById('tank_type');
    let nivel = document.getElementById('nivel').value;
    let tank_label = document.getElementById('tank_type_label');

    fator_escolas = sum_of_ranks();

    if (nivel >= 5) {
        limite_escolas = normalize_limit(2 - fator_escolas);
    }
    if (nivel >= 10) {
        limite_escolas = normalize_limit(3 - fator_escolas);
    }
    if (nivel >= 15) {
        limite_escolas = normalize_limit(4 - fator_escolas);
    }
    if (nivel >= 20) {
        limite_escolas = normalize_limit(5 - fator_escolas);
    }
    if (nivel >= 17) {
        tank_type.disabled = false;
        tank_label.style.display = "block";

    } else {
        tank_type.disabled = true;
        tank_label.style.display = "none";
        tank_type.checked = false;
    }
    set_pc();
}

function show_rank() {
    let selected_school = document.getElementById('schools');
    let escola = selected_school.options[selected_school.selectedIndex].value;

    let rank = document.getElementById('rank');

    let escolas_elementais = ['Oceano', 'Trovão', 'Natureza', 'Luxuria', 'Festiva', 'Dureza', 'Glacial', 'Solar', 'Lunar', 'Morte', 'Destruição', 'Vazio'];
    let isRank = false;
    for (let i = 0; i < escolas_elementais.length; i++) {
        if (escola == escolas_elementais[i]) {
            isRank = true;
        }
    }
    if (isRank) {
        rank.style.display = "block";
    } else {
        rank.style.display = "none";
    }

}

function list_schools() {
    let selected_school = document.getElementById('schools');
    let escola = selected_school.options[selected_school.selectedIndex].value;
    let rank = document.getElementById('rank').value;


    if (limite_escolas > 0 & escola != "none") {

        let escolas_elementais = ['Oceano', 'Trovão', 'Natureza', 'Luxuria', 'Festiva', 'Dureza', 'Glacial', 'Solar', 'Lunar', 'Morte', 'Destruição', 'Vazio'];
        let isRank = false;
        for (let i = 0; i < escolas_elementais.length; i++) {
            if (escola == escolas_elementais[i]) {
                isRank = true;
            }
        }
        if (isRank) {
            if (!not_repeat_school(escola)) {
                console.log(rank + " " + limite_escolas);
                if (rank <= limite_escolas) {
                    //let item = escola + ", " + String(numero_romano(rank));
                    let item = { "escola": escola, "rank": rank }
                    escolas_aprendidas.push(item)
                    school_print(item);
                    limite_escolas = limite_escolas - rank;
                }

            }

        } else {
            if (!not_repeat_school(escola)) {
                let item = { "escola": escola, "rank": 1 }
                escolas_aprendidas.push(item)
                school_print(item);
                limite_escolas = limite_escolas - 1;
                console.log(limite_escolas);
            }
        }
    }
    set_pc();

}

function not_repeat_school(school) {

    for (let i = 0; i < escolas_aprendidas.length; i++) {
        elemento = escolas_aprendidas[i].escola;
        if (elemento == school) {
            return true
        }
    }
}

function set_pc() {
    pontos_de_conhecimento = document.getElementById('ponto_conhecimento');
    pontos_de_conhecimento.innerHTML = limite_escolas;
}

function pop_school(escola) {
    for (let i = 0; i < escolas_aprendidas.length; i++) {
        if (escola.escola == escolas_aprendidas[i].escola) {
            escolas_aprendidas.pop()
        }
    }
}

function school_print(escola) {
    let lista_escolas = document.getElementById('escolas_add');
    let school_element = document.createElement('p');
    limite = escolas_aprendidas.length;

    school_element.id = escola.escola;
    school_element.className = 'schoolItem';
    school_element.title = 'Clickar na escola adicionada ira remove-la.'
    school_element.addEventListener('click', function () {
        alertify.confirm('ATENÇÃO', 'Se deseja remover a escola [' + escola.escola + '] confirme abaixo.', function () {
            elemento = document.getElementById(escola.escola);
            console.log(escolas_aprendidas)
            limite_escolas = limite_escolas + Number(escola.rank);

            pop_school(escola);

            set_pc();
            elemento.parentNode.removeChild(elemento);
            console.log(escolas_aprendidas);
            alertify.success('Escola [' + escola.escola + '] removida!')
        }
            , function () { alertify.error('Cancelado!') });
    });
    school_element.innerHTML = escola.escola + " " + escola.rank;
    lista_escolas.appendChild(school_element);
}

function numero_romano(valor) {
    if (valor == 1) {
        return "I";
    } else if (valor == 2) {
        return "II";
    } else if (valor == 3) {
        return "III";
    } else if (valor == 4) {
        return "IV";
    } else if (valor == 5) {
        return "Arconte";
    }
}

function sum_of_ranks() {
    let soma = 0;
    console.log("Tamanho do vetor", escolas_aprendidas)
    console.log("Antes do if " + soma);
    for (let i = 0; i < escolas_aprendidas.length; i++) {
        soma += Number(escolas_aprendidas[i].rank);
        console.log("Dentro do For " + soma);

    }

    return soma;
}

function normalize_limit(valor) {
    if (valor < 0) {
        return 0;
    }
    return valor;
}

function make_char_card(elemento) {
    elemento.addEventListener('click', function () {
        alertify.confirm('Salvar Card', 'Deseja salvar o item como PNG.', function () {
            var scale = 1.15;

            html2canvas(elemento, { 
                scale: scale,
                useCORS: true 
            }).then(function(canvas) {
                var img = canvas.toDataURL("image/png");
                var link = document.createElement('a');
                link.href = img;
                link.download = 'elemento_imagem.png';
                link.click();
            }).catch(function(error) {
                console.error("Erro ao capturar o elemento:", error);
            });
        }, function () { 
            alertify.error('Cancelado!'); 
        });
    });
}