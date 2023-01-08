// This this is the player class
class Player {

    // The constructor for the player
    constructor(game) {

        // Properties
        this.game = game;
        this.speed = 100;
        this.index = 0;
        this.x = 0;
        this.y = 0;

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

    };


    // This method will draw the Character.
    draw(ctx) {

        // Draw the animations
        this.animations[this.index].drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
    };
}