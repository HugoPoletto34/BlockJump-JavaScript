class Ground {
    constructor () {
        this.y = 550,
        this.height = 50;
        this.color  = "#964b00";
    }
    
    drawing () {
        ctx.fillStyle = this.color;
        ctx.fillRect(0, this.y, WIDTH, this.height)
    }
}