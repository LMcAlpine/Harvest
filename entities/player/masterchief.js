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


        //Animation states for chief's arms/gun firing
        this.isFiring = 0; // 0 = Not firing, 1 = Firing
        this.gunType = 1; // 0 = Sniper Rifle, 1 = Assault Rifle

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

        // Keeps track of last key pressed
        this.lastKey;

    };

    loadAnimations() {
        for (let i = 0; i <= 1; i++) { // this.state
            this.bodyAnimations.push([]);
            this.helmetAnimations.push([]);
            for (let j = 0; j <= 1; j++) { // 
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
        this.bodyAnimations[0] = new Animator(this.SpriteSheet,
            0, 0,
            40, 50,
            1, 1,
            0,
            false, true);
        this.helmetAnimations[0] = new Animator(this.SpriteSheet,
            0, 50,
            40, 50,
            1, 1,
            0,
            false, true);


        // State: Walking
        this.bodyAnimations[1] = new Animator(this.SpriteSheet,
            0, 0,
            40, 50,
            21, this.walkingSpeed,
            0,
            false, true);
        this.helmetAnimations[1] = new Animator(this.SpriteSheet,
            0, 50,
            40, 50,
            21, this.walkingSpeed,
            0,
            false, true);


    };

    updateBB() {
        this.lastBB = this.BB;
        // 35 = player width
        // 46 = player height
        this.BB = new BoundingBox(this.position.x, this.position.y, 35 * this.scale, 46 * this.scale);
    }

    update() {

        // this.velocity.x = 0

        // Updater properties
        const TICK = this.game.clockTick;


        //Calculate if player is aiming to right or left of player model
        if (this.game.mouse !== null) {
            let xOffset = 20 * this.scale;
            const x = this.game.mouse.x - (this.position.x - this.game.camera.x) - xOffset;
            //const x = this.game.mouse.x - 936 - xOffset;
            if (x > 0) {
                this.aimRight = true;
            } else {
                this.aimRight = false;
            }
        }


        // Movement... kinda
        if (this.game.keys['d']) {

            //Check direction user is aiming to dictate walking forward or reverse
            if (this.aimRight) {
                this.bodyAnimations[this.state].reverse = false;
                this.helmetAnimations[this.state].reverse = false;
            } else {
                this.bodyAnimations[this.state].reverse = true;
                this.helmetAnimations[this.state].reverse = true;
            }

            this.state = 1;
            //this.x += 3;
            // this.velocity.x += PLAYER_PHYSICS.MAX_RUN * TICK;
            // this.position.x += this.velocity.x * TICK;
            // this.game.keys['d'] === false
        }


        else if (this.game.keys['a']) {

            //Check direction user is aiming to dictate walking forward or reverse
            if (this.aimRight) {
                this.helmetAnimations[this.state].reverse = true;
                this.bodyAnimations[this.state].reverse = true;
            } else {
                this.bodyAnimations[this.state].reverse = false;
                this.helmetAnimations[this.state].reverse = false;
            }
            this.state = 1;
        }


        // else if (this.game.keys[' '] || this.game.keys['Space']) { // Jumping TODO: JUMP WHILE RUNNING!
        //     if (!this.inAir) {
        //         this.velocity.y -= 4;
        //         console.log('UP')
        //         this.inAir = true;
        //     }

        // }


        else {
            this.state = 0;
        }

        // *** Player Movement ***
        if (keys.a.pressed && lastKey === 'a') {
            this.velocity.x += PLAYER_PHYSICS.MAX_WALK;
            this.position.x += -this.velocity.x * TICK;
            console.log('walking left')


            if (this.velocity.x > PLAYER_PHYSICS.MAX_WALK) {
                this.velocity.x = PLAYER_PHYSICS.MAX_WALK;
            }
        }
        if (keys.d.pressed && lastKey === 'd') {
            this.velocity.x += PLAYER_PHYSICS.MAX_WALK;


            this.position.x += this.velocity.x * TICK;;

            if (this.velocity.x > PLAYER_PHYSICS.MAX_WALK) {
                this.velocity.x = PLAYER_PHYSICS.MAX_WALK;
            }
            console.log('walking right')
        }


        if (keys[' '].pressed) {

            if (!this.inAir) {
                //         this.velocity.y -= 4;
                //         console.log('UP')
                this.inAir = true;
                //     }
                this.velocity.y += -PLAYER_JUMP;
                this.position.y += -PLAYER_JUMP;
                console.log('up')
            }
            else {
                this.inAir = false;
            }
        }

        //this.checkForHorizontalCollisions();


        // Allow the player to fall

        //UNCOMMENT
        this.velocity.y += PLAYER_PHYSICS.MAX_FALL * TICK;
        this.velocity.y += GRAVITY;

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
                        // 46 = player height
                        that.position.y = entity.BB.top - 46 * that.scale;
                        that.velocity.y = 0;
                        that.updateBB();

                    }

                }
                else if (that.velocity.y < 0) {


                    if ((entity instanceof Ground) && that.lastBB.top >= entity.BB.bottom) {
                        // that.position.y = entity.BB.bottom + 46 * that.scale;
                        console.log("colliding with top?");
                        that.velocity.y = 0;
                        that.position.y = entity.BB.bottom + entity.BB.height;
                        that.updateBB();

                    }
                }

                if ((entity instanceof Ground)) {
                    if (that.BB.collide(entity.leftBB)) {
                        if (that.velocity.x > 0) {
                            that.velocity.x = 0;
                            that.position.x = entity.BB.left - PARAMS.BLOCKWIDTH;
                            that.updateBB();
                        }


                    }




                }
                if (entity instanceof Ground) {
                    if (that.BB.collide(entity.rightBB)) {

                        if (that.velocity.x < 0) {
                            that.velocity.x = 0;

                            that.position.x = entity.BB.right;
                            that.updateBB();

                        }
                    }
                }


            }
            //   }

        })


        // for (let i = 0; i < this.collisionBlocks.length; i++) {
        //     const block = this.collisionBlocks[i];
        //     if (collision({ object1: this, object2: block })) {
        //         if (this.velocity.x > 0) {
        //             this.velocity.x = 0;
        //             this.position.x = block.position.x - block.width - 0.01;
        //             break;
        //         }
        //     }
        // }









    };

    // This method will allow the player to jump
    // jump() {
    //     if (!this.inAir) {
    //         this.velocity.y -= PLAYER_PHYSICS.JUMP_HEIGHT;
    //         this.position.y -= PLAYER_PHYSICS.JUMP_HEIGHT;
    //         this.inAir = true;
    //     }

    // };

    draw(ctx) {


        this.findMouseAngle();

        if (this.aimRight) {
            this.bodyAnimations[this.state].drawFrame(this.game.clockTick, ctx, this.position.x - this.game.camera.x, this.position.y, this.scale, false);
            this.helmetAnimations[this.state].drawFrame(this.game.clockTick, ctx, this.position.x - this.game.camera.x, this.position.y, this.scale, false);
        } else {
            this.bodyAnimations[this.state].drawFrame(this.game.clockTick, ctx, this.position.x - this.game.camera.x, this.position.y, this.scale, true);
            this.helmetAnimations[this.state].drawFrame(this.game.clockTick, ctx, this.position.x - this.game.camera.x, this.position.y, this.scale, true);
        }

        this.drawGun(ctx);

        ctx.strokeStyle = 'red';
        ctx.strokeRect(10 + this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);




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

        ctx.drawImage(offscreenCanvas,
            this.position.x - this.game.camera.x - armXOffset, this.position.y - armYOffset,
            this.scale * a.width, this.scale * a.width);


    };

    shootGun() {
        this.isFiring = 1;
    };

    stopShooting() {
        this.isFiring = 0;
    };


    findMouseAngle() {

        //Calculating angle from mouse
        if (gameEngine.mouse !== null) {

            let yOffset = 24 * this.scale;
            let xOffset = 25 * this.scale;

            // console.log('this.position.x: ' + (this.position.x | 0) + ' game.camera.x: ' + (this.game.camera.x | 0) +
            // ' math: ' + ((this.position.x - this.game.camera.x) | 0) );

            let opp = -(gameEngine.mouse.y - (this.position.y - this.game.camera.y) - yOffset);
            let adj = gameEngine.mouse.x - (this.position.x - this.game.camera.x) - xOffset;

            //console.log('Opp: ' + -opp + ' Adj: ' + adj);
            let angle = Math.atan(opp / adj);
            this.degrees = Math.floor(angle * (180 / Math.PI));

            if (opp >= 0 && adj < 0) {
                this.degrees += 180;
            } else if (opp < 0 && adj < 0) {
                this.degrees += 180;
            } else if (opp < 0 && adj >= 0) {
                this.degrees += 360;
            }

        }

    }
};





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
            keys[' '].pressed = true
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
