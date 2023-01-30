class DrawLevel {
    constructor(collisionBlocks) {
        this.collisionBlocks = collisionBlocks;


        this.level = ASSET_MANAGER.getAsset("./img/testmap.png");

    }

    update() { }

    draw(ctx) {
        // ctx.save();
        //ctx.scale(4, 4);





        // ctx.translate(0, -this.level.height + (PARAMS.CANVAS_HEIGHT / 4) + 150);

        //ctx.drawImage(this.level, 0, 0);

        let ground = [{ x: 0, y: 14, size: 69 }, { x: 71, y: 14, size: 15 }, { x: 89, y: 14, size: 63 }, { x: 154, y: 14, size: 69 }]

        // for (let i = 0; i < ground.length; i++) {

        //     for (let j = 0; j < (ground[i].size * PARAMS.BLOCKWIDTH) / PARAMS.BLOCKWIDTH; j++) {
        //         ctx.fillRect((ground[i].x * PARAMS.BLOCKWIDTH) + j * PARAMS.BLOCKWIDTH, (ground[i].y * PARAMS.BLOCKWIDTH), PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        //         ctx.fillRect((ground[i].x * PARAMS.BLOCKWIDTH) + j * PARAMS.BLOCKWIDTH, (ground[i].y * PARAMS.BLOCKWIDTH) + PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
        //     }

        // }



        // this.collisionBlocks.forEach(collisionBlock => {
        //     collisionBlock.draw(ctx);
        //     // ctx.fillStyle = 'rgba(255,0,0,0.5)';


        //     // console.log(this.width);
        //     //  ctx.fillRect(collisionBlock.position.x, collisionBlock.position.y, 16, 16);
        // })
        // ctx.restore();
    }
}