//
class Grunt {
    constructor(game) {

        // Properties
        this.x;
        this.y;
        this.game = game;
        this.state = 0;
        this.SpriteSheet = ASSET_MANAGER.getAsset("./sprites/grunt.png");
        this.animations = [];

        // Load animations
        this.loadAnimations();
    }

    loadAnimations() {

        // idle
        this.gunAnimations[0] = new Animator(this.SpriteSheet, 0, 0, 64, 64, 7, 0.95, 0, false, true);

        // Walk
        this.gunAnimations[1] = new Animator(this.SpriteSheet, 0, 48, 64, 64, 7, 0.95, 0, false, true);
        
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.position.x, this.position.y, PARAMS.BLOCKWIDTH * this.scale, PARAMS.BLOCKWIDTH * this.scale);
    }

    update() {


    }

    draw(ctx) {
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.position.x - this.game.camera.x, this.position.y, PARAMS.SCALE, true);   
    }
}
