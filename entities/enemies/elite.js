//
class Elite {
    constructor(game, position, collisionBlocks) {

        Object.assign(this, { game, position, collisionBlocks });
        // Properties
        // this.x;
        // this.y;
        // this.game = game;
        this.state = 0;
        this.elite = ASSET_MANAGER.getAsset("./sprites/elite.png");
        this.animations = [];
        this.scale = 2;
        this.BBXOffset = 10 * this.scale; //Offset for adjusting BB
        this.BBYOffset = 6 * this.scale; //Offset for adjusting BB

        // Load animations
        // this.loadAnimations();



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

        //   this.states = { patrolling: new PatrollingState(this), waiting: new WaitingState(this), chasing: new ChasingState(this) };
        this.states = { patrolling: "patrolling", waiting: "waiting", chasing: "chasing" };
        this.currentState = this.states.patrolling;

        this.patrollingLeft = false;
        //  game.addEntity(this.currentState);

        this.elapsedTime = 0;

    }

    loadAnimations() {

        // idle
        this.animations[0] = new Animator(this.elite, 0, 0, 64, 64, 8, 0.095, 0, false, true);

        // Walk
        this.animations[1] = new Animator(this.elite, 0, 64, 64, 64, 8, 0.095, 0, false, true);

    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.position.x + this.BBXOffset,
            this.position.y + this.BBYOffset,
            (64 * this.scale) - (this.scale),
            (90 * this.scale) - (this.scale));
    }
    update() {

        const TICK = this.game.clockTick;

        this.target = this.game.player.position;


        let distance = getDistance(this.position, this.target);
        console.log(distance);
        this.velocity = { x: (this.target.x - this.position.x) / distance * 100, y: (this.target.y - this.position.y) / distance * 100 };

        // if (this.velocity.x > 0) {
        //     this.state = 1;
        // }
        // else if (this.velocity.x < 0) {
        //     this.state = 2;
        // }


        // if (distance < 300) {
        //     this.setState(this.states.chasing);
        // }

        if (this.currentState == 'patrolling') {
            // if (distance < 100) {
            //     this.setState(this.states.chasing);
            // }
            if (this.patrollingLeft) {
                this.position.x -= 1;
                if (this.position.x === 900) {
                    this.patrollingLeft = false;
                    this.flip = false;
                    //   this.setState(this.states.waiting);

                    //  this.state = 0;
                    return;

                }


            }

            else {
                this.position.x += 1;
                if (this.position.x === 1200) {
                    this.patrollingLeft = true;

                    this.flip = true;

                    //  this.setState(this.states.waiting);
                    //this.state = 3;

                    return;

                }
            }
            if (this.flip) {
                // this.state = 2;
            }
            else {
                this.state = 1;
            }
        }
        // if (this.currentState == 'chasing') {
        //     this.position.x += this.velocity.x * TICK;
        //     if (distance < 300) {
        //         // this.shootGun();
        //     }

        // }
        // if (this.currentState == 'waiting') {
        //     if (this.elapsedTime < 3) {
        //         this.elapsedTime += this.game.clockTick;
        //         //  this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.position.x - this.game.camera.x, this.position.y - this.game.camera.y, this.scale, false);

        //     }
        //     else {
        //         this.elapsedTime = 0;
        //         this.setState(this.states.patrolling)
        //     }


        // }





        //    console.log(this.velocity.x);
        //   this.position.x += this.velocity.x * this.game.clockTick;
        // this.position.y += this.velocity.y * this.game.clockTick;

        this.position.y += this.fallingVelocity.y * TICK;
        this.fallingVelocity.y += ENEMY_PHYSICS.MAX_FALL * TICK;
        this.fallingVelocity.y += GRAVITY;


        //  this.position.x += this.velocity.x * TICK;


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
    setState(state) {
        this.currentState = state;
    }

    takeDamage(damage) {
        let health = 100;
        while (health > 0) {
            console.log(damage);
            health -= damage;
        }
        if (health <= 0) {
            this.removeFromWorld = true;
        }
    }


    draw(ctx) {
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.position.x - this.game.camera.x, this.position.y - this.game.camera.y, PARAMS.SCALE, true);

        ctx.strokeStyle = 'cyan';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
    }
}
