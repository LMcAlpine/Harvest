//
class Grunt {
    constructor(game, position, collisionBlocks) {
        Object.assign(this, { game, position, collisionBlocks });

        this.hp = 150;
        this.currentGun = new Gun(this, game, "Plasma_Pistol");
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

        //   this.states = { patrolling: new PatrollingState(this), waiting: new WaitingState(this), chasing: new ChasingState(this) };
        this.states = { patrolling: "patrolling", waiting: "waiting", chasing: "chasing" };
        this.currentState = this.states.patrolling;

        this.patrollingLeft = false;
        //  game.addEntity(this.currentState);

        this.elapsedTime = 0;
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
        //console.log(distance);
        this.velocity = { x: (this.target.x - this.position.x) / distance * 100, y: (this.target.y - this.position.y) / distance * 100 };

        console.log("X Velocity = " + (this.velocity.x | 0));
        if (this.velocity.x > 0) {
            this.state = 1;
        }
        else if (this.velocity.x < 0) {
            this.state = 2;
        }


        // if (distance < 300) {
        //     this.setState(this.states.chasing);
        // }
        this.position.x += 1;
        // if (this.currentState == 'patrolling') {
        //     if (distance < 100) {
        //         this.setState(this.states.chasing);
        //     }
        //     if (this.patrollingLeft) {
        //         this.position.x -= 1;
        //         if (this.position.x === 400) {
        //             this.patrollingLeft = false;
        //             this.flip = false;
        //             //   this.setState(this.states.waiting);

        //             this.state = 0;
        //             return;

        //         }


        //     }

        //     else {
        //         this.position.x += 1;
        //         if (this.position.x === 700) {
        //             this.patrollingLeft = true;

        //             this.flip = true;

        //             //  this.setState(this.states.waiting);
        //             this.state = 3;

        //             return;

        //         }
        //     }
        //     if (this.flip) {
        //         this.state = 2;
        //     }
        //     else {
        //         this.state = 1;
        //     }
        // }
        // if (this.currentState == 'chasing') {
        //     this.position.x += this.velocity.x * TICK;
        //     if (distance < 1000) {
        //         // const firingPosStatic = this.BB.getCenter();
        //         const firingPosStatic = {
        //             x: this.BB.getCenter().x ,
        //             y: this.BB.getCenter().y
        //         }
        //         //Capture the static position
        //         const targetPosStatic =  this.game.player.BB.getCenter();

        //        this.currentGun.shootGun(firingPosStatic, targetPosStatic);
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


    // shootGun() {

    //     this.isFiring = 1;

    //     //Capture 
    //     const firingPosStatic = {
    //         x: this.position.x + (20 * this.scale),
    //         y: this.position.y + (15 * this.scale)
    //     }

    //     //Capture the static position
    //     const targetPosStatic = {
    //         x: (20 * this.scale) + this.game.camera.x,
    //         y: this.game.camera.y
    //     }

    //     let bullet = new Bullet(
    //         this,
    //         this.game,
    //         2,
    //         firingPosStatic,
    //         targetPosStatic,
    //         1);

    //     this.game.addCollisionEntity(bullet);
    //     this.game.addEntityToFront(bullet);

    // };

    stopShooting() {
        this.isFiring = 0;
    };

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
                        //this.velocity.x = 0;
                        if (this.velocity.x < 0) this.velocity.x = 0;
                    }

                    if (this.BB.right >= entity.BB.left
                        && this.BB.bottom > entity.BB.top
                        && this.velocity.x > 0) {  //Touching left side

                        console.log("Touching left");
                        this.position.x = entity.BB.left - this.BB.width - this.BBXOffset;
                        //this.velocity.x = 0;
                        if (this.velocity.x > 0) this.velocity.x = 0;
                    }

                }


                //this.BB.top < entity.BB.bottom)

            }
        });




    };

    takeDamage(damage) {

        if (this.hp > 0) {
            this.hp -= damage;
        }
        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
        }
    }

    die() {
        //Todo: Play death animation
        this.removeFromWorld = true;
    }

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
