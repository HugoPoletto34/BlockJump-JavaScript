var canvas, ctx, HEIGHT, WIDTH, frames = 0, maxJumps = 3,
ground = new Ground(),
block = new Block();
    obstacles = new Obstacles(),
    states = new States()

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

function click(event) {
    if (currentState == states.gamingState)
        block.jump();
    else if (currentState == states.gameState)
        currentState = states.gamingState;

    else if (currentState == states.loseState && block.y > 2 * HEIGHT) {
        currentState = states.gameState;
        obstacles.clear();
        block.reset();
    }

}

function update() {
    frames++;

    block.updateVelocity();

    if (currentState == states.gamingState) {
        obstacles.update();
    }
}

function draw () {
    ctx.fillStyle = "#50beff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    if (currentState == states.gameState) {
        ctx.fillStyle = "green";
        ctx.fillRect(WIDTH / 2 - 50, HEIGHT / 2 - 50, 100, 100)
    }
    else if (currentState == states.loseState) {
        ctx.fillStyle = "red";
        ctx.fillRect(WIDTH / 2 - 50, HEIGHT / 2 - 50, 100, 100)
    }
    else if (currentState == states.gamingState)
        obstacles.drawing();
    ground.drawing();
    block.drawing();
}

function roll () {
    update();
    draw();

    window.requestAnimationFrame(roll);
}

