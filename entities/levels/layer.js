class Layer {
    constructor(image, speedModifier, game) {
        Object.assign(this, { image, speedModifier, game });

        //console.log(this.game.player);
        this.x = 0;
        this.y = 0;
        this.width = image.width;
        this.height = image.height;

        // draw second image where first image ends
        this.x2 = this.width;

        this.speed = this.speedModifier * this.game.player.velocity.x / 12;

    }

    update() {

        this.speed = this.speedModifier * this.game.player.velocity.x / 12;
        if (this.x <= -this.width) {
            this.x = 0;
        }

        //    this.x = this.x - (this.game.player.velocity.x * 2);
        this.x = this.x - this.speed;

    }

    draw(ctx) {
        // let x = this.x;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        //  ctx.drawImage(this.image, x + 2 * this.width, this.y, this.width, this.height);
    }
}