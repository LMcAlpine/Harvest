class SceneManager {
    constructor(game) {
        this.game = game;

        // 50 tiles wide
        // 40 tiles tall
        this.floorCollisions2D = [];

        for (let i = 0; i < floorCollisions.length; i += 50) {
            this.floorCollisions2D.push(floorCollisions.slice(i, i + 50));

        }


        // console.log(this.floorCollisions2D);

        this.collisionBlocks = [];
        // loop through all the rows that make up the image
        this.floorCollisions2D.forEach((row, yIndex) => {
            row.forEach((symbol, xIndex) => {
                if (symbol === 61 || symbol === 62) {
                    console.log("draw block here");
                    this.collisionBlocks.push(new CollisionBlock({ position: { x: xIndex * 16, y: yIndex * 16 } }))
                }
            })
        })


        this.block = ASSET_MANAGER.getAsset("./img/testmap.png");





        this.loadLevel()

    }

    loadLevel() {

        //  let player = new TestPlayer({ game: this.game, position: { x: 100, y: 100 }, collisionBlocks: this.collisionBlocks })

        //  gameEngine.addEntity(player);
        //  gameEngine.player = player;
        let level = new DrawLevel(this.collisionBlocks);
        this.game.addEntity(level);

        // Add Master Cheese
        this.startingPosition = { x: 300, y: 300 };
        gameEngine.addEntity(new MasterChief(gameEngine, this.startingPosition, this.collisionBlocks));


    }
}