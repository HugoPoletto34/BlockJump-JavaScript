class Obstacles {
    constructor () {
        this._obs = [];
        this.colors = ["#ffbc1c", "#ff1c1c", "#ff85e1", "#52a7ff", "#78ff5d"];
        this.timeInsert = 0;
    }
    
    insert () {
        this._obs.push({
            x : WIDTH,
            width : 30 + Math.floor(Math.random() * 21),
            height: 30 + Math.floor(Math.random() * 120),
            // width : 50,
            color: this.colors[Math.floor(Math.random() * 5)]
        });

        this.timeInsert = 30 + Math.floor(Math.random() * 51);
    }

    update () {
        if (this.timeInsert == 0)
            this.insert();
        else
            this.timeInsert--;
        for (var i = 0, tam = this._obs.length; i < tam; i++) {
            var obs = this._obs[i];
            
            obs.x -= velocity;
            
           /* console.log(
                "\nscore: " + block.score + "\n" +
                "block.x: " + block.x + "\n" + 
                "block.y: " + block.y + "\n" + 
                "block.height: " + block.height+ "\n" + 
                "block.width: " + block.width + "\n" + 
                "obs.x: " + obs.x + "\n" + 
                "obs.height: " + obs.height + "\n" + 
                "obs.width: " + obs.width + "\n" + 
                "ground.height: " + ground.y + "\n" + 
                `${block.x} < ${obs.x} + ${obs.width} && ${block.x} + ${block.width} >= ${obs.x} && ${block.y} + ${block.height} >= ${ground.y} - ${obs.height}`
            )*/

            if (block.x < obs.x + obs.width && block.x + block.width >= 
                obs.x && block.y + block.height >= ground.y - obs.height) 
                    currentState = states.loseState;
            else if (obs.x + block.width == block.x)
                block.score++;            
            else if (obs.x <= -obs.width) {
                this._obs.splice(i, 1)
                tam--;
                i--;
            }
        }
    }
    
    clear () {
        this._obs = [];
    }

    drawing () {
        for (var i = 0, tam = this._obs.length; i < tam; i++) {
            var obs = this._obs[i];
            ctx.fillStyle = obs.color;
            ctx.fillRect(obs.x, ground.y - obs.height, obs.width, obs.height);
        }
    }
}