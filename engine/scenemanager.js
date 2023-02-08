class SceneManager {
    constructor(game) {
        this.game = game;

        this.game.camera = this;
        this.x = 0;
        this.y = 0;





        let testLevel =
            [
                39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39,
                39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 97, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 99, 39, 39, 39, 39, 39, 39, 39, 39,
                39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 39, 39, 39, 39, 39, 39, 39, 39,
                39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 39, 39, 39, 39, 39, 39, 39, 39,
                39, 39, 39, 39, 39, 39, 39, 39, 39, 97, 75, 75, 75, 75, 77, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 39, 39, 39, 39, 39, 39, 39, 39,
                39, 39, 39, 39, 39, 39, 39, 39, 39, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 73, 75, 75, 75, 75, 75, 99, 39, 39,
                39, 39, 39, 39, 39, 39, 39, 39, 39, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 39, 39,
                39, 39, 39, 39, 39, 39, 39, 39, 39, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 39, 39,
                39, 39, 97, 75, 75, 75, 75, 75, 75, 77, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 39, 39,
                39, 39, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 39, 39,
                39, 39, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 39, 39,
                39, 39, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 39, 39,
                39, 39, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 39, 39,
                39, 39, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 133, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 39, 39,
                39, 39, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 133, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 135, 39, 39,
                39, 39, 133, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 135, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39,
                39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39,
                39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39,
                39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39,
                39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39];



        this.testLevelCollisionBlocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 163, 163, 163, 163, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 163, 163, 163, 163, 163, 163, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0,
            0, 0, 163, 163, 163, 163, 163, 163, 163, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0,
            0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0,
            0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0,
            0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0,
            0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0,
            0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 163, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0,
            0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 0, 0,
            0, 0, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // 50 tiles wide


        // 40 tiles tall



        this.floorCollisions2D = [];

        //for every 50 tiles, create a new subarray
        // for (let i = 0; i < floorCollisions.length; i += 50) {
        //     this.floorCollisions2D.push(floorCollisions.slice(i, i + 50));

        // }

        for (let i = 0; i < testLevel.length; i += 50) {
            this.floorCollisions2D.push(testLevel.slice(i, i + 50));
        }


        this.solidBlocks = [];


        for (let i = 0; i < this.testLevelCollisionBlocks.length; i += 50) {
            this.solidBlocks.push(this.testLevelCollisionBlocks.slice(i, i + 50));
        }


        // for (var row = 0; row < this.floorCollisions2D.length; row++) {
        //     for (var column = 0; column < this.floorCollisions2D[row].length; column++) {
        //         if (this.floorCollisions2D[row][column] !== 0) {
        //             // ctx.fillRect(j * 10, i * 10, 10, 10); // assuming 10 pixels per square
        //             this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, this.floorCollisions2D[row].length * PARAMS.BLOCKWIDTH, width, height));

        //         }
        //     }
        // }




        this.collisionBlocks = [];

        this.solidBlocks.forEach((row, yIndex) => {
            row.forEach((symbol, xIndex) => {
                if (symbol !== 0) {
                    console.log("draw block here");
                    this.collisionBlocks.push(new CollisionBlock({ position: { x: xIndex * 16, y: yIndex * 16 } }))
                }
            })
        })






        this.startingPosition = { x: 300, y: 700 };
        let player = new MasterChief(gameEngine, this.startingPosition, this.collisionBlocks);
        gameEngine.addEntity(player);
        gameEngine.player = player;


        this.loadLevel()

    }


    loadLevel() {



        let width = 1920 / 25;
        let height = 1080 / this.floorCollisions2D.length;


        // for (var row = 0; row < this.floorCollisions2D.length; row++) {
        //     for (var column = 0; column < this.floorCollisions2D[row].length; column++) {
        //         if (this.floorCollisions2D[row][column] !== 0) {
        //             // ctx.fillRect(j * 10, i * 10, 10, 10); // assuming 10 pixels per square
        //             this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, this.floorCollisions2D[row].length * PARAMS.BLOCKWIDTH, width, height));

        //         }
        //     }
        // }

        this.boundingBoxes = [];


        // this.solidBlocks.forEach((row, yIndex) => {
        //     row.forEach((symbol, xIndex) => {
        //         if (symbol !== 0) {
        //             //  console.log("draw block here");
        //             //  this.collisionBlocks.push(new CollisionBlock({ position: { x: xIndex * 16, y: yIndex * 16 } }))
        //             this.game.addEntity(new CollisionBlock({ position: { x: xIndex * PARAMS.BLOCKWIDTH, y: yIndex * PARAMS.BLOCKWIDTH } }));
        //             //this.boundingBoxes.push(new CollisionBlock({ position: { x: xIndex * PARAMS.BLOCKWIDTH, y: yIndex * PARAMS.BLOCKWIDTH } }));



        //             // this.game.addEntity(new BoundingBox(xIndex, yIndex, 32, 32));
        //         }
        //     })
        // })



        for (var row = 0; row < this.floorCollisions2D.length; row++) {
            for (var column = 0; column < this.floorCollisions2D[row].length; column++) {
                if (this.floorCollisions2D[row][column] !== 0) {
                    if (this.solidBlocks[row][column] !== 0) {
                        this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH));
                    } else {
                        this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, 0, 0, 0));
                    }
                    // ctx.fillRect(j * 10, i * 10, 10, 10); // assuming 10 pixels per square
                    // this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, this.floorCollisions2D[row].length * PARAMS.BLOCKWIDTH, 32, 32));
                    //  this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH));

                }
            }
        }






        // if (this.solidBlocks[row][column] !== 0) {
        //     this.game.addEntity(new CollisionBlock({ position: { x: column * PARAMS.BLOCKWIDTH, y: row * PARAMS.BLOCKWIDTH }, width: width, height: height }))
        // }




        let ground = [{ x: 0, y: 16, size: 8 }, { x: 0, y: 14, size: 1 }, { x: 8, y: 14, size: 1 }, { x: 8, y: 12, size: 1 }, { x: 9, y: 11, size: 10 }, { x: 19, y: 12, size: 1 }, { x: 20, y: 13, size: 1 }, { x: 21, y: 13, size: 5 }, { x: 71, y: 14, size: 15 }, { x: 89, y: 14, size: 63 }, { x: 154, y: 14, size: 69 }]

        // for (let i = 0; i < ground.length; i++) {

        //     let groundFloor = ground[i];
        //     this.game.addEntity(new Ground(this.game, groundFloor.x * PARAMS.BLOCKWIDTH, groundFloor.y * PARAMS.BLOCKWIDTH, groundFloor.size * PARAMS.BLOCKWIDTH))
        // }

    }

    update() {


        let midpoint = PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2;
        let midpointY = PARAMS.CANVAS_HEIGHT / 2 - PARAMS.BLOCKWIDTH / 2;

        // if (this.x < this.game.player.position.x - midpoint) {
        this.x = this.game.player.position.x - midpoint;

        // }
        // if (this.y < this.game.player.position.y - midpoint) {
        //     console.log("test");
        this.y = this.game.player.position.y - midpointY;
        // }

    }

    draw(ctx) {

    }
}