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

        this.degrees = null;
        this.aimRight = true;

        this.scale = 3;
        this.walkingSpeed = 0.07;

        this.width = 30;
        this.height = 47;

        // Added for Jumping
        this.velocity = { x: 0, y: 0 };
        this.onGround = true;

        

        this.bodyAnimations = [];
        this.helmetAnimations = [];
        this.gunAnimations = [];
        //Loads animations into array
        this.loadAnimations();

        //anytime we move we should call updateBB
        this.updateBB();

        // Keeps track of last key pressed
        this.lastKey;

        // Health Bar
        this.maxHP = 100;
        this.hp = 90;
        
        // Shield Bar
        this.maxShield = 100;
        this.shield = 25;
        this.regen = 400;

        this.healthBar = new MasterHealthBar(this, this.game);
        //Why does this get added to the beginning of the entity list when it should be at the
        //end with this syntax???
        this.game.addEntity(this.healthBar);
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
        // this.BB = new BoundingBox(this.position.x, this.position.y, PARAMS.BLOCKWIDTH * this.scale, PARAMS.BLOCKWIDTH * this.scale);
        this.BB = new BoundingBox(this.position.x + (6 * this.scale), this.position.y, (this.bodyAnimations[this.state].width - 10) * this.scale, PARAMS.BLOCKWIDTH * this.scale);
    }

    update() {
        if(this.shield < this.maxShield) {
            this.regenShield();
        }
        
        // Updater properties
        const TICK = this.game.clockTick;

        //Calculate if player is aiming to right or left of player model
        if (this.game.mouse !== null) {
            let xOffset = 20 * this.scale;
            const x = this.game.mouse.x - (this.position.x - this.game.camera.x) - xOffset;
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
                this.reverseMovement(false);
            } else {
                this.reverseMovement(true);
            }

            this.state = 1;
            //this.x += 3;
            this.velocity.x += PLAYER_PHYSICS.MAX_RUN * TICK;
            this.position.x += this.velocity.x * TICK;
        }

        else if (this.game.keys['a']) {

            //Check direction user is aiming to dictate walking forward or reverse
            if (this.aimRight) {
                this.reverseMovement(true);
            } else {
                this.reverseMovement(false);
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
        if(keys[' '].pressed && this.onGround) {
            this.velocity.y = PLAYER_JUMP;
            this.onGround = false;
            // this.position.y += -PLAYER_JUMP;
            console.log('up')
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
                        that.position.y = entity.BB.top - PARAMS.BLOCKWIDTH * that.scale;
                        that.velocity.y = 0;
                        that.updateBB();
                        that.onGround = true;
                    }

                }
            }
        })
    };

    jump() {
        this.velocity.y -= PLAYER_PHYSICS.JUMP_HEIGHT;
        this.position.y -= PLAYER_PHYSICS.JUMP_HEIGHT;
    };

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
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    };

    drawGun(ctx) {

        // ctx.strokeStyle = "Blue";
        // ctx.strokeRect(this.position.x - this.game.camera.x - 20, this.position.y - this.game.camera.y + 20, 40, 40);
        // ctx.save();

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


        //Adjust arm position depending on face
        if (this.aimRight) {
            var armXOffset = (76 * this.scale);
        } else {
            var armXOffset = (64 * this.scale);
        }
        var armYOffset = (72 * this.scale);

        ctx.drawImage(offscreenCanvas,
            (this.position.x - this.game.camera.x) - armXOffset, (this.position.y - this.game.camera.y) - armYOffset,
            this.scale * a.width, this.scale * a.width);


    };

    shootGun() {

        this.isFiring = 1;

        //Capture 
        const firingPosStatic = {
            x: this.position.x + (20 * this.scale),
            y: this.position.y + (15 * this.scale)
        }

        //Capture the static position
        const targetPosStatic = {
            x: gameEngine.mouse.x - (20 * this.scale),
            y: gameEngine.mouse.y
        }

        let bullet = new Bullet(
            this,
            this.game,
            16,
            firingPosStatic,
            targetPosStatic,
            1);

        this.game.addEntityToFront(bullet);

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

    };

    reverseMovement(cond) {
        this.bodyAnimations[this.state].reverse = cond;
        this.helmetAnimations[this.state].reverse = cond;
    };

    takeDMG() {
        this.regen = 400;
        if(this.shield != 0) {
            //TODO
            // subtract shield
        } else if (this.shield == 0 && this.hp > 0) {
            //TODO
            // subtract HP
        } else {
            // Dead
        }
    }

    addHealth() {
        // Add to Shield
        // Add to HP
    }

    regenShield() {
        if(this.shield < this.maxShield) {
            if(this.regen > 0) {
                this.regen--;
            } else {
                this.shield++;
            }
        } else {
            this.regen = 400;
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
            break
    }
})
