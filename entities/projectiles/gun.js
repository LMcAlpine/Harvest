/*
    Gun class includes type of gun, bullet damage, fire rate

*/

class Gun {
    constructor(shooter, game, gunType) {
        Object.assign(this, { shooter, game, gunType});

        this.gunSprites = ASSET_MANAGER.getAsset("./sprites/GunWorldEntities.png");
        
        this.spriteWidth = 75;
        this.spriteHeight = 30;

        this.worldEntity = false; //When checked, gun will be displayed as a world entity.
        this.velocity = {
            x: 0,
            y: 0
        }
        this.position = {
            x: 0,
            y: 0
        }

        this.BB = null;
        this.BBXOffset = 1 * PARAMS.SCALE; //Offset for adjusting BB
        this.BBYOffset = 15 * PARAMS.SCALE; //Offset for adjusting BB

        this.updateBB();
        this.game.addEntity(this);
        this.game.addCollisionEntity(this);

        /* 
            Each gun has an array dictating
            [isAutomatic, Max Firerate, Bullet Velocity, Bullet Damage, Magazine Size, projectileType]
            spriteX and spriteY are coords on the spritesheet for each gun.

        */
        this.guns = {
        
            "SNIPER": {
                param: [false, 0.2, 75, 200, 4, "BULLET"],
                bulletDistance: 300 * PARAMS.SCALE,
                spriteX: 0,
                spriteY: 0,
                crosshairY: 250,
                index: 0
            },

            "ASSAULT_RIFLE": {
                param: [true, 0.05, 30, 30, 36, "BULLET"],
                bulletDistance: 300 * PARAMS.SCALE,
                spriteX: 0,
                spriteY: 30,
                crosshairY: 0,
                index: 1
                
            },

            "PLASMA_PISTOL": {
                param: [false, 0.2, 7, 20, 1000, "PLASMA"],
                bulletDistance: 350 * PARAMS.SCALE,
                spriteX: 0,
                spriteY: 60,
                crosshairY: 50,
                index: 2
            },

            "PLASMA_RIFLE": {
                param: [true, 0.12, 18, 30, 200, "PLASMA"],
                bulletDistance: 290 * PARAMS.SCALE,
                spriteX: 0,
                spriteY: 90,
                crosshairY: 200,
                index: 3
            },

            "SMG": {
                param: [true, 0.02, 22, 10, 60, "BULLET"],
                bulletDistance: 260 * PARAMS.SCALE,
                spriteX: 0,
                spriteY: 120,
                crosshairY: 300,
                index: 4
            },

            "SHOTGUN": {
                param: [false, 0.2, 18, 150, 6, "BULLET"], 
                bulletDistance: 100 * PARAMS.SCALE,
                spriteX: 0,
                spriteY: 150,
                crosshairY: 100,
                index: 5
            }
            
            // "Rocket_Launcher": {
            //     param: [false, 40, 50, 500, 4, "ROCKET"],
            //     spriteX: 0,
            //     spriteY: 0
            // }
        }

        this.ammoCount = this.guns[this.gunType].param[4];
        this.fireRateCounterMax = this.guns[this.gunType].param[1];
        this.fireRateCounter = 0;
        this.canFire = true;
        this.botCappedFireRate = 0;
        this.reloadCounter = 0; //Timer to slow reload
        this.reloadCounterMax = 1;
        this.updateBB();
    }

    update() {

        const TICK = this.game.clockTick;
        
        if (!this.worldEntity) {

            if (this.reloading) {
                //console.log(this.reloadCounter);
                if (this.reloadCounter < this.reloadCounterMax) {
                    this.reloadCounter += TICK;
                } else {
                    this.ammoCount = this.guns[this.gunType].param[4];
                    this.reloading = false; //stop reloading
                    this.reloadCounter = 0; //reset reload counter
                }
                
            }

            if (this.fireRateCounter !== 0) {

                //console.log(this.fireRateCounter);
                this.fireRateCounter += 0.5 * TICK;
                //console.log(this.fireRateCounter);
                if (this.fireRateCounter >= this.fireRateCounterMax) {
                    this.fireRateCounter = 0;
                    this.canFire = true;
                }
            }

        } else {
            this.updateBB();
            this.physics();
            this.checkCollisions();
        }
        
    }

    updateBB() {

        this.lastBB = this.BB;

        this.BB = new BoundingBox(
            this.position.x + this.BBXOffset, 
            this.position.y + this.BBYOffset, 
            (this.spriteWidth * PARAMS.SCALE) - (45 * PARAMS.SCALE), 
            (this.spriteHeight * PARAMS.SCALE) - (15 * PARAMS.SCALE));

    }

    draw(ctx) {

        if (this.worldEntity) {

            if (PARAMS.DEBUG && this.BB) {
                //Draw the BB
                ctx.strokeStyle = 'cyan';
                ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            }

            ctx.drawImage(this.gunSprites,
                0, this.guns[this.gunType].spriteY, //source from sheet
                this.spriteWidth, this.spriteHeight,
                this.position.x - this.game.camera.x, this.position.y - this.game.camera.y,
                this.spriteWidth * PARAMS.SCALE,
                this.spriteHeight * PARAMS.SCALE);

        }
    }

    shootGun(firingPosStatic, targetPosStatic) {

        const TICK = this.game.clockTick;
        
        if (!this.worldEntity) { //Make sure gun isn't fire from ground

            let gunParams = this.guns[this.gunType].param;

            //Gun mechanics
                if (this.ammoCount > 0) {

                    if (this.fireRateCounter === 0) {
                        new Bullet(
                            this.shooter,
                            this.game,
                            firingPosStatic,
                            targetPosStatic,
                            gunParams[2],
                            gunParams[3],
                            gunParams[5],
                            this.guns[this.gunType].bulletDistance
                        );

                        this.canFire = false;
                        this.ammoCount--;
                        this.fireRateCounter += 0.1 * TICK;

                    } 

                }

        }
        
    }

    physics() {

        const TICK = this.game.clockTick;
        // Allow the gun to fall
        this.velocity.y += PLAYER_PHYSICS.ACC_FALL * TICK;

        // max speed calculation for vertical
        if (this.velocity.y >= PLAYER_PHYSICS.MAX_FALL) this.velocity.y = PLAYER_PHYSICS.MAX_FALL;
        if (this.velocity.y <= -PLAYER_PHYSICS.MAX_FALL) this.velocity.y = -PLAYER_PHYSICS.MAX_FALL;

        // update position
        this.position.x += this.velocity.x * TICK * PARAMS.SCALE;
        this.position.y += this.velocity.y * TICK * PARAMS.SCALE;
    }

    checkCollisions() {
        this.game.collisionEntities.forEach(entity => {
                    if (entity.BB && this.BB.collide(entity.BB)) { //Collision
                        entity.collisionActive = true;
                        //FALLING
                        if (this.velocity.y > 0) { 
                            if (entity instanceof Tile
                                && this.lastBB.bottom <= entity.BB.top) { //Possible bug where lastBB is not defined

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
                                    if (this.velocity.x > 0) this.velocity.x = 5;
                                } else if (this.BB.collide(entity.rightBB)) { // Touching right side of tile
                                    console.log("Right collision");

                                    this.position.x = entity.BB.right  - this.BBXOffset;
                                    if (this.velocity.x < 0) this.velocity.x = -5;
                                }
                                //this.updateBB();
                        }

                    }

        });
    }

    /**
     * Gun will drop from player/enemy holding it and spawn as world entity
     * @param {position} dropPosition 
     */
    dropGun() {

        this.position.x = this.shooter.position.x;
        this.position.y = this.shooter.position.y;
        this.shooter = null;
        this.worldEntity = true;

    }

    //Pick gun up from the ground
    pickupGun(shooter) {

        this.shooter = shooter;
        this.BB = null;
        this.worldEntity = false;
    }

    reloadGun() {
        this.reloading = true;
    }

    /**
     * 
     * @param {String} gunType 
     */
    updateGunType(gunType) {
        this.gunType = gunType;
    }

    getCurrentAmmo() {
        return this.ammoCount;
    }

    getGunInfo() {
        return this.guns[this.gunType];
    }

    getMagazineSize() {
        return this.guns[this.gunType].param[4];
    }

    isEmpty() {
        return this.ammoCount <= 0;
    }


}