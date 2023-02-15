class ChasingState {
    constructor(enemy) {

        this.enemy = enemy;

        // this.elapsedTime = 0;
    }

    update() {


        let distance = this.enemy.distance;

        // if (distance > 100) {
        //     this.enemy.setState(this.enemy.states.patrolling);
        //     return;
        // }
        this.velocity = { x: (this.enemy.target.x - this.enemy.position.x) / distance * 100, y: (this.enemy.target.y - this.enemy.position.y) / distance * 100 };

        this.enemy.position.x += this.velocity.x * this.enemy.game.clockTick;
    }

    draw(ctx) {



        //if (this.elapsedTime < 3) {
        // this.elapsedTime += this.enemy.game.clockTick;
        this.enemy.animations[this.enemy.state].drawFrame(this.enemy.game.clockTick, ctx, this.enemy.position.x - this.enemy.game.camera.x, this.enemy.position.y - this.enemy.game.camera.y, this.enemy.scale, false);

        //  }
        // else {
        //    this.elapsedTime = 0;
        //   this.enemy.setState(this.enemy.states.patrolling)
        //  }



    }
}