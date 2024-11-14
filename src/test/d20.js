function rolarDado() {
    var d20 = Math.round(Math.random() * 20) + 1 
    return d20
}

for (let i = 1; i <= 20; i++) {
    let d20 = rolarDado()
    console.log(d20)
}