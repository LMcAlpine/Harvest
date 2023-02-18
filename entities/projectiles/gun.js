/*
    Gun class includes type of gun, bullet damage, fire rate

*/

class Gun {
    constructor(shooter, game, gunType) {
        Object.assign(this, { shooter, game, gunType});

        /* 
            Each gun has an array dictating
            [isAutomatic, Max Firerate, Bullet Velocity, bullet damage]
        */
        this.guns = {
            "Assault_Rifle": [true, 8, 15, 35],
            "Sniper": [false, 100, 75, 150],
            "Plasma_Pistol": [false, 40, 7, 20],
            "SMG": [true, 15, 18, 30],
            "Needler": [true, 10, 10, 30]
        }

        this.fireRateCounter = this.guns[this.gunType][1];
        this.botCappedFireRate= 0;

    }

    //TODO fix this
    shootGun(firingPosStatic, targetPosStatic) {
        
        //console.log(this.fireRateCounter)
        let isAuto = this.guns[this.gunType][0];
        let firerate = this.guns[this.gunType][1];

        if (firerate === this.fireRateCounter) {
            
            new Bullet(
                this.shooter,
                this.game,
                firingPosStatic,
                targetPosStatic,
                this.guns[this.gunType][2],
                this.guns[this.gunType][3]);

            

            this.fireRateCounter--;
        } else {
            this.fireRateCounter--;
            if (this.fireRateCounter <= 0) {
                this.fireRateCounter = firerate;
            }
        }

        if (!isAuto && this.shooter instanceof MasterChief) {
            console.log("CHEK");
            this.shooter.isFiring = 0;
            this.fireRateCounter = firerate;
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
    /**
     * 
     * @param {String} gunType 
     */
    updateGunType(gunType) {
        this.gunType = gunType;
    }


}