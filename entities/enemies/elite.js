class Elite {
    constructor(game, position) {
        Object.assign(this, { game, position });

        this.hp = 300;
        this.isAlive = true;
        this.currentGun = new Gun(this, game, "PLASMA_RIFLE");
        // Properties
        this.scale = PARAMS.SCALE;

        //Animation states
        this.state = 0; // 0 = Idle, 1 = Moving
        this.isFiring = 0; // 0 = Not firing, 1 = Firing

        this.SpriteSheet = ASSET_MANAGER.getAsset("./sprites/EliteSprites.png");
        this.animations = [];

        this.walkingSpeed = 0.07;
        this.aimRight = true;

        this.lastBB = null;
        this.BB = null;
        this.BBXOffset = 10 * this.scale; //Offset for adjusting BB
        this.BBYOffset = 1 * this.scale; //Offset for adjusting BB

        //Player position
        this.target = null;

        // Movement
        this.velocity = { x: 0, y: 0 };
        this.onGround = false;
        this.jumping = false;



        // Load animations
        this.loadAnimations();
        //dimensions of frames
        this.width = 60;
        this.height = 60;

        this.states = { waiting: 0, attacking: 1 };
        this.currentState = this.states.waiting;
        this.gunType = this.currentGun.getGunInfo().index; // 3 = Plasma Rifle, 6 = Carbine 

        this.elapsedTime = 0;
        this.updateBB();
    }

    setState(state) {
        this.currentState = state;
    }

    loadAnimations() {

        //Build array
        for (let i = 0; i <= 1; i++) { // this.state
            this.animations.push([]);
            for (let j = 0; j <= 6; j++) { //this.gunType
                this.animations[i].push([]);
            }
        }


        // waiting plasma rifle
        this.animations[0][3] = new Animator(this.SpriteSheet,
            0, 180,
            60, 60,
            1, 1,
            0,
            false, true);


        // walking plasma rifle
        this.animations[1][3] = new Animator(this.SpriteSheet,
            0, 120,
            60, 60,
            8, 0.095,
            0,
            false, true);

        // waiting carbine
        this.animations[0][6] = new Animator(this.SpriteSheet,
            0, 60,
            60, 60,
            1, 1,
            0,
            false, true);


        // walking carbine
        this.animations[1][6] = new Animator(this.SpriteSheet,
            0, 0,
            60, 60,
            8, 0.095,
            0,
            false, true);


        this.deathAnimation = new Animator(this.SpriteSheet,
            0, 240,
            60, 60,
            3, 0.2,
            0,
            false, false);

    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(
            this.position.x + this.BBXOffset,
            this.position.y + this.BBYOffset,
            (60 * this.scale) - (35 * this.scale),
            (60 * this.scale) - (6 * this.scale));
    }

    update() {

        const TICK = this.game.clockTick;

        this.target = this.game.player.position;

        let distance = getDistance(this.position, this.target);

        if (this.isAlive) {
            if (this.currentState === this.states.waiting) {

                if (distance < PARAMS.SCALE * 240) {
                    this.currentState = this.states.attacking;
                }

            }

            if (this.currentState === this.states.attacking) {

                //Change face
                if (this.position.x - this.target.x < 0) {
                    this.aimRight = true;
                } else {
                    this.aimRight = false;
                }

                this.state = 1;

                //FOLLOW PLAYER

                //Jumping
                if (this.jumping && this.onGround) {
                    this.velocity.y = GRUNT_JUMP;
                    this.onGround = false;
                    this.jumping = false;
                }

                if (this.target.x < this.position.x) { //player is to the left
                    this.velocity.x -= ELITE_PHYSICS.ACC_RUN * TICK;
                } else if (this.target.x > this.position.x) {
                    this.velocity.x += ELITE_PHYSICS.ACC_RUN * TICK;
                } else {
                    this.velocity.x = 0;
                }

                // max speed cap
                if (this.velocity.x >= ELITE_PHYSICS.MAX_RUN) this.velocity.x = ELITE_PHYSICS.MAX_RUN;
                if (this.velocity.x <= -ELITE_PHYSICS.MAX_RUN) this.velocity.x = -ELITE_PHYSICS.MAX_RUN;



                //SHOOTING AT PLAYER
                const firingPosStatic = {
                    x: this.BB.getCenter().x,
                    y: this.BB.getCenter().y
                }
                //Capture the static position
                const targetPosStatic = this.game.player.BB.getCenter();

                this.currentGun.shootGun(firingPosStatic, targetPosStatic);

            }
        }

        //Basic physics
        this.velocity.y += ELITE_PHYSICS.ACC_FALL * TICK;

        // max speed calculation for vertical
        if (this.velocity.y >= ELITE_PHYSICS.MAX_FALL) this.velocity.y = ELITE_PHYSICS.MAX_FALL;
        if (this.velocity.y <= -ELITE_PHYSICS.MAX_FALL) this.velocity.y = -ELITE_PHYSICS.MAX_FALL;

        // update position
        this.position.x += this.velocity.x * TICK * PARAMS.SCALE;
        this.position.y += this.velocity.y * TICK * PARAMS.SCALE;

        //console.log(this.velocity);
        this.updateBB();

        this.collisionChecker();


    }


    collisionChecker() {

        this.game.collisionEntities.forEach(entity => {
            if (this !== entity && entity.BB && this.BB.collide(entity.BB)) { //Collision

                if (entity instanceof Tile) {
                    entity.collisionActive = true; //COLLIDING WITH TILE

                    //FALLING
                    if (this.velocity.y > 0) {

                        if (this.lastBB.bottom <= entity.BB.top) {
                            this.position.y = entity.BB.top - this.BB.height - this.BBYOffset;
                            this.velocity.y = 0;
                            this.onGround = true;
                            this.updateBB();
                            return;
                        }

                    }

                    //JUMPING
                    if (this.velocity.y < 0) { //Jumping

                        if (this.lastBB.top >= entity.BB.bottom) {

                            this.position.y = entity.BB.bottom - this.BBYOffset;
                            this.velocity.y = 0;
                            this.updateBB();
                            return;

                        }
                    }


                    //TOUCHING RIGHTSIDE OF TILE
                    if (this.BB.left <= entity.BB.right
                        && this.BB.bottom > entity.BB.top
                        && this.velocity.x < 0) {

                        this.position.x = entity.BB.right - this.BBXOffset;

                        if (this.velocity.x < 0) this.velocity.x = -ELITE_PHYSICS.MAX_RUN / 4;

                        this.jumping = true;

                    }


                    //TOUCHING LEFT SIDE OF TILE
                    if (this.BB.right >= entity.BB.left
                        && this.BB.bottom > entity.BB.top
                        && this.velocity.x > 0) {

                        this.position.x = entity.BB.left - this.BB.width - this.BBXOffset;

                        if (this.velocity.x > 0) this.velocity.x = ELITE_PHYSICS.MAX_RUN / 4;

                        this.jumping = true;

                    }



                }


            }
        });



    };

    takeDamage(damage) {

        if (this.hp > 0) {
            console.log();
            this.hp -= damage;
        } else {
            this.hp = 0;
            this.die();
        }

        if (this.hp <= 0) {
            this.die();
        }
    }

    die() {



        if (!this.soundPlaying) {

            ASSET_MANAGER.playAsset("./sounds/deathviolent.die02.ogg");

            //  ASSET_MANAGER.playAsset("./sounds/death_instant.5.ogg");
            this.soundPlaying = true;
            // dont play sound until the sound has finished playing.
            //  let audio = ASSET_MANAGER.getAsset("./sounds/death_instant.5.ogg");
            let audio = ASSET_MANAGER.getAsset("./sounds/deathviolent.die02.ogg");
            audio.addEventListener('ended', () => {
                this.soundPlaying = false;
            });
        }


        this.velocity.x = 0;
        this.isAlive = false;
        this.currentGun.dropGun();
    }

    draw(ctx) {

        if (this.isAlive) {
            if (this.aimRight) {
                this.animations[this.state][this.gunType].drawFrame(
                    this.game.clockTick,
                    ctx,
                    this.position.x - this.game.camera.x,
                    this.position.y - this.game.camera.y,
                    this.scale, false);

            } else {
                this.animations[this.state][this.gunType].drawFrame(
                    this.game.clockTick,
                    ctx,
                    this.position.x - this.game.camera.x,
                    this.position.y - this.game.camera.y,
                    this.scale, true);
            }
        } else { // Elite is dead
            //play death animation
            if (this.aimRight) {
                this.deathAnimation.drawFrame(this.game.clockTick, ctx,
                    this.position.x - this.game.camera.x,
                    this.position.y - this.game.camera.y,
                    this.scale, false);
            } else {
                this.deathAnimation.drawFrame(this.game.clockTick, ctx,
                    this.position.x - this.game.camera.x,
                    this.position.y - this.game.camera.y,
                    this.scale, true);
            }


            if (this.deathAnimation.isDone()) { //Draw last frame when death animation completes
                if (this.aimRight) {
                    this.deathAnimation.drawSpecificFrame(this.game.clockTick, ctx,
                        this.position.x - this.game.camera.x,
                        this.position.y - this.game.camera.y,
                        this.scale, false, 2);
                } else {
                    this.deathAnimation.drawSpecificFrame(this.game.clockTick, ctx,
                        this.position.x - this.game.camera.x,
                        this.position.y - this.game.camera.y,
                        this.scale, true, 2);
                }
            }
        }


        if (PARAMS.DEBUG && this.BB) {
            //draw the BB
            ctx.strokeStyle = 'cyan';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }

    };
}