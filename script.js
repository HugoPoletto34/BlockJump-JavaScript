var canvas, ctx, HEIGHT, WIDTH, frames = 0;

function main () {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    if (WIDTH >= 500) {
        WIDTH = 600;
        HEIGHT = 600;
    }

    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvas.style.border = "1px solid #000";

    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    document.addEventListener("mousedown", click);

    roll();
}

main();

function click (event) {
    console.log("MOUSEDOWN", event);
}

function update () {
    frames++;
}

function draw () {
    ctx.fillStyle = "#50beff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
}

function roll () {
    update();
    draw();

    window.requestAnimationFrame(roll);
}

