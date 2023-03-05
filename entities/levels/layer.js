class Layer {
    constructor(image, game) {
        Object.assign(this, { image, game });
        this.x = 0;
        this.y = 0;
        this.width = image.width * 4;
        this.height = image.height * 4;

        // draw second image where first image ends
        this.x2 = this.width;
        
        this.speed = scrollSpeed * this.speedModifier;

    }

    update() {

        // this.speed = scrollSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = 0;
        }

        //this.x = this.x - (this.game.player.velocity.x * 2);

    }

    draw(ctx) {
        let x = this.x;
        ctx.drawImage(this.image, x, this.y, this.width, this.height);
        ctx.drawImage(this.image, x + this.width, this.y, this.width, this.height);
        ctx.drawImage(this.image, x + 2 * this.width, this.y, this.width, this.height);
    }
}