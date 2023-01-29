class SceneManager {
    constructor(game) {
        this.game = game;

        this.game.camera = this;
        this.x = 0;

        // 50 tiles wide
        // 40 tiles tall
        this.floorCollisions2D = [];

        //for every 50 tiles, create a new subarray
        for (let i = 0; i < floorCollisions.length; i += 50) {
            this.floorCollisions2D.push(floorCollisions.slice(i, i + 50));

        }




        this.collisionBlocks = [];






        this.startingPosition = { x: 300, y: 300 };
        let player = new MasterChief(gameEngine, this.startingPosition, this.collisionBlocks);
        gameEngine.addEntity(player);
        gameEngine.player = player;


        this.loadLevel()

    }
    

    loadLevel() {



        let width = 1920 / 50;
        let height = 1080 / this.floorCollisions2D.length;


        for (var row = 0; row < this.floorCollisions2D.length; row++) {
            for (var column = 0; column < this.floorCollisions2D[row].length; column++) {
                if (this.floorCollisions2D[row][column] !== 0) {
                    // ctx.fillRect(j * 10, i * 10, 10, 10); // assuming 10 pixels per square
                    this.game.addEntity(new Ground(this.game, column * width, row * height, this.floorCollisions2D[row].length * 32, width, height));
                }
            }
        }





        let ground = [{ x: 0, y: 14, size: 69 }, { x: 71, y: 14, size: 15 }, { x: 89, y: 14, size: 63 }, { x: 154, y: 14, size: 69 }]

        // for (let i = 0; i < ground.length; i++) {

        //     let groundFloor = ground[i];
        //     this.game.addEntity(new Ground(this.game, groundFloor.x * PARAMS.BLOCKWIDTH, groundFloor.y * PARAMS.BLOCKWIDTH, groundFloor.size * PARAMS.BLOCKWIDTH))

    }

    update() {


        let midpoint = PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2;

        //if (this.x < this.game.player.position.x - midpoint) {
        this.x = this.game.player.position.x - midpoint;
        // }

    }

    draw(ctx) {

    }
}