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

        this.BB = null;
        this.lastBB = this.BB;

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
        this.aliveCounter = 400;

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
        this.BB = new BoundingBox(this.position.x - this.game.camera.x, this.position.y - this.game.camera.y, width, height);

    }

    collisionChecker() {

        this.game.collisionEntities.forEach(entity => {
            //console.log(entity);

            if (this.BB.collide(entity.BB)) {
                console.log('COLLISION');
            }

            // if (ent !== this && ent !== this.shooter && this.BB.collide(ent)) {
            //     console.log('COLLISION');

            //     // if (ent instanceof Brute || ent instanceof Elite
            //     //     || ent instanceof Grunt || ent instanceof Hunter
            //     //     || ent instanceof Jackal) {



            //     // } else if (ent instanceof MasterChief) {


            //     // } else {
            //     //     this.removeFromWorld = true;
            //     // }

            // }
        });
    }



    draw(ctx) {
        //ctx.strokeStyle = 'blue';
        //ctx.strokeRect(972, 540, 100, 100);

        ctx.strokeStyle = 'cyan';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);

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