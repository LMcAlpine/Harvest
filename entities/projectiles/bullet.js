/*  Class is used to represent a bullet that can be fired by friendlies or enemies.


*/

class Bullet {
    /**
     * 
     * @param {entity} shooter - Entity that shot bullet
     * @param {gameEngine} game 
     * @param {Integer} bulletVelocity 
     * @param {Object} firingPos - Where bullet was first fired
     * @param {Object} targetPos - Position bullet should travel to
     * @param {Integer} bulletDamage - Damage of bullet if hits target it can damage
     */
    constructor(shooter, game, firingPos, targetPos, bulletVelocity, bulletDamage, bulletType, bulletDistance) {
        Object.assign(this, { shooter, game, firingPos, targetPos, bulletVelocity, bulletDamage, bulletType, bulletDistance});
        
        this.impactSprites = ASSET_MANAGER.getAsset("./sprites/Bullet Impacts.png");

        let xDiff = (this.targetPos.x + 50)- this.firingPos.x;
        let yDiff = (this.targetPos.y)- this.firingPos.y;

        //Calculating direction of bullet
        let vector = {
            x: xDiff,
            y: yDiff
        }

        let vectorMagnitude = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));

        this.vectorNormalized = {
            x: xDiff / vectorMagnitude,
            y: yDiff / vectorMagnitude
        }

        this.position = {
            x: this.firingPos.x,
            y: this.firingPos.y
        }

        this.impactPosition = {
            x: null,
            y: null
        }

        this.bulletEndX = this.position.x + this.vectorNormalized.x * this.bulletDistance;
        this.bulletEndY = this.position.y + this.vectorNormalized.y * this.bulletDistance;

        this.removeFromWorld = false;

        this.bulletImpacts = [];
        this.playImpact = 0; // 0 = toggledOff, 1 = blue
        this.loadAnimations();

        this.updateBB();

        this.game.addEntityToFront(this);

    };


    


    collisionChecker() {

        this.game.collisionEntities.forEach(entity => {
            //console.log(entity);
            
            if (entity.BB && this.shooter !== entity && this !== entity && this.BB.collide(entity.BB)) {//Collision
                if (entity instanceof Tile) { 
                    this.removeFromWorld = true;
                    // this.playImpact = 3;

                    // this.impactPosition.x = this.position.x;
                    // this.impactPosition.y = this.position.y;

                } else if (entity instanceof Grunt //Bullet hits a grunt
                    && entity.isAlive
                    && !(this.shooter instanceof Grunt)
                    && !(this.shooter instanceof Elite)) { //No friendly fire!

                    entity.currentState = entity.states.attacking;
                    entity.takeDamage(this.bulletDamage);
                    this.playImpact = 1;

                    this.impactPosition.x = this.position.x;
                    this.impactPosition.y = this.position.y;

                   // this.removeFromWorld = true;

                } else if (entity instanceof Elite //Bullet hits a grunt
                    && entity.isAlive
                    && !(this.shooter instanceof Grunt)
                    && !(this.shooter instanceof Elite)) { //No friendly fire!

                    entity.currentState = entity.states.attacking;
                    entity.takeDamage(this.bulletDamage);
                    this.playImpact = 1;

                    this.impactPosition.x = this.position.x;
                    this.impactPosition.y = this.position.y;

                    //this.removeFromWorld = true;

                } else if (entity instanceof MasterChief) {
                    //console.log("cheese ouch");
                    entity.takeDamage(this.bulletDamage);

                    if (entity.shield <= 0)  {
                        this.playImpact = 2;
                    } else {
                        this.removeFromWorld = true;
                    }
                    this.impactPosition.x = this.position.x;
                    this.impactPosition.y = this.position.y;
                }


            }


        });
    }



    draw(ctx) {
        //ctx.strokeStyle = 'blue';
        //ctx.strokeRect(972, 540, 100, 100);

        if (PARAMS.DEBUG && this.BB) {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height); 
        }

        if (this.playImpact !== 0) this.impactAnimation(ctx);
        else {
            if (this.bulletType === "BULLET") {
                //Draw circle representing bullet
                ctx.beginPath();
                ctx.fillStyle = "gold";
                ctx.arc(
                    this.position.x - this.game.camera.x, //X Position of circle
                    this.position.y - this.game.camera.y, //Y Position of circle
                    2, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.closePath();
    
            } else if (this.bulletType ===  "PLASMA") {
                //Draw circle representing bullet
                ctx.beginPath();
                ctx.fillStyle = "cyan";
                ctx.arc(
                    this.position.x - this.game.camera.x, //X Position of circle
                    this.position.y - this.game.camera.y, //Y Position of circle
                    5, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.closePath();
            }
        }
        

    };

    impactAnimation(ctx) {


        this.bulletImpacts[this.playImpact].drawFrame(
            this.game.clockTick, ctx,
            this.impactPosition.x - this.game.camera.x,
            this.impactPosition.y - this.game.camera.y,
            PARAMS.SCALE, false);

        

        if (this.bulletImpacts[this.playImpact].isDone()) {
            console.log("DONE");
            this.bulletImpacts[this.playImpact].reset();
            this.bulletImpacts = 0;
            this.removeFromWorld = true;
        }
    }

    loadAnimations() {
        for (let i = 0; i <= 3; i++) {
            this.bulletImpacts.push([]);   
        }

        this.bulletImpacts[1] = new Animator(this.impactSprites,
            0, 0,
            16, 16,
            3, 0.1,
            0,
            false, false);

        this.bulletImpacts[2] = new Animator(this.impactSprites,
            0, 16,
            16, 16,
            3, 0.1,
            0,
            false, false);

        this.bulletImpacts[3] = new Animator(this.impactSprites,
            0, 32,
            16, 16,
            3, 0.1,
            0,
            false, false);

            

    }


    update() {

        if (this.playImpact == 0) { //Don't need to update if impact already detected

            this.position = {
                x: (this.position.x + (this.vectorNormalized.x * this.bulletVelocity)),
                y: (this.position.y + (this.vectorNormalized.y * this.bulletVelocity))
            }

            //Loop to kill bullet entity
            if (Math.abs(this.position.x - this.firingPos.x) >= Math.abs(this.bulletEndX - this.firingPos.x) 
                && Math.abs(this.position.y - this.firingPos.y) >= Math.abs(this.bulletEndY - this.firingPos.y)) {

                    this.removeFromWorld = true;
            }

            this.collisionChecker(); 

            this.updateBB();

        }

    };

    updateBB() {
        this.lastBB = this.BB;
        let width = 20;
        let height = 20;
        this.BB = new BoundingBox(this.position.x - (width / 2), this.position.y - (height / 2), width, height);

    }



};