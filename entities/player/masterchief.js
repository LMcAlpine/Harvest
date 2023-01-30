class MasterChief {
    
    constructor(game, position, collisionBlocks) {

        // Updated the constructor
        Object.assign(this, { game, position, collisionBlocks });

        //this.game = game;
        this.cache = [];

        this.level = ASSET_MANAGER.getAsset("./img/testmap.png");

        this.SpriteSheet = ASSET_MANAGER.getAsset("./sprites/ChiefSprites.png");
        this.GunSpriteSheet = ASSET_MANAGER.getAsset("./sprites/Guns.png");

        //Animation states for chief's head/body
        this.state = 0; // 0 = Idle, 1 = walking
        this.facing = 0; // 0 = right, 1 = left

        //Animation states for chief's arms/gun firing
        this.isFiring = 0; // 0 = Not firing, 1 = Firing
        this.gunType = 0; // 0 = Sniper Rifle, More to come

        this.degrees = 0;
        this.aimRight = true;
        this.reverse = false;

        this.scale = 3;
        this.walkingSpeed = 0.07;

        this.width = 30;
        this.height = 47;


        // Added for Jumping
        this.velocity = { x: 0, y: 0 };
        this.inAir = false;


        //anytime we move we should call updateBB

        this.updateBB();

        this.bodyAnimations = [];
        this.helmetAnimations = [];
        this.gunAnimations = [];
        this.loadAnimations();

<<<<<<< HEAD
        this.rectangle = function () {
            this.game.ctx.strokeStyle = "Blue";
            this.game.ctx.strokeRect(this.position.x, this.position.y, 25, 2);
            this.game.ctx.save();
        }

        //this.hitbox = { position: { x: this.position.x, y: this.position.y }, width: 10, height: 10 };

        // Keeps track of last key pressed
        this.lastKey

=======
>>>>>>> 4325136bbae9930d58bbfa665034246f0a02db57
    };

    loadAnimations() {
        for (let i = 0; i <= 1; i++) { // this.state
            this.bodyAnimations.push([]);
            this.helmetAnimations.push([]);
            for (let j = 0; j <= 1; j++) { // this.facing
                this.bodyAnimations[i].push([]);
                this.helmetAnimations[i].push([]);
            }
        }

        for (let i = 0; i <= 1; i++) { // this.gunType
            this.gunAnimations.push([]);
            for (let j = 0; j <= 1; j++) { // this.isFiring
                this.gunAnimations[i].push([]);
            }
        }


        // ---- GUN ANIMATIONS ----
        // gunType: Sniper Rifle
        // isFiring: False
        this.gunAnimations[0][0] = new Animator(this.GunSpriteSheet,
            0, 0,
            180, 180,
            1, 1,
            0,
            false, true);

        // isFiring: True
        this.gunAnimations[0][1] = new Animator(this.GunSpriteSheet,
            0, 0,
            180, 180,
            3, 0.05,
            0,
            false, false);

        // gunType: Assault Rifle
        // isFiring: False
        this.gunAnimations[1][0] = new Animator(this.GunSpriteSheet,
            0, 180,
            180, 180,
            1, 1,
            0,
            false, true);

        // isFiring: True
        this.gunAnimations[1][1] = new Animator(this.GunSpriteSheet,
            0, 180,
            180, 180,
            3, 0.05,
            0,
            false, false);


        // ---- CHIEF BODY/HEAD ANIMATIONS ----
        // State: Idle
        // Facing: Right
        this.bodyAnimations[0][0] = new Animator(this.SpriteSheet,
            0, 0,
            40, 50,
            1, 1,
            0,
            false, true);

        // Helmet: Right
        this.helmetAnimations[0][0] = new Animator(this.SpriteSheet,
            0, 100,
            40, 50,
            1, 1,
            0,
            false, true);

        // Facing: Left
        this.bodyAnimations[0][1] = new Animator(this.SpriteSheet,
            0, 50,
            40, 50,
            1, 1,
            0,
            false, true);

        // Helmet: Left
        this.helmetAnimations[0][1] = new Animator(this.SpriteSheet,
            0, 150,
            40, 50,
            1, 1,
            0,
            false, true);

        // State: Walking
        // Facing: Right
        this.bodyAnimations[1][0] = new Animator(this.SpriteSheet,
            0, 0,
            40, 50,
            21, this.walkingSpeed,
            0,
            false, true);
        // Helmet: Right
        this.helmetAnimations[1][0] = new Animator(this.SpriteSheet,
            0, 100,
            40, 50,
            21, this.walkingSpeed,
            0,
            false, true);

        // Facing: Left
        this.bodyAnimations[1][1] = new Animator(this.SpriteSheet,
            0, 50,
            40, 50,
            21, this.walkingSpeed,
            0,
            false, true);

        // Helmet: Left
        this.helmetAnimations[1][1] = new Animator(this.SpriteSheet,
            0, 150,
            40, 50,
            21, this.walkingSpeed,
            0,
            false, true);

    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.position.x, this.position.y, PARAMS.BLOCKWIDTH * this.scale, PARAMS.BLOCKWIDTH * this.scale);
    }

    update() {

        this.velocity.x = 0


        // Updater properties
        const TICK = this.game.clockTick;




        //Calculate if player is aiming to right or left of player model
        if (this.game.mouse !== null) {
            let xOffset = 25;
            const x = this.game.mouse.x - this.position.x - xOffset;
            if (x > 0) {
                this.aimRight = true;
                this.facing = 0;
            } else {
                this.aimRight = false;
                this.facing = 1;
            }
        }


        // Movement... kinda
        if (this.game.keys['d']) {
            if (this.aimRight) {
                this.facing = 0;
                this.bodyAnimations[this.state][this.facing].reverse = false;


            } else {
                this.facing = 1;
                this.bodyAnimations[this.state][this.facing].reverse = true;
            }

            this.state = 1;
<<<<<<< HEAD
=======
            //this.x += 3;
            this.velocity.x += PLAYER_PHYSICS.MAX_RUN * TICK;
            this.position.x += this.velocity.x * TICK;
>>>>>>> 4325136bbae9930d58bbfa665034246f0a02db57
        }
        else if (this.game.keys['a']) {

            if (this.aimRight) {
                this.facing = 0;
                this.bodyAnimations[this.state][this.facing].reverse = true;
            } else {
                this.facing = 1;
                this.bodyAnimations[this.state][this.facing].reverse = false;
            }
            this.state = 1;
        } 
        else if (this.game.keys[' '] || this.game.keys['Space']) { // Jumping TODO: JUMP WHILE RUNNING!
            this.velocity.y -= 4;
            console.log('UP')
        } 
        else {
            this.state = 0;
        }

<<<<<<< HEAD
        // *** Player Movement ***
        if (keys.a.pressed && lastKey === 'a') {
            this.velocity.x = -5;
            this.position.x += -5;
            console.log('walking left')
        } 
        if (keys.d.pressed && lastKey === 'd') {
            this.velocity.x = 5;
            this.position.x += 5;
            console.log('walking right')
        }

        this.checkForHorizontalCollisions();
=======
        //this.checkForHorizontalCollisions();
>>>>>>> 4325136bbae9930d58bbfa665034246f0a02db57

        // Allow the player to fall
<<<<<<< HEAD
        this.velocity.y += GRAVITY;
=======

        //UNCOMMENT
        this.velocity.y += PLAYER_PHYSICS.MAX_FALL * TICK;
>>>>>>> 4325136bbae9930d58bbfa665034246f0a02db57

        // Update the player x and y
        // this.position.x += this.velocity.x * TICK;
        //UNCOMMENT
        this.position.y += this.velocity.y * TICK;



        // this.checkForVerticalCollisions();
        this.updateBB();

        let that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (that.velocity.y > 0) {
                    if ((entity instanceof Ground) && that.lastBB.bottom <= entity.BB.top) {
                        that.position.y = entity.BB.top - PARAMS.BLOCKWIDTH * that.scale;
                        that.velocity.y = 0;
                        that.updateBB();

                    }

                }
            }
        })






    };

    // This method will allow the player to jump
    jump() {
        this.velocity.y -= PLAYER_PHYSICS.JUMP_HEIGHT;
        this.position.y -= PLAYER_PHYSICS.JUMP_HEIGHT;
        this.inAir = true;
    };

    draw(ctx) {

<<<<<<< HEAD
=======

>>>>>>> 4325136bbae9930d58bbfa665034246f0a02db57
        this.findMouseAngle();

        this.bodyAnimations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.position.x - this.game.camera.x, this.position.y, this.scale);
        this.helmetAnimations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.position.x - this.game.camera.x, this.position.y, this.scale);
        this.drawGun(ctx);

<<<<<<< HEAD
=======
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);



>>>>>>> 4325136bbae9930d58bbfa665034246f0a02db57
    };

    drawGun(ctx) {
        let a = this.gunAnimations[this.gunType][this.isFiring];

        a.elapsedTime += this.game.clockTick;

        if (a.isDone()) {
            if (a.loop) {
                a.elapsedTime -= a.totalTime;
            }
            else {
                // If this is not a continually firing animation, isFiring gets toggled off and animation is reset.
                this.stopShooting();
                a.reset();

            }
        }

        let frame = a.currentFrame();
        if (a.reverse) frame = a.frameCount - frame - 1;

        let radians = -this.degrees / 360 * 2 * Math.PI;

        if (this.aimRight) {

            var offscreenCanvas = rotateImage(a.spritesheet,
                a.xStart + frame * (a.width + a.framePadding), a.yStart,
                a.width, a.height,
                radians, 5,
                false);

        } else {

            var offscreenCanvas = rotateImage(a.spritesheet,
                a.xStart + frame * (a.width + a.framePadding), a.yStart,
                a.width, a.height,
                -radians - Math.PI, 5,
                true);

        }

        //Offset to shift chief's shoulder back in it's socket when he changes face
        if (this.aimRight) {
            var armXOffset = 76 * this.scale;
        } else {
            var armXOffset = 64 * this.scale;
        }

        var armYOffset = 72 * this.scale;

<<<<<<< HEAD
        ctx.drawImage(offscreenCanvas, 
                this.position.x - armXOffset, this.position.y - armYOffset, 
                this.scale * a.width, this.scale * a.width);    
    };
    
=======
        ctx.drawImage(offscreenCanvas,
            this.position.x - armXOffset - this.game.camera.x, this.position.y - armYOffset,
            this.scale * a.width, this.scale * a.width);


    };


>>>>>>> 4325136bbae9930d58bbfa665034246f0a02db57
    shootGun() {
        this.isFiring = 1;
    };

    stopShooting() {
        this.isFiring = 0;
    };

    findMouseAngle() {
        //Calculating angle from mouse
        if (gameEngine.mouse !== null) {

            let yOffset = 32;
            let xOffset = 25;

            let opp = -(gameEngine.mouse.y - this.position.y - yOffset);
            let adj = gameEngine.mouse.x - this.position.x - xOffset;

            //console.log('Opp: ' + -opp + ' Adj: ' + adj);
            let angle = Math.atan(opp / adj);
            this.degrees = Math.floor(angle * (180 / Math.PI));

            if (opp >= 0 && adj < 0) {
                this.degrees += 180;
            } else if (opp < 0 && adj < 0) {
                this.degrees += 180;
            } else if (opp < 0 && adj >= 0) {
                this.degrees += 360;
<<<<<<< HEAD
            } 
=======
            }
>>>>>>> 4325136bbae9930d58bbfa665034246f0a02db57

        }
    };

    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (collision({ object1: this, object2: collisionBlock })) {
                // collision on the right
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                    // must need 0.01 subtracted
                    this.position.x = collisionBlock.position.x - this.width - 0.01;
                    break;
                }
                // left
                if (this.velocity.x < 0) {
                    this.velocity.x = 0;

                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01;
                    break;
                }
            }
        }
    };

<<<<<<< HEAD
=======

>>>>>>> 4325136bbae9930d58bbfa665034246f0a02db57
    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (collision({ object1: this, object2: collisionBlock })) {
                // if falling
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    // must need 0.01 subtracted
                    this.position.y = collisionBlock.position.y - this.height - 0.01;
                    break;
                }
                // moving upwards
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;

                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01;
                    break;
                }
            }
        }
    };
}

// *** Keys ***
const keys = {
    a: { // Left key
    pressed: false
    },
    d: { // Right key
    pressed: false
    },
    ' ': { // Up key
    pressed: false
    }
}

// *** KeyDown ***
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        // Player Keys
        case 'd':
            keys.d.pressed = true
            this.lastKey = 'd';
            break
        case 'a':
            keys.a.pressed = true
            this.lastKey = 'a';
            break
        case ' ':
            this.jump;
            console.log('up')
            break
    }
})

// *** KeyUp ***
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        // Player Keys
        case 'd':
            keys.d.pressed = false;
            break
        case 'a':
            keys.a.pressed = false;
            break
        case ' ':
            keys[' '].pressed = false;
            console.log('gravity');
            break
    }
})
