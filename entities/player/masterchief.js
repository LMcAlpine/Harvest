class MasterChief {
    constructor(game, position, collisionBlocks) {

        // Updated the constructor
        Object.assign(this, { game, position, collisionBlocks });

        //this.game = game;
        this.cache = [];

        this.level = ASSET_MANAGER.getAsset("./img/testmap.png");

        this.SpriteSheet = ASSET_MANAGER.getAsset("./sprites/ChiefSprites.png");
        this.RotationSpriteSheet = ASSET_MANAGER.getAsset("./sprites/sniper1.png");

        //Animation States
        this.state = 0; // 0 = Idle, 1 = walking
        this.facing = 0; // 0 = right, 1 = left


        this.aimRight = true;
        this.reverse = false;
        //this.angle = 0; //Angle gun is aiming
        this.shoot = false;

        // this.x = 300;
        // this.y = 300;
        this.walkingSpeed = 0.07;

        this.width = 30;
        this.height = 47;


        // Added for Jumping
        this.velocity = { x: 0, y: 0 };
        this.inAir = false;

        this.bodyAnimations = [];
        this.helmetAnimations = [];
        this.armAnimations = [];
        this.loadAnimations();

        this.rectangle = function () {
            this.game.ctx.strokeStyle = "Blue";
            this.game.ctx.strokeRect(this.x, this.y, 25, 2);
            this.game.ctx.save();
        }

        //this.hitbox = { position: { x: this.position.x, y: this.position.y }, width: 10, height: 10 };

        this.camera = { position: { x: this.position.x, y: this.position.y }, width: 200, height: 80 };

    };

    loadAnimations() {
        for (let i = 0; i <= 1; i++) { // this.state
            this.bodyAnimations.push([]);
            this.helmetAnimations.push([]);
            this.armAnimations.push([]);
            for (let j = 0; j <= 1; j++) { // this.facing
                this.bodyAnimations[i].push([]);
                this.helmetAnimations[i].push([]);
                this.armAnimations[i].push([]);
            }
        }

        this.armAnimations[0][0] = new Animator(this.RotationSpriteSheet,
            0, 0,
            90, 90,
            1, 1,
            0,
            false, true);



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


    }

    update() {

        // Updater properties
        const TICK = this.game.clockTick;

        // this.hitbox = { position: { x: this.position.x + 15, y: this.position.y + 3 }, width: 30, height: 10 };


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

        if (this.game.keys['d']) {
            if (this.aimRight) {
                this.facing = 0;
                this.bodyAnimations[this.state][this.facing].reverse = false;


            } else {
                this.facing = 1;
                this.bodyAnimations[this.state][this.facing].reverse = true;
            }

            this.state = 1;
            //this.x += 3;
            //  this.velocity.x += PLAYER_PHYSICS.MAX_RUN * TICK;
            this.velocity.x += PLAYER_PHYSICS.MAX_RUN * TICK;
            this.position.x += this.velocity.x * TICK;
        }
        else if (this.game.keys['a']) {
            // console.log("HERE");

            if (this.aimRight) {
                this.facing = 0;
                this.bodyAnimations[this.state][this.facing].reverse = true;
            } else {
                this.facing = 1;
                this.bodyAnimations[this.state][this.facing].reverse = false;
            }
            this.state = 1;
            //this.x -= 3;
            this.velocity.x -= PLAYER_PHYSICS.MAX_RUN * TICK;
            this.position.x += this.velocity.x * TICK;
        } else if (this.game.keys[' '] || this.game.keys['Space']) { // Jumping TODO: JUMP WHILE RUNNING!
            this.jump();
        } else {
            this.state = 0;
        }

        this.checkForHorizontalCollisions();


        // Allow the player to fall
        this.velocity.y += PLAYER_PHYSICS.MAX_FALL * TICK;

        // Update the player x and y
        // this.position.x += this.velocity.x * TICK;
        this.position.y += this.velocity.y * TICK;


        this.checkForVerticalCollisions();

    };

    // This method will jump the player
    jump() {
        this.velocity.y -= PLAYER_PHYSICS.JUMP_HEIGHT;
        this.inAir = true;
    }


    draw(ctx) {
        ctx.save();
        ctx.scale(4, 4);



        //ctx.save();
        // ctx.scale(4, 4);





        ctx.fillStyle = 'rgba(0,0,255,0.2)';
        ctx.translate(0, -this.level.height + (PARAMS.CANVAS_HEIGHT / 4) + 150);

        ctx.fillRect(this.camera.position.x, this.camera.position.y, this.camera.width, this.camera.height);


        //  ctx.drawImage(this.level, 0, 0);

        //  ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);



        // this.collisionBlocks.forEach(collisionBlock => {
        //collisionBlock.draw(ctx);
        // ctx.fillStyle = 'rgba(255,0,0,0.5)';


        // console.log(this.width);
        //  ctx.fillRect(collisionBlock.position.x, collisionBlock.position.y, 16, 16);
        // })
        // ctx.restore();

        this.bodyAnimations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.position.x, this.position.y, 1);
        this.helmetAnimations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.position.x, this.position.y, 1);

        var degrees = 0;
        //Calculating angle from mouse
        if (gameEngine.mouse !== null) {

            let yOffset = 32;
            let xOffset = 25;

            let opp = -(gameEngine.mouse.y - this.position.y - yOffset);
            let adj = gameEngine.mouse.x - this.position.x - xOffset;

            //console.log('Opp: ' + -opp + ' Adj: ' + adj);
            let angle = Math.atan(opp / adj);
            degrees = Math.floor(angle * (180 / Math.PI));

            if (opp >= 0 && adj < 0) {
                degrees += 180;
            } else if (opp < 0 && adj < 0) {
                degrees += 180;
            } else if (opp < 0 && adj >= 0) {
                degrees += 360;
            }


            console.log(degrees + ' degrees');

        }
        ///  this.drawGun(ctx, degrees);
        ctx.restore();

    };

    drawGun(ctx, angle) {



        if (!this.cache[angle]) {
            let radians = -angle / 360 * 2 * Math.PI;

            if (this.aimRight) {
                //console.log('Aim Right');
                var offscreenCanvas = rotateImage(this.RotationSpriteSheet,
                    0, 0,
                    180, 180,
                    radians, 1,
                    false);

            } else {
                //console.log('Aim Left');
                var offscreenCanvas = rotateImage(this.RotationSpriteSheet,
                    0, 0,
                    180, 180,
                    -radians - Math.PI, 1,
                    true);


            }

            this.cache[angle] = offscreenCanvas;
        }

        //Offset to shift chief's shoulder back in it's socker when he changes face
        if (this.aimRight) {
            var armXOffset = 154 / 4;
        } else {
            var armXOffset = 126 / 4;
        }

        ctx.drawImage(this.cache[angle],
            this.position.x - armXOffset, this.position.y - 146 / 4,
            1 * 180, 1 * 180);


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
    }


    // applyGravity() {

    //     this.position.y += this.velocity.y;
    //     this.velocity.y += this.gravity;

    // }

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
    }

}