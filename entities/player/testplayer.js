class TestPlayer {
    constructor({ game, position, collisionBlocks }) {
        Object.assign(this, { game, position, collisionBlocks });


        this.block = ASSET_MANAGER.getAsset("./img/testmap.png");

        this.velocity = { x: 0, y: 1 };
        this.gravity = 0.5;
        this.width = 16;
        this.height = 16;

    }

    update() {

        if (this.game.keys['a'] === true) {

            this.velocity.x = -5;
            this.position.x += this.velocity.x;
            this.angle -= 10;
        }
        if (this.game.keys['d'] === true && this.position.x < PARAMS.CANVAS_WIDTH) {

            this.velocity.x = 5;
            this.position.x += this.velocity.x;
            this.angle += 10;
        }

        if (this.game.keys['w'] === true) {

            this.velocity.y = -2;
        }


        if (this.position.x < 0) {
            this.position.x = 0;
        }
        if (this.position.x >= PARAMS.CANVAS_WIDTH - this.width) {
            this.position.x = PARAMS.CANVAS_WIDTH - this.width;
        }

        if (this.position.y < 0) {
            this.position.y = 0;
        }


        this.checkForHorizontalCollisions();
        this.applyGravity();
        this.checkForVerticalCollisions()




    }

    draw(ctx) {


        ctx.save();
        ctx.scale(4, 4);



        ctx.translate(0, -this.block.height + (PARAMS.CANVAS_HEIGHT / 4) + 150);
        ctx.drawImage(this.block, 0, 0);



        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);


        // this.collisionBlocks.forEach(collisionBlock => {
        //     collisionBlock.draw(ctx);
        // })



        ctx.restore();

    }


    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (collision({ object1: this, object2: collisionBlock })) {
                // collision on the right
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                    // must need 0.01 subtracted
                    this.position.x = collisionBlock.position.x - this.width - 0.01;
                    break;
                }
                // left
                if (this.velocity.x < 0) {
                    this.velocity.x = 0;

                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01;
                    break;
                }
            }
        }
    }


    applyGravity() {

        this.position.y += this.velocity.y;
        this.velocity.y += this.gravity;

    }

    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (collision({ object1: this, object2: collisionBlock })) {
                // if falling
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    // must need 0.01 subtracted
                    this.position.y = collisionBlock.position.y - this.height - 0.01;
                    break;
                }
                // moving upwards
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;

                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01;
                    break;
                }
            }
        }
    }

}