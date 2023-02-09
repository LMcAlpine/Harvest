//
class Grunt {
    constructor(game, position, collisionBlocks) {
        Object.assign(this, { game, position, collisionBlocks });

        // Properties
        this.scale = 3;
        this.state = 0; //0 = Idle, 1 = Moving
        this.isFiring = 0; // 0 = Not firing, 1 = Firing
        this.SpriteSheet = ASSET_MANAGER.getAsset("./sprites/grunt.png");
        this.animations = [];

        this.walkingSpeed = 0.07;
        this.aimRight = true;

        // Added for Jumping
        this.velocity = { x: 0, y: 0 };
        this.onGround = true;

        // Load animations
        this.loadAnimations();
        this.updateBB();

    }

    loadAnimations() {

        //Build array
        for (let i = 0; i <= 1; i++) { // this.state
            this.animations.push([]);
        }

        // idle
        this.animations[0] = new Animator(this.SpriteSheet, 
            0, 0, 
            64, 60, 
            1, 1, 
            0, 
            false, true);

        // Walk
        this.animations[1] = new Animator(this.SpriteSheet, 
            0, 48, 
            64, 60, 
            7, 0.95, 
            0, 
            false, true);
        
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.position.x, this.position.y, PARAMS.BLOCKWIDTH * this.scale, PARAMS.BLOCKWIDTH * this.scale);
    }

    update() {


    }

    draw(ctx) {
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.position.x - this.game.camera.x, this.position.y - this.game.camera.y, this.scale, true);   
    }
}
