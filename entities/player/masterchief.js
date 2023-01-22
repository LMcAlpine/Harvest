class MasterChief {
    constructor(game) {
        this.game = game;
        this.cache = [];

        this.SpriteSheet = ASSET_MANAGER.getAsset("./sprites/ChiefSprites.png");
        this.GunSpriteSheet = ASSET_MANAGER.getAsset("./sprites/sniper1.png");

        //Animation states for chief's head/body
        this.state = 0; // 0 = Idle, 1 = walking
        this.facing = 0; // 0 = right, 1 = left

        //Animation states for chief's arms/gun firing
        this.isFiring = 0; // 0 = Not firing, 1 = Firing
        this.gunType = 0; // 0 = Sniper Rifle, More to come

        this.aimRight = true;
        this.reverse = false;
        

        this.x = 300;
        this.y = 300;
        this.walkingSpeed = 0.07;
        
        this.bodyAnimations = [];
        this.helmetAnimations = [];
        this.gunAnimations = [];
        this.loadAnimations();

        this.rectangle = function() {
            this.game.ctx.strokeStyle = "Blue";
            this.game.ctx.strokeRect(this.x, this.y, 25, 2);
            this.game.ctx.save();
        }
    };

    loadAnimations() {
        for (let i = 0; i <= 1; i++) { // this.state
            this.bodyAnimations.push([]);
            this.helmetAnimations.push([]);
            for (let j = 0; j <= 1; j++) { // this.facing
                this.bodyAnimations[i].push([]);
                this.helmetAnimations[i].push([]);
            }
        }

        for (let i = 0; i <= 1; i++) { // this.gunType
            this.gunAnimations.push([]);
            for (let j = 0; j <= 0; j++) { // this.isFiring
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
            3, 0.1,
            0,
            false, true);

            //console.log(this.gunAnimations[0][0]);
        // ---- CHIEF BODY/HEAD ANIMATIONS ----
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

        //Calculate if player is aiming to right or left of player model
        if (this.game.mouse !== null) {
            let xOffset = 25;
            const x = this.game.mouse.x - this.x - xOffset;
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
            this.x += 3;
        }
        else if (this.game.keys['a']) {

            if (this.aimRight) {
                this.facing = 0;
                this.bodyAnimations[this.state][this.facing].reverse = true;
            } else {
                this.facing = 1;
                this.bodyAnimations[this.state][this.facing].reverse = false;
            }
            this.state = 1;
            this.x -= 3;
        }
        else {
            this.state = 0;
        }

        
        
    };

    draw(ctx) {

        this.bodyAnimations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);     
        this.helmetAnimations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);   

        var degrees = 0;
        //Calculating angle from mouse
        if (gameEngine.mouse !== null) {

            let yOffset = 32;
            let xOffset = 25;

            let opp = -(gameEngine.mouse.y - this.y - yOffset);
            let adj = gameEngine.mouse.x - this.x - xOffset;

            //console.log('Opp: ' + -opp + ' Adj: ' + adj);
            let angle = Math.atan(opp / adj);
            degrees = Math.floor(angle * (180/Math.PI));

            if (opp >= 0 && adj < 0) {
                degrees += 180;
            } else if (opp < 0 && adj < 0) {
                degrees += 180;
            } else if (opp < 0 && adj >= 0) {
                degrees += 360;
            } 

            
            console.log(degrees + ' degrees');
            
        }

        this.gunAnimations[this.gunType][this.isFiring].drawFrameAndRotate(this.game.clockTick, ctx, this.x, this.y, 2, this.aimRight, degrees);
        //this.drawGun(ctx, degrees);
      
    };

    shootGun() {
        this.isFiring = 1;
        
        //this.isFiring = 0;
    }

}