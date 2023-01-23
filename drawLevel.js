class DrawLevel {
    constructor(collisionBlocks) {
        this.collisionBlocks = collisionBlocks;


        this.level = ASSET_MANAGER.getAsset("./img/testmap.png");

    }

    update() { }

    draw(ctx) {
        ctx.save();
        ctx.scale(4, 4);





        ctx.translate(0, -this.level.height + (PARAMS.CANVAS_HEIGHT / 4) + 150);

        ctx.drawImage(this.level, 0, 0);



        this.collisionBlocks.forEach(collisionBlock => {
            collisionBlock.draw(ctx);
            // ctx.fillStyle = 'rgba(255,0,0,0.5)';


            // console.log(this.width);
            //  ctx.fillRect(collisionBlock.position.x, collisionBlock.position.y, 16, 16);
        })
        ctx.restore();
    }
}