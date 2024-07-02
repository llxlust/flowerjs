class Sprite{
    constructor(options){
        const {context,width,height,image,x,y,states,scale,opacity} = options
        this.context = context
        this.width = width
        this.height = height
        this.image = image
        this.x = x
        this.y = y
        this.states = states
        this.state = 0
        this.scale = (scale==null) ? 1.0 : scale
        this.opacity = (opacity==null) ? 1.0 : opacity
        this.currentTime = 0
        this.kill = false

    }
    render(){
        const alpha = this.context.globalAlpha;

        this.context.globalAlpha = this.opacity

        this.context.drawImage(
            this.image,
            0,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width * this.scale,
            this.height * this.scale
        )
        this.context.globalAlpha = alpha
    }

    set state(index){
        this.stateIndex = index
        this.stateTime= 0
    }

    get state(){
        let result

        if(this.stateIndex < this.states.length){
            result = this.states[this.stateIndex]
        }

        return result
    }

    update(dt){
        this.stateTime += dt
        const state = this.state
        if(state == null){
            this.kill = true
            return;
        }
        const delta = this.stateTime/state.duration
        if(delta > 1) this.state = this.stateIndex + 1;
        switch(state.mode){
            case "spawn":
                this.scale = delta;
                this.opacity = delta;
                break;
            case "static":
                this.scale = 1.0
                this.opacity = 1.0
                break
            case "die":
                this.scale = 1.0 + delta
                this.opacity = 1.0 - delta
                if (this.opacity<0) this.opacity = 0
                break
        }
    }
}