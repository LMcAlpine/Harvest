// This this is the player class
class Player {

    // The constructor for the player
    constructor(game) {

        // Properties
        this.game = game;
        this.speed = 200;
        this.index = 0;
        this.x = 0;
        this.y = 0;
        this.rotation = 0;

        this.enemyX = 500;
        this.enemyY = 500;

        // Get the spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/tempPlayer.png");

        // Get the animations
        this.animations = [];
        this.getAnimations();

    }

    // This method gets all the animations
    getAnimations() {
        this.animations[0] = new Animator(this.spritesheet, 0, 0, 85, 55, 22, 0.2, 0, false, true);
    };

    // This is the update method called on each frame.
    update() {

        // Update based on player movement.
        if (this.game.keys["d"] || this.game.keys["D"]) {
            this.x += this.speed * this.game.clockTick;
        } else if (this.game.keys["a"] || this.game.keys["A"]) {
            this.x -= this.speed * this.game.clockTick;
        }

        if (this.game.keys["s"]) {
            this.y += this.speed * this.game.clockTick;
        }

        if (this.game.keys["w"]) {
            this.y -= this.speed * this.game.clockTick;
        }

    };


    // This method will draw the Character.
    draw(ctx) {

        // Draw the animations
        //this.animations[this.index].drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);

        ctx.fillRect(this.x, this.y, 100, 100);

        ctx.save();
        ctx.fillStyle = "red";

        let dx = this.x - this.enemyX;
        let dy = this.y - this.enemyY;

        let speedE = 0.01;

        let angle = Math.atan2(dy, dx);

        let magnitude = 1.0;
        let velX = Math.cos(angle) * magnitude;
        let velY = Math.sin(angle) * magnitude;


        //  ctx.translate(dx, dy);
        let distance = this.calculateDistance(this.x, this.y, this.enemyX, this.enemyY);

        this.enemyX += dx * speedE;
        this.enemyY += dy * speedE;

        ctx.fillRect(this.enemyX, this.enemyY, 100, 100);


        ctx.restore();
    };


    calculateDistance(x, y, enemyX, enemyY) {
        return Math.sqrt((enemyX - x) ** 2 + (enemyY - y) ** 2);
    }
}