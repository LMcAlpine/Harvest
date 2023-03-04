/*
    Gun class includes type of gun, bullet damage, fire rate

*/

class Gun {
    constructor(shooter, game, gunType) {
        Object.assign(this, { shooter, game, gunType});

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

        /* 
            Each gun has an array dictating
            [isAutomatic, Max Firerate, Bullet Velocity, Bullet Damage, Magazine Size, projectileType]
        */
        this.guns = {
            "Assault_Rifle": [true, 10, 30, 35, 36, "BULLET"],
            "Sniper": [false, 100, 75, 150, 4, "BULLET"],
            "Plasma_Pistol": [false, 40, 7, 20, 1000, "PLASMA"],
            "SMG": [true, 15, 18, 30, 30, "BULLET"],
            "Needler": [true, 10, 10, 30, 22, "NEEDLE"],
            "Rocket_Launcher": [false, 40, 50, 500, 4, "ROCKET"],
        }

        this.ammoCount = this.guns[this.gunType][4];
        this.fireRateCounter = this.guns[this.gunType][1];
        this.botCappedFireRate= 0;
        this.reloadCounter = 300; //Timer to slow reload

    }

    update() {
        if (!this.worldEntity) {
            if (this.reloading) {
                if (this.reloadCounter != 0) {
                    this.reloadCounter--;
                } else {
                    this.ammoCount = this.guns[this.gunType][4];
                    this.reloading = false; //stop reloading
                    this.reloadCounter = 300; //reset reload counter
                }
                
            }
        } else {
            
            this.physics();
            this.updateBB();
            this.checkCollisions();
        }
    }

    updateBB() {

    }

    draw(ctx) {

        if (this.worldEntity) {

        }

    }

    shootGun(firingPosStatic, targetPosStatic) {
        
        //console.log(this.fireRateCounter)
        let isAuto = this.guns[this.gunType][0];
        let firerate = this.guns[this.gunType][1];

        
        if (this.ammoCount > 0) {
            if (firerate === this.fireRateCounter) {
                
                new Bullet(
                    this.shooter,
                    this.game,
                    firingPosStatic,
                    targetPosStatic,
                    this.guns[this.gunType][2],
                    this.guns[this.gunType][3],
                    this.guns[this.gunType][5]);

                
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

    physics() {


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

    getMagazineSize() {
        return this.guns[this.gunType][4];
    }

    isEmpty() {
        return this.ammoCount <= 0;
    }


}