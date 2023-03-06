class Healthpack {
    constructor (game, position) {
        Object.assign(this, {game, position});

        this.healthpackSprite = ASSET_MANAGER.getAsset("./sprites/Healthpack.png");

        this.width = 11;


        this.BB = null;
        this.BBXOffset = 1 * PARAMS.SCALE; //Offset for adjusting BB
        this.BBYOffset = 1 * PARAMS.SCALE; //Offset for adjusting BB
        this.updateBB();

        this.game.addEntity(this);
        this.game.addCollisionEntity(this);
    }
    
    update() {
   
    }

    updateBB() {
        this.lastBB = this.BB;

        //console.log("bbx pos: " + (this.position.x - this.BBXOffset + this.game.camera.x) + " bby pos: " + (this.position.y - this.BBYOffset + this.game.camera.y));

        this.BB = new BoundingBox(
            this.position.x - this.BBXOffset, 
            this.position.y - this.BBYOffset,
            (this.width * PARAMS.SCALE) - (1 * PARAMS.SCALE), 
            (this.width * PARAMS.SCALE) - (1 * PARAMS.SCALE));
    }

    
    draw(ctx) {


        ctx.drawImage(this.healthpackSprite,
            0, 0, //source from sheet
            this.width, 15,
            this.position.x - this.game.camera.x, this.position.y - this.game.camera.y,
            this.width * PARAMS.SCALE,
            this.width * PARAMS.SCALE);

        if (PARAMS.DEBUG && this.BB) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
        

        
    };
}