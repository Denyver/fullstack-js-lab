const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('active');
  }
});


const body = document.body;
const themeButton = document.getElementById("theme-btn");

themeButton.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
});

function danoCritical(damage, percentage, criticalMultiplier) {
    let total
    if (percentage) {
        total = Math.round((damage * (percentage/100+1)) * criticalMultiplier)
    } else {
        total = (damage * criticalMultiplier)
    }
    return total
}

function deucerto() {
    alert('deu certo')
}

function calculateDamage() {
    const damage = parseFloat(document.getElementById("damage").value);
    const percentage = parseFloat(document.getElementById("percentage").value);
    const criticalMultiplier = parseFloat(document.getElementById("critical").value);
    let total = document.getElementById('result');

    if (isNaN(damage)) {
        document.getElementById("result").innerText = "Por favor, insira os valores.";
    } else {
        let resultotal = danoCritical(damage, percentage, criticalMultiplier)
        total.innerHTML = resultotal;
        /* document.getElementById("result").innerText = `Dano causado: ${Math.round(total)}`; */
    }
}