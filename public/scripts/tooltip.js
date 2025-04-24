const habilidades = [
    {
        "id": "re1",
        "nome_re": "Força Bruta",
        "descricao": "Aumenta a força física do usuário em situações críticas. Pode ser usada em combate ou para levantar objetos pesados.",
        "duracao": "10 minutos",
        "modificador": "+2 em testes de força",
        "requisito": "Força 12+"
    },
    {
        "id": "re2",
        "nome_re": "Agilidade Felina",
        "descricao": "Proporciona reflexos rápidos e movimentos ágeis. Ideal para esquivas e acrobacias.",
        "duracao": "5 minutos",
        "modificador": "+3 em testes de destreza",
        "requisito": "Destreza 14+"
    },
    {
        "id": "re3",
        "nome_re": "Sabedoria Ancestral",
        "descricao": "Concede conhecimento de técnicas antigas e esquecidas. Permite decifrar linguagens arcaicas e entender símbolos misteriosos.",
        "duracao": "1 hora",
        "modificador": "+1 em testes de inteligência e sabedoria",
        "requisito": "Inteligência 10+"
    }
];



// Função para ajustar a posição do tooltip
function ajustarPosicaoTooltip(tooltip, elemento) {
    const originalVisibility = tooltip.style.visibility;
    const originalDisplay = tooltip.style.display;
    const originalOpacity = tooltip.style.opacity;

    tooltip.style.visibility = "hidden";
    tooltip.style.display = "block";
    tooltip.style.opacity = 0;

    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;
    const elementoRect = elemento.getBoundingClientRect()

    tooltip.style.visibility = originalVisibility;
    tooltip.style.display = originalDisplay;
    tooltip.style.opacity = originalOpacity;

    // Posição padrão (acima do elemento)
    let top = elementoRect.top - tooltipHeight - 10;
    let left = elementoRect.left + (elementoRect.width / 2) - (tooltipWidth / 2);
    
    // Verifica se o tooltip sai pela parte inferior da tela

    if (top < 0) { 
        top = elementoRect.bottom + 10; // Coloca abaixo do elemento 
    }
    
    // Verifica se o tooltip sai pela esquerda da tela
    if (left < 0) {
        left = 10;
    }
    
    // Aplica as posições calculadas
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
}

// Função para criar tooltips
function criarTooltips() {
    // Seleciona todos os elementos com a classe tooltip-container
    const elementos = document.querySelectorAll('.tooltip-container');
    
    elementos.forEach(elemento => {
        const id = elemento.id;
        
        // Encontra a habilidade correspondente no array
        const habilidade = habilidades.find(item => item.id === id);
        
        if (habilidade) {
            // Cria o conteúdo do tooltip
            const tooltipContent = document.createElement('div');
            tooltipContent.className = 'tooltip-content';
            tooltipContent.innerHTML = `
                <h3>${habilidade.nome_re}</h3>
                <p><strong>Descrição:</strong> ${habilidade.descricao}</p>
                <hr>
                <p><strong>Duração:</strong> ${habilidade.duracao}</p>
                <p><strong>Modificador:</strong> ${habilidade.modificador}</p>
                <p><strong>Requisito:</strong> ${habilidade.requisito}</p>
            `;
            
            // Adiciona o tooltip ao elemento
            elemento.appendChild(tooltipContent);
            
            // Ajusta a posição quando o mouse entra no elemento
            elemento.addEventListener('mouseenter', () => {
                ajustarPosicaoTooltip(tooltipContent, elemento);
            });
            
            // Também ajusta quando a janela é redimensionada
            window.addEventListener('resize', () => {
                if (getComputedStyle(tooltipContent).visibility === 'visible') {
                    ajustarPosicaoTooltip(tooltipContent, elemento);
                }
            });
        }
    });
}

// Chama a função quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', criarTooltips);