function rollDice() {
  let diceInput = document.getElementById("dice").value;
  let parts = diceInput.split("d");
  let modifier = 0;

  if (parts.length === 2) {
    let diceParts = parts[0].trim();
    let sidesParts = parts[1].split("+");
    let sides = parseInt(sidesParts[0].trim());

    if (sidesParts[1]) {
      modifier = parseInt(sidesParts[1].trim());
    }

    let rolls = parseInt(diceParts);
    let result = [];
    let total = 0;

    for (let i = 0; i < rolls; i++) {
      let rollResult = Math.floor(Math.random() * sides) + 1;
      result.push(rollResult);
      total += rollResult;
    }

    let finalResult = total + modifier;

    let detailedResult = "Resultado: " + result.join(", ") + "\n";
    detailedResult += "Soma dos dados: " + total + "\n";
    detailedResult += "Modificador: " + modifier + "\n";
    detailedResult += "Resultado final: " + finalResult;

    document.getElementById("dice-result").innerText = detailedResult;
  } else {
    document.getElementById("dice-result").innerText =
      "Formato inválido. Use como 1d20, 2d6 ou 2d20+15.";
  }
}

document
  .getElementById("calculate-damage")
  .addEventListener("click", function () {
    let damage = parseFloat(document.getElementById("damage").value);
    let percentagesInput = document.getElementById("percentages").value;
    let criticalInput = parseFloat(
      document.getElementById("critical").value
    );

    if (isNaN(damage) || damage <= 0) {
      alert("Por favor, insira um valor válido para o dano base.");
      return;
    }

    if (isNaN(criticalInput) || criticalInput <= 0) {
      alert(
        "Por favor, insira um número válido para o multiplicador de crítico."
      );
      return;
    }

    let percentages = percentagesInput
      .split(",")
      .map((p) => parseInt(p.trim()))
      .filter((p) => !isNaN(p));
    let totalPercentage = percentages.reduce((acc, val) => acc + val, 0);

    let totalDamage =
      damage * (1 + totalPercentage / 100) * criticalInput;
    document.getElementById("damage-result").innerText =
      "Dano Final: " + totalDamage.toFixed(2);
  });

document
  .getElementById("set-max-life")
  .addEventListener("click", function () {
    maxLife = parseInt(document.getElementById("max-life").value);
    currentLife = maxLife;
    document.getElementById("lifebar").value = currentLife;
    updateLifeBar();
    if ((isNaN(maxLife)) || maxLife <=9) {
      alert(
        "Por favor, insira um valor diferente de 0 e acima de 9!"
      )
    }
  });

function updateLifeBar() {
  const lifeBar = document.getElementById("life-bar");
  const percentage = (currentLife / maxLife) * 100;

  lifeBar.style.width = `${percentage}%`;

  if (percentage <= 20) {
    lifeBar.style.backgroundColor = "#ff0000";
  } else if (percentage <= 50) {
    lifeBar.style.backgroundColor = "#ffc107";
  } else {
    lifeBar.style.backgroundColor = "#008d47";
  }
}

// Reduzir Vida Atual
document
  .getElementById("reduce-life-btn")
  .addEventListener("click", function () {
    let reduceValue = document.getElementById("reduce-life").value.trim();
    let valueToReduce = 0;

    if (reduceValue.includes("%")) {
      let percentage = parseFloat(reduceValue.replace("%", ""));
      valueToReduce = (percentage / 100) * currentLife;
    } else {
      valueToReduce = parseInt(reduceValue);
    }

    currentLife = Math.max(0, currentLife - valueToReduce);
    document.getElementById("lifebar").value = currentLife;
    updateLifeBar();
  });


// Aumentar Vida Atual

document
  .getElementById("add-life-btn")
  .addEventListener("click", function () {
    let addValue = document.getElementById("add-life").value.trim();
    let valueToAdd = 0;

    if (addValue.includes("%")) {
      let percentage = parseFloat(addValue.replace("%", ""));
      valueToAdd = (percentage / 100) * maxLife;
    } else {
      valueToAdd = parseInt(addValue);
    }

    if (!isNaN(valueToAdd) && valueToAdd > 0) {
      currentLife = Math.min(maxLife, currentLife + valueToAdd);
      document.getElementById("lifebar").value = currentLife;
      updateLifeBar();
    }
  });


let timerInterval;
let seconds = 0;
let isTimerRunning = false;

// Turno do Jogador
let turn = 1;
document
  .getElementById("next-turn")
  .addEventListener("click", function () {
    turn++;
    document.getElementById("turn").value = turn;
  });

// Timer da Sessão
document
  .getElementById("start-timer")
  .addEventListener("click", function () {
    if (!isTimerRunning) {
      isTimerRunning = true;
      timerInterval = setInterval(function () {
        seconds++;
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        document.getElementById("timer-value").innerText = `${String(
          minutes
        ).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
      }, 1000);
      document.getElementById("stop-timer").disabled = false;
      document.getElementById("reset-timer").disabled = false;
      document.getElementById("start-timer").disabled = true;
    }
  });

// Parar Timer
document
  .getElementById("stop-timer")
  .addEventListener("click", function () {
    clearInterval(timerInterval);
    isTimerRunning = false;
    document.getElementById("start-timer").disabled = false;
    document.getElementById("stop-timer").disabled = true;
  });

document
  .getElementById("reset-timer")
  .addEventListener("click", function () {
    clearInterval(timerInterval);
    seconds = 0;
    document.getElementById("timer-value").innerText = "00:00";
    isTimerRunning = false;
    document.getElementById("start-timer").disabled = false;
    document.getElementById("stop-timer").disabled = true;
    document.getElementById("reset-timer").disabled = true;
  });