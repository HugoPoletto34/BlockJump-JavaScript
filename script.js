var canvas, ctx, HEIGHT, WIDTH, frames = 0, maxJumps = 3, velocity = 6,
    currentState, record,
    ground = new Ground(),
    block = new Block(),
    obstacles = new Obstacles(),
    states = new States()

function main() {
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

    currentState = states.gameState;
    record = localStorage.getItem("record")

    if (record == null)
        record = 0;

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

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "#fff"
    ctx.font = "50px Arial";
    ctx.fillText(block.score, 30, 68)

    if (currentState == states.gameState) {
        ctx.fillStyle = "green";
        ctx.fillRect(WIDTH / 2 - 50, HEIGHT / 2 - 50, 100, 100)
    }
    else if (currentState == states.loseState) {
        ctx.fillStyle = "red";
        ctx.fillRect(WIDTH / 2 - 50, HEIGHT / 2 - 50, 100, 100)

        ctx.save();
        ctx.translate(WIDTH / 2, HEIGHT / 2);
        ctx.fillStyle = "#fff";

        var blockPositionX = block.score;
        if (blockPositionX >= 0 && blockPositionX < 10)
            blockPositionX = -13;
        else if (blockPositionX >= 10 && blockPositionX < 100)
            blockPositionX = -26;
        else if (blockPositionX >= 100 && blockPositionX < 1000)
            blockPositionX = -39;
        else if (blockPositionX >= 1000)
            blockPositionX = -55;

        if (block.score > record)
            ctx.fillText("Novo Record!", -150, -65)
        else {
            var recordPositionX = record;
            if (recordPositionX >= 0 && recordPositionX < 10)
                recordPositionX = -99;
            else if (recordPositionX >= 10 && recordPositionX < 100)
                recordPositionX = -112;
            else if (recordPositionX >= 100 && recordPositionX < 1000)
                recordPositionX = -125;
            else if (recordPositionX >= 1000)
                recordPositionX = -138;
            ctx.fillText(`Record: ${record}`, recordPositionX, -65)
        }
        ctx.fillText(block.score, blockPositionX, 19);
        ctx.restore();
    }
    else if (currentState == states.gamingState)
        obstacles.drawing();
    ground.drawing();
    block.drawing();
}

function roll() {
    update();
    draw();

    window.requestAnimationFrame(roll);
}

