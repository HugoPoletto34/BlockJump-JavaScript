class Block {
    constructor () {
        this.x = 50;
        this.y = 0;
        this.height = 50;
        this.width = 50;
        this.color = "#ff0000";
        this.gravity = 1.6;
        this.velocity = 0;
        this.jumpForce = 23.6;
        this.jumpCounts = 0;
        this.score = 0;
    }

    drawing () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    updateVelocity () {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y > ground.y - this.height && currentState != states.loseState){
           this.y = ground.y - this.height;
            this.velocity = 0; 
            this.jumpCounts = 0;   
        }        
    }

    jump () {
        if (this.jumpCounts < maxJumps){
            this.velocity = -this.jumpForce;
            this.jumpCounts++;
        }        
    }

    reset () {
        this.y = 0;
        this.velocity = 0;
        if (this.score > record){
            localStorage.setItem("record", this.score)
            record = this.score
        }
        this.score = 0;
    }
}