class Game{
    constructor(){
        this.canvas = document.getElementById("game")
        this.context = this.canvas.getContext("2d")
        this.sprite = []
        this.spriteImage = new Image()
        this.spriteImage.src = "flower.png"
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        const game = this;
        this.spriteImage.onload = function(){
            // const options = {
            //     context: game.context,
            //     width:this.width,
            //     height:this.height,
            //     image:this
            // }
            // game.sprite = new Sprite(options)
            // game.sprite.render()
            game.lastRefresTime = Date.now()
            game.spawn()
            game.refresh()
        }
       
    }

    spawn(){
        const sprite = new Sprite({
            context: this.context,
            x:Math.random() * this.canvas.width,
            y:Math.random() * this.canvas.height,
            width: this.spriteImage.width,
            height: this.spriteImage.height,
            image: this.spriteImage,
            states:[{mode:"spawn",duration:0.5},{mode:"static",duration:1.5},{mode:"die",duration:0.8}]
        })
        this.sprite.push(sprite)
        this.sinceLastSpawn = 0
    }

    refresh(){
        const now = Date.now()
        const dt = (now - this.lastRefresTime)/1000.0

        this.update(dt)
        this.render()

        this.lastRefresTime = now

        const game = this
        requestAnimationFrame(function(){game.refresh()})
    }

    update(dt){
        this.sinceLastSpawn += dt;
        if(this.sinceLastSpawn > 1){
            this.spawn()
        }
        let removed
        do{
            removed = false
            for(let sprite of this.sprite){
                if(sprite.kill){
                    const index = this.sprite.indexOf(sprite)
                    this.sprite.splice(index,1)
                    removed = true
                    break
                }
            }
        }while(removed)
        for(let sprite of this.sprite){
                if(sprite == null)continue;
                sprite.update(dt);
        }
        
    }

    render(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height)

        this.sprite.map((value)=>{
            value.render()
        })
    }
}