class WaitingState {
    constructor(enemy) {

        this.enemy = enemy;

        this.elapsedTime = 0;
    }

    update() {

    }

    draw(ctx) {



        if (this.elapsedTime < 3) {
            this.elapsedTime += this.enemy.game.clockTick;
            this.enemy.animations[this.enemy.state].drawFrame(this.enemy.game.clockTick, ctx, this.enemy.position.x - this.enemy.game.camera.x, this.enemy.position.y - this.enemy.game.camera.y, this.enemy.scale, false);

        }
        else {
            this.elapsedTime = 0;
            this.enemy.setState(this.enemy.states.patrolling)
        }



    }
}