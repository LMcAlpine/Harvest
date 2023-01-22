class MasterChief {
    constructor(game, position) {

        // Updated the constructor
        Object.assign(this, { game, position});

        //this.game = game;
        this.cache = [];

        this.SpriteSheet = ASSET_MANAGER.getAsset("./sprites/ChiefSprites.png");
        this.RotationSpriteSheet = ASSET_MANAGER.getAsset("./sprites/sniper1.png");

        //Animation States
        this.state = 0; // 0 = Idle, 1 = walking
        this.facing = 0; // 0 = right, 1 = left


        this.aimRight = true;
        this.reverse = false;
        //this.angle = 0; //Angle gun is aiming
        this.shoot = false;

        this.x = 300;
        this.y = 300;
        this.walkingSpeed = 0.07;


        // Added for Jumping
        this.velocity = {x: 0, y: 0};
        this.inAir = false;
        
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

        this.armAnimations[0][0] = new Animator(this.RotationSpriteSheet,
            0, 0,
            90, 90,
            1, 1,
            0,
            false, true);

        

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

        // Updater properties
        const TICK = this.game.clockTick;

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
            //this.x += 3;
            this.velocity.x += PLAYER_PHYSICS.MAX_RUN * TICK;
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
            //this.x -= 3;
            this.velocity.x -= PLAYER_PHYSICS.MAX_RUN * TICK;
        } else if(this.game.keys[' '] || this.game.keys['Space']){ // Jumping TODO: JUMP WHILE RUNNING!
           this.jump();
        } else {
            this.state = 0;
        }

        // Allow the player to fall
        this.velocity.y += PLAYER_PHYSICS.MAX_FALL * TICK;

        // Update the player x and y
        this.x = this.velocity.x * TICK;
        this.y = this.velocity.y * TICK;

    };

    // This method will jump the player
    jump() {
        this.velocity.y -= PLAYER_PHYSICS.JUMP_HEIGHT;
        this.inAir = true;
    }


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
        this.drawGun(ctx, degrees);
      
    };

    drawGun(ctx, angle) {

        

        if (!this.cache[angle]) {
            let radians = -angle / 360 * 2 * Math.PI;
            
            if (this.aimRight) {
                //console.log('Aim Right');
                var offscreenCanvas = rotateImage(this.RotationSpriteSheet,
                    0, 0, 
                    180, 180,
                    radians, 5,
                    false);
    
            } else {
                //console.log('Aim Left');
                var offscreenCanvas = rotateImage(this.RotationSpriteSheet,
                    0, 0, 
                    180, 180,
                    -radians - Math.PI, 5,
                    true);
    
                
            }

            this.cache[angle] = offscreenCanvas;
        }

        //Offset to shift chief's shoulder back in it's socker when he changes face
        if (this.aimRight) {
            var armXOffset = 154;
        } else {
            var armXOffset = 126;
        }
        
        ctx.drawImage(this.cache[angle], 
            this.x - armXOffset, this.y - 146, 
            2*180, 2*180);
        

    };

}