class PatrollingState {
    constructor(enemy) {
        this.enemy = enemy;

        this.patrollingLeft = false;
    }

    update() {


        let distance = getDistance(this.enemy.position, this.enemy.target);
        // console.log(this.enemy.distance);
        // this.velocity = { x: (this.enemy.target.x - this.enemy.position.x) / distance * 100, y: (this.enemy.target.y - this.enemy.position.y) / distance * 100 };

        // // if player in range... chase?
        if (this.enemy.distance < 100) {
            this.enemy.setState(this.enemy.states.chasing);
            return;
        }

        if (this.patrollingLeft) {
            this.enemy.position.x -= 1;
            if (this.enemy.position.x === 1200) {
                this.patrollingLeft = false;
                this.flip = false;
                this.enemy.setState(this.enemy.states.waiting);

                this.enemy.state = 0;
                return;

            }


        }

        else {
            this.enemy.position.x += 1;
            if (this.enemy.position.x === 1500) {
                this.patrollingLeft = true;

                this.flip = true;

                this.enemy.setState(this.enemy.states.waiting);
                this.enemy.state = 3;

                return;

            }
        }
        if (this.flip) {
            this.enemy.state = 2;
        }
        else {
            this.enemy.state = 1;
        }

    }
    draw(ctx) {

        this.enemy.animations[this.enemy.state].drawFrame(this.enemy.game.clockTick, ctx, this.enemy.position.x - this.enemy.game.camera.x, this.enemy.position.y - this.enemy.game.camera.y, this.enemy.scale, false);
    }
}