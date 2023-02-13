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

        this.testPosition = { x: 300, y: 700 };
        let testEnemy = new Grunt(gameEngine, this.testPosition, this.collisionBlocks);
        gameEngine.addEntity(testEnemy);

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
                if (this.floorCollisions2D[row][column] === 41) {
                    if (this.solidBlocks[row][column] !== 0) {
                        this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 128, 64));
                    } else {
                        this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, 0, 0, 0, 0));
                    }

                }
                if (this.floorCollisions2D[row][column] === 3) {
                    if (this.solidBlocks[row][column] !== 0) {
                        this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 64, 0));
                    } else {
                        this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, 0, 0, 0, 0));
                    }

                }

                if (this.floorCollisions2D[row][column] === 39) {
                    //   if (this.solidBlocks[row][column] !== 0) {
                    //  this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 64, 0));
                    //   } else {
                    this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, 0, 0, 0, 64, 64));
                    // }

                }

                if (this.floorCollisions2D[row][column] === 133) {
                    if (this.solidBlocks[row][column] !== 0) {
                        this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 192, 224));
                    } else {
                        this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, 0, 0, 0, 0));
                    }

                }

                if (this.floorCollisions2D[row][column] === 97) {
                    if (this.solidBlocks[row][column] !== 0) {
                        this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 192, 160));
                    } else {
                        this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, 0, 0, 0, 0));
                    }

                }

                if (this.floorCollisions2D[row][column] === 75) {
                    if (this.solidBlocks[row][column] !== 0) {
                        this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 64, 128));
                    } else {
                        this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, 0, 0, 0, 0));
                    }

                }

                if (this.floorCollisions2D[row][column] === 77) {
                    if (this.solidBlocks[row][column] !== 0) {
                        this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 128, 128));
                    } else {
                        this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, 0, 0, 0, 0));
                    }

                }
                if (this.floorCollisions2D[row][column] === 99) {
                    if (this.solidBlocks[row][column] !== 0) {
                        this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 256, 160));
                    } else {
                        this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, 0, 0, 0, 0));
                    }

                }

                if (this.floorCollisions2D[row][column] === 37) {
                    if (this.solidBlocks[row][column] !== 0) {
                        this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 0, 64));
                    } else {
                        this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, 0, 0, 0, 0));
                    }

                }

                if (this.floorCollisions2D[row][column] === 135) {
                    if (this.solidBlocks[row][column] !== 0) {
                        this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 256, 224));
                    } else {
                        this.game.addEntity(new Ground(this.game, column * PARAMS.BLOCKWIDTH, row * PARAMS.BLOCKWIDTH, 0, 0, 0, 0));
                    }

                }
            }
        }





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