class MasterChief {

    constructor(game, position) {

        // Updated the constructor
        Object.assign(this, { game, position});

        this.SpriteSheet = ASSET_MANAGER.getAsset("./sprites/ChiefSprites.png");
        this.GunSpriteSheet = ASSET_MANAGER.getAsset("./sprites/Guns.png");

        this.scale = PARAMS.SCALE;

        this.endGoal = null; //Used to identify endGoal, should be moved to scenemanager though

        this.degrees = null;
        this.aimRight = true;

        this.walkingSpeed = 0.05;
        this.width = 40; //Chief's width
        this.height = 50; //Chief's height

        // Added for Jumping
        this.velocity = { x: 0, y: 0 };
        this.onGround = false;

        /* Cache is 2d array that holds an offscreencanvas for varying gun angles, this is to avoid
        constantly creating offscreen canvases to rotate chief arm/gun and instead store previously
        created canvases into a cache.
        */
        this.cache = []; //For tracking this.angle

        //Chief's gun
        this.currentGun = new Gun(this, game, "SHOTGUN");

        //Bounding Boxes
        this.lastBB = null;
        this.BB = null;
        this.BBXOffset = 10 * this.scale; //Offset for adjusting BB
        this.BBYOffset = 6 * this.scale; //Offset for adjusting BB

        //Animation states for chief's head/body
        this.state = 0; // 0 = Idle, 1 = walking, 2 = jumping
        this.helmet = 0; // 0 = Right, 1 = Down-Right, 2 = Up-Right
        this.shieldDamage = 0; // 0 = Shields not visible, 1 = Shields are visible

        //Animation states for chief's arms/gun firing
        this.isFiring = 0; // 0 = Not firing, 1 = Firing

        // 0 = Sniper, 1 = Assault_Rifle, 2 = Plasma_Pistol, 3 = Plasma_Rifle,
        // 4 = SMG, 5 = SHOTGUN
        this.gunType = this.currentGun.getGunInfo().index; 

 

        this.bodyAnimations = [];
        this.helmetAnimations = [];
        this.gunAnimations = [];
        this.deathAnimation = null;

        //Loads animations into array
        this.loadAnimations();

        // Keeps track of last key pressed
        this.lastKey;

        this.isAlive = true;
        // Health Bar
        this.maxHP = 100;
        this.hp = 100;

        // Shield Bar
        this.maxShield = 200;
        this.shield = 200;
        this.regen = 200;

        this.HUD = new PlayerHUD(this, this.game);
        this.game.addEntity(this.HUD);

        //anytime we move we should call updateBB
        this.updateBB();

    };

    loadAnimations() {

        this.deathAnimation = new Animator(this.SpriteSheet,
            0, 300,
            70, 50,
            5, 0.4,
            0,
            false, false);

        for (let i = 0; i <= 2; i++) { // this.state
            this.bodyAnimations.push([]);
            for (let j = 0; j <= 2; j++) { // this.helmet
                this.bodyAnimations[i].push([]);
                for (let k = 0; k <= 1; k++) { // this.shield
                    this.bodyAnimations[i][j].push([]);
    
                }
            }
        }

        for (let i = 0; i <= 5; i++) { // this.gunType
            this.gunAnimations.push([]);
            for (let j = 0; j <= 1; j++) { // this.isFiring
                this.gunAnimations[i].push([]);
            }
        }


        // 0 = Sniper, 1 = Assault_Rifle, 2 = Plasma_Pistol, 3 = Plasma_Rifle,
        // 4 = SMG, 5 = SHOTGUN

        // ---- GUN ANIMATIONS ----
        // gunType: SNIPER
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

        // gunType: ASSAULT_RFILE
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

        // gunType: PLASMA_PISTOL
        // isFiring: False
        this.gunAnimations[2][0] = new Animator(this.GunSpriteSheet,
            0, 2 * 180,
            180, 180,
            1, 1,
            0,
            false, true);

        // isFiring: True
        this.gunAnimations[2][1] = new Animator(this.GunSpriteSheet,
            0, 2 * 180,
            180, 180,
            2, 0.05,
            0,
            false, false);

        // gunType: PLASMA_RIFLE
        // isFiring: False
        this.gunAnimations[3][0] = new Animator(this.GunSpriteSheet,
            0, 3 * 180,
            180, 180,
            1, 1,
            0,
            false, true);

        // isFiring: True
        this.gunAnimations[3][1] = new Animator(this.GunSpriteSheet,
            0, 3 * 180,
            180, 180,
            3, 0.05,
            0,
            false, false);

        // gunType: SMG
        // isFiring: False
        this.gunAnimations[4][0] = new Animator(this.GunSpriteSheet,
            0, 4 * 180,
            180, 180,
            1, 1,
            0,
            false, true);

        // isFiring: True
        this.gunAnimations[4][1] = new Animator(this.GunSpriteSheet,
            0, 4 * 180,
            180, 180,
            3, 0.05,
            0,
            false, false);

        // gunType: SHOTGUN
        // isFiring: False
        this.gunAnimations[5][0] = new Animator(this.GunSpriteSheet,
            0, 5 * 180,
            180, 180,
            1, 1,
            0,
            false, true);

        // isFiring: True
        this.gunAnimations[5][1] = new Animator(this.GunSpriteSheet,
            0, 5 * 180,
            180, 180,
            3, 0.05,
            0,
            false, false);


        // ---- CHIEF BODY/HEAD ANIMATIONS ----
        // State: Idle
        // Helmet: Right
        // Shields: Not visible
        this.bodyAnimations[0][0][0] = new Animator(this.SpriteSheet,
            0, 0,
            40, 50,
            1, 1,
            0,
            false, true);
        // Helmet: Right
        // Shields: Visible
        this.bodyAnimations[0][0][1] = new Animator(this.SpriteSheet,
            0, 50 * 2,
            40, 50,
            1, 1,
            0,
            false, true);

        // Helmet: Down Right
        // Shields: Not visible
        this.bodyAnimations[0][1][0] = new Animator(this.SpriteSheet,
            0, 50,
            40, 50,
            1, 1,
            0,
            false, true);
        // Helmet: Down Right
        // Shields: Visible
        this.bodyAnimations[0][1][1] = new Animator(this.SpriteSheet,
            0, 50 * 4,
            40, 50,
            1, 1,
            0,
            false, true);

        // Helmet: Up Right
        // Shields: Not visible
        this.bodyAnimations[0][2][0] = new Animator(this.SpriteSheet,
            0, 2 * 50,
            40, 50,
            1, 1,
            0,
            false, true);
        // Helmet: Up Right
        // Shields: Visible
        this.bodyAnimations[0][2][1] = new Animator(this.SpriteSheet,
            0, 5 * 50,
            40, 50,
            1, 1,
            0,
            false, true);


        // State: Walking
        // Helmet: Right
        // Shields: Not visible
        this.bodyAnimations[1][0][0] = new Animator(this.SpriteSheet,
            0, 0,
            40, 50,
            21, this.walkingSpeed,
            0,
            false, true);
        // Helmet: Right
        // Shields: visible
        this.bodyAnimations[1][0][1] = new Animator(this.SpriteSheet,
            0, 50 * 3,
            40, 50,
            21, this.walkingSpeed,
            0,
            false, true);

        // Helmet: Down Right
        // Shields: Not visible
        this.bodyAnimations[1][1][0] = new Animator(this.SpriteSheet,
            0, 50,
            40, 50,
            21, this.walkingSpeed,
            0,
            false, true);
        // Helmet: Down Right
        // Shields: Visible
        this.bodyAnimations[1][1][1] = new Animator(this.SpriteSheet,
            0, 50 * 4,
            40, 50,
            21, this.walkingSpeed,
            0,
            false, true);

         // Helmet: Up Right
         // Shields: Not visible
        this.bodyAnimations[1][2][0] = new Animator(this.SpriteSheet,
            0, 2 * 50,
            40, 50,
            21, this.walkingSpeed,
            0,
            false, true);
        // Helmet: Up Right
         // Shields: Visible
        this.bodyAnimations[1][2][1] = new Animator(this.SpriteSheet,
            0, 5 * 50,
            40, 50,
            21, this.walkingSpeed,
            0,
            false, true);



        // State: Jumping
        // Helmet: Right
        // Shields: Not visible
        this.bodyAnimations[2][0][0] = new Animator(this.SpriteSheet,
            0, 350,
            40, 50,
            1, 0.33,
            0,
            false, true);
        // Helmet: Right
        // Shields: visible
        // this.bodyAnimations[2][0][1] = new Animator(this.SpriteSheet,
        //     0, 450,
        //     40, 50,
        //     3, 2,
        //     0,
        //     false, true);

        // Helmet: Down Right
        // Shields: Not visible
        this.bodyAnimations[2][1][0] = new Animator(this.SpriteSheet,
            0, 400,
            40, 50,
            1, 0.33,
            0,
            false, true);
        // Helmet: Down Right
        // Shields: Visible
        // this.bodyAnimations[2][1][1] = new Animator(this.SpriteSheet,
        //     0, 550,
        //     40, 50,
        //     3, this.walkingSpeed,
        //     0,
        //     false, true);

         // Helmet: Up Right
         // Shields: Not visible
        this.bodyAnimations[2][2][0] = new Animator(this.SpriteSheet,
            0, 450,
            40, 50,
            1, 0.33,
            0,
            false, true);
        // Helmet: Up Right
         // Shields: Visible
        // this.bodyAnimations[2][2][1] = new Animator(this.SpriteSheet,
        //     0, 650,
        //     40, 50,
        //     3, this.walkingSpeed,
        //     0,
        //     false, true);



    };

    updateBB() {
        this.lastBB = this.BB;

        this.BB = new BoundingBox(
            this.position.x + this.BBXOffset, 
            this.position.y + this.BBYOffset, 
            (this.width * this.scale) - (18 * this.scale), 
            (this.height * this.scale) - (10 * this.scale));
    }

    update() {

        //console.log("X: " + (this.velocity.x | 0) + " Y: " + (this.velocity.y | 0));

        // Updater properties
        const TICK = this.game.clockTick;

        if (this.isAlive) {

            //Check if endGoal is reached
            if (this.endGoal !== null) {
                if (this.position.x > this.endGoal.x) {
                    console.log("GAME WON");
                    this.game.sceneManager.scene = 2;
                }
            }

            //Check if chief falls out of bounds
            if (this.position.y > PARAMS.BITWIDTH * 50) {
                this.die();
            }

            //Check if shooting
            if (this.game.mouseDown && gameEngine.mouse !== null) {

                const firingPosStatic = {
                    x: this.position.x + (20 * this.scale),
                    y: this.position.y + (20 * this.scale)
                }

                //Capture the static position
                const targetPosStatic = {
                    x: gameEngine.mouse.x - (20 * this.scale) + this.game.camera.x,
                    y: gameEngine.mouse.y + this.game.camera.y
                }

                //Shoot gun if gun is not empty and not reloading
                let isAuto = this.currentGun.getGunInfo().param[0];

                if (!this.currentGun.isEmpty() 
                    && !this.currentGun.reloading 
                    && isAuto
                    && this.currentGun.canFire) { //Gun is full auto
                    this.isFiring = 1;
                    this.currentGun.shootGun(firingPosStatic, targetPosStatic);

                } else if (!this.currentGun.isEmpty() //Gun is semi-automatic
                    && !this.currentGun.reloading 
                    && !isAuto 
                    && this.fireOnce                    //Gun should fire one time per click
                    && this.currentGun.canFire) { 

                        this.isFiring = 1;
                        this.currentGun.shootGun(firingPosStatic, targetPosStatic);
                        this.fireOnce = false;
                } 

            } else if (!this.game.mouseDown){
                this.fireOnce = true;                   //Resets fire per one click
            }

            //Regen shield if shield is not maxed
            if(this.shield < this.maxShield) {
                this.regenShield();
            }
            

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
    

            if(keys[' '].pressed && this.onGround) {
                if (this.fireSpace) { //Will only jump once
                    this.velocity.y = PLAYER_JUMP;
                    this.onGround = false;
                    this.state = 2;
                    this.fireSpace = false;
                } 
            } else if (!keys[' '].pressed){
                this.fireSpace = true;
            }

            if(keys['r'].pressed && !this.currentGun.reloading) {
                console.log("reloading");
                this.currentGun.reloadGun();
            }

            //Drops gun, used for testing
            if(this.game.keys['l']) {
                console.log("test");
                this.currentGun.dropGun(this.position);
            }


            // *** Physics ***
            if (keys.d.pressed && !keys.a.pressed && this.onGround) { //Moving right

                if(this.midAir) this.velocity.x = 0; this.midAir = false;

                if (Math.abs(this.velocity.x) > PLAYER_PHYSICS.MAX_WALK) {
                    this.velocity.x += PLAYER_PHYSICS.ACC_RUN * TICK;
                } else {
                    this.velocity.x += PLAYER_PHYSICS.ACC_WALK * TICK;
                }

                if (this.aimRight) this.reverseMovement(false);
                else this.reverseMovement(true);
                this.state = 1;
            } else if (keys.a.pressed && !keys.d.pressed && this.onGround) { //Moving left

                if(this.midAir) this.velocity.x = 0; this.midAir = false;

                if (Math.abs(this.velocity.x) > PLAYER_PHYSICS.MAX_WALK) {
                    this.velocity.x -= PLAYER_PHYSICS.ACC_RUN * TICK;
                } else this.velocity.x -= PLAYER_PHYSICS.ACC_WALK * TICK;
                
                if (this.aimRight) this.reverseMovement(true);
                else this.reverseMovement(false);
                this.state = 1;
            } else {
                if (this.onGround) {
                    this.state = 0;
                    this.velocity.x = 0;
                } else {
                    this.midAir = true;
                    //console.log("Adjusting air velocity");
                    if(this.velocity.x > 0) {
                        this.velocity.x -= PLAYER_PHYSICS.ACC_RUN / 4 * TICK;
                    } else {
                        this.velocity.x += PLAYER_PHYSICS.ACC_RUN / 4 * TICK;
                    }
                }
            }
            
            // max speed calculation
            if (this.velocity.x >= PLAYER_PHYSICS.MAX_RUN) this.velocity.x = PLAYER_PHYSICS.MAX_RUN;
            if (this.velocity.x <= -PLAYER_PHYSICS.MAX_RUN) this.velocity.x = -PLAYER_PHYSICS.MAX_RUN;
            // if (this.velocity.x >= PLAYER_PHYSICS.MAX_WALK) this.velocity.x = PLAYER_PHYSICS.MAX_WALK;
            // if (this.velocity.x <= -PLAYER_PHYSICS.MAX_WALK) this.velocity.x = -PLAYER_PHYSICS.MAX_WALK;


        } else { //Chief is dead
            if(keys[' '].pressed) {
                this.game.clearEntities();
                this.game.sceneManager.loadLevel();
            }
        }


        // Allow the player to fall
        this.velocity.y += PLAYER_PHYSICS.ACC_FALL * TICK;

        // max speed calculation for vertical
        if (this.velocity.y >= PLAYER_PHYSICS.MAX_FALL) this.velocity.y = PLAYER_PHYSICS.MAX_FALL;
        if (this.velocity.y <= -PLAYER_PHYSICS.MAX_FALL) this.velocity.y = -PLAYER_PHYSICS.MAX_FALL;

        // update position
        this.position.x += this.velocity.x * TICK * PARAMS.SCALE;
        this.position.y += this.velocity.y * TICK * PARAMS.SCALE;
        
        //console.log(this.velocity.x);

        this.updateBB();

        this.collisionChecker();

        
    };


    collisionChecker() {

        this.game.collisionEntities.forEach(entity => {
            if (entity.BB && this.BB.collide(entity.BB)) { //Collision
                entity.collisionActive = true;
                //FALLING
                if (this.velocity.y > 0) { 
                    if (entity instanceof Tile
                        && this.lastBB.bottom <= entity.BB.top) {

                            this.position.y = entity.BB.top - this.BB.height - this.BBYOffset;
                            this.velocity.y = 0;
                            this.onGround = true;
                            this.updateBB();

                        }
                }

                //JUMPING
                if (this.velocity.y < 0) {
                    if (entity instanceof Tile
                        && (this.lastBB.top) >= entity.BB.bottom) {
                            this.velocity.y = 0;
                            this.updateBB();
                    }
                }

                //Other Tile cases (Hitting side)
                if (entity instanceof Tile
                    && this.BB.collide(entity.topBB) && this.BB.collide(entity.bottomBB)) {
                        entity.collisionActive = true;
                        if (this.BB.collide(entity.leftBB)) { // Touching left side of tile
                            console.log("Left collision");
                            
                            this.position.x = entity.BB.left - this.BB.width - this.BBXOffset;
                            if (this.velocity.x > 0) this.velocity.x = 0;
                        } else if (this.BB.collide(entity.rightBB)) { // Touching right side of tile
                            console.log("Right collision");

                            this.position.x = entity.BB.right  - this.BBXOffset;
                            if (this.velocity.x < 0) this.velocity.x = 0;
                        }
                        //this.updateBB();
                }

                //console.log(this.currentGun)

                //Gun world entity on ground
                if (entity instanceof Gun) {
                    //TODO: Prompt for pickup
                    //console.log("Gun on ground"); 
                    //Press 'E' to pickup Gun
                    if(this.game.keys['e']) {

                        if (this.fireE) { //Will only press E once
                            
                            this.currentGun.dropGun();
                            entity.pickupGun(this); //this replaces shooter in gun
                            this.currentGun = entity;
                            
                            this.gunType = this.currentGun.getGunInfo().index;
                            this.cache = [];
                            this.fireE = false;
                        }
                    } else if (!this.game.keys['e']) {
                        this.fireE = true;
                    }

                }

            }

        });

    };

    draw(ctx) {

        if (this.isAlive) { //CHIEF IS ALIVE

            if (this.aimRight) {
                this.bodyAnimations[this.state][this.helmet][this.shieldDamage].drawFrame(
                    this.game.clockTick, ctx, 
                    this.position.x - this.game.camera.x, 
                    this.position.y - this.game.camera.y, 
                    this.scale, false);

            } else {
                this.bodyAnimations[this.state][this.helmet][this.shieldDamage].drawFrame(
                    this.game.clockTick, ctx, 
                    this.position.x - this.game.camera.x, 
                    this.position.y - this.game.camera.y, 
                    this.scale, true);

            }

            this.drawGun(ctx);

            if (PARAMS.DEBUG && this.BB) {
                //Draw the BB
                ctx.strokeStyle = 'cyan';
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            }

        } else { //CHIEF IS DEAD
            if (this.aimRight) {
                this.deathAnimation.drawFrame(this.game.clockTick, ctx, 
                    this.position.x - this.width - this.game.camera.x, 
                    this.position.y - this.game.camera.y, 
                    this.scale, false);
            } else {
                this.deathAnimation.drawFrame(this.game.clockTick, ctx, 
                    this.position.x - this.game.camera.x, 
                    this.position.y - this.game.camera.y - 30, 
                    this.scale, true);
            }


            if (this.deathAnimation.isDone()) { //Draw last frame when death animation completes
                console.log("DEATH DONE");
                if (this.aimRight) {
                    this.deathAnimation.drawSpecificFrame(this.game.clockTick, ctx, 
                        this.position.x - this.width - this.game.camera.x, 
                        this.position.y - this.game.camera.y, 
                        this.scale, false, 4);
                } else {
                    this.deathAnimation.drawSpecificFrame(this.game.clockTick, ctx, 
                        this.position.x - this.game.camera.x, 
                        this.position.y - this.game.camera.y - 30, 
                        this.scale, true, 4);
                }
            }
            
        }



    };

    /**
     * Method will rotate chief's arm/gun and draw it depending on the direction
     * the player is aiming.
     * @param {*} ctx 
     */
    drawGun(ctx) {

        this.findMouseAngle(); //Get angle in degrees player is aiming, sets to global this.degrees

        //Grabs animator object for gun, manually resets to first frame (idle, not shooting) once animation completes.
        let a = this.gunAnimations[this.gunType][this.isFiring];
        a.elapsedTime += this.game.clockTick;
            if (a.isDone()) {
                if (a.loop) {
                    a.elapsedTime -= a.totalTime;
                }
                else {
                    //Reset animation once complete
                    a.reset();
                    this.isFiring = 0; //After firing one bullet, firing animation returns to idle
                }
            }
        let frame = a.currentFrame();
        if (a.reverse) frame = a.frameCount - frame - 1;

        // Will only draw a new offscreencanvas if the gun was never drawn at this.degrees and the animator frame prior
        if (!this.cache[ [this.degrees, frame] ]) { 

            let radians = -this.degrees / 360 * 2 * Math.PI; //Convert degrees to radians

            //Offscreen canvas conversions depend on direction player is aiming
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
            this.cache[[this.degrees, frame]] = offscreenCanvas; //Cache the offscreen canvas to avoid redrawing in the future
            
        }


        //Adjust arm position depending on face
        if (this.aimRight) {
            var armXOffset = (76 * this.scale);
        } else {
            var armXOffset = (64 * this.scale);
        }
        var armYOffset = (72 * this.scale);

        
        //Draw the gun/arm
        ctx.drawImage(this.cache[[this.degrees, frame]],
            (this.position.x - this.game.camera.x) - armXOffset, (this.position.y - this.game.camera.y) - armYOffset,
            this.scale * a.width, this.scale * a.width);


    };
    
    findMouseAngle() {

        //Calculating angle from mouse
        if (gameEngine.mouse !== null) {

            let yOffset = 24 * this.scale;
            let xOffset = 25 * this.scale;

            let opp = -(gameEngine.mouse.y - (this.position.y - this.game.camera.y) - yOffset);
            let adj = gameEngine.mouse.x - (this.position.x - this.game.camera.x) - xOffset;

            let angle = Math.atan(opp / adj);
            this.degrees = Math.floor(angle * (180 / Math.PI));

            //Correct angle to represent 360 degrees around player
            if (opp >= 0 && adj < 0) {
                this.degrees += 180;
            } else if (opp < 0 && adj < 0) {
                this.degrees += 180;
            } else if (opp < 0 && adj >= 0) {
                this.degrees += 360;
            }

            /* This code will change the angle of chief's helmet depending on where he is aiming (low, normal, high).
            *  The animation time is captured as changing states rapidly like this leads to animations between the body
            *  parts to desync.  timeSync is used to sychronize body/head animations.
            */
            //Record the current elapsed time of animation state
            let timeSync = this.bodyAnimations[this.state][this.helmet][this.shieldDamage].elapsedTime;
            //Set helmet animation
            if ((this.degrees <= 90 && this.degrees > 30) || (this.degrees > 90 && this.degrees <= 150)) {
                this.helmet = 2;
            } else if ((this.degrees >= 270 && this.degrees < 330) || (this.degrees < 270 && this.degrees > 210)) {
                this.helmet = 1;
            } else {
                this.helmet = 0;
            }
            //Restore prev captured animation elapsed time (This will sync the animations)
            this.bodyAnimations[this.state][this.helmet][this.shieldDamage].elapsedTime = timeSync;

        }

    };

    /**
     * Sets animation reverse flag to cond. Mainly used to reverse walking animation when walking
     * backwards.
     * @param {boolean} cond 
     */

    reverseMovement(cond) {
        this.bodyAnimations[this.state][this.helmet][this.shieldDamage].reverse = cond;
    };



    takeDamage(dmg) {
        this.regen = 200;

        if(this.shield > 0) {
            this.shield -= dmg;
            if (this.shield <= 0) dmg = Math.abs(this.shield);
        }
        if (this.shield <= 0 && this.hp > 0) {
            this.shield = 0;
            this.hp -= dmg;
        } 
        if (this.hp <= 0 ) {
            this.hp = 0;
            this.die();
        }
    }


    addHealth() {
        // Add to HP
    }

    regenShield() {
        if (this.shield < this.maxShield) {
            if (this.regen > 0) {
                this.regen--;
            } else {
                this.shield += 2;
            }
        } else {
            this.regen = 200;
        }
    }

    die() {
        this.isAlive = false;
        this.velocity.x = 0;
        this.game.sceneManager.scene = 3;
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
    },
    r: { // reload key
        pressed: false
    }
     
}

// *** KeyDown ***
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        // Player Keys
        case 'd':
            keys.d.pressed = true;
            this.lastKey = 'd';
            break
        case 'a':
            keys.a.pressed = true;
            this.lastKey = 'a';
            break
        case ' ':
            keys[' '].pressed = true;
            break
        case 'r':
            keys.r.pressed = true;
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
        case 'r':
            keys.r.pressed = false;
            break
    }
})