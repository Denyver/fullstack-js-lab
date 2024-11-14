function calculateDamage() {
    const damage = parseFloat(document.getElementById("damage").value);
    const percentage = parseFloat(document.getElementById("percentage").value);
    const sum_per_turn = parseFloat(document.getElementById("sum_per_turn").value)
    const critical = parseFloat(document.getElementById("critical").value);

    if (isNaN(damage) || isNaN(percentage) || isNaN(critical)) {
        document.getElementById("result").innerText = "Por favor, insira valores.";
        return;
    }

    document.getElementById("result").innerText = `Dano causado: ${damage.toFixed(2)}`;
}