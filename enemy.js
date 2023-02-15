class Enemy {
    constructor() {

        this.states = { patrolling: new PatrollingState(this) };
        this.currentState = this.states.patrolling;

    }

    setState(state) {
        this.currentState = state;
    }

    update() {
        this.currentState.enter();
    }

    draw(ctx) {

    }
}