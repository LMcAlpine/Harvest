class Ground {
    constructor(game, x, y, w, width, height) {
        Object.assign(this, { game, x, y, w, width, height });

        // this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bricks.png");




        // this.BB = new BoundingBox(this.x, this.y, this.w, PARAMS.BLOCKWIDTH * 2);
        // this.leftBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)
        // this.rightBB = new BoundingBox(this.x + this.w - PARAMS.BLOCKWIDTH, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2)







        // this.floorCollisions2D = [];

        // //for every 50 tiles, create a new subarray
        // for (let i = 0; i < floorCollisions.length; i += 50) {
        //     this.floorCollisions2D.push(floorCollisions.slice(i, i + 50));

        // }



    };

    update() {
    };

    // drawMinimap(ctx, mmX, mmY) {
    //     ctx.fillStyle = "Brown";
    //     ctx.fillRect(mmX + this.x / PARAMS.BITWIDTH, mmY + this.y / PARAMS.BITWIDTH, this.w / PARAMS.BITWIDTH, PARAMS.SCALE * 2);
    // };

    draw(ctx) {
        // let brickCount = this.w / PARAMS.BLOCKWIDTH;
        //  for (var i = 0; i < brickCount; i++) {


        ctx.fillRect(this.x - this.game.camera.x, this.y, this.width, this.height);

        // ctx.fillRect(this.x + i * PARAMS.BLOCKWIDTH - this.game.camera.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        // ctx.fillRect(this.x + i * PARAMS.BLOCKWIDTH - this.game.camera.x, this.y + PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);

        //   }



    };


};