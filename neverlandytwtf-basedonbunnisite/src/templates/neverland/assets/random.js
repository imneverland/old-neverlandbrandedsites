function randomtext() {
    var randomtxt = [
        'neverland skids lol',
        'Bunni Best Bunny',
        'wow what is this',
        'do you like imagine dragons',
        'xdddddddddddddddddddddd',
        'neverland has ligma',
        'zentuh has ligma',
        'bunni has ligma',
        'imagine dragging deez nuts«'
    ];
    return randomtxt[Math.floor((Math.random() * 9.99))];
}

document.getElementById("spam").innerHTML = randomtext();