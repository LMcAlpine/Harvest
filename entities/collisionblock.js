class CollisionBlock {
    constructor({ position, width, height }) {
        this.position = position;
        this.width = PARAMS.BLOCKWIDTH;
        this.height = PARAMS.BLOCKWIDTH;


    }

    update() { }

    draw(ctx) {

        ctx.fillStyle = 'rgba(255,0,0,0.5)';


        //console.log(this.width);
        ctx.fillRect(this.position.x - gameEngine.camera.x, this.position.y, this.width, this.height);

    }
}