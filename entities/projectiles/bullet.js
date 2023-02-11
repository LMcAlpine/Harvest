/*  Class is used to represent a bullet that can be fired by friendlies or enemies.
   
    -A circle will be drawn from the firingPos towards the targetPos and will not stop until the aliveCounter
    reaches 0.
    -An integer will dictate whether the bullet can penetrate soft targets (enemies):
        Pen 0: Bullet will not penetrate any enemy
        Pen 1: Bullet will penetrate enemy if their shields are down.
        Pen 2: Bullet will penetrate enemy regardless of shield status.
    -Extra: Bullet loses damage output each penetration.

*/

class Bullet {
    //gameengine, double, Position, Position, boolean
    constructor(shooter, game, bulletVelocity, firingPos, targetPos, penetration) {
        Object.assign(this, { shooter, game, bulletVelocity, firingPos, targetPos, penetration });

        // this.BB = null;
        // this.lastBB = this.BB;
        
        this.startingX = this.firingPos.x - this.game.camera.x;
        this.startingY = this.firingPos.y - this.game.camera.y;
        let endX = (this.targetPos.x - this.shooter.position.x) + this.firingPos.x;
        let endY = this.targetPos.y;

        let xDiff = endX - this.startingX;
        let yDiff = endY - this.startingY;

        let vector = {
            x: xDiff,
            y: yDiff
        }

        let vectorMagnitude = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));

        this.vectorNormalized = {
            x: xDiff / vectorMagnitude,
            y: yDiff / vectorMagnitude
        }

        this.bulletPosition = {
            x: 0,
            y: 0
        }

    
        this.x = 0;
        this.aimRight = shooter.aimRight;
        this.removeFromWorld = false;
        this.radius = 5;
        this.aliveCounter = 400;

        this.updateBB();

    };

    // collide(other) {
    //     //return distance(this, other) < this.radius + other.radius; //Change this
    //     //return true;
    // }

    update() {

        this.bulletPosition = {
            x: this.startingX + (this.vectorNormalized.x * this.x),
            y: this.startingY + (this.vectorNormalized.y * this.x)
        }

        this.collisionChecker();

        this.updateBB();

    };

    collisionChecker() {
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            //console.log(ent);
            //console.log(this.BB.collide(ent));

            if(this.BB.collide(ent)) {
                console.log('COLLISION');
            }

            if (ent !== this && ent !== this.shooter && this.BB.collide(ent)) {
                console.log('COLLISION');

                // if (ent instanceof Brute || ent instanceof Elite
                //     || ent instanceof Grunt || ent instanceof Hunter
                //     || ent instanceof Jackal) {



                // } else if (ent instanceof MasterChief) {


                // } else {
                //     this.removeFromWorld = true;
                // }

            }
        }
    }

    updateBB() {
        this.lastBB = this.BB;
        let width = 20;
        let height = 20;
        this.BB = new BoundingBox(this.bulletPosition.x - (width / 2),  this.bulletPosition.y - (height / 2), width, height);
    }

    draw(ctx) {

        ctx.strokeStyle = 'cyan';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);

        //Draw circle representing bullet
        ctx.beginPath();
        ctx.fillStyle = "Green";
        ctx.arc(
            this.bulletPosition.x, //X Position of circle
            this.bulletPosition.y, //Y Position of circle
            this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();

        this.x += this.bulletVelocity;

        //Loop to kill bullet entity
        if (this.aliveCounter == 0) {
            this.removeFromWorld = true;
        }
        this.aliveCounter--;

        

    };



};