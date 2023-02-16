/*  Class is used to represent a bullet that can be fired by friendlies or enemies.
*/

class Bullet {
    //gameengine, double, Position, Position, boolean
    constructor(shooter, game, bulletVelocity, firingPos, targetPos, bulletDamage) {
        Object.assign(this, { shooter, game, bulletVelocity, firingPos, targetPos, bulletDamage });

        //this.BB = null;
        //this.lastBB = this.BB;

        let xDiff = this.targetPos.x - this.firingPos.x;
        let yDiff = this.targetPos.y - this.firingPos.y;

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

        //this.aimRight = shooter.aimRight;
        this.removeFromWorld = false;
        this.radius = 5;
        this.aliveCounter = 4000;

        this.updateBB();

    };


    update() {

        this.position = {
            x: (this.position.x + (this.vectorNormalized.x * this.bulletVelocity)),
            y: (this.position.y + (this.vectorNormalized.y * this.bulletVelocity))
        }

        this.collisionChecker();

        this.updateBB();

    };

    updateBB() {
        this.lastBB = this.BB;
        let width = 20;
        let height = 20;
        //this.BB = new BoundingBox(this.bulletPosition.x - (width / 2),  this.bulletPosition.y - (height / 2), width, height);
        // this.BB = new BoundingBox(this.position.x - this.game.camera.x,  this.position.y - this.game.camera.y, width, height);

        this.BB = new BoundingBox(
            this.position.x,
            this.position.y,
            width,
            height);

    }

    collisionChecker() {

        this.game.collisionEntities.forEach(entity => {
            //console.log(entity);

            if (this.shooter !== entity && this !== entity && this.BB.collide(entity.BB)) {//Collision
                if (entity instanceof Tile) {
                    this.removeFromWorld = true;

                } else if (entity instanceof Grunt) {

                    // console.log("here");
                    entity.takeDamage(this.bulletDamage);
                    this.removeFromWorld = true;



                } else if (entity instanceof MasterChief) {
                    console.log("cheese ouch");
                    entity.takeDamage(this.bulletDamage);

                    this.removeFromWorld = true;
                }


            }


        });
    }



    draw(ctx) {
        //ctx.strokeStyle = 'blue';
        //ctx.strokeRect(972, 540, 100, 100);

        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);

        //Draw circle representing bullet
        ctx.beginPath();
        ctx.fillStyle = "cyan";
        ctx.arc(
            this.position.x - this.game.camera.x, //X Position of circle
            this.position.y - this.game.camera.y, //Y Position of circle
            this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();

        //Loop to kill bullet entity
        if (this.aliveCounter == 0) {
            this.removeFromWorld = true;
        }
        this.aliveCounter--;



    };



};