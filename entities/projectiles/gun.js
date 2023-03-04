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
        
            "Sniper": {
                param: [false, 100, 75, 150, 4, "BULLET"],
                spriteX: 0,
                spriteY: 0,
                index: 0
            },

            "Assault_Rifle": {
                param: [true, 10, 30, 35, 36, "BULLET"],
                spriteX: 0,
                spriteY: 30,
                index: 1
                
            },

            "Plasma_Pistol": {
                param: [false, 40, 7, 20, 1000, "PLASMA"],
                spriteX: 0,
                spriteY: 60,
                index: 2
            },

            // "SMG": {
            //     param: [true, 15, 18, 30, 30, "BULLET"],
            //     spriteX: 0,
            //     spriteY: 0
            // },
            // "Needler":{
            //     param: [true, 10, 10, 30, 22, "NEEDLE"],
            //     spriteX: 0,
            //     spriteY: 0
            // } ,
            // "Rocket_Launcher": {
            //     param: [false, 40, 50, 500, 4, "ROCKET"],
            //     spriteX: 0,
            //     spriteY: 0
            // }
        }

        this.ammoCount = this.guns[this.gunType].param[4];
        this.fireRateCounter = this.guns[this.gunType].param[1];
        this.botCappedFireRate= 0;
        this.reloadCounter = 300; //Timer to slow reload

    }

    update() {
        
        if (!this.worldEntity) {

            if (this.reloading) {
                if (this.reloadCounter != 0) {
                    this.reloadCounter--;
                } else {
                    this.ammoCount = this.guns[this.gunType].param[4];
                    this.reloading = false; //stop reloading
                    this.reloadCounter = 300; //reset reload counter
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
        
        if (!this.worldEntity) { //Make sure gun isn't fire from ground
            //console.log(this.fireRateCounter)
            let gunParams = this.guns[this.gunType].param;
            let isAuto = gunParams[0];
            let firerate = gunParams[1];

            
            if (this.ammoCount > 0) {
                if (firerate === this.fireRateCounter) {
                    
                    new Bullet(
                        this.shooter,
                        this.game,
                        firingPosStatic,
                        targetPosStatic,
                        gunParams[2],
                        gunParams[3],
                        gunParams[5]);

                    
                    this.ammoCount--;
                    this.fireRateCounter--;
                } else {
                    this.fireRateCounter--;
                    if (this.fireRateCounter <= 0) {
                        this.fireRateCounter = firerate;
                    }
                }
                

                if (!isAuto && this.shooter instanceof MasterChief) {
                    this.fireRateCounter = firerate;
                }
                
            } else { //Gun is empty
                if (!isAuto && this.shooter instanceof MasterChief) {
                    this.fireRateCounter = firerate;
                }
                if (!this.shooter instanceof MasterChief) { //Bots need to reload on their own
                    this.reloadGun();
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