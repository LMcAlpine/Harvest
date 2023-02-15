//
class Grunt {
    constructor(game, position, collisionBlocks) {
        Object.assign(this, { game, position, collisionBlocks });

        // Properties
        this.scale = 3;
        this.state = 1; //0 = Idle, 1 = Moving
        this.isFiring = 0; // 0 = Not firing, 1 = Firing
        this.SpriteSheet = ASSET_MANAGER.getAsset("./sprites/grunt.png");
        //this.SpriteSheet = ASSET_MANAGER.getAsset("./sprites/GruntSprites.png");
        this.animations = [];

        this.walkingSpeed = 0.07;
        this.aimRight = true;


        // keeping track of which path to move towards
        this.targetID = 0;
        this.target = { x: game.player.position.x, y: game.player.position.y };


        let distance = getDistance(this.position, this.target);
        // direction from enemy to target
        let unitVector = { x: (this.target.x - this.position.x) / distance * 100, y: (this.target.y - this.position.y) / distance * 100 };


        // Added for Jumping
        // this.velocity = { x: 0, y: 0 };




        this.velocity = unitVector;
        this.onGround = true;


        // Load animations
        this.loadAnimations();
        this.updateBB();

        this.states = { patrolling: new PatrollingState(this), waiting: new WaitingState(this), chasing: new ChasingState(this) };
        this.currentState = this.states.patrolling;

        //  game.addEntity(this.currentState);
    }

    setState(state) {
        this.currentState = state;
    }

    loadAnimations() {

        //Build array
        for (let i = 0; i <= 1; i++) { // this.state
            this.animations.push([]);
        }



        // Luke's test sheet
        // this.animations[1] = new Animator(this.SpriteSheet,
        //     0, 0,
        //     50, 50,
        //     6, 0.095,
        //     0,
        //     false, true);

        // idle
        this.animations[0] = new Animator(this.SpriteSheet,
            0, 0,
            64, 60,
            1, 1,
            0,
            false, true);


        // idle right
        this.animations[3] = new Animator(this.SpriteSheet,
            0, 48,
            64, 60,
            1, 1,
            0,
            false, true);

        //   Walk right
        this.animations[1] = new Animator(this.SpriteSheet,
            0, 48,
            64, 60,
            7, 0.095,
            0,
            false, true);


        // spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop) {
        // Walk left
        this.animations[2] = new Animator(this.SpriteSheet,
            0, 0,
            64, 57,
            7, 0.095,
            0,
            true, true);

    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.position.x, this.position.y, PARAMS.BLOCKWIDTH * this.scale, PARAMS.BLOCKWIDTH * this.scale);
    }

    update() {
        this.target = this.game.player.position;


        let distance = getDistance(this.position, this.target);
        console.log(this.distance);
        this.velocity = { x: (this.target.x - this.position.x) / distance * 100, y: (this.target.y - this.position.y) / distance * 100 };

        if (this.velocity.x > 0) {
            this.state = 1;
        }
        else if (this.velocity.x < 0) {
            this.state = 2;
        }

        console.log(this.velocity.x);
        this.position.x += this.velocity.x * this.game.clockTick;
        // this.position.y += this.velocity.y * this.game.clockTick;


        // if (this.position.x > PARAMS.CANVAS_WIDTH) {
        //     this.position.x = 0;
        // }



    }

    draw(ctx) {
        //   this.currentState.update();
        //   this.currentState.draw(ctx);


        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.position.x - this.game.camera.x, this.position.y - this.game.camera.y, this.scale, false);
    }
}
