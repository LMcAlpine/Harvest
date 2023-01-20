class MasterChief {
    constructor(game) {
        this.game = game;

        this.SpriteSheet = ASSET_MANAGER.getAsset("./sprites/ChiefSprites.png");
        this.RotationSpriteSheet = ASSET_MANAGER.getAsset("./sprites/sniper1.png");

        this.state = 0; // 0 = Idle, 1 = walking
        this.facing = 0; // 0 = right, 1 = left
        this.aimDirection = 0; // 0 = aiming right of player, 1 = aiming left of player
        this.reverse = false;
        this.angle = 0; //Angle gun is aiming
        this.shoot = false;

        this.x = 300;
        this.y = 300;
        this.walkingSpeed = 0.06;
        
        this.bodyAnimations = [];
        this.helmetAnimations = [];
        this.armAnimations = [];
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
            this.armAnimations.push([]);
            for (let j = 0; j <= 1; j++) { // this.facing
                this.bodyAnimations[i].push([]);
                this.helmetAnimations[i].push([]);
                this.armAnimations[i].push([]);
            }
        }

        

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
        
        //ARM ROTATION TESTING
        // this.armAnimations[0][0] = new Animator(this.RotationSpriteSheet,
        //     //5, 27,
        //     0, 0, 
        //     180, 90,
        //     1, 1,
        //     0,
        //     false, true);

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
            if (x >= 0) {
                this.aimDirection = 0;
            } else {
                this.aimDirection = 1;
            }
            console.log(this.aimDirection);
        }

        if (this.game.keys['d']) {
            this.facing = 0;
            this.state = 1;
            
            this.x += 3;
        }
        else if (this.game.keys['a']) {
            this.facing = 1;
            this.state = 1;
            
            this.x -= 3;
        }
        else {
            this.state = 0;
        }
        
    };

    draw(ctx) {

        //this.rectangle();

        this.bodyAnimations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);     
        this.helmetAnimations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);   

        const canvas2 = rotateImage(this.RotationSpriteSheet,
            0, 0, 
            180, 180,
            this.angle, 5);

        ctx.drawImage(canvas2, 
            this.x-154, this.y - 146, 
            2*180, 2*180);
        
            if (gameEngine.mouse !== null) {

                let yOffset = 32;
                let xOffset = 25;

                let opp = gameEngine.mouse.y - this.y - yOffset;
                let adj = gameEngine.mouse.x - this.x - xOffset;
                this.angle = Math.atan(opp / adj);

            }

        
    };

}