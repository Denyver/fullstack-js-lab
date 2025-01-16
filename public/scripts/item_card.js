function salvarDivComoPNG() {
    //card = document.getElementById('weapon_card');
    card.addEventListener('click', function () {
      alertify.confirm('Salvar Card', 'Deseja salvar o item como PNG.', function () {
        var div = document.getElementById("weapon_card");
        var scale = 1.25; // Aumentar a escala por 2 (pode ajustar conforme necessário)
      
        // Definir a largura e a altura da div com base na escala
        div.style.width = div.offsetWidth * scale + "px";
        div.style.height = div.offsetHeight * scale + "px";
      
        html2canvas(div, { scale: scale }).then(function(canvas) {
          var img = canvas.toDataURL("image/png");
          var link = document.createElement('a');
          link.href = img;
          link.download = 'div_imagem.png';
          link.click();
      
          // Redefinir a largura e a altura da div para o valor original
          div.style.width = "";
          div.style.height = "";
        });
      }
          , function () { alertify.error('Cancelado!') });
  });
  }
  
  function get_json_file(url) {
    const resp = []
    fetch(url)
    .then(response => response.json())
    .then(data => {
      // Aqui você tem acesso aos dados do arquivo JSON
      // e pode armazená-los em um vetor ou realizar qualquer outra operação desejada.
      const vetor = data; // supondo que o arquivo JSON seja um vetor
      console.log(vetor);
      return vetor;
    })
    .catch(error => {
      console.error('Ocorreu um erro ao carregar o arquivo JSON:', error);
    });
  
  }
  
  function testeFunction() {
    let path1 = "..\\data\\armas.json";
    let response = get_json_file(path1);
    let path2 = "..\\data\\raridade.json";
    let response2 = get_json_file(path2);
    console.log(response);
    console.log(response2);
    numeros_drops();
    gen_card_on_html()
  }
  
  function numeros_drops() {
    const vetor = [];
  
  // Definindo as proporções dos números
  const proportions = [
    { number: 1, percentage: 40 },
    { number: 2, percentage: 30 },
    { number: 3, percentage: 20 },
    { number: 4, percentage: 7.5 },
    { number: 5, percentage: 2 },
    { number: 6, percentage: 0.5 }
  ];
  
  // Calculando a quantidade de ocorrências de cada número
  const totalPositions = 500;
  proportions.forEach(item => {
    item.count = Math.floor((item.percentage / 100) * totalPositions);
  });
  
  // Preenchendo o vetor com os números nas proporções especificadas
  proportions.forEach(item => {
    for (let i = 0; i < item.count; i++) {
      vetor.push(item.number);
    }
  });
  
  // Embaralhando o vetor para distribuir aleatoriamente os números
  for (let i = vetor.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [vetor[i], vetor[j]] = [vetor[j], vetor[i]];
  }
  
    console.log(vetor);
    return vetor;
  }
  
  
  function weapon_json(item) {
    weapon = {
      "name": name,
      "rarity": raridade,
      "damage": dano,
      "wp_type": wp_type,
      "bonus":[]
    }
  }
  
  function weapon_card_mock() {
    let weapon = "<div class='weapon_card' id='weapon_card'>"+
    "<p class='item_title'>Severum</p>"+
    "<p class='icons'><lendario title='Raridade da arma'></lendario><espada title='Tipo da arma'></espada></p>"+
    "<p><dano title='Dano da arma'>D8</dano></p>"+
   " <div class='bonus' title='Bonus da arma, add-on'>"+
        "<p class='bonus_status'><mana></mana><plus></plus><numero>15</numero></p>"+
        "<p class='bonus_status'><atk></atk><plus></plus><numero>1</numero></p>"+
        "<p class='bonus_status'><letal></letal><plus></plus><numero>8</numero></p>"+
    "</div>"+
  "</div>"
    return weapon;
  }
  
  function mount_card(item) {
    
  }
  
  function gen_card_on_html() {
    item_conteiner = document.getElementById('drops');
    weapon_card_item = document.createElement('div');
  
  
  
    weapon_card_item.id = "Sword";
    weapon_card_item.className = 'weapon_card';
  
    weapon_card_item.addEventListener('click', function () {
      alertify.confirm('Salvar Card', 'Deseja salvar o item como PNG.', function () {
        var div = document.getElementById("weapon_card");
        var scale = 1.25; // Aumentar a escala por 2 (pode ajustar conforme necessário)
      
        // Definir a largura e a altura da div com base na escala
        div.style.width = div.offsetWidth * scale + "px";
        div.style.height = div.offsetHeight * scale + "px";
      
        html2canvas(div, { scale: scale }).then(function(canvas) {
          var img = canvas.toDataURL("image/png");
          var link = document.createElement('a');
          link.href = img;
          link.download = 'div_imagem.png';
          link.click();
      
          // Redefinir a largura e a altura da div para o valor original
          div.style.width = "";
          div.style.height = "";
        });
      }
          , function () { alertify.error('Cancelado!') });
    });
    
    item_conteiner.innerHTML = weapon_card_mock();
  
  }