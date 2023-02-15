/*
    Gun class includes type of gun, bullet damage, fire rate

*/

class Gun {
    constructor(shooter, game, gunType) {
        Object.assign(this, { shooter, game, gunType});

        /* 
            Each gun has an array dictating
            [Fire Rate per Tick (0 indicates semi-auto), Bullet Damage, Bullet Velocity]
        */
        this.guns = {
            "Assault_Rifle": [10, 35, 15],
            "Sniper": [0, 150, 75],
            "Plasma_Pistol": [0, 20, 7],
            "SMG": [15, 25, 18],
            "Needler": [10, 30, 10]
        }

        this.fireRateCounter = 0;
        //this.stopShooting = false;

        console.log(gunType);

    }

    shootGun(firingPosStatic, targetPosStatic) {
        console.log(this.fireRateCounter);
        let firerate = this.guns[this.gunType][0];

        if (firerate === 0) { //Semi-auto guns
            new Bullet(
                this.shooter,
                this.game,
                firingPosStatic,
                targetPosStatic,
                this.guns[this.gunType][2],
                this.guns[this.gunType][1]);

            this.shooter.isFiring = 0;
    
        } else { //Automatic guns
            if (this.fireRateCounter === 0) {
                console.log("Firing bullet");
                new Bullet(
                    this.shooter,
                    this.game,
                    firingPosStatic,
                    targetPosStatic,
                    this.guns[this.gunType][2],
                    this.guns[this.gunType][1]);
                this.fireRateCounter++;
            } else {
                this.fireRateCounter++;
                if (this.fireRateCounter >= this.guns[this.gunType][0]) { //Reset counter when reaching firerate
                    this.fireRateCounter = 0;
                }
            }
            
        }

        
        
    }
    /**
     * 
     * @param {String} gunType 
     */
    updateGunType(gunType) {
        this.gunType = gunType;
    }


}