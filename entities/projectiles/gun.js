/*
    Gun class includes type of gun, bullet damage, fire rate

*/

class Gun {
    constructor(shooter, game, gunType) {
        Object.assign(this, { shooter, game, gunType});

        /* 
            Each gun has an array dictating
            [isAutomatic, Max Firerate, Bullet Velocity, Bullet Damage, Magazine Size, projectileType]
        */
        this.guns = {
            "Assault_Rifle": [true, 10, 15, 35, 36, "BULLET"],
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
        if (this.reloading) {
            if (this.reloadCounter != 0) {
                console.log("RELOADING");
                this.reloadCounter--;
            } else {
                this.ammoCount = this.guns[this.gunType][4];
                this.reloading = false; //stop reloading
                this.reloadCounter = 300; //reset reload counter
            }
            
        }
    }

    draw(ctx) {

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

        // if (!isAuto) { //Semi-auto guns
        //     if (this.shooter) { //Chief is shooting
        //         new Bullet(
        //             this.shooter,
        //             this.game,
        //             firingPosStatic,
        //             targetPosStatic,
        //             this.guns[this.gunType][2],
        //             this.guns[this.gunType][1]);
    
        //         this.shooter.isFiring = 0; //Stop shooting
   
            
    
        // } else { //Automatic guns
        //     if (firerate === this.fireRateCounter) {

        //         new Bullet(
        //             this.shooter,
        //             this.game,
        //             firingPosStatic,
        //             targetPosStatic,
        //             this.guns[this.gunType][2],
        //             this.guns[this.gunType][1]);

        //         this.fireRateCounter--;
        //     } else {
        //         if (this.fireRateCounter >= this.guns[this.gunType][0]) { //Reset counter when reaching firerate
        //             firerate === this.fireRateCounter;
        //         }
        //     }
            
        // }

        
        
    }

    reloadGun() {
        console.log("RELOADING");
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