class Layer {
    constructor(image, speedModifier) {
        Object.assign(this, { image, speedModifier });
        this.x = 0;
        this.y = 0;
        this.width = image.width;
        this.height = image.height;

        // draw second image where first image ends
        this.x2 = this.width;

        this.speed = scrollSpeed * this.speedModifier;

    }

    update() {

        this.speed = scrollSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = 0;
        }

        this.x = this.x - this.speed;

    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}