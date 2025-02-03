function updateQuantity(taskId, change) {
    let quantitySpan = document.getElementById(taskId + "Quantity");
    let pointsSpan = document.getElementById(taskId + "Points");
    let progressSpan = document.getElementById(taskId + "Value");

    let quantity = parseInt(quantitySpan.innerText) + change;
    if (quantity < 0) quantity = 0;

    let maxPoints = 500;
    let progress = Math.round((quantity / maxPoints) * 100);

    quantitySpan.innerText = quantity;
    pointsSpan.innerText = quantity;
    progressSpan.innerText = progress + "%";

    checkCompletion(); // Verifica se todas as tarefas chegaram a 100%
}

// Lista de monstros (IDs usados no HTML)
const monsters = [
    "gosmas", "brutoDasSombras", "morcego", "esqueleto", "inseto",
    "cavador", "espiritoDaPoeira", "caranguejoPedra", "mumia",
    "pimentaRex", "serpente", "espiritoDeMagma"
];

// Verifica se todas as porcentagens chegaram a 100%
function checkCompletion() {
    let allComplete = monsters.every(monster => {
        let progressSpan = document.getElementById(monster + "Value");
        return progressSpan.innerText === "100%";
    });

    if (allComplete) {
        showConfetti();
    }
}

// Função para exibir confetes
function showConfetti() {
    let confettiCanvas = document.createElement("canvas");
    confettiCanvas.id = "confettiCanvas";
    confettiCanvas.style.position = "fixed";
    confettiCanvas.style.top = "0";
    confettiCanvas.style.left = "0";
    confettiCanvas.style.width = "100%";
    confettiCanvas.style.height = "100%";
    confettiCanvas.style.pointerEvents = "none"; // Não atrapalhar cliques

    document.body.appendChild(confettiCanvas);

    let confettiScript = document.createElement("script");
    confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.3.2";
    confettiScript.onload = () => {
        let canvas = document.getElementById("confettiCanvas");
        let myConfetti = confetti.create(canvas, { resize: true });

        myConfetti({
            particleCount: 500,
            spread: 100,
            startVelocity: 40,
            gravity: 0.5,
            origin: { y: 0.6 }
        });

        setTimeout(() => {
            document.body.removeChild(confettiCanvas);
        }, 5000); // Remove os confetes após 5 segundos
    };

    document.body.appendChild(confettiScript);
}
// Função chamada sempre que o usuário clica no botão de ↑ ou ↓
function updateQuantity(monster, change) {
    // Obtendo o valor atual dos pontos e o máximo possível para cada monstro
    let pointsElement = document.getElementById(monster + 'Points');
    let quantityElement = document.getElementById(monster + 'Quantity');
    let valueElement = document.getElementById(monster + 'Value');

    // Obtendo o número de pontos atual
    let points = parseInt(pointsElement.textContent);
    points += change;

    // Evitar valores negativos
    if (points < 0) points = 0;

    // Atualizando o valor dos pontos
    pointsElement.textContent = points;
    quantityElement.textContent = points;

    // Calcular o progresso (como porcentagem)
    let maxPoints = getMaxPoints(monster);
    let progress = (points / maxPoints) * 100;
    valueElement.textContent = progress.toFixed(2) + '%';

    // Salvando no localStorage
    localStorage.setItem(monster + 'Points', points);
    localStorage.setItem(monster + 'Quantity', points);
    localStorage.setItem(monster + 'Progress', progress.toFixed(2));
}

// Função para carregar o progresso quando a página for carregada
window.onload = function() {
    // Carregar os dados de todos os monstros
    loadProgress('gosmas');
    loadProgress('brutoDasSombras');
    loadProgress('morcego');
    loadProgress('esqueleto');
    loadProgress('inseto');
    loadProgress('cavador');
    loadProgress('espiritoDaPoeira');
    loadProgress('caranguejoPedra');
    loadProgress('mumia');
    loadProgress('pimentaRex');
    loadProgress('serpente');
    loadProgress('espiritoDeMagma');
};

// Função para carregar os dados salvos do localStorage
function loadProgress(monster) {
    let points = localStorage.getItem(monster + 'Points');
    let progress = localStorage.getItem(monster + 'Progress');

    if (points !== null) {
        // Se o progresso foi encontrado no localStorage, atualiza os elementos HTML
        document.getElementById(monster + 'Points').textContent = points;
        document.getElementById(monster + 'Quantity').textContent = points;
        document.getElementById(monster + 'Value').textContent = progress + '%';
    }
}

// Função para obter o número máximo de pontos para cada monstro
function getMaxPoints(monster) {
    const maxPoints = {
        gosmas: 1000,
        brutoDasSombras: 150,
        morcego: 200,
        esqueleto: 50,
        inseto: 125,
        cavador: 30,
        espiritoDaPoeira: 500,
        caranguejoPedra: 60,
        mumia: 100,
        pimentaRex: 50,
        serpente: 250,
        espiritoDeMagma: 150
    };
    return maxPoints[monster] || 0; // Se não encontrar, retorna 0 (pode ser ajustado conforme necessário)
}
