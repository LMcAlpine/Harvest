
//Class for drawing ground blocks (Experimental)
class Ground {
    constructor(game, x, y, blockWidth, width, height) {
        Object.assign(this, { game, x, y, blockWidth, width, height});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bricks.png");

        console.log(PARAMS.BLOCKWIDTH);
        this.BB = new BoundingBox(this.x, this.y, this.blockWidth, PARAMS.BLOCKWIDTH);
        this.leftBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH)
        this.rightBB = new BoundingBox(this.x + PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH)




    };

    update() {
    };

    draw(ctx) {

        ctx.drawImage(this.spritesheet, 0, 0, 16, 16, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        ctx.strokeStyle = 'blue';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);




    };


};