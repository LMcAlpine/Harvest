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

        this.BBXOffset = 10 * this.scale; //Offset for adjusting BB
        this.BBYOffset = 6 * this.scale; //Offset for adjusting BB



        // keeping track of which path to move towards
        this.targetID = 0;
        this.target = { x: game.player.position.x, y: game.player.position.y };


        let distance = getDistance(this.position, this.target);
        // direction from enemy to target
        let unitVector = { x: (this.target.x - this.position.x) / distance * 100, y: (this.target.y - this.position.y) / distance * 100 };


        // Added for Jumping
        // this.velocity = { x: 0, y: 0 };




        this.fallingVelocity = { x: 0, y: 0 };
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
        this.BB = new BoundingBox(this.position.x + this.BBXOffset,
            this.position.y + this.BBYOffset,
            (40 * this.scale) - (this.scale),
            (40 * this.scale) - (this.scale));
    }

    update() {

        const TICK = this.game.clockTick;

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
        //   this.position.x += this.velocity.x * this.game.clockTick;
        // this.position.y += this.velocity.y * this.game.clockTick;


        // if (this.position.x > PARAMS.CANVAS_WIDTH) {
        //     this.position.x = 0;
        // }

        this.position.y += this.fallingVelocity.y * TICK;
        this.fallingVelocity.y += ENEMY_PHYSICS.MAX_FALL * TICK;
        this.fallingVelocity.y += GRAVITY;

        // Update the player x and y
        // if (!this.fallingVelocity.y > 0) { //fa
        this.position.x += this.velocity.x * TICK;
        //}
        //UNCOMMENT
        // this.position.y += this.velocity.y * TICK;

        this.updateBB();

        this.collisionChecker();


    }

    collisionChecker() {

        this.game.collisionEntities.forEach(entity => {
            if (this !== entity && entity.BB && this.BB.collide(entity.BB)) { //falling

                if (this.fallingVelocity.y > 0) { //falling

                    if ((entity instanceof Tile) && this.lastBB.bottom <= entity.BB.top) {
                        this.position.y = entity.BB.top - this.BB.height - this.BBYOffset;
                        this.fallingVelocity.y = 0;
                        this.onGround = true;
                        this.updateBB();
                        return;
                    }

                }
                if (this.fallingVelocity.y < 0) { //Jumping

                    if ((entity instanceof Tile) && this.lastBB.top >= entity.BB.bottom) {
                        console.log("Collide top of tile");
                        this.position.y = entity.BB.bottom - this.BBYOffset;
                        this.fallingVelocity.y = 0;
                        this.updateBB();
                        return;

                    }
                }

                //Other cases for hitting tile
                if ((entity instanceof Tile)) {
                    //console.log("Check");

                    if (this.BB.left <= entity.BB.right
                        && this.BB.bottom > entity.BB.top
                        && this.velocity.x < 0) { //Touching right side

                        console.log("Touching right");
                        this.position.x = entity.BB.right - this.BBXOffset;

                        if (this.velocity.x < 0) this.velocity.x = 0;
                    }

                    if (this.BB.right >= entity.BB.left
                        && this.BB.bottom > entity.BB.top
                        && this.velocity.x > 0) {  //Touching left side

                        console.log("Touching left");
                        this.position.x = entity.BB.left - this.BB.width - this.BBXOffset;

                        if (this.velocity.x > 0) this.velocity.x = 0;
                    }

                }


                //this.BB.top < entity.BB.bottom)

            }
        });




    };

    draw(ctx) {
        //   this.currentState.update();
        //   this.currentState.draw(ctx);


        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.position.x - this.game.camera.x, this.position.y - this.game.camera.y, this.scale, false);

        //draw ths BB
        ctx.strokeStyle = 'cyan';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);

        //Draw the lastBB
        //  ctx.strokeStyle = 'red';
        //  ctx.strokeRect(this.lastBB.x - this.game.camera.x, this.lastBB.y - this.game.camera.y, this.BB.width, this.BB.height);
    }
}
